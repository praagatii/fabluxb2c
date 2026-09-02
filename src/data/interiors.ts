/** Interior Design module — enquiry only. No prices, packages or indicative
 * ranges appear anywhere in this data set, by client instruction. */

export type InteriorImageKey =
  | "hero"
  | "modern-minimal"
  | "contemporary-luxe"
  | "classic-indian"
  | "scandinavian"
  | "industrial"
  | "coastal"
  | "before";

export type RoomType = {
  id: string;
  label: string;
};

export const roomTypes: RoomType[] = [
  { id: "living-room", label: "Living room" },
  { id: "bedroom", label: "Bedroom" },
  { id: "kitchen", label: "Kitchen" },
  { id: "dining", label: "Dining" },
  { id: "kids", label: "Kids" },
  { id: "full-home", label: "Full home" },
];

export const roomTypeLabel = (id: string) =>
  roomTypes.find((room) => room.id === id)?.label ?? id;

export type RoomStyle = {
  id: string;
  name: string;
  tagline: string;
  intro: string;
  description: string[];
  image: InteriorImageKey;
  gallery: InteriorImageKey[];
  materials: { name: string; note: string }[];
  suits: string[];
};

export const roomStyles: RoomStyle[] = [
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    tagline: "Quiet rooms, generous light, nothing spare",
    intro: "Pale oak, chalk plaster and a strict edit of furniture.",
    description: [
      "Modern Minimal is built on restraint. Storage disappears into full-height joinery, skirting is kept flush, and colour arrives through material rather than paint.",
      "It suits homes where daylight is the strongest feature and where the family prefers fewer, better pieces to a filled room.",
    ],
    image: "modern-minimal",
    gallery: ["modern-minimal", "scandinavian", "coastal"],
    materials: [
      { name: "Pale oak veneer", note: "Matt lacquer, straight grain" },
      { name: "Chalk lime plaster", note: "Hand-troweled walls" },
      { name: "Honed quartz", note: "Counters and sills" },
      { name: "Brushed nickel", note: "Ironmongery and profiles" },
      { name: "Wool bouclé", note: "Upholstery in oat and ash" },
    ],
    suits: ["living-room", "bedroom", "full-home"],
  },
  {
    id: "contemporary-luxe",
    name: "Contemporary Luxe",
    tagline: "Deep colour, brass and a considered sense of drama",
    intro: "Navy panelling, fluted brass and marble with real movement.",
    description: [
      "Contemporary Luxe leans into depth — dark panelled walls, layered lighting and reflective metal that lifts the room after dark.",
      "It is the style clients choose for principal bedrooms and formal living rooms where the evening matters more than the morning.",
    ],
    image: "contemporary-luxe",
    gallery: ["contemporary-luxe", "classic-indian", "modern-minimal"],
    materials: [
      { name: "Navy lacquered panelling", note: "Ten-coat sprayed finish" },
      { name: "Antique brass", note: "Fluting, inlay and sconces" },
      { name: "Statuario marble", note: "Vanity and console tops" },
      { name: "Silk velvet", note: "Headboards and bench seating" },
      { name: "Smoked glass", note: "Wardrobe shutters" },
    ],
    suits: ["bedroom", "living-room", "dining"],
  },
  {
    id: "classic-indian",
    name: "Classic Indian",
    tagline: "Carved teak, jaali light and textiles with a history",
    intro: "Rosewood, brass urlis and block-printed cotton.",
    description: [
      "Classic Indian treats craft as the centrepiece — carved teak seating, jaali screens that filter light, and rugs chosen for the room rather than for the catalogue.",
      "We work with karigars in Jodhpur and Channapatna for bespoke pieces, so most rooms in this style include something made to order.",
    ],
    image: "classic-indian",
    gallery: ["classic-indian", "contemporary-luxe", "industrial"],
    materials: [
      { name: "Seasoned teak", note: "Hand-carved frames and jaali" },
      { name: "Beaten brass", note: "Urlis, lamps and hardware" },
      { name: "Kota stone", note: "Flooring and thresholds" },
      { name: "Block-printed cotton", note: "Cushions and drapery" },
      { name: "Handknotted wool", note: "Room-sized rugs" },
    ],
    suits: ["living-room", "dining", "full-home"],
  },
  {
    id: "scandinavian",
    name: "Scandinavian",
    tagline: "Soft, bright and built for everyday use",
    intro: "Birch, white boarding and grey wool.",
    description: [
      "Scandinavian rooms stay light through the year — white boarded walls, birch furniture on slim legs and textiles you can wash.",
      "It is a forgiving style for young families and works especially well in apartments with a single aspect.",
    ],
    image: "scandinavian",
    gallery: ["scandinavian", "modern-minimal", "coastal"],
    materials: [
      { name: "Birch ply", note: "Exposed edge detailing" },
      { name: "White boarding", note: "Tongue and groove panelling" },
      { name: "Grey wool", note: "Rugs and loose covers" },
      { name: "Matt white laminate", note: "Kitchen and wardrobe shutters" },
      { name: "Linen sheers", note: "Full-height, ceiling tracked" },
    ],
    suits: ["living-room", "kids", "bedroom", "full-home"],
  },
  {
    id: "industrial",
    name: "Industrial",
    tagline: "Exposed structure, honest materials, working light",
    intro: "Brick, blackened steel and polished concrete.",
    description: [
      "Industrial keeps services visible and lets the shell of the building do the decorating — brick left raw, ducting painted out, steel used where timber would usually be.",
      "It reads best in double-height apartments and converted floors, and pairs well with an open kitchen.",
    ],
    image: "industrial",
    gallery: ["industrial", "modern-minimal", "contemporary-luxe"],
    materials: [
      { name: "Reclaimed brick", note: "Sealed, not painted" },
      { name: "Blackened mild steel", note: "Shelving and screens" },
      { name: "Polished concrete", note: "Floors with a wax finish" },
      { name: "Walnut butcher block", note: "Island tops" },
      { name: "Caged filament lighting", note: "Suspended over work zones" },
    ],
    suits: ["kitchen", "living-room", "dining"],
  },
  {
    id: "coastal",
    name: "Coastal",
    tagline: "Whitewash, cane and a permanent sea breeze",
    intro: "Lime-washed walls, rattan and washed blues.",
    description: [
      "Coastal is a warm-weather style built for cross ventilation — cane and rattan, lime-washed surfaces and a blue that has been faded on purpose.",
      "We use it often for homes in Goa, Kochi and Chennai, and for dining rooms that open onto a balcony.",
    ],
    image: "coastal",
    gallery: ["coastal", "scandinavian", "classic-indian"],
    materials: [
      { name: "Lime wash", note: "Breathable wall finish" },
      { name: "Natural cane", note: "Chair backs and shutters" },
      { name: "Bleached teak", note: "Dining tables and beams" },
      { name: "Washed indigo linen", note: "Runners and cushions" },
      { name: "Unglazed terracotta", note: "Planters and lamp bases" },
    ],
    suits: ["dining", "living-room", "bedroom", "full-home"],
  },
];

