import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'proj-001',
    slug: 'commercial-dealership-turnkey-setup',
    title: 'Multi-Bay Commercial Service Hub',
    projectType: 'New Workshop Setup',
    solutionProvided: 'Turnkey 8-Bay Facility Infrastructure',
    sector: 'Commercial Automotive Dealership',
    description: 'Complete engineering deployment of an 8-bay multi-brand service facility featuring two-post electro-hydraulic lifts, dedicated 3D wheel alignment lane, and central compressed air distribution.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80',
    equipmentInstalled: [
      '4x ATS Elgi Two-Post Electro-Hydraulic 4T Lifts',
      '1x SmartSafe 3D High-Definition Wheel Alignment System',
      '2x ATS Elgi Automatic Helper-Arm Tyre Changers',
      '1x WIPRO 200L Industrial Air Compression Station',
    ],
    results: [
      '8 active vehicle bays operational with zero foundation interference',
      'Overhead pneumatic reel distribution across all service bays',
      'Full technical certification completed for 12 workshop staff',
    ],
    isPrototypeCaseStudy: true,
  },
  {
    id: 'proj-002',
    slug: 'ev-fleet-retrofit-and-service-bay',
    title: 'Dedicated 2W & 3W EV Fleet Service Center',
    projectType: 'EV Workshop Setup',
    solutionProvided: 'High-Voltage Safety & Battery Service Bay',
    sector: 'Electric Mobility Fleet Operations',
    description: 'Prototype deployment of a specialized electric vehicle maintenance bay equipped with VDE 1000V insulated hand tools, battery balancing stations, and diagnostic telemetry consoles.',
    image: 'https://images.unsplash.com/photo-1581092334651-ddf19d564b47?w=800&auto=format&fit=crop&q=80',
    equipmentInstalled: [
      'Dedicated high-voltage safety zone demarcation barriers',
      'VDE 1000V certified technician tooling suite',
      'LiFePO4 battery pack test and balancing bench',
      'CAN bus diagnostic telemetry scanners',
    ],
    results: [
      'Sub-2-hour battery diagnostic and balancing turnaround',
      'Integrated fire-suppression isolation cart for cell safety',
      'Full EV high-voltage safety protocol compliance',
    ],
    isPrototypeCaseStudy: true,
  },
  {
    id: 'proj-003',
    slug: 'high-volume-express-tyre-hub',
    title: 'High-Throughput Express Wheel Center',
    projectType: 'Tyre Service Center',
    solutionProvided: 'Drive-On 3D Alignment & Wheel Service Bay',
    sector: 'Express Automotive Service Center',
    description: 'Optimized rapid-turnaround tyre service line incorporating four-post drive-on alignment lifts, touchless laser wheel balancers, and pneumatic bead-blaster mounting stations.',
    image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&auto=format&fit=crop&q=80',
    equipmentInstalled: [
      '1x ATS Elgi Four-Post Drive-On Alignment Lift 4T',
      '1x SmartSafe Pro 3D Optical Alignment System',
      '2x ATS Elgi WB-50 Automatic Laser Wheel Balancers',
      '2x TC-60 Helper-Arm Tyre Changers with Bead Blaster',
    ],
    results: [
      '15-minute average cycle time per 4-wheel alignment check',
      'Touchless balancing eliminated rim scuffing on premium alloy wheels',
      'Continuous pneumatic line pressure maintained at 9.5 bar',
    ],
    isPrototypeCaseStudy: true,
  },
  {
    id: 'proj-004',
    slug: 'advanced-adas-calibration-lab',
    title: 'Level-Certified ADAS Diagnostic Laboratory',
    projectType: 'Diagnostic Center Setup',
    solutionProvided: 'Static Laser ADAS Calibration Frame & Scanners',
    sector: 'Collision Repair & Insurance Recalibration',
    description: 'Precision laboratory bay designed to manufacturer tolerances for camera, radar, and LiDAR sensor recalibration following collision repair and windscreen replacement.',
    image: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800&auto=format&fit=crop&q=80',
    equipmentInstalled: [
      'SmartSafe ADAS Calibration Frame Pro with Multi-Target Boards',
      'LAUNCH X-431 Pro5 Multi-Protocol Diagnostic Scanner',
      'Precision laser centering distance measurement kits',
    ],
    results: [
      'Sub-millimeter camera target alignment repeatability',
      'OEM calibration validation reports printed directly for vehicle owners',
      'Coverage across Asian and European manufacturer protocols',
    ],
    isPrototypeCaseStudy: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
