import { MenuItem, Tag } from "./types";

export interface ItemRepository {
    getAllItems(): Promise<MenuItem[]>;
    getItemById(id: string): Promise<MenuItem | null>;
    getItemsByTag(tag: Tag): Promise<MenuItem[]>;
    createItem(item: MenuItem): Promise<MenuItem>;
    updateItem(item: MenuItem): Promise<MenuItem>;
    deleteItem(id: string): Promise<MenuItem>;
}