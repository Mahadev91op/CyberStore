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
} from "lucide-react";
import Link from "next/link";

// डेटाबेस से प्रोडक्ट्स लाने का फंक्शन
async function getProducts() {
  await dbConnect();
  // सिर्फ featured प्रोडक्ट्स लाओ, या अगर नहीं हैं तो लेटेस्ट 8 प्रोडक्ट्स
  const products = await Product.find({}).limit(8).lean();

  // MongoDB Object ID को String में बदलना जरूरी है (Next.js Serialization issue fix)
  return products.map((p) => ({ ...p, _id: p._id.toString() }));
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 1. HERO SECTION (Banner) */}
      <section className="relative h-[500px] bg-gray-900 flex items-center">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-gray-900 to-transparent z-10"></div>

        {/* Actual Content */}
        <div className="container mx-auto px-4 relative z-20 w-full flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-white space-y-6">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              New Arrival
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              NEXT GEN <br />{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-500">
                GAMING RIGS
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md">
              Build your custom PC with the latest RTX 40 Series and 14th Gen
              Processors. Get maximum performance at the best price.
            </p>
            <div className="flex space-x-4 pt-4">
              <Link
                href="/pc-builder"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-bold text-lg transition flex items-center"
              >
                Start Building <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>

          {/* Hero Image Area (Right Side) */}
          <div className="hidden md:block w-1/2 relative h-[400px]">
            {/* यहाँ बाद में आप कोई ट्रांसपेरेंट PC की इमेज लगा सकते हैं */}
            {/* <Image src="/hero-pc.png" fill className="object-contain" /> */}
          </div>
        </div>
      </section>

      {/* 2. THE SPECIAL "REVIEW & WIN" OFFER (Techpc7 Style) */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="bg-linear-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 text-center mb-10">
              <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
                <Gift className="text-yellow-400" /> Get{" "}
                <span className="text-yellow-400">₹500 Cashback</span>{" "}
                Instantly!
              </h2>
              <p className="text-blue-200 mt-2">
                Just follow these 4 simple steps after your purchase.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  icon: ShoppingCart,
                  title: "1. Buy PC",
                  desc: "Order any Custom PC",
                },
                {
                  icon: Camera,
                  title: "2. Record",
                  desc: "Make an unboxing video",
                },
                {
                  icon: Youtube,
                  title: "3. Upload",
                  desc: "Upload to YouTube & Tag us",
                },
                {
                  icon: MessageCircle,
                  title: "4. Share",
                  desc: "WhatsApp link & Get ₹500",
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 text-center hover:-translate-y-1 transition duration-300"
                >
                  <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-lg">{step.title}</h3>
                  <p className="text-sm text-blue-200 mt-1">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS GRID */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Products
            </h2>
            <p className="text-gray-500 mt-1">
              Handpicked best sellers for you
            </p>
          </div>
          <Link
            href="/products"
            className="text-red-600 font-semibold hover:underline"
          >
            View All Products &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">
                No products found. Please run the seed script.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
