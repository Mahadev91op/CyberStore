import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import ProductCard from "@/components/product/ProductCard";
import {
  Gift,
  ShoppingCart,
  Camera,
  Youtube,
  MessageCircle,
  ArrowRight,
  Cpu,
  Zap,
  ShieldCheck,
  Truck,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

// डेटाबेस से प्रोडक्ट्स लाने का फंक्शन
async function getProducts() {
  try {
    await dbConnect();
    const products = await Product.find({}).limit(8).lean();
    return products.map((p) => ({ ...p, _id: p._id.toString() }));
  } catch (e) {
    console.error("Error fetching products:", e);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-red-500 selection:text-white">
      
      {/* 1. HERO SECTION (Premium & Modern) */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-red-600/20 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] opacity-30 pointer-events-none"></div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* --- Left Content --- */}
            <div className="flex-1 text-center lg:text-left space-y-8">
              
              {/* Live Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg animate-fade-in-up mx-auto lg:mx-0">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-xs font-bold text-gray-300 tracking-widest uppercase">Next-Gen Performance</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
                BUILD YOUR <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
                  DREAM MACHINE
                </span>
              </h1>

              <p className="text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Experience gaming like never before with our custom-tuned rigs. 
                Powered by <span className="text-white font-bold">RTX 4090</span> and <span className="text-white font-bold">Core i9 14th Gen</span> processors.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link
                  href="/pc-builder"
                  className="group relative px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-xl shadow-red-900/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                  <Cpu size={22} /> Start Configurator
                </Link>
                
                <Link
                  href="/category/graphics-card"
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold rounded-xl transition-all flex items-center justify-center gap-2 hover:border-white/20"
                >
                  Explore Parts <ArrowRight size={18} />
                </Link>
              </div>

              {/* Trust Features */}
              <div className="pt-10 flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-400 border-t border-white/10 mt-8">
                 <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-green-500" /> 3 Years Warranty
                 </div>
                 <div className="flex items-center gap-2">
                    <Truck size={18} className="text-blue-500" /> Free Shipping
                 </div>
                 <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-purple-500" /> 100% Genuine
                 </div>
              </div>
            </div>

            {/* --- Right Visual (Abstract Card) --- */}
            <div className="flex-1 relative w-full max-w-lg lg:max-w-full flex justify-center lg:justify-end">
               <div className="relative w-80 h-[420px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[30px] border border-white/10 shadow-2xl rotate-[-6deg] hover:rotate-0 transition-all duration-500 group">
                  {/* Glow inside card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[30px]"></div>
                  
                  {/* Card Content */}
                  <div className="p-8 flex flex-col h-full relative z-10">
                      <div className="flex justify-between items-start">
                          <Cpu size={40} className="text-white/20" />
                          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">ULTIMATE</span>
                      </div>
                      <div className="mt-auto space-y-2">
                          <p className="text-gray-400 text-sm font-mono">PERFORMANCE BEAST</p>
                          <h3 className="text-4xl font-black text-white leading-none">RTX 4090 <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">EDITION</span></h3>
                      </div>
                  </div>

                  {/* Floating Spec Card */}
                  <div className="absolute -right-12 bottom-20 w-48 bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-xl transform translate-x-4 group-hover:translate-x-0 transition-transform duration-500">
                      <div className="flex items-center gap-3">
                          <div className="bg-blue-600/20 p-2 rounded-lg text-blue-500"><Zap size={20} /></div>
                          <div>
                              <div className="text-white font-bold text-sm">i9-14900K</div>
                              <div className="text-xs text-gray-500">6.0 GHz Boost</div>
                          </div>
                      </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. OFFER SECTION */}
      <section className="py-12 bg-[#0a0a0a] border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#111] to-[#1a1a1a] rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
            {/* Shine Effect */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-yellow-600/20 rounded-full blur-[80px]"></div>

            <div className="relative z-10 text-center mb-10">
              <h2 className="text-3xl font-bold flex items-center justify-center gap-3 text-white">
                <Gift className="text-yellow-500" size={32} /> 
                Get <span className="text-yellow-500">₹500 Cashback</span> Instantly!
              </h2>
              <p className="text-gray-400 mt-2">Review your build and get rewarded in 4 simple steps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: ShoppingCart, title: "1. Buy PC", desc: "Order any Custom PC" },
                { icon: Camera, title: "2. Record", desc: "Make an unboxing video" },
                { icon: Youtube, title: "3. Upload", desc: "Post on YouTube & Tag us" },
                { icon: MessageCircle, title: "4. Share", desc: "Send link & Get ₹500" },
              ].map((step, idx) => (
                <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5 text-center hover:bg-white/10 transition duration-300">
                  <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    <step.icon size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-white">{step.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS GRID */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">Featured Products</h2>
            <p className="text-gray-400 mt-1">Handpicked best sellers for you</p>
          </div>
          <Link href="/category/processor" className="text-red-500 font-semibold hover:text-red-400 flex items-center gap-2 transition">
            View All Products <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
              <p className="text-gray-500 text-lg">No products found. Please run the seed script.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}