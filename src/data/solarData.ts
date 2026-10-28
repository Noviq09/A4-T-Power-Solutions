import { ServiceItem, GalleryProject } from '../types';
import commercialSolarImg from '../assets/images/commercial_solar_rooftop_1793228977451.jpg';
import inverterBatteryImg from '../assets/images/inverter_battery_storage_1793228978668.jpg';
import residentialSolarImg from '../assets/images/residential_solar_villa_1793228978292.jpg';
import solarMaintenanceImg from '../assets/images/solar_maintenance_inspection_1793228978988.jpg';

export const SERVICES: ServiceItem[] = [
  {
    id: 'solar-panel-installation',
    title: 'Solar Panel Installation',
    summary: 'Rooftop and ground-mount monocrystalline PV installations engineered for Nigerian environmental conditions.',
    description: 'Precision mounting, tier-1 photovoltaic module integration, and optimal solar angle alignment for maximum irradiance harvest.',
    iconName: 'Sun',
    keyHighlights: ['High-efficiency monocrystalline panels', 'Robust anodized aluminium racking', 'Surge and lightning arrestor protection'],
    idealFor: 'Homes, offices, and commercial properties seeking clean electricity generation.'
  },
  {
    id: 'inverter-battery-systems',
    title: 'Inverter & Battery Systems',
    summary: 'Pure sine wave hybrid inverters paired with modern lithium iron phosphate (LiFePO4) storage banks.',
    description: 'Seamless power transfer during outages, intelligent battery management, and high cycle-life energy storage units.',
    iconName: 'BatteryCharging',
    keyHighlights: ['Lithium (LiFePO4) modular battery packs', 'High-frequency pure sine wave conversion', 'Smart BMS with thermal monitoring'],
    idealFor: 'Critical loads, data centers, clinics, and residences needing 24/7 power continuity.'
  },
  {
    id: 'residential-solar-solutions',
    title: 'Residential Solar Solutions',
    summary: 'Custom-sized residential solar systems tailored to family energy profiles and daily consumption patterns.',
    description: 'Designed to eliminate dependence on noisy petrol generators, powering essential lighting, cooling, refrigeration, and home electronics.',
    iconName: 'Home',
    keyHighlights: ['Silent operation replacing noisy generators', 'Tailored sizing for residential appliances', 'Mobile monitoring app integration'],
    idealFor: 'Duplexes, apartments, residential estates, and private residences.'
  },
  {
    id: 'commercial-solar-solutions',
    title: 'Commercial Solar Solutions',
    summary: 'Turnkey solar energy architectures for businesses, manufacturing facilities, warehouses, and corporate facilities.',
    description: 'Scalable commercial-grade solar setups that offset high daytime operational electricity expenses and generator fuel overhead.',
    iconName: 'Building2',
    keyHighlights: ['Three-phase commercial power integration', 'Substantial daytime grid and generator offset', 'Scheduled maintenance and remote monitoring'],
    idealFor: 'Offices, retail complexes, cold storage, clinics, and hospitality businesses.'
  },
  {
    id: 'solar-system-maintenance',
    title: 'Solar System Maintenance',
    summary: 'Diagnostic audits, module cleaning, thermal imaging, and preventative servicing for existing installations.',
    description: 'Comprehensive health checks for photovoltaic arrays, cabling, inverters, and battery balance to preserve long-term output.',
    iconName: 'Wrench',
    keyHighlights: ['Array thermography and hotspot detection', 'Inverter firmware and health calibrations', 'Battery pack cell balance assessments'],
    idealFor: 'Existing solar installations requiring troubleshooting, upgrading, or periodic upkeep.'
  },
  {
    id: 'power-backup-solutions',
    title: 'Power Backup Solutions',
    summary: 'Dedicated automatic transfer switch (ATS) backup banks for instantaneous failover during grid interruptions.',
    description: 'Instant zero-interruption power transition engineered to safeguard sensitive electronics, telecom equipment, and critical facilities.',
    iconName: 'Zap',
    keyHighlights: ['Sub-15ms transfer time for sensitive electronics', 'Seamless integration with existing generators', 'Overload and short-circuit protection'],
    idealFor: 'Institutions requiring zero downtime without wait times or manual changeovers.'
  }
];

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: 'proj-1',
    title: 'Commercial Rooftop PV Array',
    category: 'commercial',
    categoryLabel: 'Commercial Solar',
    image: commercialSolarImg,
    description: 'Proposed layout for a multi-story commercial complex utilizing distributed rooftop photovoltaic modules to offset daytime operational demand.',
    systemProfile: 'Multi-string solar array with commercial three-phase inverters',
    featureTag: 'Commercial Facility'
  },
  {
    id: 'proj-2',
    title: 'Modular Lithium Storage & Inverter Room',
    category: 'storage',
    categoryLabel: 'Battery Storage',
    image: inverterBatteryImg,
    description: 'Centralized power management room featuring modular wall-mounted lithium energy storage units and coordinated hybrid inverters.',
    systemProfile: 'LiFePO4 battery bank with intelligent thermal regulation',
    featureTag: 'Energy Storage Room'
  },
  {
    id: 'proj-3',
    title: 'Contemporary Residential Solar Villa',
    category: 'residential',
    categoryLabel: 'Residential Solar',
    image: residentialSolarImg,
    description: 'Architecturally integrated rooftop solar system designed for whole-home uninterrupted power, swimming pool filtration, and climate control.',
    systemProfile: 'Hybrid rooftop configuration with automatic changeover',
    featureTag: 'Private Residence'
  },
  {
    id: 'proj-4',
    title: 'Commercial Array Diagnostic Inspection',
    category: 'maintenance',
    categoryLabel: 'Maintenance & Audit',
    image: solarMaintenanceImg,
    description: 'Field diagnostic routine testing module string voltages, infrared panel thermography, and structural safety on high-density solar arrays.',
    systemProfile: 'Preventative inspection and diagnostic verification protocol',
    featureTag: 'Field Operations'
  }
];

export const WHY_SOLAR_REASONS = [
  {
    number: '01',
    title: 'Reduced Dependence on Grid Supply',
    description: 'Mitigate disruptions caused by frequent national grid collapses and erratic transmission schedules with self-generated on-site clean electricity.'
  },
  {
    number: '02',
    title: 'Relief from Generator Fuel Expenses',
    description: 'Significant relief from unpredictable diesel and petrol prices, eliminating daily refueling logistics, engine oil changes, and maintenance overhead.'
  },
  {
    number: '03',
    title: 'Silent & Emission-Free Operation',
    description: 'Enjoy steady electricity without the deafening rumble, toxic exhaust fumes, and fire hazards associated with running conventional fuel generators.'
  },
  {
    number: '04',
    title: 'Modular & Scalable Energy Storage',
    description: 'Start with essential backup coverage and expand your photovoltaic panel array or lithium storage capacity as your energy demands grow over time.'
  }
];
