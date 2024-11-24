import { tags } from '@/data/menu';
import { MenuItem, Tag } from '@/types/menu';
import { ItemRepository } from '@/types/repository';

// リポジトリインターフェース
export class ItemRepositoryLocal implements ItemRepository {
    async getAllItems(): Promise<MenuItem[]> {
        const menuItems: MenuItem[] = [
            {
                id: '1',
                name: 'パエリア',
                description: '',
                image: '/images/4A29FF84.png',
                steps: [],
                tags: [tags['4A29FF84']],
            },
            {
                id: '2',
                name: '親子丼',
                description: 'Sourdough bread topped with mashed avocado, poached eggs, and microgreens',
                image: '/images/4A29FF84.png',
                steps: [],
                tags: [tags['4A29FF84']],
            },
            {
                id: '3',
                name: 'Tiramisu',
                description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
                image: '/images/4A29FF84.png',
                steps: [],
                tags: [tags['4A29FF84']],
            }
        ];
        return menuItems;
    }

    async getItemById(id: string): Promise<MenuItem | null> {
        return {
            id: id,
            name: 'Tiramisu',
            description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
            image: '/images/4A29FF84.png',
            steps: [],
            tags: [tags['4A29FF84']],
        }
    }

    async getItemsByTag(tag: Tag): Promise<MenuItem[]> {
        const menuItems: MenuItem[] = [
            {
                id: '1',
                name: 'パエリア',
                description: '',
                image: '/images/4A29FF84.png',
                steps: [],
                tags: [tags['4A29FF84']],
            },
            {
                id: '2',
                name: 'テスト 料理',
                description: '',
                image: '/images/4A29FF84.png',
                steps: [],
                tags: [tags['4A29FF84']],  // Corrected: Tagging as breakfast
            },
            {
                id: '3',
                name: 'Tiramisu',
                description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
                image: '/images/4A29FF84.png',
                steps: [],
                tags: [tags['4A29FF84'], tag],  // Corrected: Tagging as a dessert
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
