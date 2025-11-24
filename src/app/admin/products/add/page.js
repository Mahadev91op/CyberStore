"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Plus, Trash } from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "Processor", // Default
    brand: "",
    stock: 10,
    images: "", // Comma separated URLs
    specs: {}, // Dynamic Specs
  });

  // Specs (Key-Value Pairs) को हैंडल करने के लिए स्टेट
  const [specList, setSpecList] = useState([{ key: "", value: "" }]);

  const categories = [
    'Processor', 'Motherboard', 'RAM', 'Graphics Card', 
    'Storage', 'Power Supply', 'Cabinet', 'Monitor', 'Accessories'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Specs की लिस्ट में बदलाव
  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...specList];
    newSpecs[index][field] = value;
    setSpecList(newSpecs);
  };

  const addSpecRow = () => {
    setSpecList([...specList, { key: "", value: "" }]);
  };

  const removeSpecRow = (index) => {
    const newSpecs = specList.filter((_, i) => i !== index);
    setSpecList(newSpecs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Images को array में बदलो
      const imageArray = formData.images.split(",").map((img) => img.trim());

      // 2. Specs को Object में बदलो (Array -> Object)
      const specsObject = {};
      specList.forEach((item) => {
        if (item.key && item.value) {
          specsObject[item.key] = item.value;
        }
      });

      const payload = {
        ...formData,
        images: imageArray,
        specs: specsObject,
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("🎉 Product Added Successfully!");
        router.push("/admin"); // वापस डैशबोर्ड पर
      } else {
        const data = await res.json();
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-black mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Basic Info Card */}
          <div className="bg-[#111] p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-gray-400 uppercase tracking-wider mb-4">Basic Details</h3>
            
            <div>
              <label className="block text-sm mb-1">Product Name</label>
              <input name="name" required onChange={handleChange} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 focus:border-red-500 outline-none" placeholder="e.g. Intel Core i9-14900K" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Price (₹)</label>
                <input name="price" type="number" required onChange={handleChange} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 focus:border-red-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm mb-1">Discount Price (Optional)</label>
                <input name="discountPrice" type="number" onChange={handleChange} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 focus:border-red-500 outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Category</label>
                <select name="category" onChange={handleChange} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 focus:border-red-500 outline-none text-gray-300">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Brand</label>
                <input name="brand" required onChange={handleChange} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 focus:border-red-500 outline-none" placeholder="e.g. Intel" />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Description</label>
              <textarea name="description" required onChange={handleChange} rows="3" className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 focus:border-red-500 outline-none" placeholder="Product details..." />
            </div>

            <div>
              <label className="block text-sm mb-1">Image URLs (Comma separated)</label>
              <input name="images" required onChange={handleChange} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg p-3 focus:border-red-500 outline-none" placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" />
            </div>
          </div>

          {/* Specs Builder Card */}
          <div className="bg-[#111] p-6 rounded-2xl border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-400 uppercase tracking-wider">Technical Specs</h3>
              <button type="button" onClick={addSpecRow} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-1">
                <Plus size={14} /> Add Row
              </button>
            </div>

            <div className="space-y-3">
              {specList.map((spec, index) => (
                <div key={index} className="flex gap-3">
                  <input 
                    placeholder="Key (e.g. Socket)" 
                    value={spec.key}
                    onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                    className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-blue-500"
                  />
                  <input 
                    placeholder="Value (e.g. LGA1700)" 
                    value={spec.value}
                    onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                    className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-blue-500"
                  />
                  <button type="button" onClick={() => removeSpecRow(index)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg">
                    <Trash size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/20"
          >
            {loading ? "Saving..." : <><Save size={20} /> Save Product</>}
          </button>

        </form>
      </div>
    </div>
  );
}