import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AccountDetailsDTO {
  accountName: string;
  accountNumber: string;
  bankName: string;
}

export interface TransactionDTO {
  type: 'buy' | 'sell';
  user: string;
  status: 'pending' | 'completed' | 'cancelled';
  walletSentTo?: string;
  walletToReceive?: string;
  accountSentTo?: AccountDetailsDTO;
  accountToReceive?: AccountDetailsDTO;
  cryptoCurrencyAmount?: number;
  currencyAmount?: number;
  conversionRateUsed?: number;
  cryptoCurrency?: string;
  network?: string;
  currency?: string;
}

type TransactionStore = TransactionDTO & {
  setField: <K extends keyof TransactionDTO>(key: K, value: TransactionDTO[K]) => void;
  setNestedField: <
    K extends 'accountSentTo' | 'accountToReceive',
    F extends keyof AccountDetailsDTO
  >(key: K, field: F, value: AccountDetailsDTO[F]) => void;
  reset: () => void;
};

const initialState: TransactionDTO = {
  type: 'buy',
  user: '',
  status: 'pending',
  walletSentTo: '',
  walletToReceive: '',
  accountSentTo: {
    accountName: '',
    accountNumber: '',
    bankName: '',
  },
  accountToReceive: {
    accountName: '',
    accountNumber: '',
    bankName: '',
  },
  cryptoCurrencyAmount: undefined,
  currencyAmount: undefined,
  conversionRateUsed: undefined,
  cryptoCurrency: '',
  network: '',
  currency: '',
};

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set) => ({
      ...initialState,
      setField: (key, value) => set((state) => ({ ...state, [key]: value })),
      setNestedField: (key, field, value) =>
        set((state) => ({
          ...state,
          [key]: {
            ...state[key],
            [field]: value,
          },
        })),
      reset: () => set({ ...initialState }),
    }),
    {
      name: 'transaction-storage',
    }
  )
);
