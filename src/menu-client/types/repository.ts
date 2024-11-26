import { MenuItem, Tag } from "./menu";

export interface ItemRepository {
    getAllItems(): Promise<MenuItem[]>;
    getItemById(id: string): Promise<MenuItem | null>;
    getItemsByTag(tag: Tag): Promise<MenuItem[]>;
}