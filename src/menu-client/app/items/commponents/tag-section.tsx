import { Tag } from "@/types/menu";
import Link from "next/link";

interface TagSectionProps {
    tags: Tag[];
}

export function TagSection({ tags }: TagSectionProps) {
    return (
        <div className="flex items-center pt-6 border-t border-gray-100">
            {tags.map((tag) => (
                <Link
                    key={tag.id}
                    href={`/?tag_id=${tag.id}`}
                    className="px-4 py-2 mx-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 "
                >
                    {tag.title}
                </Link>
            ))}
        </div>
    );
}