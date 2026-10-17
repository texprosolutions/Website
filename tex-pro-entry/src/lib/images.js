// Centralized photography for TexPro Solutions.
// Real stock photos via Unsplash (free license). Swap these for your own project photos at any time.
export const IMAGES = {
  heroLoadingDock: "https://images.unsplash.com/photo-1720811559371-7b0ebd219127?auto=format&fit=crop&w=2000&q=80",
  overheadMacro: "https://images.unsplash.com/photo-1612920874976-bd4075fc43b2?auto=format&fit=crop&w=1400&q=80",
  loadingDockService: "https://images.unsplash.com/photo-1708596718852-5aa3947ccdf5?auto=format&fit=crop&w=1400&q=80",
  residentialProject: "https://images.unsplash.com/photo-1696992812596-3c0d4d2d1299?auto=format&fit=crop&w=1400&q=80",
  warehouseInterior: "https://images.unsplash.com/photo-1771530789155-b1f03fbf82b5?auto=format&fit=crop&w=1400&q=80",
};

export const PROJECTS = [
  {
    id: "p-001",
    title: "Regional Distribution Center",
    type: "Loading Dock",
    location: "Dallas, TX",
    image: IMAGES.loadingDockService,
    specs: ["42 dock doors", "Hydraulic levelers", "12-week build"],
  },
  {
    id: "p-002",
    title: "Modern Residential Estate",
    type: "Overhead Door",
    location: "Austin, TX",
    image: IMAGES.residentialProject,
    specs: ["Black-frame glass door", "Insulated panels", "Smart opener"],
  },
  {
    id: "p-003",
    title: "Industrial Warehouse Retrofit",
    type: "Commercial Project",
    location: "Houston, TX",
    image: IMAGES.warehouseInterior,
    specs: ["R-12 insulation", "High-cycle hardware", "24/7 service plan"],
  },
  {
    id: "p-004",
    title: "Precision Hardware Detail",
    type: "Overhead Door",
    location: "San Antonio, TX",
    image: IMAGES.overheadMacro,
    specs: ["Galvanized track", "Sealed bearings", "10yr warranty"],
  },
];

export const SERVICES = [
  {
    slug: "overhead-door",
    tag: "Commercial",
    title: "Overhead Doors",
    image: IMAGES.overheadMacro,
    summary: "Sectional, rolling steel and full-view aluminum doors engineered for daily cycles and Texas weather — installed, replaced and emergency-repaired.",
    points: ["Insulated steel & full-view sections", "High-cycle spring packages", "Smart + remote access", "Emergency repair"],
  },
  {
    slug: "loading-dock",
    tag: "Industrial / Freight",
    title: "Loading Docks",
    image: IMAGES.loadingDockService,
    summary: "Levelers, seals, shelters and vehicle restraints that keep freight moving safely and on schedule through every shift.",
    points: ["Hydraulic & mechanical levelers", "Dock seals & shelters", "Vehicle restraints", "Control panel integration"],
  },
  {
    slug: "gates",
    tag: "Access Control",
    title: "Gates",
    image: IMAGES.warehouseInterior,
    summary: "Automatic gates, barrier arms and access control systems for driveways, facilities and secured lots — installed, serviced and upgraded.",
    points: ["Barrier arm & sliding gates", "Keypads & remotes", "Intercom / telephone entry", "Emergency release & repairs"],
  },
  {
    slug: "residential",
    tag: "Residential",
    title: "Residential Garage Doors",
    image: IMAGES.residentialProject,
    summary: "Garage doors and home entry systems tuned for curb appeal, quiet operation and security.",
    points: ["Insulated carriage-house styles", "Smart openers & keyless entry", "Broken spring replacement"],
  },
];