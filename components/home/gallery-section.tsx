"use client";

import * as React from "react";
import Image, { StaticImageData } from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { galleryImages } from "@/components/image";
import Masonry from "react-masonry-css";

export const GallerySection = () => {
  const [selectedImage, setSelectedImage] =
    React.useState<StaticImageData | null>(null);

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Thư Viện Ảnh
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 mb-8">
            Khám phá vẻ đẹp kiến trúc và không gian văn hóa Văn Miếu - Quốc Tử
            Giám
          </p>
        </div>
        <Masonry
          breakpointCols={{
            default: 5,
            1100: 2,
            500: 1,
          }}
          autoPlay
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {galleryImages.map((item, index) => (
            <div
              key={item.image.src}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-lg bg-gray-100"
              )}
              onClick={() => setSelectedImage(item.image)}
            >
              <div className="w-full">
                <img
                  src={item.image.src}
                  alt={"gallery image" + index}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-lg font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {item.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </div>
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="p-0 overflow-hidden max-w-[80vh]">
          <div className="max-h-[80vh] max-w-[80vh]">
            {selectedImage && (
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Gallery image"
                fill
                objectFit="contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
