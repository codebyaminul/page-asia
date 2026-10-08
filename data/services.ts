import { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'installation-commissioning',
    slug: 'installation-commissioning',
    title: 'Installation & Commissioning',
    icon: 'Wrench',
    description: 'Factory-certified technical engineers handle site inspection, anchoring, electrical hookup, and precision calibration.',
    details: [
      'Structural foundation and load-bearing inspection',
      'Precision laser alignment and mechanical leveling',
      'Electrical, pneumatic, and hydraulic hookup',
      'Full-load safety drop tests and emergency stop certification',
      'Formal commissioning documentation and warranty activation',
    ],
  },
  {
    id: 'maintenance-repair',
    slug: 'maintenance-repair',
    title: 'Maintenance & Repair',
    icon: 'Settings',
    description: 'Scheduled preventive maintenance programs and rapid breakdown response to protect workshop productivity.',
    details: [
      'Preventive maintenance schedules (quarterly / semi-annual)',
      'Hydraulic seal replacement, fluid flushing, and cable tensioning',
      'Rapid on-site emergency repair dispatch',
      'OEM diagnostic troubleshooting for computerized equipment',
      'Detailed service logs to support insurance and safety audits',
    ],
  },
  {
    id: 'technical-support',
    slug: 'technical-support',
    title: 'Technical Support',
    icon: 'Headphones',
    description: 'Direct phone and remote diagnostic support from experienced automotive engineers with 15+ years of field experience.',
    details: [
      'Dedicated technical hotline for active workshops',
      'Remote desktop diagnostic support for scan tools and ADAS systems',
      'Software firmware updates and OEM protocol patch installation',
      'Wiring and circuit troubleshooting assistance for EV components',
      'Direct factory escalation channels with brand manufacturers',
    ],
  },
  {
    id: 'training-programs',
    slug: 'training-programs',
    title: 'Training Programs',
    icon: 'GraduationCap',
    description: 'Hands-on operational and safety training ensuring your technicians operate modern equipment at peak efficiency.',
    details: [
      'Equipment operational training for technicians of all skill levels',
      '3D wheel alignment reading and geometry adjustment masterclasses',
      'Modern oscilloscope and CAN bus diagnostic training',
      'High-voltage safety procedures for electric vehicle maintenance',
      'Course completion certification for workshop credentials',
    ],
  },
  {
    id: 'after-sales-service',
    slug: 'after-sales-service',
    title: 'After-Sales Service',
    icon: 'ShieldCheck',
    description: 'End-to-end warranty management, equipment health monitoring, and long-term partnership support.',
    details: [
      'Authorized warranty claim processing without bureaucratic delays',
      'Equipment health assessment reports during regular checkups',
      'Lifecycle planning and trade-in consultation for older units',
      'SLA agreements customized to individual workshop hours',
      'Dedicated relationship manager for enterprise fleet clients',
    ],
  },
  {
    id: 'spare-parts-support',
    slug: 'spare-parts-support',
    title: 'Spare Parts Support',
    icon: 'Package',
    description: 'Central inventory of genuine replacement parts for all distributed brands to guarantee minimum equipment downtime.',
    details: [
      '100% genuine replacement seals, cables, valves, and boards',
      'Stocked inventory for fast-wearing consumable items',
      'Express sourcing for rare or legacy machine components',
      'EV replacement motor controllers, throttles, and wiring harnesses',
      'Guaranteed fitment and warranty on installed replacement parts',
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
