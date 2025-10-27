import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Flame, Zap, ShoppingBag, Sparkles, Tag, Heart, Clock } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ads = [
    {
        id: 1,
        title: "Mega Sale on Sneakers 👟",
        description: "Up to 50% off your favorite brands.",
        image: "/ads/sneakers.jpg",
        link: "/products/sneakers",
    },
    {
        id: 2,
        title: "Exclusive Smartwatch Offer ⌚",
        description: "Get the latest tech at unbeatable prices.",
        image: "/ads/watch.jpg",
        link: "/products/smartwatches",
    },
    {
        id: 3,
        title: "New Arrivals — Summer Collection ☀️",
        description: "Fresh styles, just dropped.",
        image: "/ads/summer.jpg",
        link: "/products/summer",
    },
];

const products = [
    {
        id: 1,
        title: "Summer Collection 2024",
        subtitle: "Up to 70% OFF",
        description: "Exclusive deals on trending fashion",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
        badge: "HOT DEAL",
        color: "from-purple-600 to-pink-600"
    },
    {
        id: 2,
        title: "Tech Gadgets Blowout",
        subtitle: "Starting at $99",
        description: "Latest electronics at unbeatable prices",
        image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&h=600&fit=crop",
        badge: "NEW ARRIVAL",
        color: "from-blue-600 to-cyan-600"
    },
    {
        id: 3,
        title: "Home Essentials Sale",
        subtitle: "Buy 2 Get 1 FREE",
        description: "Transform your living space today",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&h=600&fit=crop",
        badge: "LIMITED TIME",
        color: "from-orange-600 to-red-600"
    },
    {
        id: 4,
        title: "Fitness Revolution",
        subtitle: "Save up to 50%",
        description: "Premium workout gear for champions",
        image: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=1200&h=600&fit=crop",
        badge: "TRENDING",
        color: "from-green-600 to-emerald-600"
    }
];

const secondHandDeals = [
    { _id: 1, name: "Wireless Earbuds", price: "$49.99", oldPrice: "$129.99", discount: "62% OFF", image: "🎧" },
    { _id: 2, name: "Smart Watch Pro", price: "$199.99", oldPrice: "$399.99", discount: "50% OFF", image: "⌚" },
];

