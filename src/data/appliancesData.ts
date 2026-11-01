export interface ApplianceItem {
  id: string;
  name: string;
  category: string;
  defaultWatts: number;
  isPopular?: boolean;
  popularLabel?: string;
  description?: string;
}

export interface ApplianceCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
  appliances: ApplianceItem[];
}

export const APPLIANCE_CATEGORIES: ApplianceCategory[] = [
  {
    id: 'cooling-ventilation',
    name: 'Cooling & ventilation',
    iconName: 'Wind',
    description: 'Fans, ceiling units, air coolers, and inverter air conditioning systems.',
    appliances: [
      { id: 'fan-standing', name: 'Fan (Standing / Pedestal)', category: 'Cooling & ventilation', defaultWatts: 100, isPopular: true, popularLabel: 'Fan' },
      { id: 'fan-ceiling', name: 'Ceiling Fan', category: 'Cooling & ventilation', defaultWatts: 80 },
      { id: 'fan-rechargeable', name: 'Rechargeable Fan (DC/AC)', category: 'Cooling & ventilation', defaultWatts: 35 },
      { id: 'fan-wall', name: 'Wall Mount Fan', category: 'Cooling & ventilation', defaultWatts: 75 },
      { id: 'fan-exhaust', name: 'Exhaust Fan', category: 'Cooling & ventilation', defaultWatts: 45 },
      { id: 'ac-1hp-inverter', name: '1.0 HP Inverter Air Conditioner', category: 'Cooling & ventilation', defaultWatts: 900 },
      { id: 'ac-1-5hp-inverter', name: '1.5 HP Inverter Air Conditioner', category: 'Cooling & ventilation', defaultWatts: 1200, isPopular: true, popularLabel: 'Air conditioner' },
      { id: 'ac-2hp-inverter', name: '2.0 HP Inverter Air Conditioner', category: 'Cooling & ventilation', defaultWatts: 1800 },
      { id: 'ac-1-5hp-standard', name: '1.5 HP Standard (Non-Inverter) AC', category: 'Cooling & ventilation', defaultWatts: 1600 },
      { id: 'air-cooler', name: 'Evaporative Air Cooler', category: 'Cooling & ventilation', defaultWatts: 150 },
    ],
  },
  {
    id: 'lighting',
    name: 'Lighting',
    iconName: 'Lightbulb',
    description: 'Energy-saving LED bulbs, tube lights, security floodlights, and fixtures.',
    appliances: [
      { id: 'led-bulb', name: 'LED Bulb (Energy Efficient)', category: 'Lighting', defaultWatts: 10, isPopular: true, popularLabel: 'LED bulb' },
      { id: 'led-tube-4ft', name: 'LED Tube Light (4ft / 120cm)', category: 'Lighting', defaultWatts: 18 },
      { id: 'cfl-bulb', name: 'Energy Saver (CFL) Bulb', category: 'Lighting', defaultWatts: 25 },
      { id: 'floodlight-50w', name: 'Security Floodlight (LED 50W)', category: 'Lighting', defaultWatts: 50 },
      { id: 'floodlight-100w', name: 'Security Floodlight (LED 100W)', category: 'Lighting', defaultWatts: 100 },
      { id: 'chandelier', name: 'Chandelier / Decorative Ceiling Lights', category: 'Lighting', defaultWatts: 80 },
      { id: 'desk-lamp', name: 'Desk / Reading Lamp (LED)', category: 'Lighting', defaultWatts: 8 },
      { id: 'outdoor-sconce', name: 'Outdoor Wall Sconce / Compound Light', category: 'Lighting', defaultWatts: 15 },
    ],
  },
  {
    id: 'computers-office',
    name: 'Computers & office equipment',
    iconName: 'Laptop',
    description: 'Laptops, desktop workstations, monitors, printers, and office servers.',
    appliances: [
      { id: 'laptop', name: 'Laptop Computer', category: 'Computers & office equipment', defaultWatts: 65, isPopular: true, popularLabel: 'Laptop' },
      { id: 'desktop-pc', name: 'Desktop PC & Monitor', category: 'Computers & office equipment', defaultWatts: 150 },
      { id: 'workstation-gaming', name: 'Workstation / Gaming PC Rig', category: 'Computers & office equipment', defaultWatts: 450 },
      { id: 'monitor', name: 'External Monitor (24"-27")', category: 'Computers & office equipment', defaultWatts: 30 },
      { id: 'printer-inkjet', name: 'Inkjet Printer', category: 'Computers & office equipment', defaultWatts: 30 },
      { id: 'printer-laser', name: 'Office Laser Printer', category: 'Computers & office equipment', defaultWatts: 500 },
      { id: 'copier-scanner', name: 'Multifunction Photocopier & Scanner', category: 'Computers & office equipment', defaultWatts: 400 },
      { id: 'office-server', name: 'Small Office Server / NAS Storage', category: 'Computers & office equipment', defaultWatts: 120 },
      { id: 'pos-terminal', name: 'POS Terminal / Cash Register', category: 'Computers & office equipment', defaultWatts: 35 },
    ],
  },
  {
    id: 'entertainment-electronics',
    name: 'Entertainment & electronics',
    iconName: 'Tv',
    description: 'Smart TVs, decoders, sound systems, mobile chargers, and consoles.',
    appliances: [
      { id: 'tv-medium', name: 'Television (43"-55" Smart LED)', category: 'Entertainment & electronics', defaultWatts: 100, isPopular: true, popularLabel: 'Television' },
      { id: 'tv-small', name: 'Television (32" LED)', category: 'Entertainment & electronics', defaultWatts: 50 },
      { id: 'tv-large', name: 'Television (65"+ OLED / QLED)', category: 'Entertainment & electronics', defaultWatts: 160 },
      { id: 'phone-charger', name: 'Phone Charger (Fast Charge)', category: 'Entertainment & electronics', defaultWatts: 15, isPopular: true, popularLabel: 'Phone charger' },
      { id: 'tablet-charger', name: 'Tablet / iPad Charger', category: 'Entertainment & electronics', defaultWatts: 18 },
      { id: 'home-theatre', name: 'Home Theatre Sound System', category: 'Entertainment & electronics', defaultWatts: 120 },
      { id: 'soundbar', name: 'Soundbar & Subwoofer', category: 'Entertainment & electronics', defaultWatts: 60 },
      { id: 'decoder-dstv', name: 'Satellite Decoder (DSTV / GOTV / StarTimes)', category: 'Entertainment & electronics', defaultWatts: 25 },
      { id: 'gaming-console', name: 'Gaming Console (PlayStation / Xbox)', category: 'Entertainment & electronics', defaultWatts: 200 },
      { id: 'bluetooth-speaker', name: 'Bluetooth Speaker (Charging)', category: 'Entertainment & electronics', defaultWatts: 20 },
    ],
  },
  {
    id: 'kitchen-appliances',
    name: 'Kitchen appliances',
    iconName: 'UtensilsCrossed',
    description: 'Refrigerators, freezers, kettles, blenders, microwaves, and cookware.',
    appliances: [
      { id: 'refrigerator', name: 'Refrigerator / Fridge-Freezer', category: 'Kitchen appliances', defaultWatts: 200, isPopular: true, popularLabel: 'Refrigerator' },
      { id: 'deep-freezer', name: 'Deep Freezer (Chest Freezer - Medium)', category: 'Kitchen appliances', defaultWatts: 180 },
      { id: 'freezer-commercial', name: 'Large Double-Door Commercial Freezer', category: 'Kitchen appliances', defaultWatts: 300 },
      { id: 'electric-kettle', name: 'Electric Kettle', category: 'Kitchen appliances', defaultWatts: 1500, isPopular: true, popularLabel: 'Electric kettle' },
      { id: 'microwave', name: 'Microwave Oven', category: 'Kitchen appliances', defaultWatts: 1000 },
      { id: 'blender-grinder', name: 'Electric Blender / Grinder', category: 'Kitchen appliances', defaultWatts: 400 },
      { id: 'toaster', name: 'Bread Toaster', category: 'Kitchen appliances', defaultWatts: 800 },
      { id: 'electric-hotplate', name: 'Single Electric Hotplate', category: 'Kitchen appliances', defaultWatts: 1500 },
      { id: 'induction-cooker', name: 'Induction Cooker', category: 'Kitchen appliances', defaultWatts: 1800 },
      { id: 'coffee-maker', name: 'Coffee Maker / Espresso Machine', category: 'Kitchen appliances', defaultWatts: 800 },
      { id: 'air-fryer', name: 'Air Fryer', category: 'Kitchen appliances', defaultWatts: 1400 },
      { id: 'water-dispenser', name: 'Water Dispenser (Hot & Cold)', category: 'Kitchen appliances', defaultWatts: 500 },
    ],
  },
  {
    id: 'laundry-cleaning',
    name: 'Laundry & cleaning',
    iconName: 'Shirt',
    description: 'Washing machines, electric pressing irons, vacuum cleaners, and steamers.',
    appliances: [
      { id: 'washing-machine-top', name: 'Washing Machine (Top Loader / Semi-Auto)', category: 'Laundry & cleaning', defaultWatts: 350 },
      { id: 'washing-machine-front', name: 'Washing Machine (Front Loader - Wash Cycle)', category: 'Laundry & cleaning', defaultWatts: 500 },
      { id: 'electric-iron', name: 'Electric Clothes Iron (Steam / Dry)', category: 'Laundry & cleaning', defaultWatts: 1200 },
      { id: 'vacuum-cleaner', name: 'Vacuum Cleaner', category: 'Laundry & cleaning', defaultWatts: 1000 },
      { id: 'pressure-washer', name: 'Pressure Washer (Domestic)', category: 'Laundry & cleaning', defaultWatts: 1400 },
      { id: 'garment-steamer', name: 'Garment Steamer', category: 'Laundry & cleaning', defaultWatts: 800 },
    ],
  },
  {
    id: 'water-heating-pumps',
    name: 'Water heating & pumps',
    iconName: 'Droplets',
    description: 'Borehole submersible pumps, booster pumps, and water heaters.',
    appliances: [
      { id: 'water-pump-0-5hp', name: '0.5 HP Water Surface Pump', category: 'Water heating & pumps', defaultWatts: 375 },
      { id: 'borehole-pump-1hp', name: '1.0 HP Submersible Borehole Pump', category: 'Water heating & pumps', defaultWatts: 750 },
      { id: 'booster-pump-1-5hp', name: '1.5 HP Water Booster Pump', category: 'Water heating & pumps', defaultWatts: 1100 },
      { id: 'water-heater-geyser', name: 'Storage Water Heater / Geyser (15L-30L)', category: 'Water heating & pumps', defaultWatts: 1500 },
      { id: 'water-heater-instant', name: 'Instant Shower Water Heater', category: 'Water heating & pumps', defaultWatts: 3000 },
      { id: 'water-sterilizer', name: 'Water Filtration & UV Sterilizer', category: 'Water heating & pumps', defaultWatts: 40 },
    ],
  },
  {
    id: 'bedroom-personal',
    name: 'Bedroom & personal appliances',
    iconName: 'Bed',
    description: 'Hair care tools, clippers, CPAP medical devices, and grooming appliances.',
    appliances: [
      { id: 'hair-dryer', name: 'Hair Dryer (Handheld)', category: 'Bedroom & personal appliances', defaultWatts: 1200 },
      { id: 'hair-clipper', name: 'Electric Hair Clipper / Trimmer', category: 'Bedroom & personal appliances', defaultWatts: 15 },
      { id: 'hair-straightener', name: 'Hair Straightener / Flat Iron', category: 'Bedroom & personal appliances', defaultWatts: 60 },
      { id: 'electric-shaver', name: 'Electric Shaver', category: 'Bedroom & personal appliances', defaultWatts: 10 },
      { id: 'cpap-machine', name: 'CPAP Medical Breathing Machine', category: 'Bedroom & personal appliances', defaultWatts: 60 },
      { id: 'diffuser-humidifier', name: 'Aroma Diffuser / Humidifier', category: 'Bedroom & personal appliances', defaultWatts: 25 },
    ],
  },
  {
    id: 'security-networking',
    name: 'Security & networking',
    iconName: 'ShieldCheck',
    description: 'Wi-Fi routers, CCTV surveillance setups, electric fences, and gate motors.',
    appliances: [
      { id: 'wifi-router', name: 'Wi-Fi Router / 4G LTE Gateway', category: 'Security & networking', defaultWatts: 15 },
      { id: 'cctv-8ch', name: 'CCTV Camera System (4-8 Channels + DVR)', category: 'Security & networking', defaultWatts: 60 },
      { id: 'cctv-16ch', name: 'CCTV Camera System (16 Channels + NVR)', category: 'Security & networking', defaultWatts: 120 },
      { id: 'electric-fence', name: 'Electric Security Fence Energizer', category: 'Security & networking', defaultWatts: 25 },
      { id: 'gate-motor', name: 'Automatic Sliding / Swing Gate Motor', category: 'Security & networking', defaultWatts: 300 },
      { id: 'video-doorbell', name: 'Video Intercom / Smart Doorbell', category: 'Security & networking', defaultWatts: 20 },
      { id: 'network-switch', name: 'PoE Network Switch (8-Port)', category: 'Security & networking', defaultWatts: 45 },
    ],
  },
  {
    id: 'power-tools-workshop',
    name: 'Power tools & workshop equipment',
    iconName: 'Hammer',
    description: 'Electric drills, grinders, saws, air compressors, and workshop tools.',
    appliances: [
      { id: 'drill', name: 'Handheld Electric Drill', category: 'Power tools & workshop equipment', defaultWatts: 600 },
      { id: 'angle-grinder', name: 'Angle Grinder (4.5" - 9")', category: 'Power tools & workshop equipment', defaultWatts: 850 },
      { id: 'circular-saw', name: 'Circular Saw', category: 'Power tools & workshop equipment', defaultWatts: 1200 },
      { id: 'air-compressor-workshop', name: 'Air Compressor (1.5 HP Workshop Unit)', category: 'Power tools & workshop equipment', defaultWatts: 1100 },
      { id: 'soldering-iron', name: 'Soldering Iron / Station', category: 'Power tools & workshop equipment', defaultWatts: 60 },
      { id: 'arc-welder', name: 'Inverter Arc Welding Machine (Single Phase)', category: 'Power tools & workshop equipment', defaultWatts: 2500 },
      { id: 'bench-grinder', name: 'Bench Grinder', category: 'Power tools & workshop equipment', defaultWatts: 350 },
    ],
  },
  {
    id: 'commercial-business',
    name: 'Commercial & business equipment',
    iconName: 'Building',
    description: 'Beverage chillers, ice makers, salon hood dryers, and commercial machinery.',
    appliances: [
      { id: 'cold-room', name: 'Commercial Cold Room Chiller Unit', category: 'Commercial & business equipment', defaultWatts: 2500 },
      { id: 'ice-block-maker', name: 'Ice Block Making Machine (Compact)', category: 'Commercial & business equipment', defaultWatts: 1500 },
      { id: 'display-chiller', name: 'Commercial Display Beverage Chiller', category: 'Commercial & business equipment', defaultWatts: 250 },
      { id: 'salon-hood-dryer', name: 'Barbershop / Salon Hair Hood Dryer', category: 'Commercial & business equipment', defaultWatts: 1000 },
      { id: 'commercial-sewing', name: 'Industrial Sewing / Embroidery Machine', category: 'Commercial & business equipment', defaultWatts: 250 },
      { id: 'dough-mixer', name: 'Commercial Bakery Dough Mixer', category: 'Commercial & business equipment', defaultWatts: 750 },
      { id: 'pos-printer-scanner', name: 'Receipt Printer & Barcode Scanner', category: 'Commercial & business equipment', defaultWatts: 40 },
      { id: 'dental-chair', name: 'Dental Chair & Dental Compressor', category: 'Commercial & business equipment', defaultWatts: 1200 },
      { id: 'lab-microscope', name: 'Laboratory Digital Microscope & Illuminator', category: 'Commercial & business equipment', defaultWatts: 50 },
    ],
  },
  {
    id: 'agriculture-outdoor',
    name: 'Agriculture & outdoor equipment',
    iconName: 'Sprout',
    description: 'Irrigation pumps, brooder heat lamps, egg incubators, and pond aerators.',
    appliances: [
      { id: 'irrigation-pump-2hp', name: 'Agricultural Irrigation Pump (2.0 HP)', category: 'Agriculture & outdoor equipment', defaultWatts: 1500 },
      { id: 'poultry-brooder', name: 'Poultry Farm Brooder Heat Lamp', category: 'Agriculture & outdoor equipment', defaultWatts: 250 },
      { id: 'egg-incubator', name: 'Poultry Farm Egg Incubator', category: 'Agriculture & outdoor equipment', defaultWatts: 150 },
      { id: 'feed-pellet-mill', name: 'Feed Pellet Mill / Grain Grinder', category: 'Agriculture & outdoor equipment', defaultWatts: 1500 },
      { id: 'pond-aerator', name: 'Fish Pond Aerator / Air Pump', category: 'Agriculture & outdoor equipment', defaultWatts: 120 },
      { id: 'lawn-mower', name: 'Electric Lawn Mower', category: 'Agriculture & outdoor equipment', defaultWatts: 1200 },
      { id: 'greenhouse-fan', name: 'Greenhouse Extraction Ventilation Fan', category: 'Agriculture & outdoor equipment', defaultWatts: 300 },
    ],
  },
];

// Flat list of all appliances for search and quick reference
export const ALL_APPLIANCES: ApplianceItem[] = APPLIANCE_CATEGORIES.flatMap((c) => c.appliances);

// Quick-add popular appliances list in order
export const POPULAR_APPLIANCES: ApplianceItem[] = [
  ALL_APPLIANCES.find((a) => a.id === 'fan-standing')!,
  ALL_APPLIANCES.find((a) => a.id === 'tv-medium')!,
  ALL_APPLIANCES.find((a) => a.id === 'refrigerator')!,
  ALL_APPLIANCES.find((a) => a.id === 'led-bulb')!,
  ALL_APPLIANCES.find((a) => a.id === 'laptop')!,
  ALL_APPLIANCES.find((a) => a.id === 'phone-charger')!,
  ALL_APPLIANCES.find((a) => a.id === 'ac-1-5hp-inverter')!,
  ALL_APPLIANCES.find((a) => a.id === 'electric-kettle')!,
].filter(Boolean);
