export interface ServiceItem {
  id: string;
  title: string;
  summary: string;
  description: string;
  iconName: 'Sun' | 'BatteryCharging' | 'Home' | 'Building2' | 'Wrench' | 'Zap';
  keyHighlights: string[];
  idealFor: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  category: 'commercial' | 'residential' | 'storage' | 'maintenance';
  categoryLabel: string;
  image: string;
  description: string;
  systemProfile: string;
  featureTag: string;
}

export interface QuoteFormData {
  fullName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  location: string;
  message: string;
}
