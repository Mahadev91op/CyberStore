import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Check, Truck, ShieldCheck, Cpu } from 'lucide-react'; // ShoppingCart hata diya kyunki ab wo button component me hai
import Link from 'next/link';
import AddToCartBtn from '@/components/product/AddToCartBtn'; // 🔥 New Import

// 1. Data Fetching
async function getProduct(id) {
  try {
    await dbConnect();
    const product = await Product.findById(id).lean();
    if (!product) return null;
    // Convert _id and dates to string
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    return null;
  }
}

// 2. Main Page
export default async function ProductPage(props) {
  const params = await props.params;
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  const discountPercent = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-red-600">Home</Link> / 
        <span className="mx-2 text-gray-400">›</span>
        <span className="uppercase">{product.category}</span> / 
        <span className="mx-2 text-gray-400">›</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* --- LEFT COLUMN: IMAGES --- */}
        <div className="space-y-4">
          <div className="relative h-[400px] md:h-[500px] bg-white border border-gray-200 rounded-xl overflow-hidden flex items-center justify-center p-4">
            <Image 
              src={product.images[0] || 'https://placehold.co/600'} 
              alt={product.name} 
              fill
              className="object-contain"
              priority
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                -{discountPercent}% OFF
              </span>
            )}
          </div>
          {/* Small Thumbnails */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
             {product.images.map((img, idx) => (
               <div key={idx} className="w-20 h-20 border rounded-md relative cursor-pointer hover:border-red-500">
                 <Image src={img} alt="thumb" fill className="object-contain p-1"/>
               </div>
             ))}
          </div>
        </div>

        {/* --- RIGHT COLUMN: DETAILS --- */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center space-x-2 mb-4">
            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded border border-gray-300">
              Brand: {product.brand}
            </span>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded border ${product.stock > 0 ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'}`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Price Section */}
          <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-end gap-3">
               <span className="text-4xl font-bold text-red-600">
                 ₹{(product.discountPrice || product.price).toLocaleString()}
               </span>
               {product.discountPrice > 0 && (
                 <span className="text-lg text-gray-400 line-through mb-1">
                   ₹{product.price.toLocaleString()}
                 </span>
               )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
          </div>

          {/* Action Buttons Area */}
          <div className="flex gap-4 mb-8">
            {/* 🔥 यहाँ हमने पुराना बटन हटाकर नया कंपोनेंट लगाया है */}
            <AddToCartBtn product={product} />
            
            <button className="flex-1 bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition">
              Buy Now
            </button>
          </div>

          {/* Features/Promises */}
          <div className="grid grid-cols-2 gap-4 mb-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Truck className="text-red-500" size={20}/> <span>Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-red-500" size={20}/> <span>3 Years Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="text-red-500" size={20}/> <span>GST Invoice Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="text-red-500" size={20}/> <span>100% Genuine Parts</span>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-sm text-gray-500 mb-6">
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      {/* --- BOTTOM SECTION: SPECIFICATIONS --- */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-200">Technical Specifications</h2>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <tbody>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-4 font-medium text-gray-900 w-1/3">Category</th>
                <td className="px-6 py-4">{product.category}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 font-medium text-gray-900">Brand</th>
                <td className="px-6 py-4">{product.brand}</td>
              </tr>
              {/* Dynamic Specs Render */}
              {product.specs && Object.entries(product.specs).map(([key, value]) => (
                <tr key={key} className="border-b border-gray-100 even:bg-gray-50">
                  <th className="px-6 py-4 font-medium text-gray-900 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </th>
                  <td className="px-6 py-4">{value.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}