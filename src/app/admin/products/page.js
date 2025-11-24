"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus, Eye, Search } from "lucide-react";
import Image from "next/image";

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // प्रोडक्ट्स लोड करें
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // प्रोडक्ट डिलीट करें
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Product Deleted!");
        fetchProducts(); // लिस्ट रिफ्रेश करें
      } else {
        alert("Failed to delete");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  // सर्च फिल्टर
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-10 text-white text-center">Loading Inventory...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-black">Manage Inventory</h1>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-3 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#111] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-red-500 outline-none"
              />
            </div>
            <Link 
              href="/admin/products/add" 
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition text-sm"
            >
              <Plus size={18} /> Add New
            </Link>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="bg-white/5 text-white uppercase font-bold text-xs tracking-wider">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4 text-center">Stock</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-white/5 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center overflow-hidden border border-white/10">
                          <Image 
                            src={product.images[0] || "https://placehold.co/100"} 
                            width={40} height={40} 
                            alt={product.name} 
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-white line-clamp-1">{product.name}</p>
                          <p className="text-xs">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-white/5 px-2 py-1 rounded border border-white/5 text-xs">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-white">₹{product.price.toLocaleString()}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock > 0 ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/product/${product._id}`} target="_blank" className="p-2 hover:bg-blue-500/10 text-blue-500 rounded-lg transition">
                          <Eye size={18} />
                        </Link>
                        <button onClick={() => handleDelete(product._id)} className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="p-8 text-center text-gray-500">No products found matching your search.</div>
          )}
        </div>

      </div>
    </div>
  );
}