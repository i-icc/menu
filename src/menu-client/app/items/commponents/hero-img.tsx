import Image from "next/image";

interface HeroImageProps {
    image: string;
    name: string;
}

export function HeroImage({ image, name }: HeroImageProps) {
    return (
        <div className="relative h-[400px] w-full">
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                priority
            />
            {/* おすすめ商品タグをつけるならここかな */}
            {/* <div className="absolute top-4 right-4">
                <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                    <Heart className="w-6 h-6 text-rose-500" />
                </button>
            </div> */}
        </div>
    );
}