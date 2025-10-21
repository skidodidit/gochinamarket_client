"use client";

import React, { useState, useEffect } from "react";
import { Trash2, ShoppingCart, Eye, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApi } from "@/hooks/useApi";
import { getWishlist, removeFromWishlist, addToWishlist } from "@/lib/api/wishlist";
import { addToCart } from "@/lib/api/cart";
import { useGuestId } from "@/hooks/useGuestId";
import type { Product } from "@/types";
import Link from "next/link";
import { getAllProducts } from "@/lib/api/product";

type RecommendationItem = Product & {
    isNew: boolean;
};

const WishlistPage: React.FC = () => {
    const guestId = useGuestId();

    // API hooks
    const { data: wishlistItems, run: fetchWishlist, loading: loadingWishlist } = useApi(getWishlist);
    const { run: removeFromWishlistApi, loading: removingFromWishlist } = useApi(removeFromWishlist);
    const { data: recommendations, run: fetchNewestProducts, loading: newestLoading, } = useApi(getAllProducts);
    const { run: addToCartApi, loading: addingToCart } = useApi(addToCart);
    const { run: addToWishlistApi } = useApi(addToWishlist);

    // Fetch wishlist data
    useEffect(() => {
        loadWishlist();
        fetchNewestProducts({ page: 1, limit: 10 })
    }, [guestId]);

    const loadWishlist = async () => {
        try {
            fetchWishlist(guestId);
        } catch (err) {
            console.error('Failed to load wishlist:', err);
        }
    };


    const handleRemoveFromWishlist = async (productId: string) => {
        try {
            await removeFromWishlistApi(productId, guestId);
        } catch (err) {
            console.error('Failed to remove from wishlist:', err);
            alert('Failed to remove item from wishlist');
        }
    };

    const handleAddToCart = async (product: Product) => {
        try {
            await addToCartApi(product._id, 1, guestId);
            alert("Product added to cart!");
        } catch (err) {
            console.error('Failed to add to cart:', err);
            alert("Failed to add product to cart");
        }
    };

    const handleAddToWishlist = async (product: Product) => {
        try {
            await addToWishlistApi(product._id);
            fetchWishlist();
            alert("Product added to wishlist!");
        } catch (err) {
            console.error('Failed to add to wishlist:', err);
            alert("Failed to add product to wishlist");
        }
    };

    const moveAllToBag = async () => {
        try {
            for (const item of wishlistItems!) {
                await addToCartApi(item._id, 1, guestId);
            }
            alert("All items moved to cart!");
        } catch (err) {
            console.error('Failed to move all items to cart:', err);
            alert("Failed to move some items to cart");
        }
    };

    const isLoading = loadingWishlist || removingFromWishlist || addingToCart;

    type StarRatingProps = {
        rating: number;
        reviewCount: number;
    };

    const StarRating: React.FC<StarRatingProps> = ({ rating, reviewCount }) => (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-sm">
                    {i < Math.floor(rating) ? "★" : "☆"}
                </span>
            ))}
            <span className="text-gray-500 text-sm ml-1">({reviewCount})</span>
        </div>
    );

    type ProductCardProps = {
        item: Product | RecommendationItem;
        isWishlist?: boolean;
        showQuickView?: boolean;
    };

    const ProductCard: React.FC<ProductCardProps> = ({
        item,
        isWishlist = false,
        showQuickView = false,
    }) => {
        const mainImage = item.images[0]?.url || '/api/placeholder/200/200';
        const currentPrice = item.discount
            ? item.price * (1 - item.discount / 100)
            : item.price;

        return (
            <div className="bg-white overflow-hidden group relative">
                {/* Discount Badge */}
                {item.discount! > 0 && (
                    <div className="absolute top-2 left-2 z-10 bg-red-500/60 text-white px-2 py-1 rounded text-xs font-semibold">
                        -{item.discount}%
                    </div>
                )}

                {/* New Badge */}
                {"isNew" in item && item.isNew && (
                    <div className="absolute top-2 left-2 z-10 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        NEW
                    </div>
                )}

                {/* Action Icons */}
                <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
                    {isWishlist ? (
                        <button
                            onClick={() => handleRemoveFromWishlist(item._id)}
                            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            <Trash2 size={16} />
                        </button>
                    ) : (
                        <button
                            onClick={() => handleAddToWishlist(item)}
                            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            <Heart size={16} color="black" />
                        </button>
                    )}
                </div>

                {/* Product Image */}
                <div className="relative">
                    {item.images && item.images[0] ? (
                        <img
                            src={item.images[0].url}
                            alt={item.name}
                            className="w-full h-48 object-cover"
                        />
                    ) : (
                        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                        </div>
                    )}
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={() => handleAddToCart(item)}
                    disabled={isLoading || !item.inStock}
                    className="w-full bg-black text-white py-3 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ShoppingCart size={18} />
                    {addingToCart ? "Adding..." : "Add To Cart"}
                </button>

                {/* Product Info */}
                <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                        {item.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-500 font-semibold">${currentPrice.toFixed(2)}</span>
                        {item.discount && (
                            <span className="text-gray-400 line-through text-sm">
                                ${item.price.toFixed(2)}
                            </span>
                        )}
                    </div>
                    {item.rating && (
                        <StarRating rating={item.rating} reviewCount={item.ratingCount} />
                    )}
                    {!item.inStock && (
                        <p className="text-red-500 text-sm mt-1">Out of Stock</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Wishlist Section */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        {/* Header */}
                        <div className="text-start md:mb-10">
                            <div className="flex justify-start items-center gap-2 mb-4">
                                <div className="w-5 h-10 bg-primary-300 rounded"></div>
                                <span className="text-primary-300 font-semibold">Wishlist ({wishlistItems?.length || 0})</span>
                            </div>
                        </div>
                        {wishlistItems && wishlistItems?.length > 0 && (
                            <button
                                onClick={moveAllToBag}
                                disabled={isLoading}
                                className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Moving..." : "Move All To Bag"}
                            </button>
                        )}
                    </div>

                    {/* Wishlist Grid */}
                    {loadingWishlist ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">Loading wishlist...</p>
                        </div>
                    ) : wishlistItems && wishlistItems?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {wishlistItems?.map((item) => (
                                <ProductCard key={item._id} item={item} isWishlist={true} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">Your wishlist is empty</p>
                            <p className="text-gray-400">
                                Add items to your wishlist to see them here
                            </p>
                        </div>
                    )}
                </div>

                {/* Just For You Section */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-10 bg-primary-300 rounded"></div>
                            <h2 className="font-semibold text-primary-300">Just For You</h2>
                        </div>
                        <Link href={'/products'} className="px-6 py-2 text-primary-300 transition-colors rounded">
                            See All
                        </Link>
                    </div>

                    {/* Recommendations Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 md:gap-4 gap-1 mb-10">
                        {recommendations?.data?.map((item) => (
                            <ProductCard key={item._id} item={item} showQuickView={true} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default WishlistPage;