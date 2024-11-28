"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MenuItems } from "./menu-items";
import { Tags } from "./tags";

export function MenuDashboard() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Menu CMS</h1>
        <p className="text-muted-foreground">
          料理管理システム
        </p>
      </div>
      <Tabs defaultValue="menu-items">
        <TabsList>
          <TabsTrigger value="menu-items">Items</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
        </TabsList>
        <TabsContent value="menu-items" className="space-y-4">
          <MenuItems />
        </TabsContent>
        <TabsContent value="tags" className="space-y-4">
          <Tags />
        </TabsContent>
      </Tabs>
    </div>
  );
}