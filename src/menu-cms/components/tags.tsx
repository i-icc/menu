"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { TagDialog } from "./tag-dialog";
import { Tag } from "@/lib/types";

export function Tags() {
  const { tags, deleteTag } = useStore();
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tags</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Tag
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tags.map((tag) => (
          <Card key={tag.id}>
            <CardHeader>
              <CardTitle>{tag.title}</CardTitle>
              <CardDescription>{tag.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedTag(tag);
                    setIsDialogOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteTag(tag.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <TagDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        tag={selectedTag}
        onClose={() => {
          setSelectedTag(null);
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
}