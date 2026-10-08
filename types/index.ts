// ============================================================
// PAGE International — Core TypeScript Interfaces
// ============================================================

export type Division = 'garage-equipment' | 'ev-parts';
export type VehicleType = '2-wheeler' | '3-wheeler' | 'both';
export type ProductBadge = 'new' | 'featured';
export type DownloadType = 'brochure' | 'datasheet' | 'manual';

export interface ProductImage {
  src: string;
  alt: string;
  isPrimary: boolean;
}

export interface SpecItem {
  label: string;
  value: string;
  unit?: string;
}

export interface SpecGroup {
  group?: string;
  items: SpecItem[];
}

export interface Download {
  label: string;
  type: DownloadType;
  url: string; // '#' placeholder in prototype
  size?: string;
}

export interface CompatibilityEntry {
  vehicleType: '2-wheeler' | '3-wheeler';
  make: string;
  model: string;
  notes?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  division: Division;
  category: string; // slug e.g. 'lifting-equipment'
  subcategory?: string;
  equipmentType?: string;
  application?: string;
  availability?: string; // 'In Stock' | 'Available on Order' | 'Lead Time: 2-3 Weeks'
  brand: string;
  shortDescription: string;
  description: string;
  images: ProductImage[];
  keySpecs: SpecItem[]; // 3-5 shown on card & info panel
  specGroups: SpecGroup[]; // full grouped specs for spec tab
  features: string[];
  applications?: string[];
  // EV-only
  vehicleCompatibility?: VehicleType[];
  compatibilityTable?: CompatibilityEntry[];
  downloads?: Download[];
  relatedProductIds?: string[];
  badge?: ProductBadge;
  isActive: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  division: Division;
  icon: string; // Lucide icon component name string
  description: string;
  productCount: number;
  image?: string;
}

export interface Brand {
  id: string;
  name: string;
  logoText: string;
  country: string;
  isAuthorized: boolean;
  categories: string[]; // category slugs
  description: string;
}

export interface WorkshopSolution {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  shortDescription: string;
  image?: string;
  includes: string[];
  processSteps: ProcessStep[];
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  icon: string;
  image?: string;
  description: string;
  details: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  projectType: string;
  solutionProvided: string;
  sector: string;
  description: string;
  image: string;
  equipmentInstalled: string[];
  results?: string[];
  isPrototypeCaseStudy?: boolean;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Automotive' | 'Garage Technology' | 'EV Mobility' | 'Workshop Solutions' | 'Company Updates';
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  image: string;
  author: string;
  tags: string[];
}

export interface NavSubItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  heading: string;
  items: NavSubItem[];
}

export interface NavItem {
  label: string;
  href: string;
  hasMegaMenu?: boolean;
  megaMenuGroups?: NavGroup[];
  megaMenuVariant?: 'garage' | 'ev';
}

export interface QuoteFormData {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  inquiryType?: string;
  productName?: string;
  productSku?: string;
  vehicleType?: string;
  quantity: string;
  message?: string;
}


