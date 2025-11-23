"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import { 
  Check, 
  RotateCcw, 
  ShoppingCart, 
  AlertTriangle, 
  Cpu, 
  Save, 
  ArrowRight, 
  Package, 
  HardDrive, 
  Monitor, 
  Zap, 
  Box 
} from "lucide-react";
import { useCart } from "@/context/CartContext";

// Steps Configuration
const STEPS = [
  { key: "processor", label: "Processor", icon: Cpu, description: "The brain of your PC" },
  { key: "motherboard", label: "Motherboard", icon: Package, description: "Connects everything" },
  { key: "ram", label: "Memory (RAM)", icon: HardDrive, description: "For multitasking" },
  { key: "graphicsCard", label: "Graphics Card", icon: Monitor, description: "For gaming & rendering" },
  { key: "storage", label: "Storage", icon: Save, description: "SSD/HDD for data" },
  { key: "powerSupply", label: "Power Supply", icon: Zap, description: "Energize your build" },
  { key: "cabinet", label: "Cabinet (Case)", icon: Box, description: "The housing" },
];

export default function PCBuilder({ products }) {
  const { addToCart } = useCart();
  
  const [selections, setSelections] = useState({
    processor: null,
    motherboard: null,
    ram: null,
    graphicsCard: null,
    storage: null,
    powerSupply: null,
    cabinet: null,
  });

  const [activeStep, setActiveStep] = useState("processor");

  // --- Helper Function to Format Specs Key ---
  // (यह लॉजिक JSX से बाहर निकाल दिया गया है ताकि एरर न आए)
  const formatKey = (key) => {
    return key.replace(/([A-Z])/g, ' $1').trim();
  };

  // --- Compatibility Logic ---
  const compatibleProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter((p) => {
      // Category check
      if (p.category.toLowerCase().replace(" ", "") !== activeStep.toLowerCase()) return false;

      // Logic 1: Processor -> Motherboard (Socket Match)
      if (activeStep === "motherboard" && selections.processor) {
        return p.specs?.socket === selections.processor.specs?.socket;
      }

      // Logic 2: Motherboard -> RAM (DDR Type Match)
      if (activeStep === "ram" && selections.motherboard) {
        return p.specs?.type === selections.motherboard.specs?.memoryType;
      }

      return true;
    });
  }, [products, activeStep, selections]);

  // Handle Product Selection
  const handleSelect = (product) => {
    setSelections((prev) => ({ ...prev, [activeStep]: product }));
    
    // Auto-advance to next step
    const currentIndex = STEPS.findIndex((s) => s.key === activeStep);
    if (currentIndex < STEPS.length - 1) {
      setActiveStep(STEPS[currentIndex + 1].key);
    }
  };

  // Calculate Total
  const totalPrice = Object.values(selections).reduce(
    (total, item) => total + (item ? (item.discountPrice || item.price) : 0), 
    0
  );

  // Add to Cart
  const addBuildToCart = () => {
    Object.values(selections).forEach((item) => {
      if (item) addToCart(item);
    });
    alert("All parts added to cart! 🚀");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans">
      
      {/* --- LEFT: STEPS MENU --- */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-bold text-gray-800 text-lg">Build Progress</h3>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div 
                        className="bg-red-600 h-2 rounded-full transition-all duration-500 shadow-sm" 
                        style={{ width: `${(Object.values(selections).filter(Boolean).length / STEPS.length) * 100}%` }}
                    ></div>
                </div>
            </div>
            <div className="p-2 space-y-1">
                {STEPS.map((step) => {
                const isSelected = !!selections[step.key];
                const isActive = activeStep === step.key;
                
                return (
                    <button
                    key={step.key}
                    onClick={() => setActiveStep(step.key)}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl text-left transition-all ${
                        isActive 
                        ? "bg-red-50 text-red-700 ring-1 ring-red-200 shadow-sm" 
                        : isSelected 
                            ? "text-gray-700 hover:bg-gray-50"
                            : "text-gray-400 hover:bg-gray-50"
                    }`}
                    >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                        isActive ? "bg-red-600 text-white shadow-md scale-110" : 
                        isSelected ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                    }`}>
                        {isSelected && !isActive ? <Check size={18} /> : <step.icon size={18} />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <span className={`block text-sm font-bold truncate ${isActive ? "text-red-900" : "text-gray-700"}`}>
                            {step.label}
                        </span>
                        <span className="text-xs opacity-80 truncate block">
                            {isSelected ? selections[step.key].name : step.description}
                        </span>
                    </div>
                    
                    {isActive && <ArrowRight size={16} className="text-red-500 animate-pulse" />}
                    </button>
                );
                })}
            </div>
        </div>
      </div>

      {/* --- CENTER: PRODUCT SELECTION --- */}
      <div className="lg:col-span-6 space-y-6">
        <div className="flex justify-between items-end px-1">
            <div>
                <h2 className="text-3xl font-black text-gray-900 capitalize tracking-tight">
                {activeStep.replace(/([A-Z])/g, ' $1')}
                </h2>
                <p className="text-gray-500 text-sm mt-1">Choose the best component for your rig</p>
            </div>
            <span className="text-xs font-bold px-3 py-1.5 bg-gray-900 text-white rounded-full shadow-lg">
                {compatibleProducts.length} Options
            </span>
        </div>

        {/* Compatibility Alert */}
        {(activeStep === "motherboard" && selections.processor) && (
           <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm flex items-start gap-3 border border-blue-100 shadow-sm">
             <div className="bg-blue-100 p-2 rounded-full text-blue-600 shadow-sm"><Check size={16} /></div>
             <div>
                <p className="font-bold">Smart Compatibility Active</p>
                <p className="opacity-90 mt-0.5">Showing only motherboards that fit <strong>{selections.processor.specs?.socket}</strong> socket.</p>
             </div>
           </div>
        )}

        <div className="space-y-4 min-h-[400px]">
          {compatibleProducts.length > 0 ? (
            compatibleProducts.map((product) => {
                const isSelected = selections[activeStep]?._id === product._id;
                return (
                    <div 
                        key={product._id} 
                        onClick={() => handleSelect(product)}
                        className={`group relative bg-white rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden ${
                        isSelected 
                            ? "border-red-600 shadow-xl shadow-red-50 scale-[1.01]" 
                            : "border-gray-100 hover:border-red-200 hover:shadow-lg"
                        }`}
                    >
                        <div className="p-5 flex gap-5">
                            {/* Image */}
                            <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gray-50 rounded-xl flex items-center justify-center p-4 flex-shrink-0 group-hover:bg-white border border-transparent group-hover:border-gray-100 transition-all">
                                <Image 
                                    src={product.images?.[0] || "https://placehold.co/200"} 
                                    alt={product.name} 
                                    width={120}
                                    height={120}
                                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{product.brand}</span>
                                        {product.isFeatured && <span className="text-[9px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-extrabold tracking-wide">BESTSELLER</span>}
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 leading-snug mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                                        {product.name}
                                    </h3>
                                    
                                    {/* Specs Tags (Updated to use Helper Function) */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {Object.entries(product.specs || {}).slice(0, 3).map(([k, v]) => (
                                        <span key={k} className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200 capitalize">
                                            {formatKey(k)}: {v}
                                        </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex flex-col">
                                        <span className="text-xl font-black text-gray-900">₹{(product.discountPrice || product.price).toLocaleString()}</span>
                                        {product.discountPrice > 0 && <span className="text-xs text-gray-400 line-through">₹{product.price.toLocaleString()}</span>}
                                    </div>
                                    <button className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                                        isSelected 
                                        ? "bg-red-600 text-white shadow-red-200" 
                                        : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg"
                                    }`}>
                                        {isSelected ? "Selected" : "Select"}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Selection Stripe */}
                        {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-600"></div>}
                    </div>
                );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200 text-center">
              <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mb-4 text-yellow-600 animate-bounce">
                <AlertTriangle size={32}/>
              </div>
              <h3 className="text-lg font-bold text-gray-900">No Compatible Parts</h3>
              <p className="text-gray-500 max-w-xs mx-auto mt-2 text-sm">We couldn't find parts that match your previous selections.</p>
              <button 
                onClick={() => setSelections(prev => ({...prev, [activeStep === 'motherboard' ? 'processor' : 'motherboard']: null}))} 
                className="mt-5 text-red-600 font-bold bg-red-50 px-6 py-2.5 rounded-full hover:bg-red-100 transition text-sm"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- RIGHT: SUMMARY PANEL --- */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 sticky top-24 overflow-hidden">
          <div className="bg-gray-900 p-5 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
            <div className="relative z-10">
                <h3 className="font-bold text-lg flex items-center justify-center gap-2">
                    <Monitor size={20} className="text-red-500" /> My Build
                </h3>
                <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest">Configuration Summary</p>
            </div>
          </div>
          
          <div className="p-5 space-y-4 max-h-[50vh] overflow-y-auto scrollbar-thin">
            {Object.entries(selections).map(([key, item]) => (
              <div key={key} className="flex justify-between items-center text-sm group border-b border-dashed border-gray-100 last:border-0 pb-2 last:pb-0">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${item ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-300'}`}>
                        {item ? <Check size={12} /> : <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">{key}</span>
                        <span className={`truncate font-medium text-xs ${item ? 'text-gray-900' : 'text-gray-300 italic'}`}>
                            {item ? item.name : "Not selected"}
                        </span>
                    </div>
                </div>
                {item && <span className="font-bold text-gray-900 ml-2 text-xs">₹{(item.discountPrice || item.price).toLocaleString()}</span>}
              </div>
            ))}
          </div>

          <div className="p-5 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-end mb-6">
              <span className="text-gray-500 font-medium text-sm">Total Estimated</span>
              <span className="text-3xl font-black text-gray-900 tracking-tight leading-none">₹{totalPrice.toLocaleString()}</span>
            </div>

            <div className="space-y-3">
                <button 
                onClick={addBuildToCart}
                disabled={totalPrice === 0}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-200 active:scale-95"
                >
                <ShoppingCart size={20} /> Add All to Cart
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition text-sm">
                        <Save size={16} /> Save
                    </button>
                    <button 
                        onClick={() => setSelections({})}
                        className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-red-200 hover:text-red-600 text-gray-700 font-semibold py-3 rounded-xl transition text-sm"
                    >
                        <RotateCcw size={16} /> Reset
                    </button>
                </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}