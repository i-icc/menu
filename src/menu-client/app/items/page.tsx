"use client";

import { HeroImage } from "./commponents/hero-img";
import { PreparationSteps } from "./commponents/preparation-steps";
import { TagSection } from "./commponents/tag-section";
import { MenuItem } from "@/types/menu";
import { ItemRepository } from "@/types/repository";
import { ItemRepositoryLocal } from "@/infrastructure/repository/item-repository-local";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";


export default function MenuDetail() {
    return (
        <Suspense fallback={<div>読み込み中...</div>}>
            <Main />
        </Suspense>
    )
}

function Main() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const router = useRouter();
    const [item, setItem] = useState<MenuItem | null>(null);

    useEffect(() => {
        const itemRepository: ItemRepository = new ItemRepositoryLocal();

        async function fetchItem() {
            try {
                if (id === null) {
                    router.push("/");
                    return;
                }
                const fetchedItem = await itemRepository.getItemById(id);
                if (!fetchedItem) {
                    router.push("/");
                    return;
                }
                setItem(fetchedItem);
            } catch (err) {
                console.error("Failed to fetch item:", err);
            }
        }

        fetchItem();
    }, [id]);

    if (!item) {
        return (<></>);
    }

    return (

        <div className="min-h-screen bg-[#f8f5f2]">
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <HeroImage image={item.image} name={item.name} />

                    <div className="p-8">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {item.name}
                            </h1>
                        </div>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            {item.description}
                        </p>

                        <PreparationSteps steps={item.steps} />
                        <TagSection tags={item.tags} />
                    </div>
                </div>
            </div>
        </div>
    );
}