export const styleById = (id: string) => roomStyles.find((style) => style.id === id);

export type Project = {
  id: string;
  title: string;
  styleId: string;
  roomTypeId: string;
  city: string;
  area: string;
  year: number;
  image: InteriorImageKey;
  gallery: InteriorImageKey[];
  brief: string;
  work: string[];
};

export const projects: Project[] = [
  {
    id: "indiranagar-living",
    title: "A living room that finally faces the garden",
    styleId: "modern-minimal",
    roomTypeId: "living-room",
    city: "Bengaluru",
    area: "420 sq ft",
    year: 2025,
    image: "modern-minimal",
    gallery: ["modern-minimal", "scandinavian", "coastal"],
    brief:
      "A 1990s apartment where the living room had been arranged around a television wall, with the garden window behind the sofa.",
    work: [
      "Turned the seating to face the garden and moved the media wall into low joinery.",
      "Replaced the false ceiling with a flat plane and recessed linear lighting.",
      "Specified oat bouclé upholstery and a single oak coffee table in place of four side tables.",
    ],
  },
  {
    id: "alipore-principal-bedroom",
    title: "A principal bedroom for the evening",
    styleId: "contemporary-luxe",
    roomTypeId: "bedroom",
    city: "Kolkata",
    area: "310 sq ft",
    year: 2025,
    image: "contemporary-luxe",
    gallery: ["contemporary-luxe", "classic-indian", "modern-minimal"],
    brief:
      "Owners who travel for work and wanted the bedroom to feel like the best room in the house rather than the last one done.",
    work: [
      "Panelled three walls in navy lacquer with fluted brass reveals.",
      "Layered lighting on four circuits so the room can be read, dressed or dimmed.",
      "Built a marble-topped dressing console into the window return.",
    ],
  },
  {
    id: "juhu-full-home",
    title: "A full home for three generations",
    styleId: "classic-indian",
    roomTypeId: "full-home",
    city: "Mumbai",
    area: "2,150 sq ft",
    year: 2024,
    image: "classic-indian",
    gallery: ["classic-indian", "contemporary-luxe", "coastal"],
    brief:
      "A family moving back into an inherited flat, wanting to keep the carved furniture they had grown up with.",
    work: [
      "Restored and re-polished eleven pieces of family teak.",
      "Introduced jaali screens to separate the pooja area from the living room.",
      "Re-laid Kota stone flooring throughout with brass dividing strips.",
    ],
  },
  {
    id: "kalyani-nagar-kids",
    title: "A shared room two sisters can grow into",
    styleId: "scandinavian",
    roomTypeId: "kids",
    city: "Pune",
    area: "180 sq ft",
    year: 2025,
    image: "scandinavian",
    gallery: ["scandinavian", "modern-minimal", "coastal"],
    brief:
      "Two children, eight years apart, sharing a north-facing room with one window and a great deal of storage to hide.",
    work: [
      "Built bunk-and-desk joinery in birch ply with an open ladder.",
      "Kept every surface washable and every handle recessed.",
      "Added a ceiling-tracked linen curtain to divide the room at night.",
    ],
  },
  {
    id: "lower-parel-loft-kitchen",
    title: "An open kitchen in a converted mill floor",
    styleId: "industrial",
    roomTypeId: "kitchen",
    city: "Mumbai",
    area: "260 sq ft",
    year: 2024,
    image: "industrial",
    gallery: ["industrial", "modern-minimal", "contemporary-luxe"],
    brief:
      "A mill conversion with beautiful brick and a kitchen that had been boxed in with plasterboard.",
    work: [
      "Removed the partitions and cleaned back the original brick.",
      "Ran a nine-foot island in walnut and concrete along the structural grid.",
      "Kept ducting exposed and painted it out in graphite.",
    ],
  },
  {
    id: "panjim-dining",
    title: "A dining room that opens to the balcony",
    styleId: "coastal",
    roomTypeId: "dining",
    city: "Panaji",
    area: "220 sq ft",
    year: 2025,
    image: "coastal",
    gallery: ["coastal", "scandinavian", "classic-indian"],
    brief:
      "A holiday home used eight weeks a year, where everything had to survive humidity and long periods shut up.",
    work: [
      "Specified bleached teak and cane over any board material.",
      "Lime-washed the walls so they breathe through the monsoon.",
      "Replaced the balcony door with a full-width folding screen.",
    ],
  },
  {
    id: "jubilee-hills-living",
    title: "A formal living room for a working household",
    styleId: "contemporary-luxe",
    roomTypeId: "living-room",
    city: "Hyderabad",
    area: "480 sq ft",
    year: 2024,
    image: "contemporary-luxe",
    gallery: ["contemporary-luxe", "industrial", "classic-indian"],
    brief:
      "Clients who entertain twice a month and needed a room that looked composed without becoming a room nobody uses.",
    work: [
      "Used a deep teal panelled backdrop with brass picture lights.",
      "Chose two facing sofas over a corner arrangement to seat ten.",
      "Concealed the bar behind pocket doors in the same panelling.",
    ],
  },
  {
    id: "besant-nagar-bedroom",
    title: "A bedroom that stays cool without the air conditioning on",
    styleId: "coastal",
    roomTypeId: "bedroom",
    city: "Chennai",
    area: "240 sq ft",
    year: 2023,
    image: "coastal",
    gallery: ["coastal", "modern-minimal", "scandinavian"],
    brief:
      "A sea-facing bedroom where salt air had already taken two sets of wardrobes.",
    work: [
      "Moved to marine-grade ply with cane shutter inserts.",
      "Reduced the bed to a low bleached teak platform.",
      "Introduced washed indigo linen and a ceiling fan sized to the room.",
    ],
  },
  {
    id: "salt-lake-full-home",
    title: "A first home, finished in one phase",
    styleId: "scandinavian",
    roomTypeId: "full-home",
    city: "Kolkata",
    area: "1,180 sq ft",
    year: 2025,
    image: "scandinavian",
    gallery: ["scandinavian", "coastal", "modern-minimal"],
    brief:
      "A couple taking possession of a bare shell, wanting the whole flat done before they moved in.",
    work: [
      "Set a single palette of birch, white and grey across all four rooms.",
      "Standardised joinery details so the site could work quickly.",
      "Handed over in eleven weeks including the kitchen.",
    ],
  },
  {
    id: "koramangala-kitchen",
    title: "A kitchen for two people who both cook",
    styleId: "modern-minimal",
    roomTypeId: "kitchen",
    city: "Bengaluru",
    area: "150 sq ft",
    year: 2024,
    image: "modern-minimal",
    gallery: ["modern-minimal", "industrial", "scandinavian"],
    brief:
      "A galley kitchen with one working triangle and two cooks constantly in each other's way.",
    work: [
      "Split prep and wash to opposite runs to create two workstations.",
      "Used handleless oak fronts with a honed quartz counter.",
      "Added a tall pantry in place of the old utility shelf.",
    ],
  },
  {
    id: "vasant-vihar-dining",
    title: "A dining room built around one table",
    styleId: "classic-indian",
    roomTypeId: "dining",
    city: "New Delhi",
    area: "280 sq ft",
    year: 2023,
    image: "classic-indian",
    gallery: ["classic-indian", "contemporary-luxe", "industrial"],
    brief:
      "A family with a ten-seat rosewood table that no previous layout had managed to accommodate.",
    work: [
      "Removed a partition to give the table its own room.",
      "Hung a beaten brass fixture centred on the table, not the ceiling.",
      "Lined one wall in block-printed cotton panels for acoustics.",
    ],
  },
  {
    id: "aundh-living",
    title: "A living room in a converted industrial block",
    styleId: "industrial",
    roomTypeId: "living-room",
    city: "Pune",
    area: "390 sq ft",
    year: 2023,
    image: "industrial",
    gallery: ["industrial", "contemporary-luxe", "modern-minimal"],
    brief:
      "A tenant fit-out with a short window and a landlord who would not allow wall chasing.",
    work: [
      "Ran all new services in surface-mounted blackened conduit.",
      "Used freestanding steel shelving instead of fixed joinery.",
      "Polished and waxed the existing concrete slab rather than covering it.",
    ],
  },
];

