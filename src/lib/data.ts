import brakepads from "@/assets/p-brakepads.jpg";
import battery from "@/assets/p-battery.jpg";
import oil from "@/assets/p-oil.jpg";
import scanner from "@/assets/p-scanner.jpg";
import brakes from "@/assets/brakes.jpg";
import engine from "@/assets/engine.jpg";
import workshop from "@/assets/workshop.jpg";
import heroCar from "@/assets/hero-car.jpg";
import heroWorkshop from "@/assets/hero-workshop.jpg";
import lift from "@/assets/p-lift.jpg";
import tyreChanger from "@/assets/p-tyre-changer.jpg";
import wheelBalancer from "@/assets/p-wheel-balancer.jpg";
import compressor from "@/assets/p-compressor.jpg";

export const images = {
  brakes,
  engine,
  workshop,
  heroCar,
  heroWorkshop,
  lift,
  tyreChanger,
  wheelBalancer,
  compressor,
};

// NOTE: All products, prices, services and workshops below are mock data for the prototype.
export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: "In stock" | "Low stock" | "Out of stock";
  image: string;
  fits: string[];
  sku: string;
  description: string;
  specs: [string, string][];
  isEquipment?: boolean;
};

export const categories = [
  "Equipment",
  "Diagnostics",
  "Brakes",
  "Batteries",
  "Lubricants",
  "Filters",
  "EV",
  "Accessories",
];

export const shopVisualCategories = [
  { name: "Lifting Equipment", desc: "2-Post & Scissor Lifts", link: "/shop?cat=Equipment", img: lift, badge: "Commercial" },
  { name: "Diagnostic Equipment", desc: "Scanners & ADAS Tools", link: "/shop?cat=Diagnostics", img: scanner, badge: "Pro Grade" },
  { name: "Tyre & Wheel Equipment", desc: "Changers & Balancers", link: "/shop?cat=Equipment", img: tyreChanger, badge: "Workshop" },
  { name: "Brake Service", desc: "Pads, Discs & Calipers", link: "/shop?cat=Brakes", img: brakepads, badge: "OEM / Aftermarket" },
  { name: "Electrical & Battery", desc: "AGM & Start-Stop Units", link: "/shop?cat=Batteries", img: battery, badge: "Heavy Duty" },
  { name: "Lubrication Equipment", desc: "Synthetic Fluids & Pumps", link: "/shop?cat=Lubricants", img: oil, badge: "Certified" },
  { name: "Air Compressors", desc: "Screw & Piston Compressors", link: "/shop?cat=Equipment", img: compressor, badge: "Industrial" },
  { name: "Workshop Equipment", desc: "Presses, Cranes & Cabinets", link: "/shop?cat=Equipment", img: workshop, badge: "Turnkey" },
];

export const garageEquipmentCategories = [
  { id: "lifts", name: "Vehicle Lifts", desc: "2-post, 4-post and low-profile scissor lifts up to 5.5T", count: "12 Models", img: lift, link: "/shop?cat=Equipment" },
  { id: "tyre", name: "Tyre Equipment", desc: "Automatic tyre changers with pneumatic assist arms", count: "8 Models", img: tyreChanger, link: "/shop?cat=Equipment" },
  { id: "balancing", name: "Wheel Balancers", desc: "Microprocessor balancers with laser line positioning", count: "6 Models", img: wheelBalancer, link: "/shop?cat=Equipment" },
  { id: "diagnostics", name: "Diagnostic Platforms", desc: "OE-level vehicle diagnostic tablets and code readers", count: "14 Models", img: scanner, link: "/shop?cat=Diagnostics" },
  { id: "compressors", name: "Air Compressors", desc: "Rotary screw and silent piston workshop compressors", count: "9 Models", img: compressor, link: "/shop?cat=Equipment" },
  { id: "tools", name: "Workshop Tooling", desc: "Hydraulic shop presses, oil drainers and heavy tool trolleys", count: "35 Items", img: workshop, link: "/shop?cat=Equipment" },
];

