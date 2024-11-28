import { tags } from '@/lib/menu';
import { MenuItem, Tag } from '@/lib/types';
import { ItemRepository } from '@/lib/repository';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
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

// リポジトリ
export class ItemRepositoryServer implements ItemRepository {
    private itemList: Record<string, MenuItem> = {};
    private tagItemIdMap: Record<string, string[]> = {};
    private menuJsonPath: string;

    constructor() {
        this.menuJsonPath = path.join(process.cwd(), 'public', 'data', 'menu.json');

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
                    tags: [],
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
        const uuid = uuidv4();
        item.id = uuid;
        if (this.itemList[item.id]) {
            throw new Error('Item already exists');
        }
        this.itemList[item.id] = item;
        this.saveData();  // 新規アイテムを追加後にデータを保存
        return item;
    }

    async updateItem(item: MenuItem): Promise<MenuItem> {
        if (!this.itemList[item.id]) {
            throw new Error('Item not found');
        }
        this.itemList[item.id] = item;
        this.saveData();  // アイテムを更新後にデータを保存
        return item;
    }

    async deleteItem(id: string): Promise<void> {
        const item = this.itemList[id];
        if (!item) {
            throw new Error('Item not found');
        }
        delete this.itemList[id];
        for (const tagId in this.tagItemIdMap) {
            const index = this.tagItemIdMap[tagId].indexOf(id);
            if (index !== -1) {
                this.tagItemIdMap[tagId].splice(index, 1);
            }
        }
        this.saveData();  // アイテム削除後にデータを保存
    }

    private saveData(): void {
        const itemData: Record<string, itemDto> = {};
        const tagItemRelations: Record<string, tagItemRelationDto> = {};

        // itemsをIDでソートしてDTOに変換
        const sortedItems = Object.values(this.itemList).sort((a, b) => a.id.localeCompare(b.id));
        sortedItems.forEach(item => {
            itemData[item.id] = {
                id: item.id,
                name: item.name,
                description: item.description ?? "",
                image: item.image,
                steps: item.steps,
            };
        });

        // tag_item_relationをそのままDTO形式で変換
        for (const tagId in this.tagItemIdMap) {
            tagItemRelations[tagId] = {
                tag_id: tagId,
                item_ids: this.tagItemIdMap[tagId],
            };
        }

        const menuData = {
            items: itemData,
            tag_item_relation: tagItemRelations,
        };

        try {
            fs.writeFileSync(this.menuJsonPath, JSON.stringify(menuData, null, 2)); // JSONファイルに保存
        } catch (error) {
            throw `データの保存に失敗しました！${error}`;
        }
    }
}
