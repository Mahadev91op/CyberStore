import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Check,
  Truck,
  ShieldCheck,
  Cpu,
  Star,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import AddToCartBtn from "@/components/product/AddToCartBtn";
import ProductImages from "@/components/product/ProductImages"; // 🔥 New Component

// डेटाबेस से डेटा लाने का फंक्शन
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
  const params = await props.params; // Next.js 15+ await fix
  const product = await getProduct(params.id);

  if (!product) return notFound();

  const discountPercent = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-8 text-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-6 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-red-600 transition">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-red-600 transition capitalize">
            {product.category}
          </Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* --- LEFT: IMAGE GALLERY (col-span-5) --- */}
            <div className="lg:col-span-5">
              <ProductImages images={product.images} name={product.name} />
            </div>

            {/* --- RIGHT: PRODUCT INFO (col-span-7) --- */}
            <div className="lg:col-span-7 flex flex-col">
              
              {/* Brand Badge */}
              <div className="mb-3">
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-blue-100">
                  {product.brand}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                {product.name}
              </h1>

              {/* Ratings & Stock */}
              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100">
                  <span className="text-yellow-600 font-bold mr-1">4.5</span>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 ml-2 border-l border-gray-200 pl-2">128 Reviews</span>
                </div>

                <div className={`flex items-center text-sm font-medium px-3 py-1 rounded-full ${
                    product.stock > 0 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                  {product.stock > 0 ? (
                    <><Check size={16} className="mr-1" /> In Stock</>
                  ) : (
                    <><AlertCircle size={16} className="mr-1" /> Out of Stock</>
                  )}
                </div>
              </div>

              {/* Price Section */}
              <div className="mb-8">
                <div className="flex items-end gap-3">
                  <span className="text-5xl font-bold text-gray-900">
                    ₹{(product.discountPrice || product.price).toLocaleString()}
                  </span>
                  {product.discountPrice > 0 && (
                    <div className="flex flex-col mb-1">
                      <span className="text-lg text-gray-400 line-through decoration-red-500/50 decoration-2">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-red-600 font-bold bg-red-50 px-1 rounded">
                        {discountPercent}% OFF
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2 flex items-center">
                  <AlertCircle size={12} className="mr-1" /> Inclusive of all taxes & GST
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <AddToCartBtn product={product} />
                <button className="bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl transition-all active:scale-95 shadow-lg shadow-gray-200">
                  Buy Now
                </button>
              </div>

              {/* Value Props */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: Truck, text: "Free Delivery", sub: "On orders > ₹500" },
                  { icon: ShieldCheck, text: "2 Year Warranty", sub: "Brand Covered" },
                  { icon: Cpu, text: "Genuine Parts", sub: "100% Authentic" },
                  { icon: Check, text: "GST Invoice", sub: "Available" },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <item.icon className="text-gray-700 mb-2" size={24} />
                    <span className="text-xs font-bold text-gray-900">{item.text}</span>
                    <span className="text-[10px] text-gray-500">{item.sub}</span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                <h3 className="text-sm font-bold text-blue-900 uppercase mb-2">Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* --- SPECIFICATIONS TABLE --- */}
        <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <Cpu className="mr-2 text-red-600" /> Technical Specifications
            </h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
              {/* Basic Details */}
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Category</span>
                <span className="text-gray-900 font-semibold">{product.category}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Brand</span>
                <span className="text-gray-900 font-semibold">{product.brand}</span>
              </div>

              {/* Dynamic Specs */}
              {product.specs &&
                Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-500 font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <span className="text-gray-900 font-semibold text-right">{value.toString()}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}