import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProductError() {
  return (
    <>
      <Navbar />
      <div className="w-full h-[80dvh] max-w-7xl mx-auto px-4 py-20">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-red-800 mb-2">Product Not Found</h2>
          <p className="text-red-600 mb-4">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/products"
            className="inline-block bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Back to Products
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}