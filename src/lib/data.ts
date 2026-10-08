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
import evTools from "@/assets/p-ev-tools.jpg";
import evBatteryAnalyzer from "@/assets/p-ev-battery-analyzer.jpg";
import motoLift from "@/assets/p-moto-lift.jpg";

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
  evTools,
  evBatteryAnalyzer,
  motoLift,
};

export type MobilityType = "4-Wheeler" | "2-Wheeler" | "3-Wheeler" | "EV";

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  mobility: MobilityType[];
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
  requiresQuote?: boolean;
};

export const categories = [
  "Garage Equipment",
  "Diagnostic Equipment",
  "EV Equipment",
  "Lifting Equipment",
  "Tyre & Wheel",
  "Workshop Tools",
  "Brakes",
  "Batteries",
  "Lubricants & Fluids",
  "Filters & Consumables",
];

export const mobilitySegments = [
  {
    id: "4w",
    name: "Four-Wheeler",
    desc: "Passenger cars, SUVs, commercial vans & light commercial fleet vehicles",
    badge: "Cars & Commercial",
    link: "/shop?mobility=4-Wheeler",
  },
  {
    id: "2w",
    name: "Two-Wheeler",
    desc: "Motorcycles, scooters, electric bikes & workshop scissor lift benches",
    badge: "Motorcycles & Scooters",
    link: "/shop?mobility=2-Wheeler",
  },
  {
    id: "3w",
    name: "Three-Wheeler",
    desc: "Auto rickshaws, commercial cargo 3W & electric 3W service tooling",
    badge: "Commercial 3W",
    link: "/shop?mobility=3-Wheeler",
  },
  {
    id: "ev",
    name: "Electric Mobility (EV)",
    desc: "1000V high-voltage tools, battery analyzers, cell balancers & charging stations",
    badge: "2W / 3W / 4W EV",
    link: "/shop?mobility=EV",
  },
];

export const whoWeServe = [
  {
    title: "Automotive Workshops",
    subtitle: "Garages & Independent Repair Bays",
    desc: "Heavy-duty 2-post lifts, compressed air lines, wheel balancers, and replacement parts to maximize workshop bay turnover.",
    deliverables: ["2-Post & Scissor Lifts", "Tyre Changers & Balancers", "Turnkey Bay Layouts", "Operator Safety Training"],
  },
  {
    title: "Service Centers",
    subtitle: "Multi-Brand Service Hubs",
    desc: "Supplying the specialized diagnostic scanners, fluid exchange machinery, and certified OEM parts that your technicians rely on.",
    deliverables: ["OE Diagnostic Tablets", "AC Recovery & Flush Machines", "Laser 4-Wheel Alignment", "Wholesale Spares Supply"],
  },
  {
    title: "Dealerships",
    subtitle: "Authorized Automotive Dealers",
    desc: "Standardized equipment and tooling complying with vehicle manufacturer service mandates and warranty compliance standards.",
    deliverables: ["OEM Mandated Tooling", "Diagnostic Software Updates", "B2B Volume Procurement", "Turnkey Workshop Installation"],
  },
  {
    title: "Automotive Distributors",
    subtitle: "Regional Parts & Tooling Wholesalers",
    desc: "Reliable bulk import and distribution supply chain with direct manufacturer warranties, registered VAT invoicing, and credit terms.",
    deliverables: ["Container & Pallet Supply", "Official Warranty Backing", "Exclusive Territorial Lines", "Technical Sales Training"],
  },
  {
    title: "Commercial Fleets",
    subtitle: "Bus, Truck, Van & Ride-Hail Fleets",
    desc: "Equipping in-house fleet maintenance depots with heavy-duty lifting equipment, diagnostic tools, and high-wear consumable reserves.",
    deliverables: ["Depot Workshop Setup", "Heavy Lifts & Air Lines", "Brake & Battery Supply", "Scheduled Fleet Spares"],
  },
  {
    title: "EV Workshops",
    subtitle: "Next-Gen Electric Vehicle Specialists",
    desc: "Everything required to safely service 2W, 3W, and 4W electric mobility: 1000V VDE safety tools, battery cell balancers, and chargers.",
    deliverables: ["1000V Insulated Tool Kits", "EV Battery Pack Analyzers", "Safety Isolation PPE", "High-Voltage Enclosures"],
  },
];

