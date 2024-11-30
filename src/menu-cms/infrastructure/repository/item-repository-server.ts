import { tags } from '@/lib/menu';
import { MenuItem, Tag } from '@/lib/types';
import { ItemRepository } from '@/lib/repository';
import sharp from 'sharp';
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
    private publicPath: string;

    constructor() {
        this.menuJsonPath = path.join(process.cwd(), 'public', 'data', 'menu.json');
        this.publicPath = path.join(process.cwd(), 'public');

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
        const uuid = uuidv4();
        item.id = uuid;
        if (this.itemList[item.id]) {
            throw new Error('Item already exists');
        }
        if (item.image.length > 100) {
            item.image = await this.saveImage(item.id, item.image);
        }


        this.itemList[item.id] = item;
        item.tags.map((tag) => {
            if (this.tagItemIdMap[tag.id]) {
                this.tagItemIdMap[tag.id].push(item.id)
            } else {
                this.tagItemIdMap[tag.id] = [item.id]
            }
        })
        this.saveData();  // 新規アイテムを追加後にデータを保存
        return item;
    }

    async updateItem(item: MenuItem): Promise<MenuItem> {
        if (!this.itemList[item.id]) {
            throw new Error('Item not found');
        }
        if (item.image.length > 100) {
            item.image = await this.saveImage(item.id, item.image);
        }
        this.itemList[item.id] = item;
        const itemTagIds = item.tags.map((tag) => tag.id)
        for (const tagId in this.tagItemIdMap) {
            const index = this.tagItemIdMap[tagId].indexOf(item.id);
            const isAdd = itemTagIds.indexOf(tagId) !== -1;
            if (isAdd) {
                console.log("add", index, tags[tagId].title, tagId, itemTagIds)
                // なければ追加
                if (index === -1) {
                    this.tagItemIdMap[tagId].push(item.id)
                }
            } else {
                // あれば削除
                console.log("delete", index, tags[tagId].title, tagId, itemTagIds)
                if (index !== -1) {
                    this.tagItemIdMap[tagId].splice(index, 1);
                }
            }
        }
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

    private async saveImage(id: string, base64String: string): Promise<string> {
        // Base64部分を抽出
        const base64Data = base64String.split(',')[1];

        // MIMEタイプから画像形式を推測
        const mimeType = base64String.split(';')[0].split(':')[1];
        const format = mimeType.replace('image/', '');
        if (!mimeType.startsWith('image/')) {
            throw new Error('Invalid image format');
        }
        // 画像形式がサポートされていない場合はエラー
        const supportedFormats = ['jpeg', 'png', 'webp'];
        if (!supportedFormats.includes(format)) {
            throw new Error('Unsupported image format');
        }

        try {
            // Base64デコードと画像処理
            const image = sharp(Buffer.from(base64Data, 'base64'));
            const { width } = await image.metadata();

            // 横幅が1080pxを超える場合、リサイズ
            if (!width || width > 1080) {
                image.resize(1080);
            }

            const imagePaht = `images/${id}.${format}`
            const outputPath = path.join(this.publicPath, `images/${id}.${format}`);
            await image.toFile(outputPath);

            return `/${imagePaht}`;
        } catch (error) {
            console.error('Error saving image:', error);
            throw new Error('Failed to save image');
        }
    }
}
