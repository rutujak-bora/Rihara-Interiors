// Verified image inventory (manual visual verification):
// img1: Living room — TV unit + marble wall + chess board
// img2: Kitchen — U-shaped, light cabinets, pendant, dark blue chairs
// img3: Living room — TV unit + marble wall (similar to img1)
// img4: LOGO — Circular brand logo "ARCHITECTS & INTERIORS"
// img5: Living room — TV unit + marble wall + dark sofa + round coffee table
// img6: Bathroom — Dark tiled walls + bronze basin + illuminated mirror
// img7: Bathroom — Toilet + bronze basin + textured walls + wooden floor
// img8: Bathroom — Close-up bronze basin + textured walls
// img9: Living room — Light sofas + wooden table + ceiling fan + windows
// img10: Pooja room — Built-in cabinet with idols, illuminated arched back
// img11: Entryway/Foyer — Wooden + beige + console table + arched doorway
// img12: Living room — Beige sofa with cushions, ottoman, draped curtains
// img13: Seating area — Two cane chairs, small tables, pendant lights
// img14: Living/Entertainment — TV + illuminated shelving + light wood

export const ROOMS = [
  {
    id: "foyer",
    index: "01",
    name: "Foyer",
    title: "Foyer",
    overline: "First impression — quiet drama",
    philosophy: "An overture in wood and brass — where the home introduces itself.",
    description:
      "A wooden console, an arched threshold, the slow exhale of warm light. The entrance hall is the home’s first sentence — composed, deliberate, unforgettable.",
    image: "/interiors/img11.jpeg",
    accentImage: "/interiors/img14.jpeg",
  },
  {
    id: "living",
    index: "02",
    name: "Living Room",
    title: "Living",
    overline: "Crafted for comfort",
    philosophy: "Crafted for comfort, designed for living.",
    description:
      "Veined marble, fluted wood, a deep upholstered sofa — a room that holds conversation gently and lets it settle into the cushions.",
    image: "/interiors/img5.jpeg",
    accentImage: "/interiors/img3.jpeg",
  },
  {
    id: "dining",
    index: "03",
    name: "Dining Room",
    title: "Dining",
    overline: "A table that remembers",
    philosophy: "Where slow dinners become long stories.",
    description:
      "Pendant lights pool over a long, warm counter. The dining room is engineered for shared bread, lingering wine, and the architecture of family ritual.",
    image: "/interiors/img9.jpeg",
    accentImage: "/interiors/img13.jpeg",
  },
  {
    id: "kitchen",
    index: "04",
    name: "Kitchen",
    title: "Kitchen",
    overline: "Modular, but never machined",
    philosophy: "An island for ideas. A counter for everyday rituals.",
    description:
      "Soft maple cabinetry, glass-fronted display, and an open plan that lets the cook be part of the room, never tucked behind a wall.",
    image: "/interiors/img2.jpeg",
    accentImage: "/interiors/img10.jpeg",
  },
  {
    id: "bedroom",
    index: "05",
    name: "Master Retreat",
    title: "Retreat",
    overline: "Hushed, low, lit by candle",
    philosophy: "A retreat composed in muted light and tactile fabric.",
    description:
      "Drapery that breathes. Linen that listens. A reading nook by the window. The master suite is engineered for an entire kind of silence — the kind you sleep into.",
    image: "/interiors/img12.jpeg",
    accentImage: "/interiors/img13.jpeg",
  },
  {
    id: "bathroom",
    index: "06",
    name: "Bathroom",
    title: "Bathroom",
    overline: "Spa in stone and brass",
    philosophy: "A small room with the discipline of a temple.",
    description:
      "Textured walls, bronze fixtures, a single shaft of ambient light. The bathroom is engineered for ritual — morning, evening, and everything between.",
    image: "/interiors/img6.jpeg",
    accentImage: "/interiors/img8.jpeg",
  },
];

export const GALLERY = [
  { url: "/interiors/img5.jpeg", project: "The Mehta Residence", city: "Pune" },
  { url: "/interiors/img2.jpeg", project: "Open Sky Kitchen", city: "Chennai" },
  { url: "/interiors/img11.jpeg", project: "Threshold", city: "Mumbai" },
  { url: "/interiors/img6.jpeg", project: "Bronze Bath", city: "Kolkata" },
  { url: "/interiors/img9.jpeg", project: "Linden House", city: "Bengaluru" },
  { url: "/interiors/img10.jpeg", project: "Anandam Sanctuary", city: "Ahmedabad" },
  { url: "/interiors/img12.jpeg", project: "House of Light", city: "Goa" },
  { url: "/interiors/img3.jpeg", project: "Walnut & Brass", city: "Delhi" },
  { url: "/interiors/img13.jpeg", project: "Quiet Atelier", city: "Mumbai" },
  { url: "/interiors/img14.jpeg", project: "Saffron Villa", city: "Hyderabad" },
  { url: "/interiors/img8.jpeg", project: "Stone Chamber", city: "Jaipur" },
  { url: "/interiors/img7.jpeg", project: "Spa Suite", city: "Bengaluru" },
];

export const SERVICES = [
  {
    id: "full-home",
    icon: "Sofa",
    title: "Full Home Design",
    short: "End-to-end interior design — from blueprint to last cushion.",
    long: "We take a home from raw walls to a fully composed living space. Spatial planning, joinery, lighting, soft furnishings, art curation — handled as a single coherent gesture.",
  },
  {
    id: "space-planning",
    icon: "LayoutPanelLeft",
    title: "Space Planning",
    short: "Layouts engineered around how you actually live.",
    long: "Movement maps, light studies, storage choreography. We design the way the home behaves before we choose how it looks.",
  },
  {
    id: "curation",
    icon: "Palette",
    title: "Material & Finish Curation",
    short: "Edited palettes of wood, stone, brass, linen, light.",
    long: "We source materials with the same care a chef sources ingredients — by region, by hand, by feel. Tactile sample boards delivered to your door.",
  },
];

export const PROCESS_STEPS = [
  { n: "01", title: "Conversation", body: "We begin not with a moodboard but with a long conversation. How you wake. Where light should fall. What you keep, what you have outgrown." },
  { n: "02", title: "Concept", body: "A single editorial proposal — palette, plan, materials, mood. One idea, deeply considered, not a buffet of options." },
  { n: "03", title: "Design Development", body: "Drawings refined to millimetres. Renderings rendered in the actual light of your site. Material samples held in your hands." },
  { n: "04", title: "Site & Joinery", body: "Trusted karigars and contractors. Weekly site visits, photographic logs, a single point of accountability." },
  { n: "05", title: "Styling & Handover", body: "We bring the last cushion, light the first candle, set the table. You walk in, and it feels finished." },
];
