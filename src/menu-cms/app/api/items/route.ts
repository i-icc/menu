import { ItemRepositoryLocal } from '@/infrastructure/repository/item-repository-local';
import { MenuItem } from '@/lib/types';
import { NextResponse } from 'next/server';

export async function GET(): Promise<Response> {
    const itemRepository = new ItemRepositoryLocal()
    const items: MenuItem[] = await itemRepository.getAllItems();

    return new Promise((resolve) => {
        resolve(NextResponse.json({ items: items }));
    });
}
