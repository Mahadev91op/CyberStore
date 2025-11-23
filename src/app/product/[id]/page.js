import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Truck,
  ShieldCheck,
  Cpu,
  Star,
  ChevronRight,
  AlertCircle,
  Zap,
  Share2,
  Heart
} from "lucide-react";
import AddToCartBtn from "@/components/product/AddToCartBtn";
import ProductImages from "@/components/product/ProductImages";

async function getProduct(id) {
  try {
    await dbConnect();
    const product = await Product.findById(id).lean();
    if (!product) return null;
    product._id = product._id.toString();
    return product;
  } catch (error) {
    return null;
  }
}

export default async function ProductPage(props) {
  const params = await props.params;
  const product = await getProduct(params.id);

  if (!product) return notFound();

  const discountPercent = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  return (
    <div className="min-h-screen bg-[#050505] text-white py-10 font-sans selection:bg-red-500 selection:text-white relative">
      
      {/* Background Glow Effects */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <ChevronRight size={14} className="mx-2 text-gray-700" />
          <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-white transition capitalize">
            {product.category}
          </Link>
          <ChevronRight size={14} className="mx-2 text-gray-700" />
          <span className="text-gray-200 font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* --- LEFT: GALLERY (Updated for Dark Mode) --- */}
            <div className="lg:col-span-7">
              <div className="bg-[#111] rounded-3xl border border-white/10 p-2 shadow-2xl sticky top-24">
                 <ProductImages images={product.images} name={product.name} />
              </div>
            </div>

            {/* --- RIGHT: DETAILS --- */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Brand & Actions */}
              <div className="flex items-center justify-between">
                 <span className="bg-red-500/10 text-red-500 text-xs font-bold px-3 py-1 rounded border border-red-500/20 uppercase tracking-wider">
                    {product.brand}
                 </span>
                 <div className="flex gap-3">
                    <button className="p-2 rounded-full bg-[#1a1a1a] hover:bg-[#222] text-gray-400 hover:text-red-500 transition border border-white/5">
                      <Heart size={20} />
                    </button>
                    <button className="p-2 rounded-full bg-[#1a1a1a] hover:bg-[#222] text-gray-400 hover:text-white transition border border-white/5">
                      <Share2 size={20} />
                    </button>
                 </div>
              </div>

              {/* Title & Ratings */}
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-[#1a1a1a] px-3 py-1.5 rounded-lg border border-white/5">
                    <span className="text-yellow-500 font-bold mr-2">4.8</span>
                    <div className="flex text-yellow-500 gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">Verified Product</span>
                </div>
              </div>

              {/* Price Block */}
              <div className="p-6 bg-[#111] rounded-2xl border border-white/10 shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Zap size={80} />
                </div>
                
                <div className="relative z-10">
                   <div className="flex items-end gap-3 mb-2">
                      <span className="text-5xl font-black text-white tracking-tight">
                        ₹{(product.discountPrice || product.price).toLocaleString()}
                      </span>
                      {product.discountPrice > 0 && (
                        <div className="flex flex-col mb-1.5">
                           <span className="text-lg text-gray-500 line-through decoration-red-500/50">
                             ₹{product.price.toLocaleString()}
                           </span>
                           <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded">
                             {discountPercent}% SAVE
                           </span>
                        </div>
                      )}
                   </div>
                   <p className="text-gray-400 text-xs flex items-center gap-1">
                      <AlertCircle size={12} /> Inclusive of all taxes
                   </p>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-4">
                 <AddToCartBtn product={product} /> 
                 <button className="bg-white text-black hover:bg-gray-200 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95">
                    <Zap size={20} fill="black" /> Buy Now
                 </button>
              </div>

              {/* Stock Status */}
              <div className={`flex items-center gap-3 p-4 rounded-xl border ${product.stock > 0 ? 'bg-green-500/5 border-green-500/20 text-green-400' : 'bg-red-500/5 border-red-500/20 text-red-400'}`}>
                 {product.stock > 0 ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                 <span className="font-medium">{product.stock > 0 ? "In Stock - Ready to Ship" : "Currently Out of Stock"}</span>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                 {[
                    { icon: Truck, label: "Free Delivery", sub: "On orders > ₹50k" },
                    { icon: ShieldCheck, label: "2 Year Warranty", sub: "Official Brand" },
                 ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#151515] border border-white/5 hover:border-white/20 transition">
                       <div className="p-2 bg-[#222] rounded-lg text-gray-300"><item.icon size={20} /></div>
                       <div>
                          <p className="text-sm font-bold text-white">{item.label}</p>
                          <p className="text-[10px] text-gray-500">{item.sub}</p>
                       </div>
                    </div>
                 ))}
              </div>

              {/* Description Snippet */}
              <div className="text-sm text-gray-400 leading-relaxed border-t border-white/10 pt-6">
                 <h3 className="text-white font-bold mb-2 text-lg">Overview</h3>
                 <p>{product.description}</p>
              </div>

            </div>
        </div>

        {/* --- TECH SPECS SECTION (Dark Table) --- */}
        <div className="mt-20">
           <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
              <Cpu className="text-red-500" /> Technical Specifications
           </h2>
           
           <div className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                 
                 {/* Static Info */}
                 <div className="p-6 border-b md:border-b-0 md:border-r border-white/5 flex flex-col gap-4">
                    <div className="flex justify-between py-3 border-b border-white/5">
                       <span className="text-gray-500">Brand</span>
                       <span className="text-white font-medium">{product.brand}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-white/5">
                       <span className="text-gray-500">Category</span>
                       <span className="text-white font-medium">{product.category}</span>
                    </div>
                 </div>

                 {/* Dynamic Specs */}
                 <div className="p-6 flex flex-col gap-4">
                    {product.specs && Object.entries(product.specs).map(([key, value]) => (
                       <div key={key} className="flex justify-between py-3 border-b border-white/5 last:border-0">
                          <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                          <span className="text-white font-medium">{value.toString()}</span>
                       </div>
                    ))}
                 </div>

              </div>
           </div>
        </div>

      </div>
    </div>
  );
}