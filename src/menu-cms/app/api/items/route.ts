import { ItemRepositoryServer } from '@/infrastructure/repository/item-repository-server';
import { NextResponse } from 'next/server';

const itemRepository = new ItemRepositoryServer()

export async function POST(request: Request): Promise<Response> {
    try {
        const item = await request.json();
        await itemRepository.createItem(item);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, message: error });
    }
}

export async function PUT(request: Request): Promise<Response> {
    try {
        const item = await request.json();
        await itemRepository.updateItem(item);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false });
    }
}

export async function DELETE(request: Request): Promise<Response> {
    try {
        const { id } = await request.json();
        await itemRepository.deleteItem(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false });
    }
}