export const products: Product[] = [
  // Commercial Garage Equipment & Lifts
  {
    slug: "heavy-duty-2-post-lift-4t",
    name: "Heavy-Duty 2-Post Electro-Hydraulic Lift 4.0T",
    brand: "Torq",
    category: "Garage Equipment",
    mobility: ["4-Wheeler", "EV"],
    price: 285000,
    oldPrice: 310000,
    rating: 4.9,
    reviews: 34,
    stock: "In stock",
    image: lift,
    fits: ["Commercial Workshop Bay", "Passenger Cars, SUVs & Light Vans"],
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
    requiresQuote: true,
  },
  {
    slug: "motorcycle-hydraulic-scissor-lift-500kg",
    name: "Motorcycle & Scooter Hydraulic Scissor Lift 500kg",
    brand: "Torq",
    category: "Garage Equipment",
    mobility: ["2-Wheeler", "EV"],
    price: 68000,
    oldPrice: 75000,
    rating: 4.8,
    reviews: 19,
    stock: "In stock",
    image: motoLift,
    fits: ["Two-Wheeler Garages", "Motorcycles, Scooters & E-Bikes"],
    sku: "TQ-ML-500",
    description: "Heavy-duty 2-wheeler workshop scissor lift table with pneumatic foot pedal control, integrated mechanical wheel vise, and drop-out tail plate for rear wheel servicing on motorcycles and scooters.",
    specs: [
      ["Lifting Capacity", "500 kg"],
      ["Max Lifting Height", "1,200 mm"],
      ["Platform Dimensions", "2,200 mm × 680 mm"],
      ["Drive System", "Pneumatic-Hydraulic Foot Pedal"],
      ["Safety Mechanism", "Multi-position mechanical lock bar"],
      ["Wheel Clamp", "Heavy-duty rubber-lined vise clamp included"],
      ["Warranty", "18 months commercial warranty"],
    ],
    isEquipment: true,
    requiresQuote: false,
  },
  {
    slug: "pro-tyre-changer-assist-arm",
    name: "Pro Automatic Tyre Changer with Dual Assist Arm",
    brand: "Torq",
    category: "Tyre & Wheel",
    mobility: ["4-Wheeler", "3-Wheeler", "EV"],
    price: 175000,
    oldPrice: 195000,
    rating: 4.8,
    reviews: 29,
    stock: "In stock",
    image: tyreChanger,
    fits: ["Tyre Service Centers", "10\"–24\" Passenger & Commercial Rims"],
    sku: "TQ-TC-9000",
    description: "Heavy-duty commercial tyre changer equipped with pneumatic tilt-back column and dual power assist arms for effortless demounting of stiff run-flat and ultra-low-profile tyres without rim scratch.",
    specs: [
      ["Clamping Range", "10\"–24\" (Internal/External)"],
      ["Max Wheel Diameter", "1,040 mm"],
      ["Max Wheel Width", "355 mm (14\")"],
      ["Working Pressure", "8–10 bar (115–145 psi)"],
      ["Motor Power", "1.1 kW / 220V or 380V"],
      ["Bead Breaker Force", "2,500 kg"],
      ["Warranty", "18 months commercial warranty"],
    ],
    isEquipment: true,
    requiresQuote: true,
  },
  {
    slug: "digital-wheel-balancer-laser",
    name: "Microprocessor Digital Wheel Balancer with Laser",
    brand: "Axion",
    category: "Tyre & Wheel",
    mobility: ["4-Wheeler", "3-Wheeler", "EV"],
    price: 145000,
    rating: 4.9,
    reviews: 22,
    stock: "In stock",
    image: wheelBalancer,
    fits: ["Automotive Workshop Tyre Bays", "Light Commercial & Passenger Wheels"],
    sku: "AX-WB-900",
    description: "High-precision digital wheel balancing system featuring automatic 3D distance and rim diameter sensor input, multi-mode alloy balancing cycles, and laser beam pointer for adhesive weight positioning.",
    specs: [
      ["Rim Diameter", "10\"–24\""],
      ["Balancing Accuracy", "±1 g"],
      ["Cycle Time", "7 seconds"],
      ["Max Wheel Weight", "65 kg"],
      ["Shaft Diameter", "40 mm high-grade steel"],
      ["Display", "Digital LED with interactive wheel graphic"],
      ["Warranty", "24 months warranty"],
    ],
    isEquipment: true,
    requiresQuote: true,
  },
  {
    slug: "rotary-screw-air-compressor-10hp",
    name: "Rotary Screw Air Compressor 10HP / 300L Tank",
    brand: "Kraftwerk",
    category: "Garage Equipment",
    mobility: ["4-Wheeler", "2-Wheeler", "3-Wheeler", "EV"],
    price: 240000,
    rating: 4.7,
    reviews: 18,
    stock: "In stock",
    image: compressor,
    fits: ["Full Workshop Air Line Supply", "Pneumatic Tools, Lifts & Changers"],
    sku: "KW-SC-10HP",
    description: "Continuous-duty rotary screw compressor unit mounted on a 300L air receiver vessel with integrated refrigerated dryer and inline filtration. Engineered for 100% duty cycle commercial workshop pneumatic demands.",
    specs: [
      ["Motor Power", "7.5 kW / 10 HP"],
      ["Working Pressure", "10 bar (145 psi)"],
      ["Air Delivery", "1,050 L/min (37 CFM)"],
      ["Tank Volume", "300 Litres ASME Certified"],
      ["Noise Level", "65 dB(A) whisper quiet acoustic cabinet"],
      ["Warranty", "36 months on screw air end"],
    ],
    isEquipment: true,
    requiresQuote: true,
  },

  // EV Equipment & Safety
  {
    slug: "ev-1000v-insulated-tool-kit",
    name: "1000V VDE Insulated EV Safety Tool Kit (42-Piece)",
    brand: "Kraftwerk",
    category: "EV Equipment",
    mobility: ["EV", "2-Wheeler", "3-Wheeler", "4-Wheeler"],
    price: 48500,
    oldPrice: 54000,
    rating: 4.9,
    reviews: 41,
    stock: "In stock",
    image: evTools,
    fits: ["EV Workshops", "Electric Cars, E-Bikes, E-Rickshaws & Hybrids"],
    sku: "KW-EV-1000V",
    description: "Certified IEC 60900 / DIN EN 60900 1000V insulated hand tool set in a heavy-duty IP67 protective case. Crucial safety equipment for mechanics and technicians working on high-voltage battery disconnects, inverters, and EV wiring.",
    specs: [
      ["Insulation Rating", "1000V AC / 1500V DC tested"],
      ["Standard Compliance", "IEC 60900:2018 / VDE GS"],
      ["Tool Count", "42 precision insulated tools"],
      ["Case", "Heavy-duty impact-resistant foam cut organizer"],
      ["Included", "Insulated ratchet, sockets (8-22mm), open wrenches, screwdrivers, pliers, torque wrench"],
      ["Warranty", "Lifetime warranty on steel forging"],
    ],
    isEquipment: false,
    requiresQuote: false,
  },
  {
    slug: "ev-battery-pack-diagnostic-analyzer",
    name: "High-Voltage EV Battery Pack Diagnostic Station",
    brand: "Diagtek",
    category: "EV Equipment",
    mobility: ["EV", "3-Wheeler", "4-Wheeler"],
    price: 380000,
    rating: 4.9,
    reviews: 14,
    stock: "In stock",
    image: evBatteryAnalyzer,
    fits: ["EV Repair Centers", "Lithium-ion Battery Modules & Packs"],
    sku: "DT-EV-BT950",
    description: "Mobile commercial testing workstation for high-voltage traction batteries. Measures module State of Health (SOH), individual cell voltage consistency, internal resistance, and automated cell equalization balancing for 4W and 3W electric vehicles.",
    specs: [
      ["Voltage Range", "0–800V DC High Voltage"],
      ["Cell Measurement", "Up to 32S simultaneously with CAN/RS485 logging"],
      ["Max Current", "100A Charge / Discharge Testing"],
      ["Interface", "10.1\" Rugged Industrial Touchscreen"],
      ["Protocols", "CAN Bus, OBD2, K-Line, UDS EV Protocol"],
      ["Safety", "Emergency shutoff, reverse polarity, overtemp interlock"],
      ["Warranty", "24 months manufacturer warranty"],
    ],
    isEquipment: true,
    requiresQuote: true,
  },

  // Diagnostics & Tools
  {
    slug: "pro-obd2-diagnostic-scanner",
    name: "Pro OBD2 / CAN Universal Diagnostic Scanner Tablet",
    brand: "Diagtek",
    category: "Diagnostic Equipment",
    mobility: ["4-Wheeler", "EV"],
    price: 32500,
    oldPrice: 36000,
    rating: 4.7,
    reviews: 71,
    stock: "In stock",
    image: scanner,
    fits: ["Automotive Workshop Diagnostics", "1996+ OBD2 / CAN / EOBD Vehicles"],
    sku: "DT-PRO-5",
    description: "Multi-brand workshop diagnostic tool with 5\" touchscreen. Read and clear manufacturer DTCs, live PID data graphing, automated service resets, EPB calibration, battery registration, and bi-directional component actuation.",
    specs: [
      ["Screen", "5.0\" IPS Color Touchscreen"],
      ["Coverage", "90+ Global vehicle manufacturers"],
      ["Updates", "2 Years Free Wi-Fi Software Updates"],
      ["Protocols", "CAN-FD, DoIP, ISO9141, KWP2000, J1850"],
      ["Warranty", "12 months commercial warranty"],
    ],
    isEquipment: false,
    requiresQuote: false,
  },
  {
    slug: "bluetooth-obd-dongle",
    name: "Heavy-Duty Workshop Bluetooth Diagnostic Interface",
    brand: "Diagtek",
    category: "Diagnostic Equipment",
    mobility: ["4-Wheeler", "EV"],
    price: 3900,
    rating: 4.4,
    reviews: 203,
    stock: "In stock",
    image: scanner,
    fits: ["Technicians & Quick Diagnostics", "Universal OBD2 Vehicles"],
    sku: "DT-BT-1",
    description: "Pocket wireless adapter connecting vehicle OBD port directly to Android/iOS tablet or smartphone for rapid bay triage, readiness monitors, and fault code scanning.",
    specs: [
      ["Connection", "Bluetooth 5.0 Low Energy"],
      ["Compatibility", "Android / iOS / Windows PC"],
      ["Supported Protocols", "All standard OBD2 & CAN protocols"],
      ["Warranty", "12 months warranty"],
    ],
    isEquipment: false,
    requiresQuote: false,
  },

  // Parts & Consumables
  {
    slug: "ceramic-brake-pad-set-front",
    name: "Commercial Grade Ceramic Brake Pad Set — Front Axle",
    brand: "Stopline",
    category: "Brakes",
    mobility: ["4-Wheeler"],
    price: 4850,
    oldPrice: 5600,
    rating: 4.8,
    reviews: 214,
    stock: "In stock",
    image: brakepads,
    fits: ["Toyota Corolla 2014–2022", "Toyota Axio 2015–2023", "Toyota Allion"],
    sku: "SL-BP-2210",
    description: "Low-dust, high-temperature ceramic friction compound formulated for long rotor life and consistent coefficient of friction under heavy stop-and-go fleet driving. Chamfered with multi-layer noise damping shims.",
    specs: [
      ["Compound", "High-Friction Ceramic Formulation"],
      ["Position", "Front Axle"],
      ["Backing Plate", "Anti-Corrosion Powder Coated"],
      ["Wear Sensor", "Included in pack"],
      ["Warranty", "12 months / 20,000 km warranty"],
    ],
    isEquipment: false,
    requiresQuote: false,
  },
  {
    slug: "ceramic-brake-pad-set-rear",
    name: "Commercial Grade Ceramic Brake Pad Set — Rear Axle",
    brand: "Stopline",
    category: "Brakes",
    mobility: ["4-Wheeler"],
    price: 4200,
    rating: 4.7,
    reviews: 132,
    stock: "In stock",
    image: brakepads,
    fits: ["Honda Civic 2016–2021", "Honda CR-V 2017–2022"],
    sku: "SL-BP-2280",
    description: "Rear-axle ceramic pads engineered for passenger cars and light commercial applications. Minimum dust and zero rotor scoring.",
    specs: [
      ["Compound", "Ceramic Low-Metallic"],
      ["Position", "Rear Axle"],
      ["Hardware", "Stainless steel abutment clips included"],
      ["Warranty", "12 months warranty"],
    ],
    isEquipment: false,
    requiresQuote: false,
  },
  {
    slug: "agm-battery-70ah",
    name: "Heavy-Duty AGM Start-Stop Battery 70Ah / 760 CCA",
    brand: "Voltis",
    category: "Batteries",
    mobility: ["4-Wheeler", "EV"],
    price: 18900,
    rating: 4.8,
    reviews: 96,
    stock: "Low stock",
    image: battery,
    fits: ["Honda Vezel Hybrid", "Toyota Premio", "European Start-Stop Models"],
    sku: "VT-AGM-70",
    description: "Absorbent Glass Mat (AGM) battery engineered for commercial vehicles, start-stop regenerative braking systems, and high electronic accessory loads.",
    specs: [
      ["Capacity", "70 Ah"],
      ["Cold Cranking Amps (CCA)", "760 A (EN standard)"],
      ["Chemistry", "VRLA / AGM Sealed Maintenance-Free"],
      ["Cycle Life", "3x standard flooded battery life"],
      ["Warranty", "24 months commercial replacement warranty"],
    ],
    isEquipment: false,
    requiresQuote: false,
  },
  {
    slug: "efb-battery-60ah",
    name: "Enhanced Flooded EFB Battery 60Ah / 560 CCA",
    brand: "Voltis",
    category: "Batteries",
    mobility: ["4-Wheeler", "3-Wheeler"],
    price: 13400,
    rating: 4.6,
    reviews: 58,
    stock: "In stock",
    image: battery,
    fits: ["Toyota Corolla", "Commercial 3-Wheelers", "Passenger Cars"],
    sku: "VT-EFB-60",
    description: "Enhanced flooded battery designed for entry-level start-stop vehicles, commercial delivery fleets, and high-temperature operating conditions.",
    specs: [
      ["Capacity", "60 Ah"],
      ["Cold Cranking Amps (CCA)", "560 A"],
      ["Type", "Enhanced Flooded (EFB)"],
      ["Warranty", "18 months warranty"],
    ],
    isEquipment: false,
    requiresQuote: false,
  },
  {
    slug: "synthetic-engine-oil-5w30-4l",
    name: "Full Synthetic Engine Oil 5W-30 (4L Commercial Pack)",
    brand: "Lubrix",
    category: "Lubricants & Fluids",
    mobility: ["4-Wheeler", "3-Wheeler"],
    price: 5200,
    rating: 4.9,
    reviews: 388,
    stock: "In stock",
    image: oil,
    fits: ["Petrol & Turbo Diesel Engines", "Toyota, Honda, Nissan, Mitsubishi"],
    sku: "LX-5W30-4",
    description: "Advanced PAO full synthetic formulation engineered for thermal stability, anti-wear valve-train protection, and sludge control in commercial service operations.",
    specs: [
      ["Viscosity Grade", "SAE 5W-30"],
      ["Specifications", "API SP / ILSAC GF-6A / ACEA C3"],
      ["Base Stock", "Full Synthetic Group III / PAO"],
      ["Volume", "4 Litres (Also available in 208L workshop drums)"],
    ],
    isEquipment: false,
    requiresQuote: false,
  },
  {
    slug: "synthetic-engine-oil-0w20-4l",
    name: "Hybrid Low-Viscosity Engine Oil 0W-20 (4L Pack)",
    brand: "Lubrix",
    category: "Lubricants & Fluids",
    mobility: ["4-Wheeler", "EV"],
    price: 5600,
    rating: 4.8,
    reviews: 144,
    stock: "Out of stock",
    image: oil,
    fits: ["Toyota Aqua, Prius, Honda Hybrid Platforms"],
    sku: "LX-0W20-4",
    description: "Ultra-low viscosity synthetic fluid tailored for hybrid electric powertrains with frequent cold stop-start ignition cycles.",
    specs: [
      ["Viscosity Grade", "SAE 0W-20"],
      ["Standard", "API SP Resource Conserving"],
      ["Volume", "4 Litres"],
    ],
    isEquipment: false,
    requiresQuote: false,
  },
];

