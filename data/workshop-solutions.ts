import { WorkshopSolution } from '@/types';

export const workshopSolutions: WorkshopSolution[] = [
  {
    id: 'new-workshop-setup',
    slug: 'new-workshop-setup',
    title: 'New Workshop Setup',
    subtitle: 'Turnkey facility engineering & installation',
    icon: 'Building2',
    shortDescription: 'From architectural bay planning to certified commissioning — comprehensive workshop deployment from a single expert partner.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80',
    includes: [
      'Site layout blueprint & bay optimization',
      'Power, pneumatic & foundation requirement specs',
      'Authorized equipment supply & precision installation',
      'Comprehensive technician training on all systems',
      'Post-commissioning performance audit',
    ],
    processSteps: [
      { step: 1, title: 'Facility Assessment', description: 'Evaluation of site geometry, workflow requirements, and expected vehicle turnaround volume.' },
      { step: 2, title: 'Engineering & Equipment Plan', description: 'CAD bay layout planning, utility distribution design, and equipment specification matching.' },
      { step: 3, title: 'Installation & Handover', description: 'Rigorous mechanical installation, electronic calibration, safety checks, and staff certification.' },
    ],
  },
  {
    id: 'workshop-upgrade',
    slug: 'workshop-upgrade',
    title: 'Workshop Upgrade',
    subtitle: 'Modernization of existing service infrastructure',
    icon: 'TrendingUp',
    shortDescription: 'Modernize legacy workshops with high-throughput lifts, digital aligners, and computerized diagnostic stations.',
    image: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&auto=format&fit=crop&q=80',
    includes: [
      'Current equipment diagnostic audit',
      'Phased replacement schedule to preserve uptime',
      'Decommissioning and safe removal of obsolete gear',
      'Integration of high-precision digital equipment',
      'Staff retraining on modern diagnostic workflows',
    ],
    processSteps: [
      { step: 1, title: 'Audit & Gap Analysis', description: 'Detailed inspection of existing equipment age, accuracy, and workflow bottlenecks.' },
      { step: 2, title: 'Phased Modernization Blueprint', description: 'Strategic scheduling ensuring workshops remain operational throughout upgrades.' },
      { step: 3, title: 'Execution & Calibration', description: 'Rapid swap-out, precision laser alignment, and workflow optimization.' },
    ],
  },
  {
    id: 'ev-workshop-setup',
    slug: 'ev-workshop-setup',
    title: 'EV Workshop Setup',
    subtitle: 'Specialized electric vehicle service bays',
    icon: 'Zap',
    shortDescription: 'Purpose-built service infrastructure for 2W, 3W, and passenger electric vehicles, including insulated tooling and battery handling.',
    image: 'https://images.unsplash.com/photo-1581092334651-ddf19d564b47?w=800&auto=format&fit=crop&q=80',
    includes: [
      'High-voltage safety zone demarcation & protocols',
      'VDE 1000V insulated tooling and PPE equipment',
      'Battery module lifting & safe isolation benches',
      'Diagnostic telemetry and battery balancing systems',
      'Dedicated charging infrastructure integration',
    ],
    processSteps: [
      { step: 1, title: 'Safety Protocol Planning', description: 'Designing high-voltage safety zones, emergency disconnects, and isolation spaces.' },
      { step: 2, title: 'Specialized EV Tooling', description: 'Outfitting technicians with certified insulated hand tools, diagnostics, and battery hoists.' },
      { step: 3, title: 'Safety Certification & Training', description: 'Operational safety protocols, emergency response drills, and battery maintenance training.' },
    ],
  },
  {
    id: 'diagnostic-center-setup',
    slug: 'diagnostic-center-setup',
    title: 'Diagnostic Center Setup',
    subtitle: 'Advanced electronic fault detection & ADAS lab',
    icon: 'ScanLine',
    shortDescription: 'Transform standard bays into premier automotive diagnostic hubs with multi-brand scanners and precision ADAS calibration.',
    image: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=800&auto=format&fit=crop&q=80',
    includes: [
      'Multi-protocol scan tool infrastructure (CAN FD, DoIP)',
      'Static ADAS calibration frame and target systems',
      'Level calibration floor surfacing verification',
      'Cloud reporting and OEM subscription setup',
      'Technician advanced diagnostics masterclass',
    ],
    processSteps: [
      { step: 1, title: 'Space & Level Certification', description: 'Verifying floor tolerance and lighting requirements for optical ADAS calibration.' },
      { step: 2, title: 'System Installation', description: 'Mounting laser frames, configuring wireless VCI modules, and setting up diagnostic terminals.' },
      { step: 3, title: 'Validation Testing', description: 'Running baseline calibrations across multiple vehicle makes to verify precision.' },
    ],
  },
  {
    id: 'tyre-service-center',
    slug: 'tyre-service-center',
    title: 'Tyre Service Center',
    subtitle: 'High-volume wheel service bay configuration',
    icon: 'Disc',
    shortDescription: 'Engineered for rapid wheel turnaround: pneumatic tyre changers, laser balancers, and drive-on 3D alignment lifts.',
    image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&auto=format&fit=crop&q=80',
    includes: [
      'Pneumatic helper-arm changer placement',
      'High-speed touch-free balancer setup',
      '3D drive-on alignment lift integration',
      'Tyre storage racking and inflation cages',
      'Ergonomic workflow layout to minimize technician fatigue',
    ],
    processSteps: [
      { step: 1, title: 'Turnaround Volume Analysis', description: 'Sizing machinery for peak hourly wheel throughput requirements.' },
      { step: 2, title: 'Machinery Deployment', description: 'Bolting, anchoring, pneumatic air supply line balancing, and calibration.' },
      { step: 3, title: 'Workflow Dry-Run', description: 'Optimizing the wheel journey from dismount to laser balance to final torque check.' },
    ],
  },
  {
    id: 'custom-solutions',
    slug: 'custom-solutions',
    title: 'Custom Workshop Solutions',
    subtitle: 'Tailored industrial automotive engineering',
    icon: 'Settings',
    shortDescription: 'Custom engineering solutions for fleet maintenance depots, government inspection lanes, and specialized assembly workshops.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&auto=format&fit=crop&q=80',
    includes: [
      'Custom vehicle footprint accommodations',
      'Heavy-duty commercial fleet lifting solutions',
      'Automated testing lane integration',
      'Dedicated spare parts inventory planning',
      'Long-term SLA maintenance contracts',
    ],
    processSteps: [
      { step: 1, title: 'Bespoke Consultation', description: 'In-depth engineering review of unique fleet configurations and constraints.' },
      { step: 2, title: 'Custom Solution Design', description: 'Bespoke machinery procurement and custom fabrication where needed.' },
      { step: 3, title: 'Project Management & Delivery', description: 'Dedicated engineering oversight through to complete operational sign-off.' },
    ],
  },

];

export function getSolutionBySlug(slug: string): WorkshopSolution | undefined {
  return workshopSolutions.find((s) => s.slug === slug);
}
