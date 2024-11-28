import { ItemRepositoryLocal } from "@/infrastructure/repository/item-repository-local";
import { MenuItem } from "./types";

const itemRepository = new ItemRepositoryLocal()

export const getAllItems = async (): Promise<MenuItem[]> => {
    return await itemRepository.getAllItems()
};

export const createItem = async (item: MenuItem): Promise<MenuItem> => {
    return await itemRepository.createItem(item);
};

export const updateItem = async (item: MenuItem): Promise<void> => {
    await itemRepository.updateItem(item);
};

export const deleteItem = async (id: string): Promise<void> => {
    await itemRepository.deleteItem(id);
};