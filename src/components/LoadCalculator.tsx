import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Minus,
  Trash2,
  RotateCcw,
  Zap,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info,
  Wind,
  Lightbulb,
  Laptop,
  Tv,
  UtensilsCrossed,
  Shirt,
  Droplets,
  Bed,
  ShieldCheck,
  Hammer,
  Building,
  Sprout,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Check,
} from 'lucide-react';
import {
  APPLIANCE_CATEGORIES,
  ALL_APPLIANCES,
  POPULAR_APPLIANCES,
  ApplianceItem,
} from '../data/appliancesData';
import { ScrollReveal } from './ScrollReveal';

export interface SelectedAppliance {
  id: string;
  name: string;
  category: string;
  watts: number;
  defaultWatts: number;
  quantity: number;
  isCustom?: boolean;
}

interface LoadCalculatorProps {
  onRequestQuoteWithLoad?: (loadSummary: string, totalWatts: number) => void;
}

// Map category icons safely
const categoryIcons: Record<string, React.ElementType> = {
  Wind,
  Lightbulb,
  Laptop,
  Tv,
  UtensilsCrossed,
  Shirt,
  Droplets,
  Bed,
  ShieldCheck,
  Hammer,
  Building,
  Sprout,
};

export const LoadCalculator: React.FC<LoadCalculatorProps> = ({
  onRequestQuoteWithLoad,
}) => {
  // State for user's selected appliances
  const [selectedItems, setSelectedItems] = useState<SelectedAppliance[]>([]);

  // Category accordions expanded state
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'cooling-ventilation': true,
    'kitchen-appliances': false,
  });

  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Custom appliance form state
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customWatts, setCustomWatts] = useState<number | ''>('');
  const [customQuantity, setCustomQuantity] = useState<number>(1);
  const [customError, setCustomError] = useState('');

  // Confirm reset dialog state
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  // Toggle category collapse
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Add an appliance to the selection
  const handleAddAppliance = (item: ApplianceItem) => {
    setSelectedItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          category: item.category,
          watts: item.defaultWatts,
          defaultWatts: item.defaultWatts,
          quantity: 1,
        },
      ];
    });
  };

  // Update quantity
  const handleUpdateQuantity = (id: string, delta: number) => {
    setSelectedItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as SelectedAppliance[]
    );
  };

  // Update wattage directly
  const handleUpdateWatts = (id: string, newWatts: number) => {
    if (isNaN(newWatts) || newWatts < 0) return;
    setSelectedItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, watts: newWatts } : item))
    );
  };

  // Remove item
  const handleRemoveItem = (id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Reset all
  const handleReset = () => {
    setSelectedItems([]);
    setConfirmResetOpen(false);
    setSearchQuery('');
  };

  // Add custom appliance
  const handleAddCustomAppliance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) {
      setCustomError('Please provide an appliance name.');
      return;
    }
    const wattsNum = Number(customWatts);
    if (!customWatts || isNaN(wattsNum) || wattsNum <= 0) {
      setCustomError('Please enter a valid wattage greater than 0.');
      return;
    }
    const qtyNum = Number(customQuantity);
    if (isNaN(qtyNum) || qtyNum < 1) {
      setCustomError('Quantity must be at least 1.');
      return;
    }

    const customId = `custom-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newCustomItem: SelectedAppliance = {
      id: customId,
      name: customName.trim(),
      category: 'Custom Appliance',
      watts: wattsNum,
      defaultWatts: wattsNum,
      quantity: qtyNum,
      isCustom: true,
    };

    setSelectedItems((prev) => [...prev, newCustomItem]);
    setCustomName('');
    setCustomWatts('');
    setCustomQuantity(1);
    setCustomError('');
    setShowCustomForm(false);
  };

  // Filtered appliances by search
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return ALL_APPLIANCES.filter(
      (app) =>
        app.name.toLowerCase().includes(q) ||
        app.category.toLowerCase().includes(q) ||
        (app.popularLabel && app.popularLabel.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // Calculations
  const totalWatts = useMemo(() => {
    return selectedItems.reduce((acc, item) => acc + item.watts * item.quantity, 0);
  }, [selectedItems]);

  const totalKw = useMemo(() => {
    return totalWatts / 1000;
  }, [totalWatts]);

  const totalUnits = useMemo(() => {
    return selectedItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [selectedItems]);

  // Selected count per category map
  const categorySelectedCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of selectedItems) {
      counts[item.category] = (counts[item.category] || 0) + item.quantity;
    }
    return counts;
  }, [selectedItems]);

  // Solar sizing guidance based on running wattage
  const sizingRecommendation = useMemo(() => {
    if (totalWatts === 0) {
      return {
        inverter: 'Select appliances to calculate inverter size',
        battery: 'Battery storage recommendation will appear here',
        type: 'Initial assessment',
        color: 'border-slate-800 text-slate-400',
      };
    }
    if (totalWatts <= 800) {
      return {
        inverter: '1.0 kVA – 1.5 kVA Pure Sine Wave Inverter',
        battery: '1.2 kWh – 2.4 kWh Lithium (LiFePO4) Battery Bank',
        type: 'Essential Domestic Backup (Lighting, Fans, TV & Laptops)',
        color: 'border-amber-400/40 text-amber-400',
      };
    }
    if (totalWatts <= 2200) {
      return {
        inverter: '2.5 kVA – 3.5 kVA Hybrid Solar Inverter',
        battery: '2.5 kWh – 5.0 kWh Lithium Battery Bank',
        type: 'Comfort Residential / Medium Office (Refrigeration & 1 Inverter AC)',
        color: 'border-emerald-400/40 text-emerald-400',
      };
    }
    if (totalWatts <= 5000) {
      return {
        inverter: '5.0 kVA – 7.5 kVA Commercial/Residential Inverter',
        battery: '5.0 kWh – 10.0 kWh Lithium High-Capacity Storage',
        type: 'Whole-Home / Multi-AC & Borehole Pumping Profile',
        color: 'border-cyan-400/40 text-cyan-400',
      };
    }
    return {
      inverter: '10 kVA – 15+ kVA Three-Phase Commercial Architecture',
      battery: '15 kWh – 30+ kWh Commercial Grade Modular Storage',
      type: 'Commercial Facility / Industrial Productive Use Profile',
      color: 'border-purple-400/40 text-purple-400',
    };
  }, [totalWatts]);

  // Summary text for quotation or WhatsApp
  const formattedSummaryText = useMemo(() => {
    if (selectedItems.length === 0) return '';
    const itemsList = selectedItems
      .map((i) => `${i.quantity}x ${i.name} (${i.watts}W each = ${i.quantity * i.watts}W)`)
      .join(', ');
    return `Calculated Load: ${totalWatts} W (${totalKw.toFixed(2)} kW). Appliances: ${itemsList}`;
  }, [selectedItems, totalWatts, totalKw]);

  // Direct WhatsApp chat handler with prefilled calculation
  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(
      `Hello A4&T Power Solutions,\n\nI used your interactive Appliance Load Calculator on your website and calculated my total running power load:\n\n• Total Load: ${totalWatts} W (${totalKw.toFixed(2)} kW)\n• Total Units: ${totalUnits} appliances\n• Breakdown: ${selectedItems.map((i) => `\n  - ${i.quantity}x ${i.name} @ ${i.watts}W (${i.quantity * i.watts}W)`).join('')}\n\nPlease recommend the best solar panel, hybrid inverter, and lithium battery system for this load requirement.`
    );
    window.open(`https://wa.me/2347079340080?text=${message}`, '_blank');
  };

  // Request Quote handler
  const handleRequestQuote = () => {
    if (onRequestQuoteWithLoad) {
      onRequestQuoteWithLoad(formattedSummaryText, totalWatts);
    } else {
      // Fallback scroll to contact form or quote
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="calculator" className="py-20 bg-slate-900 text-slate-100 relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold tracking-wide uppercase mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>Interactive Power Sizing Tool</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Calculate Your Power Needs
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Estimate the total running wattage of the electrical appliances you want to power. Select
              popular items or choose from comprehensive categories to plan the right solar inverter and
              battery capacity for your home or business.
            </p>
          </div>
        </ScrollReveal>

        {/* Popular Appliances Quick-Add Section */}
        <ScrollReveal delayMs={100}>
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 sm:p-6 mb-8 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm sm:text-base font-semibold text-white">
                  Popular Appliances Quick Add
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                Click any appliance below to add 1 unit instantly
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3">
              {POPULAR_APPLIANCES.map((app) => {
                const isSelected = selectedItems.find((i) => i.id === app.id);
                return (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => handleAddAppliance(app)}
                    className={`relative p-3 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer group ${
                      isSelected
                        ? 'bg-amber-400/10 border-amber-400/40 text-white shadow-sm shadow-amber-400/10'
                        : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 mb-2">
                      <span className="text-xs font-semibold leading-tight group-hover:text-amber-400 transition-colors line-clamp-2">
                        {app.popularLabel || app.name}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 font-bold text-[11px]'
                            : 'bg-slate-800 text-slate-300 group-hover:bg-amber-400 group-hover:text-slate-950'
                        }`}
                      >
                        {isSelected ? isSelected.quantity : <Plus className="w-3 h-3" />}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{app.defaultWatts} W</span>
                      {isSelected && (
                        <span className="text-amber-400 font-medium text-[10px]">
                          x{isSelected.quantity}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Main Two-Column Layout: Left (Search & Categories), Right (Selected List & Live Total) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Search Bar & Appliance Categories (7 Cols on desktop) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Search Input Bar */}
            <div className="relative">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 100+ appliances (e.g. fan, TV, fridge, AC, pump, kettle)..."
                  className="w-full pl-12 pr-10 py-3.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 rounded-md"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Instant Search Results Panel */}
              {searchQuery.trim() !== '' && (
                <div className="mt-3 bg-slate-950 border border-slate-700/80 rounded-xl p-3 max-h-80 overflow-y-auto space-y-1.5 shadow-xl animate-in fade-in duration-150 z-20">
                  <div className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Search Matches ({searchResults.length})</span>
                    <span className="text-[11px] lowercase font-normal text-slate-500">
                      tap + to add
                    </span>
                  </div>

                  {searchResults.length === 0 ? (
                    <div className="text-center py-6 px-4">
                      <p className="text-sm text-slate-300">
                        No appliances found matching "{searchQuery}"
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setCustomName(searchQuery);
                          setShowCustomForm(true);
                          setSearchQuery('');
                        }}
                        className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 rounded-lg transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add "{searchQuery}" as custom appliance</span>
                      </button>
                    </div>
                  ) : (
                    searchResults.map((item) => {
                      const selected = selectedItems.find((i) => i.id === item.id);
                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-850 border border-slate-800 transition-colors"
                        >
                          <div className="min-w-0 pr-3">
                            <div className="text-sm font-medium text-white truncate">
                              {item.name}
                            </div>
                            <div className="text-xs text-slate-400 truncate">
                              {item.category} · {item.defaultWatts} W
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleAddAppliance(item)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors shrink-0 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{selected ? `Add (+1)` : 'Add'}</span>
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Expandable Category Accordions */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Appliance Categories (12)
                </h3>
                <span className="text-xs text-slate-400">
                  Click category to view and add appliances
                </span>
              </div>

              {APPLIANCE_CATEGORIES.map((category) => {
                const IconComponent = categoryIcons[category.iconName] || Zap;
                const isExpanded = !!expandedCategories[category.id];
                const selectedCount = categorySelectedCounts[category.name] || 0;

                return (
                  <div
                    key={category.id}
                    className="border border-slate-800 bg-slate-950/70 rounded-xl overflow-hidden transition-all duration-200"
                  >
                    {/* Category Header Bar */}
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.id)}
                      className="w-full px-4 sm:px-5 py-4 flex items-center justify-between gap-3 text-left hover:bg-slate-900/60 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                      aria-expanded={isExpanded}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm sm:text-base font-semibold text-white">
                              {category.name}
                            </span>
                            {selectedCount > 0 && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-400 text-slate-950">
                                <Check className="w-3 h-3" />
                                {selectedCount} in load
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 truncate mt-0.5">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 text-slate-400">
                        <span className="text-xs hidden sm:inline">
                          {category.appliances.length} items
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-amber-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </button>

                    {/* Collapsible Appliance Items */}
                    {isExpanded && (
                      <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-slate-800/80 bg-slate-900/30">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3">
                          {category.appliances.map((app) => {
                            const isSelected = selectedItems.find((i) => i.id === app.id);
                            return (
                              <div
                                key={app.id}
                                className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                                  isSelected
                                    ? 'bg-amber-400/5 border-amber-400/30'
                                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                                }`}
                              >
                                <div className="min-w-0">
                                  <div className="text-xs sm:text-sm font-medium text-white truncate">
                                    {app.name}
                                  </div>
                                  <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                                    <span className="font-semibold text-amber-400">
                                      {app.defaultWatts} W
                                    </span>
                                    <span>· standard est.</span>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => handleAddAppliance(app)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white'
                                  }`}
                                  aria-label={`Add ${app.name}`}
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>{isSelected ? `+1 (${isSelected.quantity})` : 'Add'}</span>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Custom Appliance Adder Card */}
            <div className="border border-slate-800 bg-slate-950/70 rounded-xl p-5">
              {!showCustomForm ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        Can't find your specific appliance?
                      </h4>
                      <p className="text-xs text-slate-400">
                        Add any custom machine, medical device, or specialized tool by name and wattage.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCustomForm(true)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors shrink-0 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-400" />
                    <span>Add Custom Appliance</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAddCustomAppliance} className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Add Custom Appliance
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowCustomForm(false)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  {customError && (
                    <div className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/60 p-2.5 rounded-lg">
                      {customError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Appliance Name
                      </label>
                      <input
                        type="text"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder="e.g. Commercial Blender"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Rated Wattage (Watts)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="50000"
                        value={customWatts}
                        onChange={(e) =>
                          setCustomWatts(e.target.value ? Number(e.target.value) : '')
                        }
                        placeholder="e.g. 750"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={customQuantity}
                        onChange={(e) => setCustomQuantity(Math.max(1, Number(e.target.value) || 1))}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowCustomForm(false)}
                      className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                    >
                      Add to Load Calculator
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Live Total Display, Summary List, & Actions (5 Cols on desktop) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Prominent Live Total Running Load Box */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Live Total Running Load
                  </span>
                </div>
                {selectedItems.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setConfirmResetOpen(true)}
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 transition-colors p-1"
                    title="Reset all appliances"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Main Numbers: Watts and Kilowatts */}
              <div className="py-6 text-center">
                <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  {totalWatts.toLocaleString()}{' '}
                  <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">W</span>
                </div>
                <div className="mt-2 text-base sm:text-lg font-medium text-slate-300">
                  Equivalent to{' '}
                  <span className="text-white font-bold">{totalKw.toFixed(2)} kW</span> running load
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  {totalUnits} {totalUnits === 1 ? 'unit' : 'units'} selected across{' '}
                  {selectedItems.length} {selectedItems.length === 1 ? 'appliance' : 'appliances'}
                </div>
              </div>

              {/* Sizing & Inverter Guidance Preview Box */}
              <div
                className={`p-4 rounded-xl border bg-slate-900/60 mb-5 ${sizingRecommendation.color}`}
              >
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
                  <span>Engineered Sizing Guide</span>
                  <span className="text-slate-500 font-mono text-[10px]">A4&amp;T Standards</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mb-1">
                  {sizingRecommendation.inverter}
                </div>
                <div className="text-xs text-slate-300 mb-1">
                  {sizingRecommendation.battery}
                </div>
                <div className="text-[11px] text-slate-400 font-normal">
                  {sizingRecommendation.type}
                </div>
              </div>

              {/* Action Buttons: Request Quote & WhatsApp */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleRequestQuote}
                  disabled={selectedItems.length === 0}
                  className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                    selectedItems.length > 0
                      ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 hover:shadow-amber-400/20 active:translate-y-0.5'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                  }`}
                >
                  <span>Request a Quote with this Load</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  disabled={selectedItems.length === 0}
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                    selectedItems.length > 0
                      ? 'bg-emerald-600/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/20'
                      : 'border-slate-800 text-slate-600 cursor-not-allowed opacity-60'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Chat on WhatsApp about this Load</span>
                </button>
              </div>

              {/* Reset Confirmation Overlay */}
              {confirmResetOpen && (
                <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm p-6 flex flex-col justify-center items-center text-center animate-in fade-in duration-150 z-30">
                  <RotateCcw className="w-8 h-8 text-rose-400 mb-2" />
                  <h4 className="text-base font-bold text-white">Reset Calculator?</h4>
                  <p className="text-xs text-slate-300 mt-1 mb-4 max-w-xs">
                    This will clear all {totalUnits} selected appliances from your load list.
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setConfirmResetOpen(false)}
                      className="px-4 py-2 text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
                    >
                      Keep Items
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors cursor-pointer"
                    >
                      Confirm Reset
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Selected Appliances Summary List with Inline Edit & Quantity Controls */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 sm:p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <span>Selected Appliances Summary</span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-amber-400">
                    {selectedItems.length}
                  </span>
                </h3>
                <span className="text-xs text-slate-400">
                  Edit qty or watts anytime
                </span>
              </div>

              {selectedItems.length === 0 ? (
                <div className="py-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-800/80 text-slate-500 flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-medium text-slate-300">No appliances selected yet</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Choose from the popular shortcuts above or expand any category to add appliances to
                    your running load.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-800/60 max-h-96 overflow-y-auto pr-1">
                  {selectedItems.map((item) => {
                    const subtotal = item.quantity * item.watts;
                    const isEdited = item.watts !== item.defaultWatts;

                    return (
                      <div key={item.id} className="py-3 flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs sm:text-sm font-semibold text-white">
                                {item.name}
                              </span>
                              {item.isCustom && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                  Custom
                                </span>
                              )}
                              {isEdited && !item.isCustom && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                                  Custom W
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400">{item.category}</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-slate-400 hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Controls Row: Wattage Input & Quantity Controls & Subtotal */}
                        <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                          {/* Wattage editable field */}
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-400 text-[11px]">Rating:</span>
                            <div className="relative inline-flex items-center">
                              <input
                                type="number"
                                min="1"
                                max="30000"
                                value={item.watts}
                                onChange={(e) =>
                                  handleUpdateWatts(item.id, Number(e.target.value) || 0)
                                }
                                className="w-16 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-center text-xs text-white focus:outline-none focus:border-amber-400"
                                title="Click to adjust wattage"
                              />
                              <span className="ml-1 text-slate-400 text-[11px]">W</span>
                            </div>
                            {isEdited && (
                              <button
                                type="button"
                                onClick={() => handleUpdateWatts(item.id, item.defaultWatts)}
                                className="text-[10px] text-slate-500 hover:text-amber-400 underline ml-1"
                                title={`Reset to default (${item.defaultWatts}W)`}
                              >
                                def.
                              </button>
                            )}
                          </div>

                          {/* Quantity +/- buttons */}
                          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                              aria-label={`Decrease ${item.name} quantity`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center font-bold text-white text-xs">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                              aria-label={`Increase ${item.name} quantity`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Item Subtotal */}
                          <div className="text-right shrink-0">
                            <span className="font-bold text-amber-400 text-xs sm:text-sm">
                              {subtotal.toLocaleString()} W
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Verbatim Disclaimer Section */}
        <ScrollReveal delayMs={150}>
          <div className="mt-12 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 sm:p-6 text-xs text-slate-400 leading-relaxed flex items-start gap-3.5">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-300 uppercase tracking-wider text-[11px] mb-1">
                Engineering Notice &amp; Sizing Disclaimer
              </p>
              <p>
                Disclaimer: The estimated wattage figures provided by this calculator are standard
                industry averages for typical appliances and are intended for estimation and planning
                purposes only. Actual power consumption may vary based on appliance model, age,
                efficiency rating, and operational settings. Inductive loads with electric motors and
                compressors (such as air conditioners, refrigerators, and water pumps) require
                significant additional surge/starting power. For an accurate, engineered solar and
                inverter sizing assessment tailored specifically to your load profile, please request a
                professional engineering consultation with A4&amp;T Power Solutions.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
