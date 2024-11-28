import { create } from 'zustand';
import { MenuItem } from './types';

interface StoreState {
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (id: string, item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  menuItems: [],
  addMenuItem: (item) =>
    set((state) => ({ menuItems: [...state.menuItems, item] })),
  updateMenuItem: (id, updatedItem) =>
    set((state) => ({
      menuItems: state.menuItems.map((item) =>
        item.id === id ? updatedItem : item
      ),
    })),
  deleteMenuItem: (id) =>
    set((state) => ({
      menuItems: state.menuItems.filter((item) => item.id !== id),
    })),
}));