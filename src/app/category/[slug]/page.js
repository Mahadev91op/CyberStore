import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { Filter, SlidersHorizontal, ChevronRight, AlertCircle, Check } from "lucide-react";

// 1. डेटाबेस से प्रोडक्ट्स और फिल्टर लॉजिक
async function getProducts(categorySlug, searchParams) {
  try {
    await dbConnect();
    
    const categoryRegex = new RegExp(`^${categorySlug}$`, 'i');
    let query = { category: categoryRegex };

    // --- Filters Logic ---
    if (searchParams.brand) {
      const brands = searchParams.brand.split(","); 
      query.brand = { $in: brands.map(b => new RegExp(b, 'i')) };
    }

    if (searchParams.stock === 'in_stock') {
      query.stock = { $gt: 0 };
    }

    const products = await Product.find(query).lean();
    return JSON.parse(JSON.stringify(products));

  } catch (error) {
    console.error("Error fetching category products:", error);
    return [];
  }
}

// 2. Main Page Component
export default async function CategoryPage(props) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  
  const products = await getProducts(params.slug, searchParams);
  
  const categoryName = params.slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const availableBrands = ['Intel', 'AMD', 'Nvidia', 'MSI', 'Asus', 'Gigabyte', 'Corsair', 'Zotac'];

  return (
    <div className="min-h-screen bg-[#050505] text-white py-8 relative selection:bg-red-500 selection:text-white">
      
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <ChevronRight size={14} className="mx-2 text-gray-700" />
          <span className="text-gray-300 font-bold capitalize">{categoryName}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- LEFT: FILTER SIDEBAR (Dark & Sticky) --- */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-[#111] p-6 rounded-2xl border border-white/10 sticky top-24 shadow-xl backdrop-blur-md">
              
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                <Filter size={20} className="text-red-500" />
                <h3 className="font-bold text-lg text-white">Filters</h3>
              </div>

              {/* Brand Filter */}
              <div className="mb-8">
                <h4 className="font-bold mb-4 text-xs uppercase text-gray-500 tracking-wider">Brand</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent pr-2">
                  {availableBrands.map((brand) => {
                    const currentBrands = searchParams.brand ? searchParams.brand.split(',') : [];
                    const isActive = currentBrands.some(b => b.toLowerCase() === brand.toLowerCase());
                    
                    let newBrands;
                    if (isActive) {
                      newBrands = currentBrands.filter(b => b.toLowerCase() !== brand.toLowerCase());
                    } else {
                      newBrands = [...currentBrands, brand.toLowerCase()];
                    }
                    
                    const newQuery = new URLSearchParams(searchParams);
                    if (newBrands.length > 0) newQuery.set('brand', newBrands.join(','));
                    else newQuery.delete('brand');

                    return (
                      <Link 
                        key={brand}
                        href={`/category/${params.slug}?${newQuery.toString()}`}
                        className="group flex items-center gap-3 cursor-pointer"
                      >
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${isActive ? 'bg-red-600 border-red-600' : 'border-white/20 bg-[#1a1a1a] group-hover:border-white/40'}`}>
                          {isActive && <Check size={14} className="text-white" strokeWidth={3} />}
                        </div>
                        <span className={`text-sm transition-colors ${isActive ? 'font-bold text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>{brand}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Stock Filter */}
              <div>
                <h4 className="font-bold mb-4 text-xs uppercase text-gray-500 tracking-wider">Availability</h4>
                <Link 
                  href={
                    searchParams.stock 
                    ? `/category/${params.slug}?${new URLSearchParams({...searchParams, stock: ''}).toString().replace('&stock=', '')}` 
                    : `/category/${params.slug}?${new URLSearchParams({...searchParams, stock: 'in_stock'}).toString()}` 
                  }
                  className="group flex items-center gap-3 cursor-pointer"
                >
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${searchParams.stock === 'in_stock' ? 'bg-green-600 border-green-600' : 'border-white/20 bg-[#1a1a1a] group-hover:border-white/40'}`}>
                     {searchParams.stock === 'in_stock' && <Check size={14} className="text-white" strokeWidth={3} />}
                  </div>
                  <span className={`text-sm transition-colors ${searchParams.stock === 'in_stock' ? 'font-bold text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>In Stock Only</span>
                </Link>
              </div>

              {/* Clear Button */}
              {(searchParams.brand || searchParams.stock) && (
                <Link 
                  href={`/category/${params.slug}`}
                  className="mt-8 block text-center text-xs font-bold text-red-500 hover:text-red-400 hover:bg-red-500/10 py-3 rounded-lg transition border border-red-500/20"
                >
                  RESET FILTERS
                </Link>
              )}
            </div>
          </div>

          {/* --- RIGHT: PRODUCT GRID --- */}
          <div className="flex-1">
            
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                  {categoryName}
                </h1>
                <p className="text-gray-500 text-sm mt-1">Explore high-performance {categoryName.toLowerCase()}s</p>
              </div>
              
              <span className="text-xs font-bold text-gray-400 bg-[#1a1a1a] border border-white/10 px-4 py-2 rounded-full">
                {products.length} Products Found
              </span>
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-[#111] rounded-2xl p-16 text-center border border-dashed border-white/10 flex flex-col items-center">
                <div className="bg-[#1a1a1a] p-6 rounded-full mb-6 border border-white/5">
                  <AlertCircle size={40} className="text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-white">No products found</h3>
                <p className="text-gray-500 mt-2 max-w-md mx-auto">
                  We couldn't find any products matching your filters. Try resetting or check back later.
                </p>
                <Link 
                  href={`/category/${params.slug}`}
                  className="mt-8 inline-flex items-center justify-center bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
                >
                  Clear Filters
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}