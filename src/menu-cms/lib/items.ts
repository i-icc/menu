import { ItemRepositoryLocal } from "@/infrastructure/repository/item-repository-client";
import { MenuItem } from "./types";

const itemRepository = new ItemRepositoryLocal()

export const getAllItems = async (): Promise<MenuItem[]> => {
    return await itemRepository.getAllItems();
};

export const createItem = async (item: MenuItem): Promise<void> => {
    const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });
    getData(response);
};

export const updateItem = async (item: MenuItem): Promise<void> => {
    const response = await fetch('/api/items', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });
    getData(response);
};

export const deleteItem = async (id: string): Promise<void> => {
    const response = await fetch('/api/items', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "id": id }),
    });
    getData(response);
};

const getData = (response: Response): any => {
    if (!response.ok) {
        throw new Error(`Error Request: ${response.statusText}`);
    }
    response.json().then((data) => {
        if (!data.success) {
            throw new Error(`Error Request`);
        }
        return data;
    }).catch((e) => {
        throw new Error(`Error Request: ${e}`);
    });

}