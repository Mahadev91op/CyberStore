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
  Box,
  CheckCircle2,
  Plus
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const STEPS = [
  { key: "processor", label: "Processor", icon: Cpu, description: "The Brain" },
  { key: "motherboard", label: "Motherboard", icon: Package, description: "The Base" },
  { key: "ram", label: "Memory", icon: HardDrive, description: "Multitasking" },
  { key: "graphicsCard", label: "Graphics", icon: Monitor, description: "Visuals" },
  { key: "storage", label: "Storage", icon: Save, description: "Space" },
  { key: "powerSupply", label: "Power", icon: Zap, description: "Energy" },
  { key: "cabinet", label: "Cabinet", icon: Box, description: "Housing" },
];

export default function PCBuilder({ products }) {
  const { addToCart } = useCart();
  
  const [selections, setSelections] = useState({
    processor: null, motherboard: null, ram: null, graphicsCard: null,
    storage: null, powerSupply: null, cabinet: null,
  });

  const [activeStep, setActiveStep] = useState("processor");

  const formatKey = (key) => key.replace(/([A-Z])/g, ' $1').trim();

  const compatibleProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter((p) => {
      if (p.category.toLowerCase().replace(" ", "") !== activeStep.toLowerCase()) return false;

      // Compatibility Logic
      if (activeStep === "motherboard" && selections.processor) {
        return p.specs?.socket === selections.processor.specs?.socket;
      }
      if (activeStep === "ram" && selections.motherboard) {
        return p.specs?.type === selections.motherboard.specs?.memoryType;
      }
      return true;
    });
  }, [products, activeStep, selections]);

  const handleSelect = (product) => {
    setSelections((prev) => ({ ...prev, [activeStep]: product }));
    const currentIndex = STEPS.findIndex((s) => s.key === activeStep);
    if (currentIndex < STEPS.length - 1) {
      setActiveStep(STEPS[currentIndex + 1].key);
    }
  };

  const totalPrice = Object.values(selections).reduce(
    (total, item) => total + (item ? (item.discountPrice || item.price) : 0), 
    0
  );

  const addBuildToCart = () => {
    Object.values(selections).forEach((item) => {
      if (item) addToCart(item);
    });
    alert("🚀 All parts added to cart!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans">
      
      {/* --- LEFT: PROGRESS SIDEBAR (Glassmorphism) --- */}
      <div className="lg:col-span-3">
        <div className="bg-[#111]/80 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden sticky top-24 shadow-2xl">
            <div className="p-6 border-b border-white/10 bg-white/5">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                   <Cpu size={20} className="text-red-500" /> Build Progress
                </h3>
                <div className="w-full bg-gray-800 rounded-full h-1.5 mt-4 overflow-hidden">
                    <div 
                        className="bg-gradient-to-r from-red-500 to-orange-500 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" 
                        style={{ width: `${(Object.values(selections).filter(Boolean).length / STEPS.length) * 100}%` }}
                    ></div>
                </div>
            </div>
            <div className="p-3 space-y-1">
                {STEPS.map((step) => {
                const isSelected = !!selections[step.key];
                const isActive = activeStep === step.key;
                
                return (
                    <button
                    key={step.key}
                    onClick={() => setActiveStep(step.key)}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl text-left transition-all border border-transparent ${
                        isActive 
                        ? "bg-red-600/10 border-red-500/30 shadow-lg shadow-red-900/20" 
                        : "hover:bg-white/5 hover:border-white/5"
                    }`}
                    >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                        isActive ? "bg-red-600 text-white shadow-md" : 
                        isSelected ? "bg-green-500/20 text-green-500 border border-green-500/30" : "bg-white/5 text-gray-500"
                    }`}>
                        {isSelected && !isActive ? <Check size={18} /> : <step.icon size={18} />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <span className={`block text-sm font-bold truncate ${isActive ? "text-white" : "text-gray-400"}`}>
                            {step.label}
                        </span>
                        <span className={`text-[10px] truncate block ${isSelected ? "text-green-400 font-medium" : "text-gray-600"}`}>
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

      {/* --- CENTER: PRODUCT SELECTION AREA --- */}
      <div className="lg:col-span-6 space-y-6">
        <div className="flex justify-between items-end px-2">
            <div>
                <h2 className="text-3xl font-black text-white capitalize tracking-tight flex items-center gap-3">
                  {activeStep.replace(/([A-Z])/g, ' $1')}
                  <span className="text-sm font-medium text-gray-500 bg-white/10 px-3 py-1 rounded-full border border-white/5">
                    {compatibleProducts.length} Options
                  </span>
                </h2>
            </div>
        </div>

        {/* Compatibility Message */}
        {(activeStep === "motherboard" && selections.processor) && (
           <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl flex items-start gap-3 backdrop-blur-md">
             <div className="bg-blue-500/20 p-2 rounded-full text-blue-400"><CheckCircle2 size={18} /></div>
             <div>
                <p className="font-bold text-blue-200 text-sm">Smart Compatibility Active</p>
                <p className="text-blue-300/70 text-xs mt-0.5">Showing only motherboards compatible with <strong>{selections.processor.specs?.socket}</strong> socket.</p>
             </div>
           </div>
        )}

        <div className="grid gap-4 min-h-[400px]">
          {compatibleProducts.length > 0 ? (
            compatibleProducts.map((product) => {
                const isSelected = selections[activeStep]?._id === product._id;
                return (
                    <div 
                        key={product._id} 
                        onClick={() => handleSelect(product)}
                        className={`group relative bg-[#111] rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col sm:flex-row ${
                        isSelected 
                            ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)] bg-[#151515]" 
                            : "border-white/5 hover:border-white/20 hover:bg-[#151515]"
                        }`}
                    >
                        {/* Image */}
                        <div className="w-full sm:w-40 h-40 bg-[#0a0a0a] flex items-center justify-center p-4 flex-shrink-0 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                            <Image 
                                src={product.images?.[0] || "https://placehold.co/200"} 
                                alt={product.name} 
                                width={120}
                                height={120}
                                className="object-contain transition-transform duration-500 group-hover:scale-110 relative z-10"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-5 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider border border-white/10 px-2 py-0.5 rounded bg-white/5">{product.brand}</span>
                                    {product.isFeatured && <span className="text-[9px] bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded border border-yellow-500/30 font-bold">TOP PICK</span>}
                                </div>
                                <h3 className={`font-bold text-lg leading-snug mb-3 transition-colors ${isSelected ? 'text-red-500' : 'text-white group-hover:text-red-400'}`}>
                                    {product.name}
                                </h3>
                                
                                <div className="flex flex-wrap gap-2">
                                    {Object.entries(product.specs || {}).slice(0, 3).map(([k, v]) => (
                                    <span key={k} className="text-[10px] text-gray-400 bg-[#222] px-2 py-1 rounded border border-white/5 capitalize">
                                        {formatKey(k)}: <span className="text-gray-200">{v}</span>
                                    </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                <div className="flex flex-col">
                                    <span className="text-xl font-black text-white">₹{(product.discountPrice || product.price).toLocaleString()}</span>
                                    {product.discountPrice > 0 && <span className="text-xs text-gray-500 line-through">₹{product.price.toLocaleString()}</span>}
                                </div>
                                <button className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                                    isSelected 
                                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30" 
                                    : "bg-white text-black hover:bg-gray-200"
                                }`}>
                                    {isSelected ? <><Check size={14} /> Selected</> : <><Plus size={14} /> Select</>}
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-[#111] rounded-3xl border-2 border-dashed border-white/10 text-center">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-4 text-yellow-500 animate-pulse">
                <AlertTriangle size={32}/>
              </div>
              <h3 className="text-xl font-bold text-white">No Compatible Parts Found</h3>
              <p className="text-gray-500 max-w-xs mx-auto mt-2 text-sm">Try changing your previous selections to find matching parts.</p>
              <button 
                onClick={() => setSelections(prev => ({...prev, [activeStep === 'motherboard' ? 'processor' : 'motherboard']: null}))} 
                className="mt-6 text-white font-bold bg-white/10 border border-white/10 px-6 py-3 rounded-xl hover:bg-white/20 transition text-sm"
              >
                Reset Compatibility Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- RIGHT: BUILD SUMMARY (HUD Style) --- */}
      <div className="lg:col-span-3">
        <div className="bg-[#111]/90 backdrop-blur-xl rounded-3xl border border-white/10 sticky top-24 overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-gray-900 to-black p-6 border-b border-white/10 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500"></div>
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <Monitor size={20} className="text-gray-400" /> My Rig
            </h3>
            <p className="text-gray-500 text-xs mt-1">Est. Total Cost</p>
            <div className="text-3xl font-black text-white mt-1 tracking-tight">₹{totalPrice.toLocaleString()}</div>
          </div>
          
          <div className="p-4 space-y-3 max-h-[40vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {Object.entries(selections).map(([key, item]) => (
              <div key={key} className="flex justify-between items-center text-sm p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]' : 'bg-gray-700'}`}></div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">{key}</span>
                        <span className={`truncate font-medium text-xs ${item ? 'text-white' : 'text-gray-600 italic'}`}>
                            {item ? item.name : "Empty slot"}
                        </span>
                    </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 border-t border-white/10 space-y-3 bg-[#0a0a0a]">
            <button 
              onClick={addBuildToCart}
              disabled={totalPrice === 0}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/20 active:scale-95"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
            
            <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-semibold py-3 rounded-xl transition text-xs">
                    <Save size={14} /> Save Build
                </button>
                <button 
                    onClick={() => setSelections({})}
                    className="flex items-center justify-center gap-2 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-gray-300 hover:text-red-400 font-semibold py-3 rounded-xl transition text-xs"
                >
                    <RotateCcw size={14} /> Reset
                </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}