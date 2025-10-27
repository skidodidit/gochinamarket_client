"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/Home/Hero";
import FeatureSection from "@/components/Home/FeatureSection";
import ProductShowcase from "@/components/Home/ProductShowcase";
import Footer from "@/components/Footer";
import ShoppingCategories from "@/components/Home/ShoppingCategories";
import NewArrival from "@/components/Home/NewArrival";
import Banner from "@/components/Home/Banner";
import { useApi } from "@/hooks/useApi";
import { getAllProducts } from "@/lib/api/product";
import { getCategories } from "@/lib/api/category";
import PopupAd from "@/components/Home/PopupAd";
import Advert from "@/components/Home/Adverts";

export default function Home() {
  const [showButton, setShowButton] = useState(false);

  const {
    data: bannerData,
    run: fetchBannerProducts,
    loading: bannerLoading,
  } = useApi(getAllProducts);

  const {
    data: discountedData,
    run: fetchDiscountedProducts,
    loading: discountedLoading,
  } = useApi(getAllProducts);

  const {
    data: newestData,
    run: fetchNewestProducts,
    loading: newestLoading,
  } = useApi(getAllProducts);

  const {
    data: popupData,
    run: fetchPopupProducts,
    loading: popupLoading,
  } = useApi(getAllProducts);

  const {
    data: categoriesData,
    loading: categoriesLoading,
    run: fetchCategories,
  } = useApi(getCategories);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBannerProducts({ isBanner: true, limit: 10, sortBy: "createdAt", sortOrder: "desc" });
    fetchDiscountedProducts({ discounted: true, limit: 10, sortBy: "createdAt", sortOrder: "desc" });
    fetchPopupProducts({ isPopup: true });
    fetchNewestProducts({ page: 1, limit: 4, sortBy: "createdAt", sortOrder: "desc" });
  }, []);

  const bannerProducts = bannerData?.data || [];
  const discountedProducts = discountedData?.data || [];
  const newProducts = newestData?.data?.slice(0, 4) || [];
  const popup = popupData?.data?.[0];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categories = categoriesData || [];

  return (
    <div className="text-white relative bg-darkBackground">
      <div className="bg-primary-300 md:w-[50dvh] md:h-[50dvh] w-[40dvh] h-[40dvh] fixed rounded-full opacity-50 blur-[170px] md:top-1/4 top-1/3 md:right-1/4" />
      <div className="bg-primary-300 w-48 h-48 fixed rounded-full opacity-50 blur-[150px] -top-10" />

      <Navbar/>
      <Advert/>
      <HeroSection
        bannerProducts={bannerProducts}
        categories={categories}
        loading={bannerLoading || categoriesLoading}
      />
      <FeatureSection />

      <ProductShowcase
        products={discountedProducts}
        loading={discountedLoading}
      />
      <ShoppingCategories categories={categories} />
      <Banner />
      <NewArrival
        products={newProducts}
        loading={newestLoading}
      />
      {/* <ContactInfo/> */}
      <Footer />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed right-6 p-3 bg-primary-300 text-black rounded-full shadow-lg hover:bg-primary-300/60 transition-all duration-500 ease-in-out transform
        ${showButton ? 'translate-y-0 opacity-100 bottom-10' : 'translate-y-10 opacity-0 bottom-0'}
      `}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
      {popupData?.data?.length && <PopupAd popup={popup}/>}

    </div>
  );
}