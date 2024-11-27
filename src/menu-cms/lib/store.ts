import { create } from 'zustand';
import { MenuItem, Tag } from './types';

interface StoreState {
  menuItems: MenuItem[];
  tags: Tag[];
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (id: string, item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  addTag: (tag: Tag) => void;
  updateTag: (id: string, tag: Tag) => void;
  deleteTag: (id: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  menuItems: [],
  tags: [],
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
  addTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
  updateTag: (id, updatedTag) =>
    set((state) => ({
      tags: state.tags.map((tag) => (tag.id === id ? updatedTag : tag)),
    })),
  deleteTag: (id) =>
    set((state) => ({
      tags: state.tags.filter((tag) => tag.id !== id),
    })),
}));