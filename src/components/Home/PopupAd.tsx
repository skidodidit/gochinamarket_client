"use client";
import { useState, useEffect } from "react";
import { X, Tag, ArrowRight, Sparkles } from "lucide-react";
import { Product } from "@/types";
import Link from "next/link";

interface PopupInterface {
  popup?: Product;
}

export default function PopupAd({ popup }: PopupInterface) {
  const [visible, setVisible] = useState(false);
  console.log(popup)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-end p-4 bg-black/40"
      onClick={() => setVisible(false)}
    >
      {/* Popup card - Positioned bottom-right for minimal interruption */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-primary-300 rounded-xl shadow-2xl w-full max-w-sm md:max-w-md overflow-hidden animate-fadeIn"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-300/20 to-primary-400/10 rounded-full -translate-y-8 translate-x-8"></div>

        {/* Close Button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-3 z-10 rounded-full p-1.5 transition-all duration-200"
        >
          <X className="w-4 h-4 text-black" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative md:w-2/5 p-4 flex items-center justify-center">
            <div className="relative">
              {/* Discount Badge */}
              {popup?.discount! > 0 && <div className="absolute -top-2 -right-2 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                <Tag className="w-3 h-3 inline mr-1" />
                {popup?.discount}% OFF
              </div>}

              <img
                src={popup?.images?.[0]?.url}
                alt="Special Offer"
                className="rounded-xl shadow-lg w-full h-24 md:h-32 object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="md:w-3/5 p-4 md:pr-6 md:pl-2 flex flex-col justify-center">
            {/* Header */}
            <div className="flex items-center gap-1 mb-2">
              <Sparkles className="w-4 h-4 text-black" />
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Limited Time Offer
              </h2>
            </div>

            {/* Main Message */}
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 leading-tight">
              {popup?.name}
            </h3>

            {/* Subtext */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {popup?.popupText}
            </p>

            {/* Call to Action */}
            <Link href={`/products/${popup?._id}`}
              className="group bg-black hover:from-primary-400 hover:to-primary-300 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span className="text-sm">Shop Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Bottom decorative border */}
        <div className="h-1 bg-gradient-to-r from-primary-300 via-primary-400 to-primary-300"></div>
      </div>
    </div>
  );
}