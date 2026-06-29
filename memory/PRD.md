# Rihara Architects & Interiors — PRD

## Original Problem Statement
Build a luxury 3D animated single-page website for "Rihara Interior" (actual brand: rihara ARCHITECTS & INTERIORS) — a premium home interior design studio. The website should feel like walking through a beautifully designed home: 3D wooden double-door intro, scroll-driven cinematic flythrough of 6 rooms (Foyer, Living, Dining, Kitchen, Bedroom, Bathroom), services grid, gallery, contact form. Inner pages: Our Work, Services, Process.

## User Choices (Dec 2025)
- Approach: Hybrid GSAP cinematic + 3D-CSS door intro (no heavy GLB models)
- Images: Provided expenses.zip (14 images) — actual brand interiors used throughout
- Email: Submissions saved to MongoDB; SMTP optional (env-driven), recipient `RiharaInteriors@gmail.com`
- Pages: Single-page hero/journey + inner pages (Our Work, Services, Process)
- **Theme update (iteration 2): Light editorial palette** (linen/ivory background, espresso text, gold accents). Door intro stays dark for the dramatic reveal-into-bright-home narrative.

## Architecture
- Frontend: React 19 + React Router + Tailwind + GSAP/ScrollTrigger + Lenis + Sonner toasts
- Backend: FastAPI + Motor (MongoDB) with `contact_messages` collection
- Smooth scroll: Lenis driving GSAP ticker
- All assets in `/app/frontend/public/interiors/img1..img14.jpeg` (renamed from original WhatsApp filenames)

## Verified Image Inventory
- img4 = Brand circular logo (used as favicon)
- img11 = Foyer (arched wooden doorway)
- img5/img1/img3 = Living room (marble + TV)
- img9 = Dining/Living with windows
- img2 = Kitchen (modular, glass cabinet, dark blue chairs)
- img12 = Bedroom-retreat-feel sofa
- img6/img7/img8 = Bathroom (bronze basin, textured walls)
- img10 = Pooja room
- img13 = Cane-chair seating
- img14 = Entertainment unit

## What's Been Implemented (Dec 2025)
- 3D-CSS wooden double-door intro with GSAP open animation + warm light glow + tagline + Enter Home CTA
- Lenis smooth scroll
- Hero (editorial split layout, stats: 12+ years / 80 homes / 14 cities)
- Material marquee (Walnut · Brass · Linen · Stone · Oak · Bronze · Ivory)
- 6-room scrolling journey with parallax images + mood-card thumbnails + progress rail (only visible inside journey)
- Manifesto section (4:5 image + framed accent thumbnail)
- Services grid with 3D-tilt hover (Full Home, Space Planning, Material Curation)
- Horizontal-scroll pinned Gallery
- Contact form (Name, Email, Phone, Project Type, Message) → POST `/api/contact`
- Inner pages: `/our-work` (masonry), `/services` (editorial blocks), `/process` (alternating timeline)
- Footer with social links (Instagram, Pinterest, Houzz)
- Light editorial theme (linen/ivory/espresso/gold) — dark walnut footer for contrast
- All elements have `data-testid` attributes

## Backend API
- `GET  /api/health` → status
- `POST /api/contact` → saves to `contact_messages`; tries SMTP if env configured
- `GET  /api/contact` → admin list (latest 50)
- SMTP envs (optional): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_SENDER`, `CONTACT_RECIPIENT`

## Backlog / Next Tasks
- P1: SMTP credentials (Gmail App Password or Resend API key) so enquiries actually email RiharaInteriors@gmail.com
- P1: Admin login + dashboard to view/export enquiries
- P2: Optional WhatsApp/Calendly booking button next to contact form
- P2: Individual project detail pages on /our-work
- P2: SEO meta (OpenGraph image, structured data)
- P3: Drag-and-drop client image upload panel (admin only)
