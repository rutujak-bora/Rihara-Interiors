from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Rihara Architects & Interiors API")
api_router = APIRouter(prefix="/api")

logger = logging.getLogger("rihara")
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')


# ============================= MODELS =============================
class ContactInput(BaseModel):
    model_config = ConfigDict(extra="ignore")
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default="", max_length=40)
    projectType: Optional[str] = Field(default="", max_length=80)
    message: str = Field(min_length=1, max_length=4000)


class ContactRecord(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str = ""
    projectType: str = ""
    message: str
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    delivered_email: bool = False


# ============================= EMAIL =============================
def send_enquiry_email(record: ContactRecord) -> bool:
    """Send the enquiry email via SMTP if creds are configured. Returns True if sent."""
    host = os.environ.get("SMTP_HOST")
    port = int(os.environ.get("SMTP_PORT", "587") or "587")
    user = os.environ.get("SMTP_USER")
    pwd = os.environ.get("SMTP_PASSWORD")
    sender = os.environ.get("SMTP_SENDER") or user
    recipient = os.environ.get("CONTACT_RECIPIENT", "RiharaInteriors@gmail.com")

    if not (host and user and pwd):
        logger.info("SMTP not configured — enquiry saved to DB only.")
        return False

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"New Enquiry — {record.name} ({record.projectType or 'General'})"
        msg["From"] = sender
        msg["To"] = recipient
        msg["Reply-To"] = record.email

        text = (
            f"New enquiry from the Rihara website\n\n"
            f"Name: {record.name}\nEmail: {record.email}\nPhone: {record.phone}\n"
            f"Project Type: {record.projectType}\n\nMessage:\n{record.message}\n\n"
            f"Submitted: {record.timestamp}\nID: {record.id}\n"
        )
        html = f"""
        <div style='font-family:Georgia,serif;color:#3D2B1F;max-width:640px;margin:0 auto;padding:24px;background:#F5F0E8;border:1px solid #C9A96E;'>
          <h2 style='font-family:Georgia,serif;font-weight:400;color:#1A1410;letter-spacing:1px;'>NEW ENQUIRY — RIHARA</h2>
          <p style='color:#3D2B1F;line-height:1.6;'>
            <strong>Name:</strong> {record.name}<br/>
            <strong>Email:</strong> {record.email}<br/>
            <strong>Phone:</strong> {record.phone or '—'}<br/>
            <strong>Project Type:</strong> {record.projectType or '—'}<br/>
          </p>
          <p style='color:#3D2B1F;line-height:1.6;border-top:1px solid #C9A96E;padding-top:12px;'>{record.message}</p>
          <p style='font-size:12px;color:#8a6f4a;margin-top:24px;'>Submitted {record.timestamp} · ID {record.id}</p>
        </div>
        """
        msg.attach(MIMEText(text, "plain"))
        msg.attach(MIMEText(html, "html"))

        with smtplib.SMTP(host, port, timeout=15) as server:
            server.starttls()
            server.login(user, pwd)
            server.sendmail(sender, [recipient], msg.as_string())
        logger.info("Enquiry email sent to %s for record %s", recipient, record.id)
        return True
    except Exception as e:
        logger.exception("Failed to send enquiry email: %s", e)
        return False


# ============================= ROUTES =============================
@api_router.get("/")
async def root():
    return {"name": "Rihara Architects & Interiors", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "time": datetime.now(timezone.utc).isoformat()}


@api_router.post("/contact")
async def create_contact(payload: ContactInput):
    record = ContactRecord(
        name=payload.name.strip(),
        email=str(payload.email).strip(),
        phone=(payload.phone or "").strip(),
        projectType=(payload.projectType or "").strip(),
        message=payload.message.strip(),
    )
    doc = record.model_dump()

    try:
        await db.contact_messages.insert_one(doc)
    except Exception as e:
        logger.exception("DB insert failed: %s", e)
        raise HTTPException(status_code=500, detail="Could not store enquiry")

    sent = send_enquiry_email(record)
    if sent:
        await db.contact_messages.update_one({"id": record.id}, {"$set": {"delivered_email": True}})

    return {"ok": True, "id": record.id, "email_delivered": sent}


@api_router.get("/contact")
async def list_contacts(limit: int = 50):
    cursor = db.contact_messages.find({}, {"_id": 0}).sort("timestamp", -1).limit(min(limit, 200))
    items = await cursor.to_list(length=limit)
    return {"items": items, "count": len(items)}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
