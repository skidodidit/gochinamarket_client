import { create } from "zustand";
import type { Contact, Settings } from "@/types";

interface GlobalStore {
  contacts: any;
  settings: Settings | null;
  loading: boolean;
  setContacts: any;
  setSettings: (settings: Settings) => void;
  setLoading: (loading: boolean) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  contacts: null,
  settings: null,
  loading: false,
  setContacts: (contacts: any) => set({ contacts }),
  setSettings: (settings) => set({ settings }),
  setLoading: (loading) => set({ loading }),
}));
