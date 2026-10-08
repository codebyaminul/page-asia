import { Brand } from '@/types';

export const brands: Brand[] = [
  {
    id: 'launch',
    name: 'LAUNCH',
    logoText: 'LAUNCH',
    country: 'International',
    isAuthorized: true,
    categories: ['diagnostic-equipment', 'wheel-alignment', 'adas-calibration'],
    description: 'Global benchmark in automotive diagnostic equipment, ADAS calibration and workshop scan tools.',
  },
  {
    id: 'ats-elgi',
    name: 'ATS Elgi',
    logoText: 'ATS ELGI',
    country: 'India',
    isAuthorized: true,
    categories: ['lifting-equipment', 'wheel-balancers', 'tyre-changers', 'maintenance-equipment'],
    description: 'Premier manufacturer of heavy-duty lifting equipment, tyre service machines and garage infrastructure.',
  },
  {
    id: 'smartsafe',
    name: 'SmartSafe',
    logoText: 'SmartSafe',
    country: 'International',
    isAuthorized: true,
    categories: ['adas-calibration', 'diagnostic-equipment', 'wheel-alignment'],
    description: 'Pioneering ADAS calibration frames, laser positioning alignment and automotive safety electronics.',
  },
  {
    id: 'wipro',
    name: 'WIPRO Enterprises',
    logoText: 'WIPRO',
    country: 'India',
    isAuthorized: true,
    categories: ['maintenance-equipment', 'workshop-equipment'],
    description: 'Industrial-grade maintenance solutions, hydraulic fluid handling and workshop service systems.',
  },
];

export function getBrandById(id: string): Brand | undefined {
  return brands.find((b) => b.id === id);
}

export function getBrandByName(name: string): Brand | undefined {
  return brands.find((b) => b.name.toLowerCase() === name.toLowerCase());
}
