"use client";

import { useEffect, useState } from "react";
import { heroImages } from "@/components/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

export const Hero = () => {
  const [api, setApi] = useState<any>();

  useEffect(() => {
    if (!api) {
      return;
    }

    // Reset autoplay when the component mounts or when api changes
    api.plugins().autoplay.reset();
  }, [api]);

  return (
    <div className="relative w-full h-screen">
      <Carousel
        className="w-full h-full"
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        setApi={setApi}
      >
        <CarouselContent>
          {heroImages.map((item, index) => (
            <CarouselItem key={index} className="relative w-full h-screen">
              <div className="absolute inset-0">
                <Image
                  src={item || "/placeholder.svg"}
                  alt={`hero image ${index}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                {/* Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/30" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-4xl px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-amber-600 sm:text-6xl drop-shadow-lg">
              Văn Miếu Quốc Tử Giám
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 drop-shadow-lg">
              Di sản văn hóa độc đáo của Hà Nội, nơi lưu giữ những giá trị tinh
              hoa của nền giáo dục Việt Nam
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                asChild
                size="lg"
                className="bg-[#5c1414] hover:bg-[#4a1010]"
              >
                <Link href="/visit">Khám Phá Ngay</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="text-white hover:bg-white/60 hover:text-black bg-[#D2691E]"
              >
                <Link href="/tickets">Mua Vé</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