export const brands = [
  "Torq",
  "Diagtek",
  "Kraftwerk",
  "Axion",
  "Stopline",
  "Voltis",
  "Lubrix",
  "Nordline",
  "Meridian",
  "Hexa",
];

export const b2bSolutions = [
  {
    slug: "workshop-setup",
    name: "Turnkey Workshop Setup",
    subtitle: "Complete bay planning, machinery supply & commissioning",
    desc: "For new workshop investments, dealership bay expansions, or independent garages. We provide 2D/3D workshop ergonomics, 2-post and scissor lift anchoring, compressor ring-main line installation, and technician operation training.",
    icon: "Wrench",
    target: "New Workshop Owners, Expanding Garages, Tyre Centers",
  },
  {
    slug: "workshop-upgrade",
    name: "Workshop Equipment Modernization",
    subtitle: "Upgrade machinery throughput and technician productivity",
    desc: "Replace aging manual equipment with high-speed automated tyre changers, laser wheel balancers, and computerized ECU diagnostic tablets capable of servicing modern Japanese, European, and hybrid models.",
    icon: "ArrowUpRight",
    target: "Independent Repair Garages, Quick-Service Bays",
  },
  {
    slug: "ev-workshop",
    name: "EV Workshop Transition",
    subtitle: "High-voltage safety gear, battery testing & EV tooling",
    desc: "Equip your facility to safely service 2W, 3W, and 4W electric mobility. We supply certified 1000V insulated hand tools, traction battery cell balancing stations, safety perimeter barriers, and PPE kits.",
    icon: "Zap",
    target: "Pioneering EV Garages, Hybrid Specialists, Fleet Hubs",
  },
  {
    slug: "service-center",
    name: "Service Center Solutions",
    subtitle: "Equipment and parts supply contracts for professional service hubs",
    desc: "Comprehensive parts supply contracts, bulk lubricant drum dispensing setups, multi-bay vehicle lifts, and computerized alignment stations designed for high daily vehicle volume.",
    icon: "Building2",
    target: "Multi-Brand Service Hubs, Dealerships, Franchise Operations",
  },
  {
    slug: "fleet",
    name: "Commercial Fleet Depots",
    subtitle: "Machinery & scheduled parts supply for corporate fleets",
    desc: "Equip in-house fleet maintenance depots with heavy lifts, air tools, diagnostic tablets, and scheduled replenishment of brake pads, batteries, filters, and synthetic fluids.",
    icon: "Truck",
    target: "Logistics Depots, Corporate Shuttles, Bus & Delivery Fleets",
  },
  {
    slug: "distributor",
    name: "Distributor & Wholesale Supply",
    subtitle: "Authorized wholesale supply of automotive equipment & parts",
    desc: "Join the PAGE regional distribution network. Access volume container pricing, exclusive territorial product lines, manufacturer marketing assets, and registered commercial tax invoices.",
    icon: "Users",
    target: "Regional Wholesalers, Automotive Store Chains, Importers",
  },
];

