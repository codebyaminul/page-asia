import { NavItem } from '@/types';

export const navigationItems: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Products',
    href: '/garage-equipment',
    hasMegaMenu: true,
    megaMenuVariant: 'garage', // Will show the unified dual-division mega menu
    megaMenuGroups: [
      {
        heading: 'Garage Equipment',
        items: [
          { label: 'Lifting Equipment', href: '/garage-equipment/lifting-equipment', description: 'Two-post, four-post & scissor lifts' },
          { label: 'Wheel Alignment', href: '/garage-equipment/wheel-alignment', description: '3D & CCD optical alignment systems' },
          { label: 'Wheel Balancers', href: '/garage-equipment/wheel-balancers', description: 'Automatic digital wheel balancers' },
          { label: 'Tyre Changers', href: '/garage-equipment/tyre-changers', description: 'Pneumatic & run-flat tyre machines' },
          { label: 'Diagnostic Equipment', href: '/garage-equipment/diagnostic-equipment', description: 'Multi-brand OEM scan tools' },
          { label: 'ADAS Calibration', href: '/garage-equipment/adas-calibration', description: 'Static & dynamic ADAS target frames' },
          { label: 'Maintenance Equipment', href: '/garage-equipment/maintenance-equipment', description: 'A/C stations & ATF flushers' },
          { label: 'Workshop Equipment', href: '/garage-equipment/workshop-equipment', description: 'Industrial screw compressors & jacks' },
        ],
      },
      {
        heading: 'EV Parts Division',
        items: [
          { label: '2-Wheeler EV Parts', href: '/ev-parts/2-wheeler', description: 'Powertrains for e-bikes & scooters' },
          { label: '3-Wheeler EV Parts', href: '/ev-parts/3-wheeler', description: 'Heavy powertrains for e-rickshaws' },
          { label: 'BLDC Motors', href: '/ev-parts/2-wheeler?category=motors', description: 'Hub & mid-drive motors 250W–2000W' },
          { label: 'Motor Controllers', href: '/ev-parts/2-wheeler?category=controllers', description: 'Sinusoidal FOC & CAN bus drives' },
          { label: 'Lithium Batteries', href: '/ev-parts/2-wheeler?category=batteries', description: 'Li-ion & LiFePO4 commercial packs' },
          { label: 'Smart Fast Chargers', href: '/ev-parts/2-wheeler?category=chargers', description: 'CC/CV multi-stage chargers' },
          { label: 'Displays & Speedometers', href: '/ev-parts/2-wheeler?category=displays', description: 'LCD & digital dash clusters' },
          { label: 'DC-DC Converters', href: '/ev-parts/2-wheeler?category=dc-dc-converters', description: '12V auxiliary power & harnesses' },
        ],
      },

    ],
  },
  {
    label: 'Solutions',
    href: '/solutions',
  },
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'Brands',
    href: '/brands',
  },
  {
    label: 'Projects',
    href: '/projects',
  },

  {
    label: 'About Us',
    href: '/about',
  },
  {
    label: 'News & Insights',
    href: '/news',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];
