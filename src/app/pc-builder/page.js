import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import PCBuilder from "@/components/builder/PCBuilder";

// डेटाबेस से सारे प्रोडक्ट्स लाओ
async function getAllParts() {
  try {
    await dbConnect();
    const products = await Product.find({}).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching parts:", error);
    return [];
  }
}

export default async function BuilderPage() {
  const products = await getAllParts();

  return (
    <div className="min-h-screen bg-[#050505] text-white py-12 relative overflow-hidden selection:bg-red-500 selection:text-white">
      
      {/* Animated Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-3 tracking-tight">
            CUSTOM PC <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">CONFIGURATOR</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Select compatible components and forge your ultimate gaming machine.
          </p>
        </div>
        
        {/* Client Component */}
        <PCBuilder products={products} />
        
      </div>
    </div>
  );
}