export const products: Product[] = [
  // Commercial Garage Equipment
  {
    slug: "heavy-duty-2-post-lift-4t",
    name: "Heavy-Duty 2-Post Electro-Hydraulic Lift 4.0T",
    brand: "Torq",
    category: "Equipment",
    price: 285000,
    oldPrice: 310000,
    rating: 4.9,
    reviews: 34,
    stock: "In stock",
    image: lift,
    fits: ["Universal Workshop Bay", "Passenger & Light Commercial"],
    sku: "TQ-LIFT-4000",
    description: "Clear-floor electro-hydraulic 2-post lift with 4,000 kg capacity. Features automatic arm restraint locks, dual hydraulic synchronization cylinders, and CE-certified electromagnetic release safety latches for heavy commercial workshop use.",
    specs: [
      ["Lifting Capacity", "4,000 kg (4.0 Ton)"],
      ["Max Lifting Height", "1,900 mm"],
      ["Min Lifting Height", "100 mm"],
      ["Overall Height", "3,840 mm"],
      ["Motor Power", "2.2 kW / 3.0 HP"],
      ["Power Supply", "380V 3-Phase / 50Hz"],
      ["Lifting Time", "50 seconds"],
      ["Warranty", "24 months commercial warranty"],
    ],
    isEquipment: true,
  },
  {
    slug: "pro-tyre-changer-assist-arm",
    name: "Pro Automatic Tyre Changer with Dual Assist Arm",
    brand: "Torq",
    category: "Equipment",
    price: 175000,
    oldPrice: 195000,
    rating: 4.8,
    reviews: 29,
    stock: "In stock",
    image: tyreChanger,
    fits: ["Workshop Tyre Bay", "10\"–24\" Rims"],
    sku: "TQ-TC-9000",
    description: "Heavy-duty commercial tyre changer equipped with pneumatic tilt-back column and dual power assist arms for effortless demounting of stiff run-flat and ultra-low-profile tyres without rim scratch.",
    specs: [
      ["Clamping Range", "10\"–24\""],
      ["Max Wheel Diameter", "1,040 mm"],
      ["Max Wheel Width", "355 mm (14\")"],
      ["Working Pressure", "8–10 bar (115–145 psi)"],
      ["Motor Power", "1.1 kW"],
      ["Bead Breaker Force", "2,500 kg"],
      ["Warranty", "18 months commercial"],
    ],
    isEquipment: true,
  },
  {
    slug: "digital-wheel-balancer-laser",
    name: "Microprocessor Digital Wheel Balancer with Laser",
    brand: "Axion",
    category: "Equipment",
    price: 145000,
    rating: 4.9,
    reviews: 22,
    stock: "In stock",
    image: wheelBalancer,
    fits: ["Passenger & Light Commercial Wheels"],
    sku: "AX-WB-900",
    description: "High-precision digital wheel balancing system featuring automatic 3D distance and rim diameter sensor input, multi-mode alloy balancing cycles, and laser beam pointer for adhesive weight positioning.",
    specs: [
      ["Rim Diameter", "10\"–24\""],
      ["Balancing Accuracy", "±1 g"],
      ["Cycle Time", "7 seconds"],
      ["Max Wheel Weight", "65 kg"],
      ["Shaft Diameter", "40 mm high-grade steel"],
      ["Warranty", "24 months warranty"],
    ],
    isEquipment: true,
  },
  {
    slug: "rotary-screw-air-compressor-10hp",
    name: "Rotary Screw Air Compressor 10HP / 300L Tank",
    brand: "Kraftwerk",
    category: "Equipment",
    price: 240000,
    rating: 4.7,
    reviews: 18,
    stock: "In stock",
    image: compressor,
    fits: ["Full Workshop Air Line Supply"],
    sku: "KW-SC-10HP",
    description: "Continuous-duty rotary screw compressor unit mounted on a 300L air receiver vessel with integrated refrigerated dryer and inline filtration. Engineered for 100% duty cycle commercial workshop pneumatic demands.",
    specs: [
      ["Motor Power", "7.5 kW / 10 HP"],
      ["Working Pressure", "10 bar (145 psi)"],
      ["Air Delivery", "1,050 L/min (37 CFM)"],
      ["Tank Volume", "300 Litres"],
      ["Noise Level", "65 dB(A) whisper quiet"],
      ["Warranty", "36 months on air end"],
    ],
    isEquipment: true,
  },
  // Automotive Parts & Diagnostics
  { slug: "ceramic-brake-pad-set-front", name: "Ceramic Brake Pad Set — Front", brand: "Stopline", category: "Brakes", price: 4850, oldPrice: 5600, rating: 4.8, reviews: 214, stock: "In stock", image: brakepads, fits: ["Toyota Corolla 2014–2022", "Toyota Axio 2015–2023"], sku: "SL-BP-2210", description: "Low-dust ceramic compound for quiet, consistent stopping in city and highway driving. Includes wear sensors and shims.", specs: [["Position", "Front axle"], ["Compound", "Ceramic"], ["Wear sensor", "Included"], ["Warranty", "12 months"]] },
  { slug: "agm-battery-70ah", name: "AGM Start-Stop Battery 70Ah", brand: "Voltis", category: "Batteries", price: 18900, rating: 4.7, reviews: 96, stock: "Low stock", image: battery, fits: ["Honda Vezel 2016–2022", "Toyota Premio 2015–2021"], sku: "VT-AGM-70", description: "Absorbent glass mat battery engineered for start-stop systems and high electrical loads.", specs: [["Capacity", "70Ah"], ["CCA", "760A"], ["Type", "AGM"], ["Warranty", "24 months"]] },
  { slug: "synthetic-engine-oil-5w30-4l", name: "Full Synthetic Engine Oil 5W-30, 4L", brand: "Lubrix", category: "Lubricants", price: 5200, rating: 4.9, reviews: 388, stock: "In stock", image: oil, fits: ["Most petrol engines 2010+"], sku: "LX-5W30-4", description: "Advanced full synthetic formula for wear protection, cleanliness and fuel efficiency.", specs: [["Viscosity", "5W-30"], ["Volume", "4 L"], ["Spec", "API SP / ILSAC GF-6"], ["Base", "Full synthetic"]] },
  { slug: "pro-obd2-diagnostic-scanner", name: "Pro OBD2 Diagnostic Scanner Touchscreen", brand: "Diagtek", category: "Diagnostics", price: 32500, oldPrice: 36000, rating: 4.6, reviews: 71, stock: "In stock", image: scanner, fits: ["Universal OBD2 (1996+)"], sku: "DT-PRO-5", description: "Read and clear codes, live data, service resets and battery registration on a 5\" touchscreen.", specs: [["Screen", "5\" touch"], ["Protocols", "All OBD2"], ["Updates", "Free, 2 years"], ["Warranty", "12 months"]] },
  { slug: "ceramic-brake-pad-set-rear", name: "Ceramic Brake Pad Set — Rear", brand: "Stopline", category: "Brakes", price: 4200, rating: 4.7, reviews: 132, stock: "In stock", image: brakepads, fits: ["Honda Civic 2016–2021"], sku: "SL-BP-2280", description: "Rear-axle ceramic pads with chamfered edges for reduced noise.", specs: [["Position", "Rear axle"], ["Compound", "Ceramic"], ["Warranty", "12 months"]] },
  { slug: "efb-battery-60ah", name: "EFB Battery 60Ah", brand: "Voltis", category: "Batteries", price: 13400, rating: 4.5, reviews: 58, stock: "In stock", image: battery, fits: ["Toyota Corolla 2014–2022"], sku: "VT-EFB-60", description: "Enhanced flooded battery for entry-level start-stop vehicles.", specs: [["Capacity", "60Ah"], ["CCA", "560A"], ["Type", "EFB"]] },
  { slug: "synthetic-engine-oil-0w20-4l", name: "Hybrid Engine Oil 0W-20, 4L", brand: "Lubrix", category: "Lubricants", price: 5600, rating: 4.8, reviews: 144, stock: "Out of stock", image: oil, fits: ["Toyota Aqua, Prius, hybrids"], sku: "LX-0W20-4", description: "Low-viscosity oil tuned for hybrid engines with frequent start-stop cycles.", specs: [["Viscosity", "0W-20"], ["Volume", "4 L"]] },
  { slug: "bluetooth-obd-dongle", name: "Bluetooth OBD Dongle", brand: "Diagtek", category: "Diagnostics", price: 3900, rating: 4.3, reviews: 203, stock: "In stock", image: scanner, fits: ["Universal OBD2 (1996+)"], sku: "DT-BT-1", description: "Pocket-size adapter that streams live vehicle data to your phone.", specs: [["Connection", "Bluetooth 5.0"], ["App", "iOS / Android"]] },
];

