"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { MenuItemDialog } from "./menu-item-dialog";
import { MenuItem } from "@/lib/types";
import { getAllItems } from "@/lib/items";

export function MenuItems() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 初期値の取得
  useEffect(() => {
    getAllItems().then((items) => {
      setMenuItems(items);
    }).catch((e) => {
      console.log(e);
      throw new Error("Error");
    })
  }, [isDialogOpen]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Item</h2>
        <Button onClick={() => {
          setSelectedItem(null);
          setIsDialogOpen(true);
        }}>
          <PlusCircle className="mr-2 h-4 w-4" />
          料理を追加する
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video relative mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover rounded-md"
                />
              </div>
              {item.steps.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Steps:</h3>
                  <ol className="list-decimal list-inside space-y-1">
                    {item.steps.map((step, index) => (
                      <li key={index} className="text-sm">{step}</li>
                    ))}
                  </ol>
                </div>
              )}
              <div className="space-y-2">
                <div className="flex gap-2 flex-wrap">
                  {item.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                    >
                      {tag.title}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedItem(item);
                      setIsDialogOpen(true);
                    }}
                  >
                    編集
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => (item.id)}
                  >
                    削除
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <MenuItemDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        item={selectedItem}
        onClose={() => {
          setSelectedItem(null);
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
}