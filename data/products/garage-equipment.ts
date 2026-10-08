import { Product } from '@/types';

// ============================================================
// PROTOTYPE DATA — Representational Mock Catalog
// ============================================================

export const garageProducts: Product[] = [
  // ── LIFTING EQUIPMENT ─────────────────────────────────────
  {
    id: 'ge-lift-001',
    slug: 'two-post-electro-hydraulic-lift-4t',
    name: 'Two-Post Electro-Hydraulic Lift 4T',
    sku: 'AE-TPL-4000',
    division: 'garage-equipment',
    category: 'lifting-equipment',
    subcategory: 'Two-Post Lifts',
    equipmentType: 'Hydraulic Lift',
    application: 'Passenger Cars & Light Commercial',
    availability: 'In Stock',
    brand: 'ATS Elgi',
    shortDescription: 'Heavy-duty 4,000 kg capacity clear-floor two-post vehicle lift with asymmetric arms and dual hydraulic synchronization.',
    description: 'Engineered for intensive commercial workshop operations, this 4-tonne lift features asymmetric arms to allow unrestricted door opening on passenger cars and SUVs. Clear-floor design eliminates ground obstructions for effortless tool cart and transmission jack movement.',
    images: [
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80', alt: 'Two-Post Electro-Hydraulic Lift Front View', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop&q=80', alt: 'Two-Post Lift Overhead Clear-Floor Beam', isPrimary: false },
      { src: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&auto=format&fit=crop&q=80', alt: 'Hydraulic Carriage and Asymmetric Arms', isPrimary: false },
    ],
    keySpecs: [
      { label: 'Lifting Capacity', value: '4,000', unit: 'kg' },
      { label: 'Max Lifting Height', value: '1,850', unit: 'mm' },
      { label: 'Lifting Time', value: '45', unit: 'sec' },
      { label: 'Motor Power', value: '2.2', unit: 'kW' },
    ],
    specGroups: [
      {
        group: 'Performance & Capacity',
        items: [
          { label: 'Rated Load Capacity', value: '4,000 kg' },
          { label: 'Maximum Lifting Height', value: '1,850 mm' },
          { label: 'Minimum Pick-up Height', value: '100 mm' },
          { label: 'Lifting Cycle Duration', value: '45 seconds' },
          { label: 'Lowering Duration', value: '40 seconds' },
        ],
      },
      {
        group: 'Mechanical & Hydraulic',
        items: [
          { label: 'Drive Mechanism', value: 'Electro-hydraulic direct drive' },
          { label: 'Electric Motor Output', value: '2.2 kW / 380V 3-Phase' },
          { label: 'Arm Geometry', value: '3-stage asymmetric design' },
          { label: 'Safety Locking Mechanism', value: 'Mechanical safety locks with dual release' },
          { label: 'Column Over-run Protection', value: 'Top safety shutoff bar switch' },
        ],
      },
      {
        group: 'Dimensions & Installation',
        items: [
          { label: 'Overall Unit Height', value: '3,840 mm' },
          { label: 'Drive-through Clearance', value: '2,560 mm' },
          { label: 'Column Internal Spacing', value: '2,800 mm' },
          { label: 'Net Machine Weight', value: '620 kg' },
        ],
      },
    ],
    features: [
      'Clear-floor overhead beam configuration for unhindered bay access',
      'Asymmetric telescopic swing arms accommodating wide wheelbase spectrum',
      'Dual hydraulic cylinder synchronization with high-strength equalizing cables',
      'Automatic mechanical safety engagement every 80mm of vertical travel',
      'Adjustable polyurethane lifting pads with extension adaptors',
    ],
    applications: [
      'Authorized dealership service centers',
      'Independent multi-brand repair workshops',
      'Underbody exhaust and transmission servicing',
      'Suspension overhaul and tyre rotation bays',
    ],
    downloads: [
      { label: 'Technical Specification Sheet (PDF)', type: 'datasheet', url: '#' },
      { label: 'Civil Foundation Requirements (PDF)', type: 'manual', url: '#' },
    ],
    badge: 'featured',
    isActive: true,
  },
  {
    id: 'ge-lift-002',
    slug: 'four-post-drive-on-alignment-lift-4-5t',
    name: 'Four-Post Drive-On Alignment Lift 4.5T',
    sku: 'AE-FPL-4500A',
    division: 'garage-equipment',
    category: 'lifting-equipment',
    subcategory: 'Four-Post Lifts',
    equipmentType: 'Hydraulic Lift',
    application: 'Commercial Fleets & Alignment Bays',
    availability: 'Available on Order',
    brand: 'ATS Elgi',
    shortDescription: 'High-stability 4,500 kg four-post lift equipped with integrated rear slip plates and front turn-plate recesses for 3D wheel alignment.',
    description: 'Designed specifically for high-accuracy 3D wheel alignment and general underbody inspection. The heavy-duty runways feature built-in rear slip plates and adjustable turn-plate pockets to guarantee zero-stress wheel movement during alignment calibration.',
    images: [
      { src: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop&q=80', alt: 'Four-Post Alignment Lift', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80', alt: 'Four-Post Lift Drive-on Platform', isPrimary: false },
    ],
    keySpecs: [
      { label: 'Rated Capacity', value: '4,500', unit: 'kg' },
      { label: 'Runway Length', value: '4,800', unit: 'mm' },
      { label: 'Max Lift Height', value: '1,800', unit: 'mm' },
      { label: 'Jack Beam Ready', value: 'Yes', unit: 'dual track' },
    ],
    specGroups: [
      {
        group: 'Performance & Capacity',
        items: [
          { label: 'Rated Capacity', value: '4,500 kg' },
          { label: 'Max Platform Elevation', value: '1,800 mm' },
          { label: 'Runway Length', value: '4,800 mm' },
          { label: 'Runway Width', value: '500 mm' },
        ],
      },
      {
        group: 'Alignment Specifics',
        items: [
          { label: 'Rear Slip Plates', value: 'Built-in multi-directional ball bearing plates' },
          { label: 'Turn-plate Recesses', value: 'Multi-position adjustable' },
          { label: 'Leveling Precision', value: 'Micro-adjustable ladder locks on all 4 posts' },
        ],
      },
    ],
    features: [
      'Certified level platform precision required for computerized 3D alignment systems',
      'Integrated guide rails for pneumatic rolling jacking beam addition',
      'Air-operated single-point safety lock release mechanism',
      'Drive-on approach ramps with anti-skid ribbed surface profile',
    ],
    applications: [
      'Dedicated computerized 3D wheel alignment bays',
      'Fleet inspection lanes and commercial depots',
      'High-throughput tyre service facilities',
    ],
    downloads: [
      { label: 'Product Brochure (PDF)', type: 'brochure', url: '#' },
    ],
    isActive: true,
  },
  {
    id: 'ge-lift-003',
    slug: 'low-profile-double-scissor-lift-3t',
    name: 'Low-Profile Double Scissor Lift 3T',
    sku: 'AE-DSL-3000',
    division: 'garage-equipment',
    category: 'lifting-equipment',
    subcategory: 'Scissor Lifts',
    equipmentType: 'Hydraulic Lift',
    application: 'Tyre Service & Express Bays',
    availability: 'In Stock',
    brand: 'ATS Elgi',
    shortDescription: 'In-ground or surface-mounted ultra-low profile double scissor lift, optimal for rapid tyre service bays and express inspection.',
    description: 'With a collapsed height of just 110mm, this double scissor lift requires minimal or no ground excavation. Ideal for quick tyre changes, brake overhauls, and fast-track service lanes where floor space must remain flexible.',
    images: [
      { src: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&auto=format&fit=crop&q=80', alt: 'Low-Profile Double Scissor Lift', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80', alt: 'Scissor Lift Platform Extended', isPrimary: false },
    ],
    keySpecs: [
      { label: 'Lifting Capacity', value: '3,000', unit: 'kg' },
      { label: 'Max Height', value: '1,900', unit: 'mm' },
      { label: 'Min Height', value: '110', unit: 'mm' },
      { label: 'Platform Extension', value: '1,450–2,050', unit: 'mm' },
    ],
    specGroups: [
      {
        group: 'Performance',
        items: [
          { label: 'Capacity', value: '3,000 kg' },
          { label: 'Max Lift Height', value: '1,900 mm' },
          { label: 'Lowest Height', value: '110 mm' },
          { label: 'Cycle Time', value: '35 seconds' },
        ],
      },
    ],
    features: [
      'Dual hydraulic circuit synchronization eliminates mechanical cross-beams',
      'Extensible platform ramps lockable in horizontal position for long wheelbases',
      'Master/slave hydraulic cylinder architecture ensures perfectly level ascent',
      'Standalone control console with emergency kill switch',
    ],
    applications: [
      'Fast-track express maintenance bays',
      'Brake testing and tyre mounting stations',
      'Low ceiling height workshops',
    ],
    badge: 'new',
    isActive: true,
  },

  // ── WHEEL ALIGNMENT ───────────────────────────────────────
  {
    id: 'ge-align-001',
    slug: 'smartsafe-3d-hd-wheel-aligner-pro',
    name: 'SmartSafe 3D HD Wheel Alignment System Pro',
    sku: 'SS-WA-3D-PRO',
    division: 'garage-equipment',
    category: 'wheel-alignment',
    subcategory: '3D Alignment',
    equipmentType: 'Optical Aligner',
    application: 'Multi-Brand Dealerships',
    availability: 'In Stock',
    brand: 'SmartSafe',
    shortDescription: 'Next-generation 3D alignment system featuring ultra-high definition digital beam cameras, passive reflective targets, and comprehensive vehicle geometry DB.',
    description: 'Delivering precision within ±0.01°, this system employs twin industrial-grade 5-megapixel cameras mounted on an automatic motorized crossbeam that tracks target elevation. Passive target clamps require no electronics, batteries, or cables on the wheels.',
    images: [
      { src: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop&q=80', alt: 'SmartSafe 3D Wheel Alignment System', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1558618047-f1bdc7ae48e5?w=800&auto=format&fit=crop&q=80', alt: 'SmartSafe High-Resolution Target Clamps', isPrimary: false },
    ],
    keySpecs: [
      { label: 'Camera Resolution', value: '2 × 5.0', unit: 'MP HD' },
      { label: 'Measurement Accuracy', value: '±0.01', unit: 'deg' },
      { label: 'Runout Compensation', value: 'Rolling push', unit: '<60 sec' },
      { label: 'Display Console', value: '32-inch', unit: '4K monitor' },
    ],
    specGroups: [
      {
        group: 'Optics & Measurement',
        items: [
          { label: 'Camera Technology', value: 'Twin 5.0 MP HD high-speed digital sensors' },
          { label: 'Camber Range & Accuracy', value: '±45.00° / Accuracy: ±0.01°' },
          { label: 'Caster Range & Accuracy', value: '±45.00° / Accuracy: ±0.02°' },
          { label: 'Toe Range & Accuracy', value: '±45.00° / Accuracy: ±0.01°' },
          { label: 'Target System', value: 'Impact-resistant passive reflective targets (no electronics)' },
        ],
      },
      {
        group: 'Computing & Interface',
        items: [
          { label: 'Vehicle Database', value: '45,000+ international makes & models (quarterly updates)' },
          { label: 'Operating Environment', value: 'Industrial Windows PC with solid-state storage' },
          { label: 'Report Generation', value: 'Full-color 3D comparison printout + QR code customer report' },
        ],
      },
    ],
    features: [
      'Short rolling runout compensation without lifting vehicle axles',
      'Live dynamic 3D graphic adjustments with instant color-coded feedback',
      'Target tracking camera beam automatically follows lift vertical travel',
      'Rim clamp diameter range from 11 inches to 24 inches without scratch risk',
      'Chassis measurement mode: setback, track width diff, and wheelbase offset',
    ],
    applications: [
      'High-volume tyre specialty centers',
      'Automotive dealership service lanes',
      'Accident repair and chassis geometry verification',
    ],
    downloads: [
      { label: 'Datasheet & Feature Guide (PDF)', type: 'datasheet', url: '#' },
      { label: 'Installation & Calibration Manual (PDF)', type: 'manual', url: '#' },
    ],
    badge: 'featured',
    isActive: true,
  },
  {
    id: 'ge-align-002',
    slug: 'launch-x631-wireless-alignment-system',
    name: 'LAUNCH X-631+ Wireless Alignment System',
    sku: 'LCH-X631-PLUS',
    division: 'garage-equipment',
    category: 'wheel-alignment',
    subcategory: 'CCD Alignment',
    equipmentType: 'Optical Aligner',
    application: 'Passenger Cars & Light Commercial',
    availability: 'Available on Order',
    brand: 'LAUNCH',
    shortDescription: 'Wireless multi-sensor CCD alignment system combining diagnostic chassis data with high-speed radio transmission.',
    description: 'An agile, space-efficient solution for workshops without space for fixed camera towers. Wireless sensor heads transmit real-time angular measurements directly to the workstation over secure 2.4GHz RF channels.',
    images: [
      { src: 'https://images.unsplash.com/photo-1558618047-f1bdc7ae48e5?w=800&auto=format&fit=crop&q=80', alt: 'LAUNCH Wireless Alignment System', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop&q=80', alt: 'LAUNCH Sensor Heads and Workstation', isPrimary: false },
    ],
    keySpecs: [
      { label: 'Communication', value: '2.4 GHz', unit: 'Wireless RF' },
      { label: 'Sensor Heads', value: '4 × 8-CCD', unit: 'infrared' },
      { label: 'Rim Capacity', value: '10–22', unit: 'inches' },
    ],
    specGroups: [
      {
        group: 'Sensor Heads',
        items: [
          { label: 'Sensor Configuration', value: '4 wireless heads with 8 CCD infrared sensors' },
          { label: 'Battery Runtime', value: '16+ hours continuous operational runtime' },
          { label: 'Charging Dock', value: 'Integrated cabinet trickle-charge stations' },
        ],
      },
    ],
    features: [
      'Zero tower footprint: perfect for narrow bays and combined lift stations',
      'Seamless software integration with LAUNCH diagnostic scan tools',
      'Self-centering wheel clamps with hardened steel rim claws',
    ],
    applications: [
      'Compact workshops with limited front bay clearance',
      'Pit-mounted alignment stations',
    ],
    isActive: true,
  },

  // ── WHEEL BALANCERS ───────────────────────────────────────
  {
    id: 'ge-bal-001',
    slug: 'ats-elgi-automatic-wheel-balancer-wb50',
    name: 'ATS Elgi Automatic Digital Wheel Balancer WB-50',
    sku: 'AE-WB-50',
    division: 'garage-equipment',
    category: 'wheel-balancers',
    subcategory: 'Digital Balancers',
    equipmentType: 'Digital Balancer',
    application: 'Tyre Service & Express Bays',
    availability: 'In Stock',
    brand: 'ATS Elgi',
    shortDescription: 'Computerized dynamic wheel balancer with automatic 2D distance/diameter gauge entry and laser weight pointer.',
    description: 'A benchmark in workshop reliability, the WB-50 balances passenger and light truck assemblies in under 7 seconds. An automatic measuring arm inputs wheel offset and diameter instantly upon rim contact.',
    images: [
      { src: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&auto=format&fit=crop&q=80', alt: 'ATS Elgi Automatic Wheel Balancer', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&auto=format&fit=crop&q=80', alt: 'Wheel Balancer Digital Console and Hood', isPrimary: false },
    ],
    keySpecs: [
      { label: 'Max Assembly Weight', value: '70', unit: 'kg' },
      { label: 'Rim Diameter', value: '10–28', unit: 'inches' },
      { label: 'Cycle Duration', value: '<7', unit: 'sec' },
      { label: 'Balancing Precision', value: '±1', unit: 'gram' },
    ],
    specGroups: [
      {
        group: 'Operational Capabilities',
        items: [
          { label: 'Maximum Tyre Diameter', value: '1,000 mm' },
          { label: 'Rim Width Capacity', value: '1.5 to 20 inches' },
          { label: 'Balancing Speed', value: '140 RPM (low-speed safety spin)' },
          { label: 'Display Architecture', value: 'High-contrast LED multi-window console' },
        ],
      },
    ],
    features: [
      'Laser line indicator pinpointing exact adhesive weight placement inside rim',
      'ALU-S program for split-weight placement behind alloy wheel spokes',
      'Automatic hood-activated start and automatic electromagnetic shaft braking',
      'Self-calibration and automated diagnostic self-test routines',
    ],
    applications: [
      'Commercial tyre retail shops',
      'Automotive dealership express service bays',
    ],
    isActive: true,
  },
  {
    id: 'ge-bal-002',
    slug: 'smartsafe-touch-free-laser-wheel-balancer',
    name: 'SmartSafe Touch-Free Laser 3D Balancer WB-80',
    sku: 'SS-WB-80',
    division: 'garage-equipment',
    category: 'wheel-balancers',
    subcategory: 'Digital Balancers',
    equipmentType: 'Digital Balancer',
    application: 'Multi-Brand Dealerships',
    availability: 'Lead Time: 1-2 Weeks',
    brand: 'SmartSafe',
    shortDescription: 'Advanced touchless wheel balancer featuring contactless sonar rim profiling, automatic weight split, and pneumatic clamping.',
    description: 'The pinnacle of high-volume wheel diagnostics. Acoustic sonar sensors map rim width and runout without physical gauge arms, while pneumatic spindle clamping guarantees exact centering repeatable to fractions of a gram.',
    images: [
      { src: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&auto=format&fit=crop&q=80', alt: 'Touch-Free Laser Wheel Balancer', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&auto=format&fit=crop&q=80', alt: 'Touch-Free Balancer Sonar Sensor View', isPrimary: false },
    ],
    keySpecs: [
      { label: 'Rim Profiling', value: 'Contactless', unit: 'Sonar + 3D' },
      { label: 'Clamping System', value: 'Pneumatic', unit: 'Power lock' },
      { label: 'Cycle Time', value: '5', unit: 'sec' },
      { label: 'Touchscreen', value: '19-inch', unit: 'Color UI' },
    ],
    specGroups: [
      {
        group: 'Advanced Metrics',
        items: [
          { label: 'Wheel Clamping', value: 'Pneumatic auto-tightening hub' },
          { label: 'Rim Measurement', value: 'Twin optical sonar scanners' },
          { label: 'Geometric Runout Detection', value: 'Radial & lateral eccentricity calculation' },
        ],
      },
    ],
    features: [
      'Identifies rim and tyre eccentricity to suggest tire-to-wheel match mounting',
      'Pneumatic quick-lock system reduces mounting time by 70%',
      'Interactive 19-inch GUI showing rim 3D topography and weight locations',
    ],
    applications: [
      'Premium luxury vehicle dealerships',
      'High-throughput wheel & tyre centers',
    ],
    badge: 'new',
    isActive: true,
  },

  // ── TYRE CHANGERS ─────────────────────────────────────────
  {
    id: 'ge-tyre-001',
    slug: 'ats-elgi-pneumatic-tyre-changer-tc60',
    name: 'ATS Elgi Heavy-Duty Tyre Changer TC-60',
    sku: 'AE-TC-60',
    division: 'garage-equipment',
    category: 'tyre-changers',
    subcategory: 'Automatic Changers',
    equipmentType: 'Pneumatic Changer',
    application: 'Tyre Service & Express Bays',
    availability: 'In Stock',
    brand: 'ATS Elgi',
    shortDescription: 'Pneumatically tilting post tyre changer with dual-clamping turntable, pneumatic bead breaker and alloy rim protectors.',
    description: 'Built with heavy-gauge steel gusseting, the TC-60 clamps external rims from 10 to 24 inches. The pneumatic tilt-back tower provides generous working clearance for quick tyre dismounting without risk of alloy scratching.',
    images: [
      { src: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&auto=format&fit=crop&q=80', alt: 'Pneumatic Tyre Changer TC-60', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1558618047-f1bdc7ae48e5?w=800&auto=format&fit=crop&q=80', alt: 'Tyre Changer Turntable Clamps', isPrimary: false },
    ],
    keySpecs: [
      { label: 'External Clamping', value: '10–24', unit: 'inches' },
      { label: 'Max Tyre Width', value: '350', unit: 'mm' },
      { label: 'Bead Breaker Force', value: '2,500', unit: 'kg' },
      { label: 'Operating Pressure', value: '8–10', unit: 'bar' },
    ],
    specGroups: [
      {
        group: 'Capacities & Clamping',
        items: [
          { label: 'Internal Clamping Range', value: '12 to 26 inches' },
          { label: 'External Clamping Range', value: '10 to 24 inches' },
          { label: 'Maximum Wheel Diameter', value: '1,040 mm' },
          { label: 'Turntable Rotation Speed', value: '7 to 14 RPM (dual speed motor)' },
        ],
      },
    ],
    features: [
      'Pneumatically actuated rearward-tilting column with foot pedal trigger',
      'Dual-cylinder clamping turntable delivers symmetrical centering clamping force',
      'Demount tool head with synthetic inserts protects delicate alloy rims',
      'Heavy-duty bead breaker arm with double-acting pneumatic cylinder',
    ],
    applications: [
      'Automotive tyre shops and rim dealers',
      'Workshop general service lanes',
    ],
    badge: 'featured',
    isActive: true,
  },
  {
    id: 'ge-tyre-002',
    slug: 'ats-elgi-leverless-run-flat-tyre-changer-tc90',
    name: 'ATS Elgi Leverless Tyre Changer with Helper Arm TC-90',
    sku: 'AE-TC-90HP',
    division: 'garage-equipment',
    category: 'tyre-changers',
    subcategory: 'Automatic Changers',
    equipmentType: 'Pneumatic Changer',
    application: 'Commercial Fleets & Alignment Bays',
    availability: 'Available on Order',
    brand: 'ATS Elgi',
    shortDescription: 'Leverless automatic tyre changer with multi-function pneumatic assist arm, purpose-engineered for stiff run-flat and low-profile sport tyres.',
    description: 'Eliminates traditional tyre levers entirely. The automated finger tool slips under the bead and lifts it effortlessly over the rim edge. Multi-joint assist helper arm presses stiff sidewalls down during mounting, preserving tyre structural integrity.',
    images: [
      { src: 'https://images.unsplash.com/photo-1558618047-f1bdc7ae48e5?w=800&auto=format&fit=crop&q=80', alt: 'Leverless Run-Flat Tyre Changer', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&auto=format&fit=crop&q=80', alt: 'Helper Arm and Run-Flat Clamping', isPrimary: false },
    ],
    keySpecs: [
      { label: 'Tool Head', value: 'Leverless', unit: 'finger tool' },
      { label: 'Assist System', value: 'Dual-arm', unit: 'pneumatic helper' },
      { label: 'Rim Capacity', value: '12–28', unit: 'inches' },
    ],
    specGroups: [
      {
        group: 'Assist Specifications',
        items: [
          { label: 'Assist Technology', value: 'Dual pneumatic helper arms with rotating bead-holding cone' },
          { label: 'Bead Blast Inflation', value: 'Direct tubeless bead seater built into turntable clamps' },
        ],
      },
    ],
    features: [
      'Automatic finger tool demounts beads without pry bars or rim contact',
      'Pneumatic helper arm maintains bead well position on low-profile tyres',
      'Variable-speed inverter drive motor adapts torque to tyre stiffness',
    ],
    applications: [
      'Run-flat tyre specialist workshops',
      'SUV and sports car performance facilities',
    ],
    isActive: true,
  },

  // ── DIAGNOSTIC EQUIPMENT ──────────────────────────────────
  {
    id: 'ge-diag-001',
    slug: 'launch-x431-pro5-smartlink-diagnostic-scanner',
    name: 'LAUNCH X-431 PRO5 Diagnostic Scanner with SmartLink',
    sku: 'LCH-PRO5-VCI',
    division: 'garage-equipment',
    category: 'diagnostic-equipment',
    subcategory: 'Handheld Scanners',
    equipmentType: 'Diagnostic Tablet',
    application: 'Multi-Brand Dealerships',
    availability: 'In Stock',
    brand: 'LAUNCH',
    shortDescription: 'Premier flagship multi-brand Android tablet scanner featuring SmartLink super-remote diagnosis, J2534 passthrough, and dual-mode protocol support.',
    description: 'The LAUNCH X-431 PRO5 combines comprehensive full-system OEM diagnostics with the SmartLink C communication module. It provides full coverage for CAN FD, DoIP, and legacy OBD protocols, plus online J2534 ECU programming capabilities.',
    images: [
      { src: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=800&auto=format&fit=crop&q=80', alt: 'LAUNCH X-431 PRO5 Scanner', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=80', alt: 'SmartLink C Connector and Tablet Display', isPrimary: false },
    ],
    keySpecs: [
      { label: 'VCI Module', value: 'SmartLink C', unit: 'J2534 / DoIP / CAN FD' },
      { label: 'Screen Size', value: '10.1', unit: 'inch IPS' },
      { label: 'OS & Storage', value: 'Android 10', unit: '4GB + 64GB' },
      { label: 'Vehicle Coverage', value: '110+', unit: 'manufacturers' },
    ],
    specGroups: [
      {
        group: 'Hardware Architecture',
        items: [
          { label: 'Display Panel', value: '10.1-inch sunlight-readable 1920×1200 IPS display' },
          { label: 'Processor', value: 'Octa-Core 1.8 GHz performance chipset' },
          { label: 'Internal Battery', value: '7,000 mAh rechargeable Li-ion polymer' },
          { label: 'Wireless Networking', value: 'Dual-band 2.4GHz / 5.0GHz Wi-Fi + Bluetooth 5.0' },
        ],
      },
      {
        group: 'Diagnostic Functions',
        items: [
          { label: 'System Access', value: 'Full systems: Engine, AT, ABS, SRS, BCM, TPMS, Gateway' },
          { label: 'Special Reset Services', value: '50+ guided maintenance reset functions' },
          { label: 'Advanced Coding', value: 'Online ECU coding, component matching, parameterization' },
          { label: 'Diagnostic Protocols', value: 'ISO 15765-4, CAN FD, DoIP, ISO 14229, J2534-1 & 2' },
        ],
      },
    ],
    features: [
      'SmartLink remote diagnosis enables experts to program ECUs across cloud networks',
      'Native topology mapping provides clear bird-eye view of all vehicle CAN networks',
      'Bi-directional active actuation tests on valves, solenoids, pumps, and injectors',
      'ADAS calibration software integration with one-touch target positioning guides',
      'Automated one-click health reports shareable via Wi-Fi printing, PDF, or email',
    ],
    applications: [
      'Multi-brand diagnostic testing bays',
      'ECU module replacement and variant coding',
      'Pre-scan and post-scan insurance collision audits',
    ],
    downloads: [
      { label: 'Vehicle Coverage Chart (PDF)', type: 'datasheet', url: '#' },
      { label: 'SmartLink User Manual (PDF)', type: 'manual', url: '#' },
    ],
    badge: 'featured',
    isActive: true,
  },
  {
    id: 'ge-diag-002',
    slug: 'launch-x431-euro-tab-iii-diagnostic-system',
    name: 'LAUNCH X-431 Euro Tab III Diagnostic System',
    sku: 'LCH-TAB-III',
    division: 'garage-equipment',
    category: 'diagnostic-equipment',
    subcategory: 'Diagnostic Stations',
    equipmentType: 'Diagnostic Tablet',
    application: 'Collision & Body Shops',
    availability: 'In Stock',
    brand: 'LAUNCH',
    shortDescription: 'Top-tier master diagnostic station equipped with 13.3-inch display, SmartLink B VCI, built-in 4-channel oscilloscope and sensor simulator.',
    description: 'Designed for master diagnostic centers and EV high-tech repair labs. Incorporates high-speed 4-channel digital oscilloscope, multimeter, ignition analyzer, and online cloud-based OE programming suites.',
    images: [
      { src: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=80', alt: 'LAUNCH Euro Tab III', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=800&auto=format&fit=crop&q=80', alt: '4-Channel Scope Probe Accessories', isPrimary: false },
    ],
    keySpecs: [
      { label: 'Display Panel', value: '13.3-inch', unit: 'Gorilla Glass' },
      { label: 'Integrated Scope', value: '4-Channel', unit: '100MHz' },
      { label: 'OE Programming', value: 'Online Cloud', unit: 'Multi-brand' },
    ],
    specGroups: [
      {
        group: 'Master Hardware',
        items: [
          { label: 'Screen', value: '13.3-inch ultra-bright touchscreen' },
          { label: 'Storage', value: '8GB RAM + 256GB SSD storage' },
          { label: 'Test Modules', value: 'Includes 4-channel oscilloscope and current clamp' },
        ],
      },
    ],
    features: [
      'Comprehensive oscilloscope waveform capture for crankshaft, ignition, and CAN signals',
      'Guided troubleshooting database linked directly to fault codes (DTCs)',
      'Heavy-duty industrial rubber bumper protection resisting garage drop impacts',
    ],
    applications: [
      'Advanced vehicle electrical troubleshooting',
      'Specialist transmission and engine rebuilders',
    ],
    isActive: true,
  },

  // ── ADAS CALIBRATION ──────────────────────────────────────
  {
    id: 'ge-adas-001',
    slug: 'smartsafe-adas-mobile-calibration-frame',
    name: 'SmartSafe ADAS Mobile Calibration Frame',
    sku: 'SS-ADAS-MOB',
    division: 'garage-equipment',
    category: 'adas-calibration',
    subcategory: 'Static Calibration',
    equipmentType: 'Laser Calibration Frame',
    application: 'Collision & Body Shops',
    availability: 'In Stock',
    brand: 'SmartSafe',
    shortDescription: 'Foldable, ultra-portable ADAS calibration fixture with millimetric laser alignment, ideal for mobile mechanics and versatile workshop bays.',
    description: 'Enables precise static calibration of front windshield cameras, radar units, and night-vision cameras. The unique collapsible frame folds in 60 seconds into a compact carrying case without losing laser calibration accuracy.',
    images: [
      { src: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800&auto=format&fit=crop&q=80', alt: 'SmartSafe Mobile ADAS Frame', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop&q=80', alt: 'ADAS Camera Target Board Setup', isPrimary: false },
    ],
    keySpecs: [
      { label: 'Setup Time', value: '<5', unit: 'minutes' },
      { label: 'Laser Accuracy', value: '±0.5', unit: 'mm' },
      { label: 'Sensor Coverage', value: 'Camera + Radar', unit: 'Multi-brand' },
      { label: 'Portability', value: 'Foldable', unit: 'Wheeled case' },
    ],
    specGroups: [
      {
        group: 'Frame & Precision',
        items: [
          { label: 'Horizontal Beam Length', value: '2,200 mm' },
          { label: 'Height Adjustment Range', value: '600 mm to 2,100 mm' },
          { label: 'Laser Target Centering', value: 'Dual cross-line laser distance modules' },
          { label: 'Digital Angle Meter', value: 'Integrated digital inclinometer (0.01° resolution)' },
        ],
      },
    ],
    features: [
      'Compatible with SmartSafe and LAUNCH diagnostic tablets for guided calibration',
      'Multi-panel target board support for Toyota, Honda, Nissan, VAG, BMW, Mercedes',
      'Includes millimeter laser wheel center positioning targets',
      'Compact footprint allows calibration within standard 5-meter service bays',
    ],
    applications: [
      'Automotive windscreen replacement centers',
      'Collision damage repair facilities',
      'Camera and forward radar recalibration after bumper repairs',
    ],
    badge: 'new',
    isActive: true,
  },
  {
    id: 'ge-adas-002',
    slug: 'smartsafe-adas-pro-plus-calibration-station',
    name: 'SmartSafe ADAS PRO Plus Master Calibration Center',
    sku: 'SS-ADAS-PRO+',
    division: 'garage-equipment',
    category: 'adas-calibration',
    subcategory: 'Static Calibration',
    equipmentType: 'Laser Calibration Frame',
    application: 'Multi-Brand Dealerships',
    availability: 'Available on Order',
    brand: 'SmartSafe',
    shortDescription: 'Full-size motorized ADAS calibration station with 3D camera tracking, radar reflector, LiDAR target, and 360° around-view mat packages.',
    description: 'The complete master calibration solution for high-end collision centers and glass replacement facilities. Features motorized horizontal and vertical positioning driven directly by diagnostic tablet commands.',
    images: [
      { src: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop&q=80', alt: 'SmartSafe ADAS PRO Plus Center', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800&auto=format&fit=crop&q=80', alt: 'Motorized Lift Column and Laser Array', isPrimary: false },
    ],
    keySpecs: [
      { label: 'System Control', value: 'Motorized', unit: 'Tablet commanded' },
      { label: 'Coverage', value: 'Camera, Radar, LiDAR', unit: '360° AVM' },
      { label: 'Positioning', value: '3D Optical', unit: 'Tracking' },
    ],
    specGroups: [
      {
        group: 'Station Architecture',
        items: [
          { label: 'Motorized Elevating Column', value: 'Micro-step servo electric lift' },
          { label: 'Target Inventory', value: 'Full European, Asian, American OE target boards' },
          { label: 'Doppler Radar Simulator', value: 'Corner reflector + active radar calibration box' },
        ],
      },
    ],
    features: [
      'Motorized beam automatically levels and adjusts to correct vehicle height',
      'Complete around-view 360° surround camera floor pattern mats included',
      'Blind spot detection (BSD) target stand included',
    ],
    applications: [
      'High-throughput ADAS certification hubs',
      'Large dealership networks and OEM service franchises',
    ],
    isActive: true,
  },

  // ── MAINTENANCE EQUIPMENT ─────────────────────────────────
  {
    id: 'ge-maint-001',
    slug: 'wipro-automatic-ac-service-station-r134a',
    name: 'WIPRO Automatic A/C Service Station R-134a',
    sku: 'WP-ACS-134A',
    division: 'garage-equipment',
    category: 'maintenance-equipment',
    subcategory: 'A/C Service',
    equipmentType: 'A/C Recovery Station',
    application: 'Passenger Cars & Light Commercial',
    availability: 'In Stock',
    brand: 'WIPRO Enterprises',
    shortDescription: 'Fully automated automotive refrigerant recovery, recycling, evacuation, and precision charging station for R-134a air conditioning systems.',
    description: 'Recovers up to 95% of refrigerant with industrial efficiency. Automated oil discharge, micro-leak vacuum testing, fresh compressor oil injection, and digital gram-accurate refrigerant charging via integrated load cell scales.',
    images: [
      { src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop&q=80', alt: 'A/C Service Station R-134a', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=80', alt: 'Digital Refrigerant Scale and Gauge Panel', isPrimary: false },
    ],
    keySpecs: [
      { label: 'Refrigerant', value: 'R-134a', unit: '' },
      { label: 'Recovery Rate', value: '>95', unit: '%' },
      { label: 'Internal Tank', value: '12.0', unit: 'kg capacity' },
      { label: 'Charge Precision', value: '±10', unit: 'grams' },
    ],
    specGroups: [
      {
        group: 'Operating Specifications',
        items: [
          { label: 'Refrigerant Specification', value: 'R-134a' },
          { label: 'Vacuum Pump Flow Rate', value: '60 Litres/min high-efficiency dual stage' },
          { label: 'Compressor Power', value: '3/8 HP hermetic' },
          { label: 'Recovery Speed', value: '300 g/min liquid phase' },
          { label: 'Vehicle Database', value: 'Comprehensive vehicle refrigerant/oil fill capacities' },
        ],
      },
    ],
    features: [
      'One-touch automatic cycle performs recovery, vacuum, leak check, oil, and charge',
      'Electronic scale with vibration damping for exact charge dosing',
      'Integrated thermal printer generates customer proof-of-service receipts',
      'Automatic non-condensable gas purge valve prevents tank pressure build-up',
    ],
    applications: [
      'Summer seasonal A/C tune-up and recharge bays',
      'Compressor overhaul and leak testing',
    ],
    isActive: true,
  },
  {
    id: 'ge-maint-002',
    slug: 'wipro-pneumatic-atf-exchange-machine',
    name: 'WIPRO Smart ATF Exchanger & Fluid Flusher',
    sku: 'WP-ATF-800',
    division: 'garage-equipment',
    category: 'maintenance-equipment',
    subcategory: 'Fluid Service',
    equipmentType: 'ATF Exchanger',
    application: 'Commercial Fleets & Alignment Bays',
    availability: 'In Stock',
    brand: 'WIPRO Enterprises',
    shortDescription: 'Computer-controlled automatic transmission fluid exchange station with equal-volume dynamic fluid exchange and integrated pressure sensor.',
    description: 'Solves torque converter fluid exchange challenges through continuous equal-volume exchange while the engine idles. High-precision flowmeters guarantee zero over-fill or fluid starvation inside the transmission.',
    images: [
      { src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop&q=80', alt: 'ATF Exchanger Machine', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80', alt: 'ATF Adapter Kit and Dual Sight Glasses', isPrimary: false },
    ],
    keySpecs: [
      { label: 'Exchange Accuracy', value: '±100', unit: 'ml' },
      { label: 'Dual Tanks', value: '2 × 20', unit: 'Litres' },
      { label: 'Flow Direction', value: 'Auto-detect', unit: 'smart valve' },
    ],
    specGroups: [
      {
        group: 'Fluid Dynamics',
        items: [
          { label: 'Fresh & Waste Tank Capacity', value: '20 Litres each' },
          { label: 'Exchange Precision', value: 'Equal volume replacement within ±100ml' },
          { label: 'Adapter Kit', value: 'Universal European, Asian, American transmission fittings' },
        ],
      },
    ],
    features: [
      'Automatic fluid flow direction detection eliminates human connection error',
      'Backlit sight glasses allow visual comparison of old vs fresh fluid in real time',
      'Detergent flushing cycle cleans varnish from internal clutch packs',
    ],
    applications: [
      'Automatic transmission maintenance and flush services',
      'High-mileage vehicle preventive overhaul',
    ],
    isActive: true,
  },

  // ── WORKSHOP EQUIPMENT ────────────────────────────────────
  {
    id: 'ge-ws-001',
    slug: 'wipro-industrial-screw-air-compressor-300l',
    name: 'WIPRO Industrial Rotary Screw Air Compressor 300L',
    sku: 'WP-AC-ROT300',
    division: 'garage-equipment',
    category: 'workshop-equipment',
    subcategory: 'Air Compressors',
    equipmentType: 'Rotary Screw Compressor',
    application: 'Heavy Commercial Workshops',
    availability: 'In Stock',
    brand: 'WIPRO Enterprises',
    shortDescription: 'Continuous-duty 10 HP rotary screw air compressor with integrated refrigerated air dryer and 300-litre vertical receiver vessel.',
    description: 'Designed for quiet, 24/7 continuous air supply across high-demand automotive facilities. Unlike piston compressors, this rotary screw unit delivers 100% duty cycle dry, pulse-free compressed air without overheating.',
    images: [
      { src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=80', alt: 'Industrial Screw Compressor', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80', alt: 'Compressor Tank and Air Dryer Module', isPrimary: false },
    ],
    keySpecs: [
      { label: 'Air Flow Rate', value: '1,100', unit: 'L/min (39 CFM)' },
      { label: 'Receiver Capacity', value: '300', unit: 'Litres' },
      { label: 'Motor Power', value: '7.5', unit: 'kW (10 HP)' },
      { label: 'Working Pressure', value: '10', unit: 'bar' },
    ],
    specGroups: [
      {
        group: 'Pneumatics & Air Quality',
        items: [
          { label: 'Free Air Delivery (FAD)', value: '1,100 L/min at 10 bar' },
          { label: 'Operating Sound Level', value: '64 dB(A) whisper quiet' },
          { label: 'Integrated Air Dryer', value: 'Refrigerated dryer with +3°C pressure dew point' },
          { label: 'Filtration', value: '0.01 micron coalescing particulate filter' },
        ],
      },
    ],
    features: [
      'Microprocessor controller monitors pressure, oil temp, and scheduled service hours',
      'Integrated refrigerated dryer prevents moisture contamination in pneumatic tools',
      'Ultra-quiet acoustic soundproof cabinet permits installation inside service bays',
    ],
    applications: [
      'Whole-workshop central pneumatic distribution lines',
      'Pneumatic tyre changers, impact wrenches, and painting booths',
    ],
    isActive: true,
  },
  {
    id: 'ge-ws-002',
    slug: 'ats-elgi-telescopic-transmission-jack-1t',
    name: 'ATS Elgi Hydraulic Telescopic Transmission Jack 1T',
    sku: 'AE-TJ-1000',
    division: 'garage-equipment',
    category: 'workshop-equipment',
    subcategory: 'Hydraulic Jacks',
    equipmentType: 'Transmission Jack',
    application: 'Passenger Cars & Light Commercial',
    availability: 'In Stock',
    brand: 'ATS Elgi',
    shortDescription: 'Two-stage chrome hydraulic telescopic transmission jack with 1,000 kg capacity, 4-way tilting saddle, and foot pedal lift.',
    description: 'Provides safe, controlled removal and installation of transmissions, transfer cases, and EV battery drive units beneath elevated lifts.',
    images: [
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80', alt: 'Telescopic Transmission Jack', isPrimary: true },
      { src: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&auto=format&fit=crop&q=80', alt: 'Transmission Jack 4-Way Saddle', isPrimary: false },
    ],
    keySpecs: [
      { label: 'Capacity', value: '1,000', unit: 'kg' },
      { label: 'Max Lift Height', value: '1,960', unit: 'mm' },
      { label: 'Saddle Tilt', value: '4-Way', unit: '±30° tilt' },
    ],
    specGroups: [
      {
        group: 'Specifications',
        items: [
          { label: 'Minimum Height', value: '950 mm' },
          { label: 'Maximum Height', value: '1,960 mm' },
          { label: 'Hydraulic Cylinder', value: 'Dual-stage hard chrome piston rod' },
          { label: 'Castor Wheels', value: '4 polyurethane 360° ball-bearing wheels' },
        ],
      },
    ],
    features: [
      'Hands-free foot pump allows technician to steady transmission during lift',
      'Micro-adjustable tilt cradle with safety chains for secure component retention',
      'Wide low-center-of-gravity base resists tipping during workshop transit',
    ],
    applications: [
      'Gearbox and differential replacement',
      'EV drivetrain and battery module sub-frame extraction',
    ],
    isActive: true,
  },
];

export function getGarageProductBySlug(slug: string): Product | undefined {
  return garageProducts.find((p) => p.slug === slug);
}

export function getGarageProductsByCategory(category: string): Product[] {
  if (category === 'all' || !category) {
    return garageProducts.filter((p) => p.isActive);
  }
  return garageProducts.filter((p) => p.category === category && p.isActive);
}

export function getFeaturedGarageProducts(limit = 6): Product[] {
  return garageProducts.filter((p) => p.isActive && p.badge === 'featured').slice(0, limit);
}