const AdCarousel = () => {
    const [current, setCurrent] = useState(0);

    // Auto-slide every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % ads.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full overflow-hidden rounded-xl shadow-lg bg-gradient-to-br from-red-500 to-pink-600 text-white">
            <AnimatePresence>
                <motion.div
                    key={ads[current].id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full h-48 md:h-64 cursor-pointer"
                >
                    <Link href={ads[current].link} className="block w-full h-full">
                        <Image
                            src={ads[current].image}
                            alt={ads[current].title}
                            fill
                            className="object-cover rounded-xl opacity-70"
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-xl backdrop-blur-sm flex flex-col justify-center items-center text-center p-4">
                            <h3 className="text-lg md:text-2xl font-bold mb-1">{ads[current].title}</h3>
                            <p className="text-xs md:text-sm opacity-90">{ads[current].description}</p>
                        </div>
                    </Link>
                </motion.div>
            </AnimatePresence>

            {/* Dots indicator */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                {ads.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${index === current ? "bg-white scale-110" : "bg-white/40"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

const MarqueeBanner = () => {
    const messages = [
        "FREE SHIPPING ON ORDERS $50+",
        "MEGA SALE - DON'T MISS OUT",
        "BUY MORE, SAVE MORE",
    ];

    return (
        <div className="bg-white/5 border-white/20 border rounded-lg backdrop-blur-sm text-primary-300 py-2 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap items-center">
                {messages.map((text, index) => (
                    <div key={index} className="flex items-center">
                        <span className="mx-8 font-semibold text-xs md:text-sm">{text}</span>
                        <Flame className="text-primary-400 w-4 h-4 shrink-0" />
                    </div>
                ))}

                {/* Repeat for smooth loop */}
                {messages.map((text, index) => (
                    <div key={`repeat-${index}`} className="flex items-center">
                        <span className="mx-8 font-semibold text-xs md:text-sm">{text}</span>
                        <Flame className="text-primary-400 w-4 h-4 shrink-0" />
                    </div>
                ))}
            </div>
            <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
      `}</style>
        </div>
    );
};


export default function Advert() {
    const [current, setCurrent] = useState(0);
    const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % products.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(countdown);
    }, []);

    const goToSlide = (index: number) => setCurrent(index);
    const nextSlide = () => setCurrent((prev) => (prev + 1) % products.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + products.length) % products.length);

    return (
        <div className="w-full pb-4 md:py-0 md:px-10">
            {/* Top Promo Banner */}
            <MarqueeBanner />
            {/* Main Hero Container */}
            <div className="max-w-7xl mx-auto px-5 pt-5">
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-5">
                    {/* Main Carousel */}
                    <div className="lg:col-span-7">
                        <div className="relative md:h-96 h-32 border border-white/20 bg-white/5 rounded-xl overflow-hidden">
                            {products?.map((product, index) => (
                                <div
                                    key={product.id}
                                    className={`absolute inset-0 transition-all duration-700 ${index === current
                                        ? 'opacity-100 translate-x-0'
                                        : index < current
                                            ? 'opacity-0 -translate-x-full'
                                            : 'opacity-0 translate-x-full'
                                        }`}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-r ${product.color} opacity-60 mix-blend-multiply`} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                    <div className="absolute md:top-4 md:left-4 top-2 left-2">
                                        <span className={`inline-block bg-gradient-to-r ${product.color} text-white px-4 py-2 rounded-full font-bold text-xs shadow-xl animate-pulse`}>
                                            {product.badge}
                                        </span>
                                    </div>

                                    <div className="absolute bottom-8 left-8 right-8 text-white space-y-3">
                                        <h2 className="desktop-visibility text-4xl md:text-5xl font-black drop-shadow-2xl leading-tight">
                                            {product.title}
                                        </h2>
                                        <p className="desktop-visibility text-2xl md:text-3xl font-bold text-yellow-300 drop-shadow-lg">
                                            {product.subtitle}
                                        </p>
                                        <p className="desktop-visibility text-lg text-white/90">{product.description}</p>
                                        <button className="desktop-visibility bg-white text-black px-5 py-2 rounded-lg font-bold hover:bg-yellow-400 transform hover:scale-105 transition-all shadow-xl inline-flex items-center gap-2 mt-2">
                                            <ShoppingBag className="w-4 h-4" />
                                            SHOP NOW
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white md:p-3 p-1 rounded-full transition-all hover:scale-110"
                            >
                                <ChevronLeft className="w-4 h-4 md:w-5 h-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white md:p-3 p-1 rounded-full transition-all hover:scale-110"
                            >
                                <ChevronRight className="w-4 h-4 md:w-5 h-5" />
                            </button>

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                                {products.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`transition-all rounded-full ${index === current
                                            ? 'w-8 h-2 bg-white'
                                            : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar - Flash Deals & Countdown */}
                    <div className="lg:col-span-3 space-y-4">
                        {/* Countdown Timer */}
                        <div className="bg-gradient-to-br from-primary-300 via-black to-primary-300 rounded-xl shadow-lg p-4 text-white">
                            <div className="flex items-center gap-2 mb-3">
                                <Clock className="w-5 h-5 animate-pulse" />
                                <p className="font-bold text-sm">FLASH SALE ENDS IN</p>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                                    <p className="text-2xl font-black">{String(timeLeft.hours).padStart(2, '0')}</p>
                                    <p className="text-xs opacity-90">Hours</p>
                                </div>
                                <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                                    <p className="text-2xl font-black">{String(timeLeft.minutes).padStart(2, '0')}</p>
                                    <p className="text-xs opacity-90">Mins</p>
                                </div>
                                <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                                    <p className="text-2xl font-black">{String(timeLeft.seconds).padStart(2, '0')}</p>
                                    <p className="text-xs opacity-90">Secs</p>
                                </div>
                            </div>
                        </div>

                        {/* Flash Deals */}
                        <div className="bg-white/5 border border-white/20 backdrop-blur-sm rounded-xl shadow-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-bold text-sm text-white">SHOP SECOND HAND PRODUCTS IN PERFECT CONDITION! <Link className='text-primary-300' href={'/used_products'}>See all</Link></h3>
                            </div>
                            <div className="space-y-1">
                                {secondHandDeals?.map((deal, idx) => (
                                    <Link href={`/products/${deal._id}`} key={idx} className="flex items-center gap-3 p-2 bg-white/5 backdrop-blur-sm rounded-lg hover:shadow-md transition-all cursor-pointer group">
                                        <div className="text-3xl transform group-hover:scale-110 transition-transform">{deal.image}</div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm text-gray-100">{deal.name}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-red-600 font-bold text-sm">{deal.price}</span>
                                                <span className="text-gray-400 line-through text-xs">{deal.oldPrice}</span>
                                            </div>
                                            <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">
                                                {deal.discount}
                                            </span>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-red-500 transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}