export type Service = { slug: string; name: string; desc: string; from?: number; duration: string };
export const services: Service[] = [
  { slug: "general-service", name: "General Service", desc: "Oil, filters, fluid top-ups and a 40-point inspection.", from: 3500, duration: "2 hrs" },
  { slug: "diagnostics", name: "Diagnostics", desc: "Full electronic scan with a technician's written report.", from: 1500, duration: "45 min" },
  { slug: "ac-service", name: "AC Service", desc: "Gas recharge, leak test and cabin filter replacement.", from: 2800, duration: "1.5 hrs" },
  { slug: "brake-service", name: "Brake Service", desc: "Pad and disc inspection, replacement and bleeding.", from: 2000, duration: "1.5 hrs" },
  { slug: "wheel-alignment", name: "Wheel Alignment", desc: "Computerised 4-wheel alignment and balancing.", from: 1800, duration: "1 hr" },
  { slug: "battery-service", name: "Battery Service", desc: "Health test, terminal cleaning and replacement.", from: 500, duration: "30 min" },
  { slug: "ev-service", name: "EV Service", desc: "High-voltage system check, battery health and software.", duration: "2 hrs" },
  { slug: "adas-calibration", name: "ADAS Calibration", desc: "Camera and radar calibration after repairs or windscreen work.", duration: "2 hrs" },
];

