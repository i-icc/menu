import { MenuItem, Tag } from '../types/menu';

// 仮のデータ
export const tags: { [key: string]: Tag } = {
  'drinks': {
    id: 'drinks',
    title: 'Beverages',
    description: 'Handcrafted drinks made with premium ingredients',
  },
  'main': {
    id: 'main',
    title: 'Main Dishes',
    description: 'Satisfying meals prepared with care',
  },
  'desserts': {
    id: 'desserts',
    title: 'Desserts',
    description: 'Sweet treats to complete your meal',
  },
  'breakfast': {
    id: 'breakfast',
    title: 'Breakfast',
    description: 'Start your day right',
  },
};

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Artisanal Latte',
    description: 'Smooth espresso with perfectly steamed milk and artistic foam',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80',
    steps: [],
    tags: [tags['drinks']],
  },
  {
    id: '2',
    name: 'Avocado Toast',
    description: 'Sourdough bread topped with mashed avocado, poached eggs, and microgreens',
    image: 'https://images.unsplash.com/photo-1603046891744-1f76eb10aec1?w=800&q=80',
    steps: [],
    tags: [tags['drinks']],
  },
  {
    id: '3',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80',
    steps: [],
    tags: [tags['drinks']],
  }
];