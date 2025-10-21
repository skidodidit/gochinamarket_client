import instance from '../axios';
import { Product } from '../../types';

const withSessionHeader = (guestId?: string) => ({
  headers: guestId ? { 'x-session-id': guestId } : {},
});

export const getWishlist = async (guestId?: string) => {
  const res = await instance.get<Product[]>('/wishlist', withSessionHeader(guestId));
  return res.data;
};

export const addToWishlist = async (productId: string, guestId?: string) => {
  const res = await instance.post('/wishlist/add', { productId }, withSessionHeader(guestId));
  return res.data;
};

export const removeFromWishlist = async (productId: string, guestId?: string) => {
  const res = await instance.delete(`/wishlist/remove/${productId}`, withSessionHeader(guestId));
  return res.data;
};

export const clearWishlist = async (guestId?: string) => {
  const res = await instance.delete('/wishlist/clear', withSessionHeader(guestId));
  return res.data;
};
