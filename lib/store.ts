import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "firebase/auth";
import { Product } from "./type";

export interface CartItem extends Product {
  quantity: number;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

interface FilterState {
  category: { name: string; id: string };
  priceRange: [number, number];
  rating: number;
  sortBy: string;
  searchQuery: string;
  setCategory: (category: { name: string; id: string }) => void;
  setPriceRange: (range: [number, number]) => void;
  setRating: (rating: number) => void;
  setSortBy: (sortBy: string) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  logout: () => set({ user: null }),
}));

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.xata_id === product.xata_id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.xata_id === product.xata_id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { ...product, quantity }],
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.xata_id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.xata_id === productId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "cart-storage",
    }
  )
);

export const useFilterStore = create<FilterState>((set) => ({
  category: { name: "", id: "" },
  priceRange: [0 as number, 100000 as number],
  rating: 0,
  sortBy: "featured",
  searchQuery: "",
  setCategory: (category) => set({ category }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setRating: (rating) => set({ rating }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  clearFilters: () =>
    set({
      category: { name: "", id: "" },
      priceRange: [0, 100000],
      rating: 0,
      sortBy: "featured",
      searchQuery: "",
    }),
}));
