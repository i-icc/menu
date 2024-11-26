import { tags } from '@/data/menu';
import { MenuItem, Tag } from '@/types/menu';
import { ItemRepository } from '@/types/repository';
import menuJson from '@/public/data/menu.json';

type itemDto = {
    id: string;
    name: string;
    description: string;
    image: string;
    steps: string[];
};

type tagRelationDto = {
    item_id: string;
    tag_id: string;
}
// リポジトリインターフェース
export class ItemRepositoryLocal implements ItemRepository {
    private itemList: MenuItem[];
    private tagItemMap;

    constructor() {
        try {
            const itemData: itemDto[] = menuJson["items"];
            const item_tag_relations: tagRelationDto[] = menuJson["item_tag_relation"]
            const itemTagMap = item_tag_relations.reduce((acc, relation) => {
                if (!acc[relation.item_id]) {
                    acc[relation.item_id] = [];
                }
                acc[relation.item_id].push(relation.tag_id);
                return acc;
            }, {} as Record<string, string[]>);
            this.tagItemMap = item_tag_relations.reduce((acc, relation) => {
                if (!acc[relation.tag_id]) {
                    acc[relation.tag_id] = [];
                }
                acc[relation.tag_id].push(relation.item_id);
                return acc;
            }, {} as Record<string, string[]>);
            this.itemList = itemData.map((item) => {
                const tagList = itemTagMap[item.id].map((id) => tags[id])
                return {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    image: item.image,
                    steps: item.steps,
                    tags: tagList
                }
            });
        } catch (error) {
            throw `データが取得に失敗しました！${error}`
        }
    }


    async getAllItems(): Promise<MenuItem[]> {
        return this.itemList;
    }

    async getItemById(id: string): Promise<MenuItem | null> {
        const item = this.itemList.find((item) => item.id === id);
        if (item === undefined) {
            return null
        }
        return item
    }

    async getItemsByTag(tag: Tag): Promise<MenuItem[]> {
        return this.itemList.filter((item) => item.tags.some((t) => t.id === tag.id));
    }
}
