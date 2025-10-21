import instance from "../axios";
import type { Cart } from "../../types";

interface CartItemPayload {
  productId: string; // Backend expects productId
  quantity: number;
}

// Helper to include guest ID in headers
const withSessionHeader = (guestId?: string) => ({
  headers: guestId ? { "x-session-id": guestId } : {},
});

// ✅ Get cart
export const getCart = async (guestId?: string) => {
  const res = await instance.get<Cart>("/cart", withSessionHeader(guestId));
  return res.data;
};

// ✅ Add to cart
export const addToCart = async (
  productId: string,
  quantity = 1,
  guestId?: string
) => {
  const res = await instance.post<Cart>(
    "/cart/add",
    { productId, quantity },
    withSessionHeader(guestId)
  );
  return res.data;
};

// ✅ Update quantity
export const updateCartItem = async (
  productId: string,
  quantity: number,
  guestId?: string
) => {
  const res = await instance.put<Cart>(
    "/cart/update",
    { productId, quantity },
    withSessionHeader(guestId)
  );
  return res.data;
};

// ✅ Remove item
export const removeCartItem = async (productId: string, guestId?: string) => {
  const res = await instance.delete(`/cart/remove/${productId}`, withSessionHeader(guestId));
  return res.data;
};

// ✅ Clear cart
export const clearCart = async (guestId?: string) => {
  const res = await instance.delete("/cart/clear", withSessionHeader(guestId));
  return res.data;
};
