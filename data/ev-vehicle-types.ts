export interface EVVehicleType {
  id: '2-wheeler' | '3-wheeler';
  slug: string;
  name: string;
  subtitle: string;
  badge: string;
  description: string;
  image: string;
  applications: string[];
  voltageStandards: string[];
  commonComponents: string[];
}

export const evVehicleTypes: EVVehicleType[] = [
  {
    id: '2-wheeler',
    slug: '2-wheeler',
    name: '2-Wheeler EV',
    subtitle: 'Electric Motorcycles, Scooters & E-Bikes',
    badge: 'Light Mobility',
    description: 'Specialized high-efficiency powertrain components, lightweight lithium battery packs, intelligent FOC motor controllers, and plug-and-play wiring for electric scooters, motorbikes, and pedal-assist cycles.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&auto=format&fit=crop&q=80',
    applications: [
      'Urban Electric Scooters (48V / 60V)',
      'High-Performance E-Motorcycles (72V)',
      'Pedal-Assist Cargo & Commuter E-Bikes (36V / 48V)',
      'Last-Mile Commercial Delivery Fleets',
    ],
    voltageStandards: ['36V', '48V', '60V', '72V'],
    commonComponents: [
      'Geared & Direct-Drive Hub Motors',
      'Sinusoidal FOC Controllers (15A–45A)',
      '48V 20Ah / 60V 30Ah Li-ion Packs',
      'Regenerative Brake Levers & Hall Throttles',
    ],
  },
  {
    id: '3-wheeler',
    slug: '3-wheeler',
    name: '3-Wheeler EV',
    subtitle: 'Electric Rickshaws, Cargo Loaders & Transit Trikes',
    badge: 'Commercial Fleet',
    description: 'Heavy-duty differential drive powertrains, high-capacity deep-cycle LiFePO4 battery banks, high-current CAN bus controllers, and robust DC-DC converters engineered for continuous passenger and freight duty.',
    image: 'https://images.unsplash.com/photo-1581092334651-ddf19d564b47?w=1000&auto=format&fit=crop&q=80',
    applications: [
      'Passenger E-Rickshaws (48V / 60V 1000W–1500W)',
      'Heavy Cargo Flatbeds & Delivery Vans (60V / 72V)',
      'Municipal Waste & Utility Trikes',
      'Retrofit Commercial Auto-Rickshaws',
    ],
    voltageStandards: ['48V', '60V', '72V'],
    commonComponents: [
      'High-Torque Differential BLDC Motors (1000W–2200W)',
      'Heavy-Duty CAN Bus Vector Drives (45A–120A)',
      '60V 40Ah / 72V 50Ah LiFePO4 Deep-Cycle Packs',
      'Automotive 12V Auxiliary Isolated Converters',
    ],
  },
];

export function getEVVehicleTypeBySlug(slug: string): EVVehicleType | undefined {
  return evVehicleTypes.find((v) => v.slug === slug || v.id === slug);
}
