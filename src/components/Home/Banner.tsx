import React from 'react';
import { useGlobalStore } from '@/store/useGlobalStore';
import Link from 'next/link';

const Banner = () => {
    const { settings } = useGlobalStore()

    return (
        <div className='relative bg-primary-300 w-full overflow-hidden'>
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-black/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-black/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative w-full max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Side - Content */}
                    <div className="space-y-8 text-center lg:text-left z-10">
                        {/* Brand Badge */}
                        <div className="inline-flex items-center gap-2 bg-black/10 backdrop-blur-sm px-4 py-2 rounded-full">
                            <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                            <span className="text-black font-semibold text-sm md:text-base capitalize">
                                {settings?.siteName || 'Premium Store'}
                            </span>
                        </div>

                        {/* Main Heading */}
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-black">
                                Elevate Your
                            </h1>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-black to-black/70 bg-clip-text text-transparent">
                                Shopping Journey
                            </h1>
                        </div>

                        {/* Subtitle */}
                        <p className="text-black/80 text-lg md:text-xl max-w-lg mx-auto lg:mx-0">
                            Discover exclusive collections with unbeatable quality and style
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm md:text-base">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-black font-medium">Free Shipping</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-black font-medium">Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-black font-medium">24/7 Support</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <Link
                                href={'/products'}
                                className="group relative bg-black text-primary-300 font-bold py-4 px-10 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-flex items-center justify-center gap-2 overflow-hidden"
                            >
                                <span className="relative z-10">Shop Now</span>
                                <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                                <div className="absolute inset-0 bg-gradient-to-r from-black to-black/80 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            </Link>
                            
                            <Link href={'/used_products'} className="bg-white/20 backdrop-blur-sm text-black font-semibold py-4 px-10 text-lg rounded-full transition-all duration-300 hover:bg-white/30 hover:scale-105 border-2 border-black/10">
                                Shop Second Hand
                            </Link>
                        </div>
                    </div>

                    {/* Right Side - Product Image */}
                    <div className="relative flex justify-center lg:justify-end">
                        {/* Decorative elements */}
                        <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent rounded-3xl transform rotate-6"></div>
                        <div className="absolute inset-0 bg-gradient-to-tl from-black/5 to-transparent rounded-3xl transform -rotate-6"></div>

                        {/* Image container */}
                        <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                            <img
                                src="/images/products.png"
                                alt="Premium products showcase"
                                className='w-full h-full object-contain drop-shadow-2xl'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;