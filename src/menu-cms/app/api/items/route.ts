import { ItemRepositoryServer } from '@/infrastructure/repository/item-repository-server';
import { NextResponse } from 'next/server';

const itemRepository = new ItemRepositoryServer()

export async function POST(): Promise<Response> {
    return new Promise((resolve) => {
        itemRepository.getAllItems().then((items) => {
            resolve(NextResponse.json({ success: true, items: items }));
        }).catch(() => {
            resolve(NextResponse.json({ success: false }));
        });
    });
}


export async function PUT(): Promise<Response> {
    return new Promise((resolve) => {
        itemRepository.getAllItems().then((items) => {
            resolve(NextResponse.json({ success: true, items: items }));
        }).catch(() => {
            resolve(NextResponse.json({ success: false }));
        });
    });
}


export async function DELETE(): Promise<Response> {
    return new Promise((resolve) => {
        itemRepository.getAllItems().then((items) => {
            resolve(NextResponse.json({ success: true, items: items }));
        }).catch(() => {
            resolve(NextResponse.json({ success: false }));
        });
    });
}

