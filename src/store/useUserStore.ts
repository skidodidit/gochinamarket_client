import { create } from 'zustand';

type State = {
  email: string;
  setEmail: (email: string) => void;
};

export const useUserStore = create<State>((set) => ({
  email: '',
  setEmail: (email) => set({ email }),
}));
