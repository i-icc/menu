"use client";

import { useEffect, useState } from "react";
import { MenuCard } from "./components/menu-card";
import { TagTabs } from "./components/tag-tabs";
import { MenuItem, Tag } from "@/types/menu";
import { motion, AnimatePresence } from "framer-motion";
import { ItemRepositoryLocal } from "@/infrastructure/repository/item-repository-local";
import { ItemRepository } from "@/types/repository";

export default function Home() {
  const [activeTag, setActiveTag] = useState<Tag>({
    id: 'drinks',
    title: 'Beverages',
    description: 'Handcrafted drinks made with premium ingredients',
  });
  const [items, setItems] = useState<MenuItem[]>([]);
  const itemRepository: ItemRepository = new ItemRepositoryLocal();

  useEffect(() => {
    let isMounted = true;
    itemRepository.getItemsByTag(activeTag)
      .then((items) => {
        if (isMounted) {
          setItems(items);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch items:', error);
      });

    return () => {
      isMounted = false;
    };
  }, [activeTag]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Menu</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            i-icc/某猫 が自宅で提供できる料理一覧<br />
            季節や物価、冷蔵庫やスーパーの在庫によって提供できる料理は変わってきます
          </p>
        </div>

        <TagTabs activeTag={activeTag} onTagChange={setActiveTag} />

        <div className="mt-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {activeTag.title}
            </h2>
            <p className="text-gray-600">{activeTag?.description}</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTag?.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {items.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}