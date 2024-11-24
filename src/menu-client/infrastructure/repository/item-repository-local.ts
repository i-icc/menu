import { MenuItem, Tag } from '@/types/menu';
import { ItemRepository } from '@/types/repository';

const tags: { [key: string]: Tag } = {
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

// リポジトリインターフェース
export class ItemRepositoryLocal implements ItemRepository {
    async getAllItems(): Promise<MenuItem[]> {
        const menuItems: MenuItem[] = [
            {
                id: '1',
                name: 'Artisanal Latte',
                description: 'Smooth espresso with perfectly steamed milk and artistic foam',
                image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80',
                steps: [],
                tags: [tags['drinks']],  // Corrected: Tagging as a drink
            },
            {
                id: '2',
                name: 'Avocado Toast',
                description: 'Sourdough bread topped with mashed avocado, poached eggs, and microgreens',
                image: 'https://images.unsplash.com/photo-1603046891744-1f76eb10aec1?w=800&q=80',
                steps: [],
                tags: [tags['breakfast']],  // Corrected: Tagging as breakfast
            },
            {
                id: '3',
                name: 'Tiramisu',
                description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
                image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80',
                steps: [],
                tags: [tags['desserts']],  // Corrected: Tagging as a dessert
            }
        ];
        return menuItems;
    }

    async getItemById(id: string): Promise<MenuItem | null> {
        throw `${id}`
        // const item: MenuItem | undefined = menuItems.find((item) => item.id === id);
        // return item ? item : null;
    }

    async getItemsByTag(tag: Tag): Promise<MenuItem[]> {
        const menuItems: MenuItem[] = [
            {
                id: '1',
                name: 'Artisanal Latte',
                description: 'Smooth espresso with perfectly steamed milk and artistic foam',
                image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80',
                steps: [],
                tags: [tags['drinks']],  // Corrected: Tagging as a drink
            },
            {
                id: '2',
                name: 'Avocado Toast',
                description: 'Sourdough bread topped with mashed avocado, poached eggs, and microgreens',
                image: 'https://images.unsplash.com/photo-1603046891744-1f76eb10aec1?w=800&q=80',
                steps: [],
                tags: [tags['breakfast']],  // Corrected: Tagging as breakfast
            },
            {
                id: '3',
                name: 'Tiramisu',
                description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
                image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80',
                steps: [],
                tags: [tags['desserts'], tag],  // Corrected: Tagging as a dessert
            }
        ];
        return menuItems;
    }

    async createItem(item: MenuItem): Promise<MenuItem> {
        throw `${item.id}`
    }

    async updateItem(item: MenuItem): Promise<MenuItem> {
        throw `${item.id}`
    }

    async deleteItem(id: string): Promise<boolean> {
        throw `${id}`
    }
}