// Multi-mobility platform data structure for vehicle/fleet compatibility finder
export const vehiclePlatformData: Record<
  MobilityType,
  Record<string, Record<string, string[]>>
> = {
  "4-Wheeler": {
    Toyota: {
      Corolla: ["1.5 Petrol", "1.8 Hybrid", "2.0 Diesel"],
      Axio: ["1.5 Petrol", "1.5 Hybrid"],
      Premio: ["1.5 Petrol", "1.8 Petrol", "2.0 Petrol"],
      HiAce: ["2.5 Diesel", "2.7 Petrol", "3.0 Turbo Diesel"],
    },
    Honda: {
      Civic: ["1.5 VTEC Turbo", "1.8 i-VTEC"],
      Vezel: ["1.5 i-DCD Hybrid", "1.5 Turbo"],
      CR_V: ["1.5 Turbo", "2.0 Hybrid"],
    },
    Nissan: {
      X_Trail: ["2.0 Petrol", "2.0 Hybrid"],
      Sunny: ["1.5 Petrol"],
      Urvan: ["2.5 Diesel"],
    },
    Mitsubishi: {
      Outlander: ["2.4 PHEV", "2.0 Petrol"],
      Pajero: ["3.2 DI-D Turbo Diesel", "3.8 MIVEC"],
    },
  },
  "2-Wheeler": {
    Honda: {
      CB150R: ["150cc DOHC Liquid Cooled"],
      X_Blade: ["160cc Air Cooled"],
      Activa: ["110cc PGM-FI Scooter"],
    },
    Yamaha: {
      FZ_S_V3: ["149cc FI Single Cylinder"],
      R15_V4: ["155cc VVA Liquid Cooled"],
      RayZR: ["125cc Hybrid Scooter"],
    },
    Bajaj: {
      Pulsar_150: ["150cc DTS-i Twin Spark"],
      Pulsar_NS200: ["199cc 4-Valve Triple Spark"],
      Discover_125: ["125cc DTS-i"],
    },
    TVS: {
      Apache_RTR_160: ["160cc 4V Race Edition"],
      Metro_Plus: ["110cc EcoThrust"],
    },
  },
  "3-Wheeler": {
    Bajaj: {
      RE_4_Stroke: ["198cc Petrol / CNG"],
      Maxima_C: ["470cc Diesel Cargo"],
    },
    Piaggio: {
      Ape_Auto_DX: ["395cc Diesel Passenger"],
      Ape_City_Plus: ["230cc Petrol / LPG"],
    },
    Atul: {
      Gem_Paxx: ["436cc Diesel Passenger"],
      Elite_Cargo: ["Electric 48V / 60V Cargo"],
    },
    Runner: {
      E_Rickshaw: ["48V 1000W BLDC Motor"],
      Cargo_3W: ["60V 1200W Electric Carrier"],
    },
  },
  "EV": {
    BYD: {
      Atto_3: ["60.48 kWh Blade Battery 150kW"],
      Dolphin: ["44.9 kWh Blade Battery 70kW"],
      Seal: ["82.5 kWh Dual Motor 390kW"],
    },
    MG: {
      ZS_EV: ["51.1 kWh Ternary Lithium 130kW"],
      MG4: ["64 kWh Ultium Battery 150kW"],
    },
    Hero_Electric: {
      Optima_CX: ["51.2V 30Ah Lithium Battery"],
      Photon: ["72V 26Ah Dual Battery Pack"],
    },
    Runner_EV: {
      E_Rickshaw_Pro: ["48V 100Ah LFP Battery System"],
      Eco_Delivery: ["60V 120Ah Commercial Carrier"],
    },
  },
};

export const vehicleData = vehiclePlatformData["4-Wheeler"];

export const years = Array.from({ length: 15 }, (_, i) => String(2024 - i));

export const taka = (n: number) => "৳" + n.toLocaleString("en-IN");