export const projectById = (id: string) => projects.find((project) => project.id === id);

export const projectsForStyle = (styleId: string) =>
  projects.filter((project) => project.styleId === styleId);

export const howItWorks = [
  {
    id: "explore",
    step: "01",
    title: "Explore styles",
    copy: "Browse room styles and completed projects, and shortlist the directions that feel like your home.",
  },
  {
    id: "consult",
    step: "02",
    title: "Book a consultation",
    copy: "Meet a senior designer at the studio or at site. Share your floor plan, your routine and your constraints.",
  },
  {
    id: "design",
    step: "03",
    title: "Design and quote",
    copy: "We return with a layout, a material palette and a phased scope of work, discussed with you in person.",
  },
  {
    id: "execute",
    step: "04",
    title: "Execution",
    copy: "Fabluxora Interiors runs the site, coordinates the trades and hands over a finished, snag-checked room.",
  },
];

export const testimonials = [
  {
    id: "t1",
    quote:
      "They spent the first meeting asking how we actually live before showing us a single image. The living room now works for both a quiet Tuesday and twelve people on a Saturday.",
    name: "Radhika Menon",
    place: "Indiranagar, Bengaluru",
  },
  {
    id: "t2",
    quote:
      "Our grandmother's teak was the whole brief. Fabluxora restored it and designed the flat around it, instead of politely suggesting we replace it.",
    name: "Aditya Sen",
    place: "Juhu, Mumbai",
  },
  {
    id: "t3",
    quote:
      "Eleven weeks from bare shell to handover, with a site update every Friday. The schedule was the thing that impressed us most.",
    name: "Neha & Prateek Roy",
    place: "Salt Lake, Kolkata",
  },
];
