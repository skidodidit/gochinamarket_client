import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProductLoading() {
  return (
    <>
      <Navbar />
      <div className="w-full h-[80dvh] max-w-7xl mx-auto px-4 py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-300"></div>
      </div>
      <Footer />
    </>
  );
}