"""Rihara Architects & Interiors — Backend API tests."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://interior-journey-4.preview.emergentagent.com").rstrip("/")


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ===== Health =====
class TestHealth:
    def test_health(self, api):
        r = api.get(f"{BASE_URL}/api/health", timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("status") == "ok"
        assert "time" in data

    def test_root(self, api):
        r = api.get(f"{BASE_URL}/api/", timeout=20)
        assert r.status_code == 200
        assert r.json().get("status") == "ok"


# ===== Contact CRUD =====
class TestContact:
    def test_create_contact_and_list(self, api):
        marker = f"TEST_{uuid.uuid4().hex[:8]}"
        payload = {
            "name": f"TEST User {marker}",
            "email": f"test+{marker}@example.com",
            "phone": "+91-9999999999",
            "projectType": "Residential",
            "message": f"Automated test message {marker}. Please ignore.",
        }
        r = api.post(f"{BASE_URL}/api/contact", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("ok") is True
        assert "id" in data
        assert "email_delivered" in data
        new_id = data["id"]

        # GET list and confirm persistence
        r2 = api.get(f"{BASE_URL}/api/contact?limit=200", timeout=20)
        assert r2.status_code == 200
        body = r2.json()
        assert "items" in body
        found = [it for it in body["items"] if it.get("id") == new_id]
        assert found, f"Newly created contact {new_id} not found in list"
        rec = found[0]
        assert rec["name"] == payload["name"]
        assert rec["email"] == payload["email"]
        assert rec["projectType"] == payload["projectType"]
        assert rec["message"] == payload["message"]
        # No mongo _id leaking
        assert "_id" not in rec

    def test_create_contact_invalid_email(self, api):
        payload = {
            "name": "TEST Invalid",
            "email": "not-an-email",
            "message": "Test invalid email validation",
        }
        r = api.post(f"{BASE_URL}/api/contact", json=payload, timeout=20)
        assert r.status_code in (400, 422), r.text

    def test_create_contact_missing_fields(self, api):
        r = api.post(f"{BASE_URL}/api/contact", json={"name": "x"}, timeout=20)
        assert r.status_code in (400, 422)