export type Center = { id: string; name: string; area: string; address: string; rating: number; hours: string; services: string[]; x: number; y: number };
export const centers: Center[] = [
  { id: "tejgaon", name: "PAGE Service Hub — Tejgaon", area: "Dhaka", address: "Tejgaon I/A, Dhaka", rating: 4.8, hours: "Sat–Thu 9:00–19:00", services: ["General Service", "Diagnostics", "ADAS Calibration", "EV Service"], x: 48, y: 42 },
  { id: "gulshan", name: "PAGE Express — Gulshan", area: "Dhaka", address: "Gulshan Avenue, Dhaka", rating: 4.7, hours: "Sat–Thu 10:00–20:00", services: ["General Service", "Battery Service", "AC Service"], x: 58, y: 30 },
  { id: "uttara", name: "Partner Workshop — Uttara", area: "Dhaka", address: "Sector 7, Uttara", rating: 4.5, hours: "Daily 9:00–18:00", services: ["Brake Service", "Wheel Alignment", "General Service"], x: 52, y: 14 },
  { id: "chattogram", name: "PAGE Service Hub — Chattogram", area: "Chattogram", address: "Agrabad C/A, Chattogram", rating: 4.6, hours: "Sat–Thu 9:00–19:00", services: ["Diagnostics", "AC Service", "Brake Service"], x: 76, y: 74 },
];

export const solutions = [
  { slug: "personal", name: "Personal Vehicle", desc: "Parts, service and care plans for everyday drivers." },
  { slug: "workshop", name: "Professional Workshop", desc: "Diagnostic tools, lifts and equipment for independent garages." },
  { slug: "ev", name: "EV Workshop", desc: "High-voltage tooling, safety gear and EV training." },
  { slug: "fleet", name: "Fleet", desc: "Scheduled maintenance and parts supply for business fleets." },
  { slug: "garage-setup", name: "Garage Setup", desc: "Turnkey workshop planning, equipment and installation." },
];

export const guides = [
  { slug: "how-often-service", title: "How Often Should You Service Your Car?", cat: "Maintenance", mins: 5, img: engine },
  { slug: "brake-pads-replace", title: "When Should Brake Pads Be Replaced?", cat: "Brakes", mins: 4, img: brakes },
  { slug: "alignment-vs-balancing", title: "Wheel Alignment vs Wheel Balancing", cat: "Tyres", mins: 6, img: workshop },
];

export const testimonials = [
  { name: "Sample Customer A", city: "Dhaka", rating: 5, quote: "Booked a service online, got a clear quote and my car back the same day.", ctx: "General Service · Toyota Axio" },
  { name: "Sample Workshop B", city: "Chattogram", rating: 5, quote: "Diagnostic equipment arrived with setup and training. Our bay throughput improved immediately.", ctx: "Workshop Solutions" },
  { name: "Sample Fleet C", city: "Gazipur", rating: 4, quote: "One partner for parts and scheduled maintenance across our vehicles.", ctx: "Fleet" },
];

export const brands = ["Stopline", "Voltis", "Lubrix", "Diagtek", "Axion", "Kraftwerk", "Nordline", "Meridian", "Hexa", "Torq"];

export const vehicleData: Record<string, Record<string, string[]>> = {
  Toyota: { Corolla: ["1.5 Petrol", "1.8 Hybrid"], Axio: ["1.5 Petrol"], Premio: ["1.5 Petrol", "1.8 Petrol"], Aqua: ["1.5 Hybrid"] },
  Honda: { Civic: ["1.5 Turbo", "1.8 Petrol"], Vezel: ["1.5 Hybrid", "1.5 Petrol"], Grace: ["1.5 Hybrid"] },
  Nissan: { "X-Trail": ["2.0 Petrol", "2.0 Hybrid"], Sunny: ["1.5 Petrol"] },
  Mitsubishi: { Outlander: ["2.4 PHEV", "2.0 Petrol"], Pajero: ["3.2 Diesel"] },
};
export const years = Array.from({ length: 15 }, (_, i) => String(2024 - i));

export const taka = (n: number) => "৳" + n.toLocaleString("en-IN");
