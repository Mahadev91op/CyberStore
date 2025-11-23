"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProductImages({ images, name }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Area */}
      <div className="relative h-[400px] lg:h-[500px] w-full bg-white rounded-xl border border-gray-200 flex items-center justify-center p-4 overflow-hidden group">
        <Image
          src={mainImage || "/placeholder.png"}
          alt={name}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105"
          priority
        />
      </div>

      {/* Thumbnails Row */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(img)}
            className={`relative w-20 h-20 flex-shrink-0 rounded-lg border-2 overflow-hidden transition-all ${
              mainImage === img
                ? "border-red-600 ring-2 ring-red-100"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <Image
              src={img}
              alt={`Thumb ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}