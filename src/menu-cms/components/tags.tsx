"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tags } from "@/lib/menu";

export function Tags() {
  const tagList = Object.values(tags)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tags</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tagList.map((tag) => (
          <Card key={tag.id}>
            <CardHeader>
              <CardTitle>{tag.title}</CardTitle>
              <CardDescription>{tag.description}</CardDescription>
            </CardHeader>
            <CardContent>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}