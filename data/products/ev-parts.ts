import { Product } from '@/types';

// ============================================================
// PROTOTYPE DATA — Representational EV Parts Catalog
// ============================================================

export const evProducts: Product[] = [
  // ── MOTORS ────────────────────────────────────────────────
  {
    id: 'ev-mot-001',
    slug: 'bldc-hub-motor-250w-2w',
    name: 'BLDC Geared Hub Motor 250W (2-Wheeler)',
    sku: 'EV-MOT-250-2W',
    division: 'ev-parts',
    category: 'motors',
    brand: 'PAGE EV Parts',
    shortDescription: 'High-efficiency 250W 36V/48V brushless DC planetary-geared hub motor with internal freewheel, engineered for electric bicycles and light city scooters.',
    description: 'Designed specifically for urban two-wheelers, this compact hub motor delivers 40 Nm of starting torque with over 85% electrical efficiency. The internal planetary gear reduction ensures strong hill climbing while remaining lightweight and compact.',
    images: [
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80', alt: 'BLDC Geared Hub Motor 250W', isPrimary: true },
    ],
    keySpecs: [
      { label: 'Rated Power', value: '250', unit: 'Watts' },
      { label: 'Operating Voltage', value: '36 / 48', unit: 'Volts DC' },
      { label: 'Max Torque', value: '40', unit: 'Nm' },
      { label: 'Efficiency', value: '>85', unit: '%' },
    ],
    specGroups: [
      {
        group: 'Electrical Characteristics',
        items: [
          { label: 'Rated Continuous Power', value: '250 W' },
          { label: 'Peak Power Output', value: '550 W (30s peak)' },
          { label: 'Nominal Operating Voltage', value: '36V or 48V DC' },
          { label: 'Peak Electrical Efficiency', value: '>85%' },
          { label: 'Sensor Configuration', value: 'Triple digital Hall sensors (120° phase)' },
        ],
      },
      {
        group: 'Mechanical & Chassis',
        items: [
          { label: 'Motor Architecture', value: 'Brushless DC with internal planetary gear' },
          { label: 'Dropout Axle Width', value: '135 mm rear / 100 mm front' },
          { label: 'Brake Compatibility', value: 'Standard 6-bolt disc brake mount + V-brake' },
          { label: 'Spoke Holes', value: '36 holes (13G / 12G)' },
          { label: 'Total Unit Mass', value: '2.85 kg' },
        ],
      },
      {
        group: 'Environmental Rating',
        items: [
          { label: 'Ingress Protection', value: 'IP65 waterproof dust-sealed casing' },
          { label: 'Operating Ambient Range', value: '-20°C to +50°C' },
        ],
      },
    ],
    features: [
      'High reduction planetary gear set ensures effortless standing start acceleration',
      'Integrated freewheel mechanism enables natural pedal resistance when motor is off',
      'Waterproof 9-pin quick-disconnect motor cable with silicone seals',
      'Thermal cutout protection sensor prevents winding burnout under heavy loads',
    ],
    vehicleCompatibility: ['2-wheeler'],
    compatibilityTable: [
      { vehicleType: '2-wheeler', make: 'Universal City E-Bikes', model: '26" / 27.5" / 700c frames with 135mm rear dropouts', notes: 'Direct dropout fit' },
      { vehicleType: '2-wheeler', make: 'Compact Cargo E-Bikes', model: '20" / 24" reinforced rear forks', notes: 'Use torque arm bracket' },
    ],
    downloads: [
      { label: 'Motor Performance Curves & CAD (PDF)', type: 'datasheet', url: '#' },
      { label: 'Spoke Lacing & Wiring Guide (PDF)', type: 'manual', url: '#' },
    ],
    badge: 'featured',
    isActive: true,
  },
  {
    id: 'ev-mot-002',
    slug: 'heavy-duty-bldc-motor-1500w-3w',
    name: 'Heavy-Duty Direct-Drive BLDC Motor 1500W (3-Wheeler)',
    sku: 'EV-MOT-1500-3W',
    division: 'ev-parts',
    category: 'motors',
    brand: 'PAGE EV Parts',
    shortDescription: 'Industrial 1,500W 48V/60V brushless differential-mount powertrain motor engineered for passenger e-rickshaws and commercial 3-wheeler cargo haulers.',
    description: 'Built for intense commercial operating cycles in high-temperature environments. Features thick 180°C rated copper windings, high-grade NdFeB neodymium magnets, and direct-flange mounting for standard 3-wheeler differential gearboxes.',
    images: [
      { src: 'https://images.unsplash.com/photo-1581092334651-ddf19d564b47?w=800&auto=format&fit=crop&q=80', alt: 'Heavy-Duty 1500W BLDC Motor', isPrimary: true },
    ],
    keySpecs: [
      { label: 'Rated Power', value: '1,500', unit: 'Watts' },
      { label: 'Working Voltage', value: '48 / 60', unit: 'Volts DC' },
      { label: 'Rated Torque', value: '120', unit: 'Nm' },
      { label: 'Differential Ready', value: '16-Tooth', unit: 'spline shaft' },
    ],
    specGroups: [
      {
        group: 'Powertrain Specifications',
        items: [
          { label: 'Rated Power Output', value: '1,500 W' },
          { label: 'Peak Overload Capacity', value: '3,200 W (60s continuous hill grade)' },
          { label: 'Rated Operating Speed', value: '3,200 RPM' },
          { label: 'Maximum Stall Torque', value: '120 Nm' },
          { label: 'Output Spline Coupling', value: '16-tooth involute spline shaft' },
        ],
      },
      {
        group: 'Thermal & Enclosure',
        items: [
          { label: 'Insulation Class', value: 'Class H (180°C thermal grade)' },
          { label: 'Cooling Method', value: 'Radial cooling fins with forced airflow fan' },
          { label: 'Enclosure Protection', value: 'IP55 splash and grit resistant' },
          { label: 'Motor Weight', value: '8.4 kg' },
        ],
      },
    ],
    features: [
      'Engineered specifically for heavy passenger payload (4–6 passenger e-rickshaws)',
      'Direct coupling to 3-wheeler differential rear axles without belt slippage',
      'Reinforced bearing housings withstand heavy commercial road shocks',
      'High thermal mass resists overheating during humid urban stop-and-go routes',
    ],
    vehicleCompatibility: ['3-wheeler'],
    compatibilityTable: [
      { vehicleType: '3-wheeler', make: 'Standard E-Rickshaw', model: '48V/60V passenger rickshaw chassis', notes: 'Direct differential flange fit' },
      { vehicleType: '3-wheeler', make: 'Commercial Cargo 3W', model: '500kg payload cargo boxes', notes: 'Pair with 60V controller' },
    ],
    downloads: [
      { label: 'Dyno Test Report (PDF)', type: 'datasheet', url: '#' },
    ],
    badge: 'featured',
    isActive: true,
  },

  // ── CONTROLLERS ───────────────────────────────────────────
  {
    id: 'ev-ctrl-001',
    slug: 'sinusoidal-foc-controller-250w-2w',
    name: 'Sinusoidal FOC Intelligent Motor Controller 250W (2-Wheeler)',
    sku: 'EV-CTRL-FOC-250',
    division: 'ev-parts',
    category: 'controllers',
    brand: 'PAGE EV Parts',
    shortDescription: 'Field-Oriented Control (FOC) sine-wave 36V/48V 15A controller delivering whisper-quiet motor operation, regenerative braking, and smooth throttle response.',
    description: 'Replaces noisy square-wave controllers with ultra-smooth vector FOC algorithms. Eliminates motor buzzing noise, reduces heat buildup by 25%, and features programmable regenerative braking that feeds charge back into the battery.',
    images: [
      { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80', alt: 'Sinusoidal FOC Controller 250W', isPrimary: true },
    ],
    keySpecs: [
      { label: 'Voltage Range', value: '36 / 48', unit: 'Volts DC' },
      { label: 'Max Phase Current', value: '15', unit: 'Amperes' },
      { label: 'Drive Algorithm', value: 'Vector FOC', unit: 'Pure sine' },
      { label: 'Protection', value: 'IP65', unit: 'Waterproof' },
    ],
    specGroups: [
      {
        group: 'Control Electronics',
        items: [
          { label: 'Algorithm', value: 'Field-Oriented Control (FOC) 32-bit MCU' },
          { label: 'Low Voltage Cutoff', value: '30V (36V mode) / 40V (48V mode) ±0.5V' },
          { label: 'Current Limit', value: '15A maximum phase limit' },
          { label: 'Regenerative Braking', value: 'Dynamic E-ABS back-EMF recovery' },
          { label: 'Display Protocol', value: 'UART / CAN bus compatible' },
        ],
      },
    ],
    features: [
      'Pure sine wave drive reduces acoustic noise to near imperceptible levels',
      'Electronic ABS regenerative braking prevents wheel lockups on slick roads',
      'Integrated cruise control, anti-theft alarm circuit, and walk-assist speed mode',
      'Aluminum heat-sink chassis with potted silicone ingress protection',
    ],
    vehicleCompatibility: ['2-wheeler'],
    compatibilityTable: [
      { vehicleType: '2-wheeler', make: '250W–350W Hub Motors', model: '36V/48V brushless 9-pin motors', notes: 'Matches 120° hall sensors' },
    ],
    downloads: [
      { label: 'Wiring Schematic & Pinout (PDF)', type: 'manual', url: '#' },
    ],
    isActive: true,
  },
  {
    id: 'ev-ctrl-002',
    slug: 'heavy-duty-can-controller-1500w-3w',
    name: 'Heavy-Duty CAN Bus Controller 1500W–2000W (3-Wheeler)',
    sku: 'EV-CTRL-HD-1500',
    division: 'ev-parts',
    category: 'controllers',
    brand: 'PAGE EV Parts',
    shortDescription: 'Industrial 48V/60V 50A programmable intelligent controller with 18 high-power MOSFETs, dual speed modes, and heavy-load reverse gear logic.',
    description: 'Engineered for commercial 3-wheelers carrying rigorous loads. Features heavy copper busbars, 18 imported high-voltage MOSFETs, hill-hold anti-rollback technology, and CAN bus telematics output.',
    images: [
      { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80', alt: 'Heavy-Duty 3W Controller', isPrimary: true },
    ],
    keySpecs: [
      { label: 'Voltage Range', value: '48 / 60 / 72', unit: 'Volts DC' },
      { label: 'Rated Bus Current', value: '50', unit: 'Amperes' },
      { label: 'Peak Phase Current', value: '120', unit: 'Amperes' },
      { label: 'MOSFET Array', value: '18-Tube', unit: 'High-current' },
    ],
    specGroups: [
      {
        group: 'Electrical Capacity',
        items: [
          { label: 'Nominal Operating Voltage', value: '48V / 60V / 72V auto-detect' },
          { label: 'Continuous Output Current', value: '50A' },
          { label: 'Peak Overload Current', value: '120A (60 seconds)' },
          { label: 'Reverse Speed Limiting', value: 'Electronically capped at 8 km/h for safety' },
        ],
      },
    ],
    features: [
      'Hill-hold anti-rollback feature prevents backward drift when starting on inclines',
      'Dedicated forward/neutral/reverse transmission logic with warning beeper circuit',
      'Over-temperature and phase short-circuit self-healing cutoff protection',
      'Thick die-cast aluminum heat sinks for reliable thermal dissipation in hot climates',
    ],
    vehicleCompatibility: ['3-wheeler'],
    compatibilityTable: [
      { vehicleType: '3-wheeler', make: 'Commercial E-Rickshaw', model: '1000W–2000W differential motors', notes: 'Includes reverse gear wiring' },
    ],
    badge: 'featured',
    isActive: true,
  },

  // ── BATTERIES ─────────────────────────────────────────────
  {
    id: 'ev-bat-001',
    slug: 'lithium-ion-battery-pack-48v-20ah-2w',
    name: 'Smart Li-Ion Battery Pack 48V 20Ah (2-Wheeler)',
    sku: 'EV-BAT-LI-48-20',
    division: 'ev-parts',
    category: 'batteries',
    brand: 'PAGE EV Parts',
    shortDescription: 'Grade-A 18650 cell battery pack (960 Wh) with integrated smart bluetooth BMS, over-current protection, and lockable aluminum hail-resistant enclosure.',
    description: 'Premium automotive-grade lithium-ion pack providing dependable 50–70 km range per charge. The integrated smart BMS balances every parallel group dynamically, preventing over-charge, over-discharge, and thermal runaway.',
    images: [
      { src: 'https://images.unsplash.com/photo-1620714223084-8fcacc2dbe4d?w=800&auto=format&fit=crop&q=80', alt: 'Li-Ion Battery Pack 48V 20Ah', isPrimary: true },
    ],
    keySpecs: [
      { label: 'Nominal Voltage', value: '48', unit: 'Volts (54.6V full)' },
      { label: 'Capacity', value: '20', unit: 'Ah (960 Wh)' },
      { label: 'Cycle Life', value: '>1,000', unit: 'cycles to 80%' },
      { label: 'Total Weight', value: '5.2', unit: 'kg' },
    ],
    specGroups: [
      {
        group: 'Cell Architecture',
        items: [
          { label: 'Cell Chemistry', value: 'Lithium Nickel Manganese Cobalt (NMC)' },
          { label: 'Cell Format', value: 'Automotive Grade 18650 / 2600mAh' },
          { label: 'Configuration', value: '13S 8P' },
          { label: 'Max Continuous Discharge', value: '30 Amperes' },
          { label: 'Recommended Charge Current', value: '4.0 to 5.0 Amperes' },
        ],
      },
      {
        group: 'BMS Protection',
        items: [
          { label: 'Cell Balancing', value: 'Active resistive bleeding at 4.18V' },
          { label: 'Over-discharge Protection', value: 'Cuts off at 39.0V' },
          { label: 'Thermal Sensor Threshold', value: 'Charge cut off at 45°C / Discharge at 60°C' },
        ],
      },
    ],
    features: [
      'Removable battery rail with key lock secures battery to bike down-tube',
      'External 4-LED fuel gauge push-button displays immediate charge status',
      'Heavy-duty XT60 discharge port and 5.5×2.1mm DC charge socket',
      'Waterproof sonic-welded plastic shell with silicone gasket seals',
    ],
    vehicleCompatibility: ['2-wheeler'],
    compatibilityTable: [
      { vehicleType: '2-wheeler', make: 'Universal Down-tube E-Bikes', model: 'Water-bottle mount frame spacing', notes: 'Mounting bracket included' },
      { vehicleType: '2-wheeler', make: 'Electric Scooters', model: 'Under-seat or floorboard battery compartment', notes: 'Verify dimensions' },
    ],
    downloads: [
      { label: 'MSDS & UN38.3 Transport Certification (PDF)', type: 'datasheet', url: '#' },
    ],
    badge: 'featured',
    isActive: true,
  },
  {
    id: 'ev-bat-002',
    slug: 'heavy-duty-lifepo4-battery-pack-60v-40ah-3w',
    name: 'Heavy-Duty LiFePO4 Commercial Battery Pack 60V 40Ah (3-Wheeler)',
    sku: 'EV-BAT-LFP-60-40',
    division: 'ev-parts',
    category: 'batteries',
    brand: 'PAGE EV Parts',
    shortDescription: 'Ultra-safe Lithium Iron Phosphate (LiFePO4) 2,400 Wh commercial traction pack offering 3,000+ deep cycles, purpose-designed for all-day e-rickshaw fleets.',
    description: 'The definitive solution for high-mileage commercial 3-wheelers. LiFePO4 chemistry eliminates thermal fire risks while delivering three times the operational cycle life of traditional lead-acid or standard NMC packs.',
    images: [
      { src: 'https://images.unsplash.com/photo-1620714223084-8fcacc2dbe4d?w=800&auto=format&fit=crop&q=80', alt: 'LiFePO4 Battery Pack 60V 40Ah', isPrimary: true },
    ],
    keySpecs: [
      { label: 'Nominal Voltage', value: '60', unit: 'Volts (67.2V full)' },
      { label: 'Energy Capacity', value: '40', unit: 'Ah (2,400 Wh)' },
      { label: 'Cycle Life', value: '>3,000', unit: 'cycles to 80%' },
      { label: 'Warranty Base', value: '3', unit: 'Years commercial' },
    ],
    specGroups: [
      {
        group: 'Chemical & Electrochemical',
        items: [
          { label: 'Chemistry', value: 'Lithium Iron Phosphate (LiFePO4) prismatic cells' },
          { label: 'Configuration', value: '20S 1P prismatic structure' },
          { label: 'Continuous Current', value: '60 Amperes' },
          { label: 'Peak Discharge Current', value: '120 Amperes (10 seconds)' },
          { label: 'Cycle Durability', value: '>3,000 cycles at 80% Depth of Discharge' },
        ],
      },
      {
        group: 'Heavy-Duty Case',
        items: [
          { label: 'Casing Material', value: 'Powder-coated 1.5mm galvanized steel box' },
          { label: 'Ingress Protection', value: 'IP67 completely sealed against monsoon flooding' },
          { label: 'Net Weight', value: '19.8 kg (65% lighter than lead-acid equivalent)' },
        ],
      },
    ],
    features: [
      'Chemical thermal stability prevents fire even in extreme ambient temperatures (+45°C)',
      'Substantially lighter than 5 lead-acid batteries, dramatically increasing vehicle speed and payload',
      'Dual Anderson SB50 high-current quick-swap connectors',
      'Integrated active cell equalizer extends pack health across multi-year commercial fleets',
    ],
    vehicleCompatibility: ['3-wheeler'],
    compatibilityTable: [
      { vehicleType: '3-wheeler', make: 'All Standard E-Rickshaws', model: '60V powertrain chassis', notes: 'Replaces 5× lead-acid batteries directly' },
    ],
    badge: 'new',
    isActive: true,
  },

  // ── CHARGERS ──────────────────────────────────────────────
  {
    id: 'ev-chg-001',
    slug: 'smart-cc-cv-fast-charger-48v-5a-2w',
    name: 'Smart CC/CV Aluminium Fast Charger 48V 5A (2-Wheeler)',
    sku: 'EV-CHG-48-5A',
    division: 'ev-parts',
    category: 'chargers',
    brand: 'PAGE EV Parts',
    shortDescription: 'High-frequency switch-mode charger with automatic CC/CV profile, aluminum heatsink shell, and dual-color LED charging status indicator.',
    description: 'Charges standard 20Ah battery packs in approximately 4 hours with automatic float-cutoff upon completion. Over-voltage, reverse polarity, and short-circuit protections ensure safe charging in residential and garage circuits.',
    images: [
      { src: 'https://images.unsplash.com/photo-1558618047-f1bdc7ae48e5?w=800&auto=format&fit=crop&q=80', alt: 'Smart Charger 48V 5A', isPrimary: true },
    ],
    keySpecs: [
      { label: 'Input Voltage', value: '180–240', unit: 'Volts AC' },
      { label: 'Max Output Voltage', value: '54.6', unit: 'Volts DC' },
      { label: 'Charge Current', value: '5.0', unit: 'Amperes' },
      { label: 'Efficiency', value: '>89', unit: '%' },
    ],
    specGroups: [
      {
        group: 'Power Electronics',
        items: [
          { label: 'Charging Algorithm', value: 'Constant Current (CC) -> Constant Voltage (CV) -> Cutoff' },
          { label: 'Cooling', value: 'Thermostatically controlled high-CFM ball-bearing fan' },
          { label: 'Output Termination', value: 'Standard XLR 3-pin or Anderson pole' },
        ],
      },
    ],
    features: [
      'Automatic cutoff at zero-current prevents over-charging and battery swelling',
      'Active PFC (Power Factor Correction) minimizes electrical grid harmonics',
      'Rugged extruded aluminum casing withstands garage drops and vibrations',
    ],
    vehicleCompatibility: ['2-wheeler'],
    compatibilityTable: [
      { vehicleType: '2-wheeler', make: '48V Li-Ion Systems', model: '13S NMC lithium batteries (10Ah–25Ah)', notes: 'Verify DC plug type' },
    ],
    isActive: true,
  },
  {
    id: 'ev-chg-002',
    slug: 'industrial-commercial-fast-charger-60v-12a-3w',
    name: 'Industrial Commercial Fast Charger 60V 12A (3-Wheeler)',
    sku: 'EV-CHG-60-12A',
    division: 'ev-parts',
    category: 'chargers',
    brand: 'PAGE EV Parts',
    shortDescription: 'Heavy-duty 12A fast charger with digital voltage/amperage display, surge suppression, and dual temperature sensors for commercial e-rickshaws.',
    description: 'Designed for commercial fleet turnaround. Delivers full recharge to 40Ah LiFePO4 packs in under 3.5 hours, allowing operators to complete afternoon turnaround shifts with minimal downtime.',
    images: [
      { src: 'https://images.unsplash.com/photo-1558618047-f1bdc7ae48e5?w=800&auto=format&fit=crop&q=80', alt: 'Commercial Fast Charger 60V 12A', isPrimary: true },
    ],
    keySpecs: [
      { label: 'Output Current', value: '12.0', unit: 'Amperes' },
      { label: 'Working Voltage', value: '60V / 67.2V', unit: 'LiFePO4' },
      { label: 'Display Meter', value: 'Digital V/A', unit: 'Backlit LCD' },
    ],
    specGroups: [
      {
        group: 'Fleet Charging',
        items: [
          { label: 'Rated Power', value: '900 Watts' },
          { label: 'Input Protection', value: '4kV surge protection against grid spikes' },
          { label: 'Cable Length', value: '2.5m heavy-gauge output leads with Anderson connector' },
        ],
      },
    ],
    features: [
      'Dual digital meter shows live charging voltage, current, and accumulated amp-hours',
      'Heavy-duty rubberized corner bumpers for workshop durability',
      'Zero-voltage reverse connection spark-proof protection circuit',
    ],
    vehicleCompatibility: ['3-wheeler'],
    compatibilityTable: [
      { vehicleType: '3-wheeler', make: '60V LiFePO4 / Lead-Acid', model: '35Ah–60Ah 3-wheeler batteries', notes: 'Select chemistry switch' },
    ],
    badge: 'featured',
    isActive: true,
  },

  // ── DISPLAYS ──────────────────────────────────────────────
  {
    id: 'ev-disp-001',
    slug: 'high-contrast-lcd-speedometer-display-2w',
    name: 'High-Contrast LCD Digital Speedometer (2-Wheeler)',
    sku: 'EV-DISP-LCD-2W',
    division: 'ev-parts',
    category: 'displays',
    brand: 'PAGE EV Parts',
    shortDescription: 'Anti-glare high-contrast LCD handlebar display showing speed, odometer, 5-level PAS assist, battery capacity gauge, and error codes.',
    description: 'Clear, sunlight-readable handlebar display with integrated USB 5V charging port for mobile phones. Connects via waterproof Julet connector to compatible motor controllers.',
    images: [
      { src: 'https://images.unsplash.com/photo-1551978139-604a55f21c80?w=800&auto=format&fit=crop&q=80', alt: 'LCD Digital Speedometer', isPrimary: true },
    ],
    keySpecs: [
      { label: 'Screen Technology', value: 'Anti-Glare FSTN', unit: 'LCD' },
      { label: 'Voltage Compatibility', value: '36 / 48 / 60', unit: 'Volts auto' },
      { label: 'Handlebar Clamp', value: '22.2 / 31.8', unit: 'mm' },
      { label: 'Waterproof Grade', value: 'IP66', unit: 'Sealed' },
    ],
    specGroups: [
      {
        group: 'Display Metrics',
        items: [
          { label: 'Metrics Shown', value: 'Real-time speed, Max speed, Avg speed, ODO, Trip, Battery %' },
          { label: 'Communication Protocol', value: 'UART Protocol #2' },
          { label: 'Mobile Device Charging', value: '5V 1.0A USB output port' },
        ],
      },
    ],
    features: [
      'High-contrast inverted white-on-black digits clearly readable in direct sunlight',
      'Headlight indicator and automatic display backlight sensor',
      'Integrated 3-button control keypad for thumb-reach access while riding',
    ],
    vehicleCompatibility: ['2-wheeler'],
    compatibilityTable: [
      { vehicleType: '2-wheeler', make: 'Universal E-Bikes & Scooters', model: 'UART-compatible motor controllers', notes: '5-pin Julet connector' },
    ],
    isActive: true,
  },
  {
    id: 'ev-disp-002',
    slug: 'can-bus-color-dashboard-telematics-cluster-3w',
    name: 'Full-Color CAN Bus Telematics Dashboard Cluster (3-Wheeler)',
    sku: 'EV-DISP-CAN-3W',
    division: 'ev-parts',
    category: 'displays',
    brand: 'PAGE EV Parts',
    shortDescription: 'Automotive 5.5-inch color TFT digital instrument cluster with CAN bus communication, battery percentage, motor temp, and fault diagnosis alerts.',
    description: 'Upgrade commercial 3-wheelers from analog needle meters to professional digital telematics. Displays accurate battery state-of-charge from the BMS, motor temperature, gear position (D/N/R), and exact speed.',
    images: [
      { src: 'https://images.unsplash.com/photo-1551978139-604a55f21c80?w=800&auto=format&fit=crop&q=80', alt: 'Color Telematics Dashboard Cluster', isPrimary: true },
    ],
    keySpecs: [
      { label: 'Display Panel', value: '5.5-inch', unit: 'IPS Color TFT' },
      { label: 'Bus Communication', value: 'CAN 2.0B', unit: 'Automotive' },
      { label: 'Input Voltage', value: '48–72', unit: 'Volts DC' },
    ],
    specGroups: [
      {
        group: 'Telematics Interface',
        items: [
          { label: 'Screen Resolution', value: '800 × 480 high-brightness TFT' },
          { label: 'CAN Baud Rate', value: '250 kbps / 500 kbps selectable' },
          { label: 'Sensor Inputs', value: 'Pulse speed, analog brake, CAN BMS telemetry' },
        ],
      },
    ],
    features: [
      'Direct CAN bus communication with BMS eliminates inaccurate voltage-based battery guessing',
      'Real-time motor and controller temperature warning indicators prevent burnouts',
      'Automotive-grade hardened glass faceplate with anti-scratch coating',
    ],
    vehicleCompatibility: ['3-wheeler'],
    compatibilityTable: [
      { vehicleType: '3-wheeler', make: 'Modern E-Rickshaw Dashboards', model: 'Standard steering column mount bracket', notes: 'CAN wiring harness included' },
    ],
    badge: 'new',
    isActive: true,
  },

  // ── DC-DC CONVERTERS ──────────────────────────────────────
  {
    id: 'ev-dcdc-001',
    slug: 'waterproof-isolated-dc-dc-converter-60v-12v-10a',
    name: 'Waterproof Isolated DC-DC Converter 60V/72V to 12V 10A (Universal)',
    sku: 'EV-DCDC-60-12',
    division: 'ev-parts',
    category: 'dc-dc-converters',
    brand: 'PAGE EV Parts',
    shortDescription: 'Cast-aluminum potted waterproof step-down converter providing stable 12V 10A (120W) output for lights, horns, flashers, and audio on 2W & 3W EVs.',
    description: 'Essential for powering automotive 12V electrical accessories directly from the main high-voltage traction battery pack. Fully potted in thermal silicone resin to guarantee zero moisture intrusion even when submerged.',
    images: [
      { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80', alt: 'Waterproof DC-DC Converter', isPrimary: true },
    ],
    keySpecs: [
      { label: 'Input Voltage Range', value: '36–72', unit: 'Volts DC' },
      { label: 'Output Voltage', value: '12.0', unit: 'Volts DC ±0.2V' },
      { label: 'Rated Output Current', value: '10.0', unit: 'Amperes (120W)' },
      { label: 'Sealing Rating', value: 'IP67', unit: 'Waterproof' },
    ],
    specGroups: [
      {
        group: 'Power Conversion',
        items: [
          { label: 'Conversion Efficiency', value: '>93% at rated load' },
          { label: 'Quiescent Standby Current', value: '<5 mA' },
          { label: 'Short Circuit Protection', value: 'Self-recovery auto protection' },
          { label: 'Over-Temperature Protection', value: 'Thermal shutdown at 85°C' },
        ],
      },
    ],
    features: [
      'Universal input range accommodates 36V, 48V, 60V, and 72V traction battery packs',
      'Completely potted aluminum shell resists vibration, mud, and water splashes',
      'Provides clean, noise-free 12V DC power for headlights, blinkers, and horn',
    ],
    vehicleCompatibility: ['both'],
    compatibilityTable: [
      { vehicleType: '2-wheeler', make: 'Universal 2-Wheeler EVs', model: '36V–72V scooters and bikes', notes: 'Powers 12V lighting kits' },
      { vehicleType: '3-wheeler', make: 'Universal 3-Wheeler E-Rickshaws', model: 'All 48V–72V chassis', notes: 'Powers standard 12V auto bulbs' },
    ],
    isActive: true,
  },

  // ── WIRING & CONNECTORS ───────────────────────────────────
  {
    id: 'ev-wire-001',
    slug: 'waterproof-modular-ev-wiring-harness-kit-2w',
    name: 'Pre-Terminated Waterproof Modular EV Wiring Harness Kit (2-Wheeler)',
    sku: 'EV-WIRE-MOD-2W',
    division: 'ev-parts',
    category: 'wiring-connectors',
    brand: 'PAGE EV Parts',
    shortDescription: 'Complete plug-and-play wiring harness assembly featuring waterproof quick-disconnect Julet connectors, silicone heat-resistant insulation, and integrated 30A fuse.',
    description: 'Eliminates messy wire splicing and electrical shorts. Pre-measured and color-coded for 2-wheeler electric conversions and workshop rebuilds, connecting battery, motor, throttle, display, and brakes in minutes.',
    images: [
      { src: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop&q=80', alt: 'Modular EV Wiring Harness Kit', isPrimary: true },
    ],
    keySpecs: [
      { label: 'Connector Standard', value: 'Julet Waterproof', unit: 'IP66' },
      { label: 'Main Battery Lead', value: '12 AWG', unit: 'Silicone wire' },
      { label: 'Fuse Protection', value: '30A', unit: 'Maxi blade fuse' },
    ],
    specGroups: [
      {
        group: 'Wiring Architecture',
        items: [
          { label: 'Conductor Material', value: 'Tinned oxygen-free high-conductivity copper' },
          { label: 'Insulation Rating', value: '200°C flame-retardant silicone' },
          { label: 'Branch Connectors', value: '1-to-4 main trunk split with keyed color rings' },
        ],
      },
    ],
    features: [
      'Color-coded keyed waterproof connectors prevent incorrect pin mating',
      'Inline waterproof fuse holder protects battery from external dead shorts',
      'Abrasion-resistant braided nylon outer loom shields against frame rubbing',
    ],
    vehicleCompatibility: ['2-wheeler'],
    compatibilityTable: [
      { vehicleType: '2-wheeler', make: 'Standard E-Bike Conversion Kits', model: 'Fits 250W–1000W controller setups', notes: 'Plug-and-play' },
    ],
    isActive: true,
  },

  // ── MECHANICAL PARTS ──────────────────────────────────────
  {
    id: 'ev-mech-001',
    slug: 'reinforced-hydraulic-front-fork-assembly-2w',
    name: 'Reinforced Telescopic Hydraulic Front Fork Assembly (2-Wheeler)',
    sku: 'EV-MECH-FORK-2W',
    division: 'ev-parts',
    category: 'mechanical-parts',
    brand: 'PAGE EV Parts',
    shortDescription: 'Heavy-duty chrome-stanchion telescopic hydraulic suspension fork engineered to handle the additional weight and torque of front/rear hub motors.',
    description: 'Standard bicycle forks cannot withstand the rotational torque and axle stresses of hub motors. This reinforced chromoly fork features thicker 10mm torque dropouts and dual hydraulic damping for superior braking stability.',
    images: [
      { src: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&auto=format&fit=crop&q=80', alt: 'Reinforced Hydraulic Front Fork', isPrimary: true },
    ],
    keySpecs: [
      { label: 'Travel Distance', value: '100', unit: 'mm hydraulic' },
      { label: 'Stanchion Diameter', value: '32', unit: 'mm chrome' },
      { label: 'Axle Dropout', value: '10 mm', unit: 'Reinforced torque' },
    ],
    specGroups: [
      {
        group: 'Suspension Metrics',
        items: [
          { label: 'Spring Medium', value: 'Coil spring with internal hydraulic cartridge damper' },
          { label: 'Brake Mount', value: 'Post-mount disc brake (160mm / 180mm rotor)' },
          { label: 'Steerer Tube', value: '1-1/8 inch threadless chromoly steel' },
        ],
      },
    ],
    features: [
      'Reinforced dropouts resist motor axle twisting without auxiliary torque arms',
      'Hydraulic lockout lever allows stiffening on smooth paved roads',
      'Integrated internal cable routing guide for motor phase harness',
    ],
    vehicleCompatibility: ['2-wheeler'],
    compatibilityTable: [
      { vehicleType: '2-wheeler', make: '26" / 27.5" Electric Bicycles', model: 'Standard 1-1/8" head-tube frames', notes: 'Check steerer tube length' },
    ],
    isActive: true,
  },

  // ── ACCESSORIES ───────────────────────────────────────────
  {
    id: 'ev-acc-001',
    slug: 'hall-effect-twist-throttle-and-regen-brake-set',
    name: 'Hall-Effect Twist Throttle & Regenerative Brake Sensor Set (Universal)',
    sku: 'EV-ACC-TRB-SET',
    division: 'ev-parts',
    category: 'throttle-brake',
    brand: 'PAGE EV Parts',
    availability: 'In Stock',
    shortDescription: 'Ergonomic half-twist throttle grip with battery indicator switch plus forged aluminum brake levers with integrated waterproof magnetic cutout sensors.',
    description: 'Ensures instantaneous motor power cutoff the millisecond brake levers are compressed, triggering the controller regenerative braking circuit. Twist throttle features linear Hall-effect voltage output for smooth acceleration without jerky surges.',
    images: [
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80', alt: 'Twist Throttle & Brake Sensor Set', isPrimary: true },
    ],
    keySpecs: [
      { label: 'Throttle Sensor', value: 'Linear Hall', unit: '0.8V–4.2V' },
      { label: 'Brake Switch', value: 'Magnetic', unit: 'Instant cut' },
      { label: 'Handlebar Clamp', value: '22.2', unit: 'mm standard' },
    ],
    specGroups: [
      {
        group: 'Controls Architecture',
        items: [
          { label: 'Throttle Output Voltage', value: '0.8V idle to 4.2V full throttle' },
          { label: 'Brake Lever Material', value: 'Forged aluminum with rubberized finger grips' },
          { label: 'Wiring Connector', value: 'Waterproof 3-pin yellow (throttle) + 2-pin red (brake)' },
        ],
      },
    ],
    features: [
      'Immediate motor electrical cutoff protects motor and battery during sudden emergency braking',
      'Ergonomic half-twist grip prevents accidental wrist throttle engagement over bumps',
      'Integrated power on/off rocker switch for ignition control',
    ],
    vehicleCompatibility: ['both'],
    compatibilityTable: [
      { vehicleType: '2-wheeler', make: 'Universal 2-Wheelers', model: 'All 22.2mm standard handlebar diameters', notes: 'Direct clamp fit' },
      { vehicleType: '3-wheeler', make: 'Handlebar E-Rickshaws', model: 'Motorcycle handlebar style rickshaws', notes: 'Standard fit' },
    ],
    badge: 'featured',
    isActive: true,
  },

  // ── ACCESSORIES ───────────────────────────────────────────
  {
    id: 'ev-acc-002',
    slug: 'anti-theft-vibration-alarm-and-digital-keyless-remote',
    name: 'Smart Anti-Theft Alarm & Digital Keyless Ignition (Universal)',
    sku: 'EV-ACC-ALM-KEY',
    division: 'ev-parts',
    category: 'accessories',
    brand: 'PAGE EV Parts',
    availability: 'In Stock',
    shortDescription: '125dB waterproof vibration alarm module with dual wireless keyfobs, motor electronic lock trigger, and remote start ignition.',
    description: 'Provides active electronic theft deterrent for electric 2-wheelers and 3-wheelers. Connects directly to the controller alarm port to trigger immediate wheel locking and high-pitch siren on unauthorized movement.',
    images: [
      { src: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format&fit=crop&q=80', alt: 'Anti-Theft Vibration Alarm', isPrimary: true },
    ],
    keySpecs: [
      { label: 'Siren Sound Level', value: '125', unit: 'dB' },
      { label: 'Operating Voltage', value: '36–72', unit: 'Volts DC auto' },
      { label: 'Wireless Range', value: '50', unit: 'meters' },
    ],
    specGroups: [
      {
        group: 'Security Features',
        items: [
          { label: 'Sound Pressure Level', value: '125 dB piezoceramic horn' },
          { label: 'Quiescent Standby Current', value: '<6 mA' },
          { label: 'Keyfob Frequency', value: '433.92 MHz rolling code' },
        ],
      },
    ],
    features: [
      'Automatic motor anti-theft phase-lock engages on unauthorized movement',
      'Dual ergonomic rolling-code keyless remote control fobs included',
      'One-touch remote keyless ignition for instant vehicle start',
    ],
    vehicleCompatibility: ['both'],
    compatibilityTable: [
      { vehicleType: '2-wheeler', make: 'All Electric 2Ws', model: 'Controllers with 5-pin alarm connector', notes: 'Plug & Play' },
      { vehicleType: '3-wheeler', make: 'All Commercial 3Ws', model: 'Controllers with 5-pin alarm connector', notes: 'Plug & Play' },
    ],
    isActive: true,
  },

  // ── 72V 2000W HIGH-POWER MOTOR ────────────────────────────
  {
    id: 'ev-mot-003',
    slug: 'bldc-high-power-motor-72v-2000w',
    name: 'High-Torque BLDC Powertrain Motor 72V 2000W (Universal)',
    sku: 'EV-MOT-2000-72V',
    division: 'ev-parts',
    category: 'motors',
    brand: 'PAGE EV Parts',
    availability: 'In Stock',
    shortDescription: 'High-torque 72V 2000W brushless DC motor engineered for high-speed electric motorbikes and heavy commercial cargo 3-wheelers.',
    description: 'Engineered for extreme performance and continuous steep-incline hauling. Features neodymium N45UH high-temperature magnets and forced ventilation channels for unmatched thermal endurance under heavy commercial loads.',
    images: [
      { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80', alt: '72V 2000W BLDC Motor', isPrimary: true },
    ],
    keySpecs: [
      { label: 'Rated Power', value: '2,000', unit: 'Watts' },
      { label: 'Operating Voltage', value: '72', unit: 'Volts DC' },
      { label: 'Max Torque', value: '160', unit: 'Nm' },
      { label: 'Efficiency', value: '>90', unit: '%' },
    ],
    specGroups: [
      {
        group: 'Performance Metrics',
        items: [
          { label: 'Continuous Output', value: '2,000 Watts' },
          { label: 'Peak Power Output', value: '4,500 Watts' },
          { label: 'Thermal Magnet Grade', value: 'N45UH rated to 180°C' },
          { label: 'Shaft Spline Spec', value: '16-tooth differential spline / axle mount' },
        ],
      },
    ],
    features: [
      'High-grade Neodymium magnets deliver massive 160 Nm peak torque',
      'Double row sealed Japanese NSK bearings ensure long service lifetime',
      'Dual redundant Hall sensor arrays ensure zero downtime on trail or job',
    ],
    vehicleCompatibility: ['both'],
    compatibilityTable: [
      { vehicleType: '2-wheeler', make: 'High-Performance 2Ws', model: '72V electric motorbikes and heavy delivery scooters', notes: 'Requires 50A+ controller' },
      { vehicleType: '3-wheeler', make: 'Heavy Cargo Loaders', model: '72V heavy duty commercial cargo carriers', notes: 'Differential spline fit' },
    ],
    badge: 'new',
    isActive: true,
  },
];

export function getAllEVProducts(): Product[] {
  return evProducts.filter((p) => p.isActive);
}

export function getEVProductBySlug(slug: string): Product | undefined {
  return evProducts.find((p) => p.slug === slug);
}

export function getEVProductsByCategory(category: string): Product[] {
  return evProducts.filter((p) => (p.category === category || (category === 'all')) && p.isActive);
}

export function getEVProductsByVehicleType(type: '2-wheeler' | '3-wheeler' | 'both' | 'all'): Product[] {
  if (type === 'all' || type === 'both') {
    return evProducts.filter((p) => p.isActive);
  }
  return evProducts.filter(
    (p) =>
      p.isActive &&
      p.vehicleCompatibility &&
      (p.vehicleCompatibility.includes(type) || p.vehicleCompatibility.includes('both'))
  );
}

export function getFeaturedEVProducts(limit = 6): Product[] {
  return evProducts.filter((p) => p.isActive && p.badge === 'featured').slice(0, limit);
}

