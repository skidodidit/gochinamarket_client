import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useApi } from "@/hooks/useApi";
import { getCart, updateCartItem, removeCartItem } from "@/lib/api/cart";
import { useGuestId } from "@/hooks/useGuestId";
import type { Cart, CartItem as CartItemType } from "@/types";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Cart: React.FC<Props> = ({ isOpen, setIsOpen }) => {
    const [cartData, setCartData] = useState<Cart>();
    const guestId = useGuestId();

    // API hooks
    const { run: fetchCart, loading: loadingCart } = useApi(getCart);
    const { run: updateQuantity, loading: updatingQuantity } = useApi(updateCartItem);
    const { run: removeItem, loading: removingItem } = useApi(removeCartItem);

    // Fetch cart data when sidebar opens or guestId changes
    useEffect(() => {
        if (isOpen) {
            loadCart();
        }
    }, [isOpen, guestId]);

    const loadCart = async () => {
        try {
            const cart = await fetchCart(guestId);
            setCartData(cart);
        } catch (err) {
            console.error('Failed to load cart:', err);
            // Initialize empty cart if fetch fails
            setCartData({ items: [] });
        }
    };

    const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
        try {
            if (newQuantity <= 0) {
                await handleRemoveItem(productId);
                return;
            }

            const updatedCart = await updateQuantity(productId, newQuantity, guestId);
            setCartData(updatedCart);
        } catch (err) {
            console.error('Failed to update quantity:', err);
            alert('Failed to update quantity');
        }
    };

    const handleRemoveItem = async (productId: string) => {
        try {
            await removeItem(productId, guestId);
            // Update local state by removing the item
            if (cartData) {
                setCartData({
                    ...cartData,
                    items: cartData.items.filter(item => item.product._id !== productId)
                });
            }
        } catch (err) {
            console.error('Failed to remove item:', err);
            alert('Failed to remove item from cart');
        }
    };

    const cartItems = cartData?.items || [];
    const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const isLoading = loadingCart || updatingQuantity || removingItem;

    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 touch-none ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Cart Sidebar */}
            <div
                className={`fixed touch-none top-0 right-0 h-full w-full md:w-96 bg-darkBackground text-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="bg-primary-300 w-48 h-48 fixed rounded-full opacity-50 blur-[100px] top-32" />
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/20 bg-white/5">
                    <h2 className="text-lg font-semibold text-primary-300">
                        Shopping Cart ({itemCount})
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        disabled={isLoading}
                    >
                        <X className="w-5 h-5 text-primary-300" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto pb-6 pt-4 px-4 touch-none">
                    {isLoading && cartItems.length === 0 ? (
                        <div className="text-center text-primary-300 mt-8">
                            <p>Loading cart...</p>
                        </div>
                    ) : cartItems.length === 0 ? (
                        <div className="text-center text-gray-200 mt-8">
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {cartItems?.map((item) => (
                                <CartItem
                                    key={item.product._id}
                                    item={item}
                                    onUpdateQuantity={handleUpdateQuantity}
                                    onRemoveItem={handleRemoveItem}
                                    disabled={isLoading}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="border-t border-white/20 backdrop-blur-sm bg-white/5 px-6 py-4 space-y-4">
                        {/* Subtotal */}
                        <div className="flex items-center justify-between font-semibold text-primary-300">
                            <span className='text-white'>Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        {/* Checkout Button */}
                        <button
                            className="w-full bg-primary-300 text-black rounded-lg py-3 px-4 font-medium hover:bg-primary-300/60 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : 'Checkout'}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

// Separate component for individual cart items
interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (productId: string, quantity: number) => void;
    onRemoveItem: (productId: string) => void;
    disabled: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemoveItem, disabled }) => {
    const { product, quantity } = item;
    const mainImage = product.images[0]?.url || '/api/placeholder/80/60';

    return (
        <div className="flex items-start space-x-4 bg-white/5 border border-white/10 rounded-xl p-2">
            {/* Product Image */}
            <div className="w-20 h-16 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-xs text-white line-clamp-2">
                    {product.name}
                </h3>
                <p className="font-semibold text-white">
                    ${product.price.toFixed(2)}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => onUpdateQuantity(product._id, quantity - 1)}
                        className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={disabled || quantity <= 1}
                    >
                        <Minus className="w-3 h-3 text-white" />
                    </button>

                    <span className="w-8 text-center font-medium text-primary-300">
                        {quantity}
                    </span>

                    <button
                        onClick={() => onUpdateQuantity(product._id, quantity + 1)}
                        className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={disabled}
                    >
                        <Plus className="w-3 h-3 text-white" />
                    </button>
                </div>
            </div>

            {/* Remove Button */}
            <button
                onClick={() => onRemoveItem(product._id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={disabled}
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Cart;