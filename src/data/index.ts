

export const categories = [
  { name: "FURNITURE", icon: "🛋️" },
  { name: "GADGETS", icon: "📱" },
  { name: "ELECTRONICS GOODS", icon: "📺" }, // Changed 'ELCME GOODS' to 'ELECTRONICS GOODS'
  { name: "HOME GOODS", icon: "🏡" },
  { name: "DEALS", icon: "🔥" }, // Added 'DEALS' for desktop view consistency
];

export const mockProducts: any[] = [
  // Product 1: Large Banner (Mobile) / Top Banner (Desktop)
  {
    _id: "prod-1",
    name: "Luxury Living Room Set",
    brand: "SofaCo",
    description: "Ultimate comfort and modern design.",
    price: 3500,
    category: "FURNITURE",
    images: [{ url: "/images/living_room.jpg", alt: "Modern living room with light grey sofa" }], // Placeholder URL
    videos: [],
    inStock: true,
    isBanner: true,
    bannerText: true,
    rating: 4.8,
    reviews: 120,
    ratingCount: 550,
  },
  // Product 2: Grid 1 (Mobile/Desktop) - Drone
  {
    _id: "prod-2",
    name: "Aero X Pro Drone",
    brand: "SkyHigh",
    description: "4K camera drone with advanced stabilization.",
    price: 999,
    category: "GADGETS",
    images: [{ url: "/images/drone.jpg", alt: "A green and black drone flying over a sofa" }], // Placeholder URL
    videos: [],
    inStock: true,
    isBanner: true,
    rating: 4.5,
    reviews: 80,
    ratingCount: 300,
  },
  // Product 3: Grid 2 (Mobile/Desktop) - Desktop Setup
  {
    _id: "prod-3",
    name: "The Ultimate WFH Setup",
    brand: "TechZone",
    description: "Ergonomic desk and high-performance PC setup.",
    price: 1850,
    category: "ELECTRONICS GOODS",
    images: [{ url: "/images/desktop_setup.jpg", alt: "Modern home office desk with computer setup" }], // Placeholder URL
    videos: [],
    inStock: true,
    isBanner: true,
    rating: 4.6,
    reviews: 65,
    ratingCount: 250,
  },
  // Product 4: Grid 3 (Mobile/Desktop) - Gaming Monitor (Carousel Item 1)
  {
    _id: "prod-4",
    name: "Apex 4K Gaming Monitor",
    brand: "GameView",
    description: "High refresh rate, stunning visuals.",
    price: 650,
    category: "ELECTRONICS GOODS",
    images: [{ url: "/images/gaming_monitor.jpg", alt: "4K gaming monitor displaying a racing game" }], // Placeholder URL
    videos: [],
    inStock: true,
    isBanner: true, // This is the first carousel item
    rating: 4.7,
    reviews: 90,
    ratingCount: 400,
  },
  // Product 5: Carousel Item 2 - Sofa detail
  {
    _id: "prod-5",
    name: "Close-up Comfort Sofa",
    brand: "SofaCo",
    description: "Detail shot of the sofa's high-quality fabric.",
    price: 3500, // Same price as prod-1, but different image
    category: "FURNITURE",
    images: [{ url: "/images/sofa_detail.jpg", alt: "Close-up detail of a light grey sofa texture" }], // Placeholder URL
    videos: [],
    inStock: true,
    isBanner: true,
    rating: 4.8,
    reviews: 120,
    ratingCount: 550,
  },
  // Product 6: Carousel Item 3 - Another Gadget
  {
    _id: "prod-6",
    name: "Smart Home Hub",
    brand: "ConnectAll",
    description: "Central control for all smart devices.",
    price: 250,
    category: "GADGETS",
    images: [{ url: "/images/smarthome.jpg", alt: "Smart home hub device" }], // Placeholder URL
    videos: [],
    inStock: true,
    isBanner: true,
    rating: 4.4,
    reviews: 40,
    ratingCount: 180,
  },
];