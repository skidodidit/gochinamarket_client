import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProductLoading() {
  return (
    <div className="bg-darkBackground">
      <div className="bg-primary-300 md:w-[50dvh] md:h-[50dvh] w-[40dvh] h-[40dvh] fixed rounded-full opacity-50 blur-[170px] md:top-1/4 top-1/3 md:right-1/4" />
      <div className="bg-primary-300 w-48 h-48 fixed rounded-full opacity-50 blur-[150px] -top-10" />
      <Navbar />
      <div className="w-full h-[80dvh] max-w-7xl mx-auto px-4 py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-300"></div>
      </div>
      <Footer />
    </div>
  );
}