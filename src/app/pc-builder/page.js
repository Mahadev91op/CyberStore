import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import PCBuilder from "@/components/builder/PCBuilder";

// डेटाबेस से सारे प्रोडक्ट्स लाओ
async function getAllParts() {
  try {
    await dbConnect();
    // हमें सारे पार्ट्स चाहिए
    const products = await Product.find({}).lean();
    
    // 🔥 Serialization Fix (यह लाइन सबसे सुरक्षित है)
    // यह Dates और ObjectIds को अपने आप स्ट्रिंग में बदल देगा
    return JSON.parse(JSON.stringify(products));
    
  } catch (error) {
    console.error("Error fetching parts:", error);
    return [];
  }
}

export default async function BuilderPage() {
  const products = await getAllParts();

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-2">CUSTOM PC <span className="text-red-600">BUILDER</span></h1>
          <p className="text-gray-500">Select compatible parts and build your dream machine.</p>
        </div>
        
        {/* Client Component को डेटा पास करो */}
        <PCBuilder products={products} />
        
      </div>
    </div>
  );
}