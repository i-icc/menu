import { tags } from '@/lib/menu';
import { MenuItem, Tag } from '@/lib/types';
import { ItemRepository } from '@/lib/repository';
import menuJson from '@/public/data/menu.json';

type itemDto = {
    id: string;
    name: string;
    description: string;
    image: string;
    steps: string[];
};

type tagItemRelationDto = {
    item_ids: string[];
    tag_id: string;
};

// リポジトリインターフェース
export class ItemRepositoryLocal implements ItemRepository {
    private itemList: Record<string, MenuItem> = {};
    private tagItemIdMap: Record<string, string[]> = {};

    constructor() {
        try {
            const itemData: Record<string, itemDto> = menuJson["items"];
            const tagItemRelations: Record<string, tagItemRelationDto> = menuJson["tag_item_relation"];

            for (const itemId in itemData) {
                const { id, name, description, image, steps } = itemData[itemId];
                this.itemList[id] = {
                    id,
                    name,
                    description,
                    image,
                    steps,
                    tags: []
                };
            }

            for (const tagId in tagItemRelations) {
                const itemIds = tagItemRelations[tagId].item_ids;
                this.tagItemIdMap[tagId] = itemIds;
                for (const id of itemIds) {
                    this.itemList[id].tags.push(tags[tagId]);
                }
            }
        } catch (error) {
            throw `データが取得できませんでした！${error}`;
        }
    }

    async getAllItems(): Promise<MenuItem[]> {
        return Object.values(this.itemList);
    }

    async getItemById(id: string): Promise<MenuItem | null> {
        return this.itemList[id] || null;
    }

    async getItemsByTag(tag: Tag): Promise<MenuItem[]> {
        const targetIds = this.tagItemIdMap[tag.id];
        if (targetIds === undefined) {
            return [];
        }
        return targetIds.map((id) => this.itemList[id]) as MenuItem[];
    }

    async createItem(item: MenuItem): Promise<MenuItem> {
        throw new Error('Method not implemented.');
    }

    async updateItem(item: MenuItem): Promise<MenuItem> {
        throw new Error('Method not implemented.');
    }

    async deleteItem(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
