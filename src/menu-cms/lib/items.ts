import { ItemRepositoryLocal } from "@/infrastructure/repository/item-repository-local";
import { MenuItem } from "./types";

const itemRepository = new ItemRepositoryLocal()

export const getAllItems = async (): Promise<MenuItem[]> => {
    return await itemRepository.getAllItems()
};