"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tags } from "../data/menu";
import { Tag } from "../types/menu";

interface TagTabsProps {
  activeTag: Tag;
  onTagChange: (tag: Tag) => void;
}

export function TagTabs({ activeTag, onTagChange }: TagTabsProps) {
  const tagList: Tag[] = Object.values(tags);

  return (
    <Tabs
      value={activeTag.id}
      onValueChange={(value) => onTagChange(tags[value])}
      className="w-full"
    >
      <TabsList className="flex overflow-x-auto no-scrollbar gap-4 bg-muted/50 p-1">
        {tagList.map((tag: Tag) => {
          return (
            <TabsTrigger
              key={tag.id}
              value={tag.id}
              className="flex items-center gap-2 data-[state=active]:bg-white shrink-0"
            >
              <span className="">{tag.title}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}