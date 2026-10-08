import { NewsArticle } from '@/types';

export const newsArticles: NewsArticle[] = [
  {
    id: 'news-001',
    slug: 'the-rise-of-2w-3w-electric-mobility-infrastructure',
    title: 'The Rapid Evolution of 2-Wheeler & 3-Wheeler EV Infrastructure in South Asia',
    category: 'EV Mobility',
    date: 'October 4, 2026',
    readTime: '4 min read',
    excerpt: 'How commercial fleets and urban workshops are modernizing their powertrain replacement cycles with high-efficiency BLDC motors and intelligent lithium storage.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80',
    author: 'Technical Insights Team',
    tags: ['Electric Mobility', 'Powertrains', 'Fleet Maintenance', 'Lithium Batteries'],
    content: [
      'The transition toward electric two-wheelers and three-wheelers across South Asia is no longer an experimental trial — it has become an economic imperative driven by commercial fleet turnaround times and total cost of ownership.',
      'Unlike private consumer vehicles, commercial e-rickshaws and delivery scooters operate for 12 to 16 hours daily. This intensive cycle demands industrial-grade component reliability: sinusoidal FOC motor controllers that do not overheat in urban traffic, sealed IP65 motor casings, and deep-cycle LiFePO4 batteries with robust BMS monitoring.',
      'PAGE International is helping workshops bridge the technical gap between traditional internal combustion maintenance and high-voltage electric powertrain diagnostics, supplying certified componentry and structured retrofit guidance.',
    ],
  },
  {
    id: 'news-002',
    slug: 'why-adas-calibration-is-essential-for-modern-workshops',
    title: 'Why Static & Dynamic ADAS Calibration Has Become Non-Negotiable',
    category: 'Garage Technology',
    date: 'September 28, 2026',
    readTime: '5 min read',
    excerpt: 'Modern vehicles rely on radar and forward cameras for emergency braking and lane keeping. A misalignment of just 1 millimeter can distort sensor field of view by meters down the road.',
    image: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800&auto=format&fit=crop&q=80',
    author: 'Diagnostics Engineering Group',
    tags: ['ADAS', 'Safety Systems', 'Laser Calibration', 'Diagnostic Tools'],
    content: [
      'Advanced Driver Assistance Systems (ADAS) are now standard equipment on passenger and light commercial vehicles. Forward collision warning, autonomous emergency braking, and adaptive cruise control all rely on windscreen cameras and bumper radar sensors.',
      'Whenever a windscreen is replaced, a bumper repaired, or wheel alignment adjusted, the mechanical reference frame of these sensors shifts. Failure to perform a certified calibration can cause false alarms or delayed emergency braking.',
      'State-of-the-art static calibration frames, such as SmartSafe target systems distributed by PAGE International, use precision laser centering to calibrate camera angles to exact OEM specifications, generating verifiable validation certificates for vehicle owners.',
    ],
  },
  {
    id: 'news-003',
    slug: 'optimizing-workshop-bay-layout-for-maximum-throughput',
    title: 'Engineering High-Efficiency Workshop Bays: Site Layout & Workflow Optimization',
    category: 'Workshop Solutions',
    date: 'September 15, 2026',
    readTime: '6 min read',
    excerpt: 'Strategic placement of two-post hoists, pneumatic air loops, and 3D alignment bays can increase workshop vehicle turnaround capacity by over 30%.',
    image: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&auto=format&fit=crop&q=80',
    author: 'Workshop Design Bureau',
    tags: ['Workshop Design', 'Turnkey Setup', 'Productivity', 'Lifting Equipment'],
    content: [
      'The revenue capacity of an automotive workshop is fundamentally constrained by vehicle dwell time in service bays. Bottlenecks often arise not from technician speed, but from poor architectural layout — such as vehicle reversing conflicts, distant pneumatic air drops, or uncoordinated alignment bays.',
      'In professional workshop planning, bays should follow a logical progressive flow: quick-check inspection and diagnostic scan at entry, mechanical lifts in central rows, and wheel service and alignment nearest the exit.',
      'PAGE International turnkey setup services combine CAD floor planning with structural load-bearing analysis to ensure workshops maximize throughput while upholding strict occupational safety guidelines.',
    ],
  },
  {
    id: 'news-004',
    slug: 'preventive-maintenance-best-practices-for-hydraulic-lifts',
    title: 'Preventive Maintenance Protocols for Electro-Hydraulic Vehicle Lifts',
    category: 'Automotive',
    date: 'August 30, 2026',
    readTime: '4 min read',
    excerpt: 'Essential checklist for workshop managers: daily safety lock inspection, monthly synchronization cable checks, and annual hydraulic oil replacement.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80',
    author: 'Field Service Engineers',
    tags: ['Maintenance', 'Safety', 'Two-Post Lifts', 'Hydraulic Systems'],
    content: [
      'Vehicle lifts are the workhorses of any automotive workshop, but they are also safety-critical lifting devices operating under heavy cyclical loads. Regular preventive maintenance is essential to avoid unexpected breakdown downtime and ensure technician safety.',
      'Daily operational checks should always include mechanical lock engagement verification, visual inspection of arm restraint teeth, and checking for hydraulic fluid seepage around cylinder packings.',
      'Our dedicated after-sales engineering team provides quarterly preventive maintenance visits and genuine replacement seals to keep lifts operating smoothly for years of trouble-free service.',
    ],
  },
  {
    id: 'news-005',
    slug: 'page-international-expands-ev-parts-portfolio',
    title: 'PAGE International Broadens Component Sourcing for Commercial EV Fleets',
    category: 'Company Updates',
    date: 'August 12, 2026',
    readTime: '3 min read',
    excerpt: 'Announcing an expanded catalog of high-torque BLDC powertrain assemblies, vector motor controllers, and deep-cycle battery systems for 2-wheeler and 3-wheeler mobility.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    author: 'PAGE Editorial',
    tags: ['Company News', 'EV Parts', 'Expansion', 'Commercial Mobility'],
    content: [
      'In response to surging demand across commercial delivery fleets and municipal transit operators, PAGE International has expanded its specialized Electric Vehicle Parts division.',
      'The new catalog includes matched powertrain packages combining high-efficiency BLDC hub and differential motors with sinusoidal FOC motor controllers, pre-terminated wiring harnesses, and high-voltage DC-DC converters.',
      'Workshops and commercial fleet operators can now explore the full components portfolio through our modern digital platform or request tailored wholesale quotation packages.',
    ],
  },
];

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}

export function getNewsArticlesByCategory(category: string): NewsArticle[] {
  if (category === 'all') return newsArticles;
  return newsArticles.filter((a) => a.category === category);
}
