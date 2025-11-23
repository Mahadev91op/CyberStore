import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { Filter, SlidersHorizontal, ChevronRight, AlertCircle } from "lucide-react";

// 1. डेटाबेस से प्रोडक्ट्स और फिल्टर लॉजिक
async function getProducts(categorySlug, searchParams) {
  try {
    await dbConnect();
    
    // Case-insensitive category match (e.g., "processor" -> "Processor")
    const categoryRegex = new RegExp(`^${categorySlug}$`, 'i');
    
    // बेसिक क्वेरी
    let query = { category: categoryRegex };

    // --- Filters Logic ---
    
    // 1. Brand Filter (URL: ?brand=intel,amd)
    if (searchParams.brand) {
      const brands = searchParams.brand.split(","); 
      query.brand = { $in: brands.map(b => new RegExp(b, 'i')) };
    }

    // 2. Stock Filter (URL: ?stock=in_stock)
    if (searchParams.stock === 'in_stock') {
      query.stock = { $gt: 0 };
    }

    // प्रोडक्ट्स लाओ (Lean performance ke liye)
    const products = await Product.find(query).lean();
    
    // Serialization (Object ID fix)
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
  
  // Category नाम को सुंदर बनाना (e.g. "graphics-card" -> "Graphics Card")
  const categoryName = params.slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // ब्रांड्स की लिस्ट (आप इसे DB से भी डायनामिकली ला सकते हैं)
  const availableBrands = ['Intel', 'AMD', 'Nvidia', 'MSI', 'Asus', 'Gigabyte', 'Corsair', 'Zotac'];

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-red-600 transition">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-gray-900 font-bold capitalize">{categoryName}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- LEFT: FILTER SIDEBAR (Sticky) --- */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white p-5 rounded-xl border border-gray-200 sticky top-24 shadow-sm">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <Filter size={20} className="text-red-600" />
                <h3 className="font-bold text-lg text-gray-900">Filters</h3>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-bold mb-3 text-xs uppercase text-gray-400 tracking-wider">Brand</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin">
                  {availableBrands.map((brand) => {
                    // चेक करें कि ब्रांड पहले से URL में है या नहीं
                    const currentBrands = searchParams.brand ? searchParams.brand.split(',') : [];
                    const isActive = currentBrands.some(b => b.toLowerCase() === brand.toLowerCase());
                    
                    // टॉगल लॉजिक: अगर है तो हटाओ, नहीं तो जोड़ो
                    let newBrands;
                    if (isActive) {
                      newBrands = currentBrands.filter(b => b.toLowerCase() !== brand.toLowerCase());
                    } else {
                      newBrands = [...currentBrands, brand.toLowerCase()];
                    }
                    
                    // नया URL बनाओ
                    const newQuery = new URLSearchParams(searchParams);
                    if (newBrands.length > 0) newQuery.set('brand', newBrands.join(','));
                    else newQuery.delete('brand');

                    return (
                      <Link 
                        key={brand}
                        href={`/category/${params.slug}?${newQuery.toString()}`}
                        className={`flex items-center gap-3 text-sm hover:text-red-600 transition cursor-pointer group`}
                      >
                        <div className={`w-4 h-4 border rounded flex items-center justify-center transition ${isActive ? 'bg-red-600 border-red-600' : 'border-gray-300 group-hover:border-red-400'}`}>
                          {isActive && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <span className={isActive ? 'font-bold text-gray-900' : 'text-gray-600'}>{brand}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Stock Filter */}
              <div>
                <h4 className="font-bold mb-3 text-xs uppercase text-gray-400 tracking-wider">Availability</h4>
                <Link 
                  href={
                    searchParams.stock 
                    ? `/category/${params.slug}?${new URLSearchParams({...searchParams, stock: ''}).toString().replace('&stock=', '')}` // Remove stock filter
                    : `/category/${params.slug}?${new URLSearchParams({...searchParams, stock: 'in_stock'}).toString()}` // Add stock filter
                  }
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-red-600 cursor-pointer group"
                >
                  <div className={`w-4 h-4 border rounded transition ${searchParams.stock === 'in_stock' ? 'bg-red-600 border-red-600' : 'border-gray-300 group-hover:border-red-400'}`} />
                  <span className={searchParams.stock === 'in_stock' ? 'font-bold text-gray-900' : ''}>In Stock Only</span>
                </Link>
              </div>

              {/* Reset Button */}
              {(searchParams.brand || searchParams.stock) && (
                <Link 
                  href={`/category/${params.slug}`}
                  className="mt-6 block text-center text-xs font-bold text-red-600 hover:bg-red-50 py-2 rounded-lg transition"
                >
                  CLEAR ALL FILTERS
                </Link>
              )}
            </div>
          </div>

          {/* --- RIGHT: PRODUCT GRID --- */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                {categoryName} 
                <span className="text-sm font-bold text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm">
                  {products.length} Products
                </span>
              </h1>
              
              {/* Mobile Filter Button (Visual Only for now) */}
              <button className="lg:hidden flex items-center gap-2 text-sm font-bold bg-white border px-4 py-2 rounded-lg shadow-sm">
                <SlidersHorizontal size={16} /> Filters
              </button>
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border-2 border-dashed border-gray-200 flex flex-col items-center">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                  <AlertCircle size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No products found</h3>
                <p className="text-gray-500 mt-2 max-w-md mx-auto">
                  We couldn't find any products matching your filters in this category. Try resetting filters or browse another category.
                </p>
                <Link 
                  href={`/category/${params.slug}`}
                  className="mt-6 inline-flex items-center justify-center bg-gray-900 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-gray-800 transition"
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