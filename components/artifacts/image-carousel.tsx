"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImageCarouselProps {
  mainImage: string;
  additionalImages?: string[];
  altText: string;
  autoSlideInterval?: number;
}

export default function ImageCarousel({
  mainImage,
  additionalImages = [],
  altText,
  autoSlideInterval = 5000, // 5 seconds by default
}: ImageCarouselProps) {
  // Combine main image with additional images
  const allImages = [mainImage, ...additionalImages].filter(Boolean);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to go to next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % allImages.length);
  };

  // Function to go to previous slide
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length
    );
  };

  // Function to go to a specific slide
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Set up auto-sliding
  useEffect(() => {
    if (allImages.length <= 1 || isPaused) return;

    // Start auto-sliding
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    // Clean up interval on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [allImages.length, isPaused, autoSlideInterval]);

  // Pause auto-sliding when hovering
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // If there's only one image, just show it without carousel controls
  if (allImages.length <= 1) {
    return (
      <div className="relative w-full h-auto rounded-lg overflow-hidden bg-gray-50">
        <Image
          src={mainImage}
          alt={altText}
          className="object-cover w-full h-auto rounded-lg"
          width={1000}
          height={600}
          priority
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full rounded-lg overflow-hidden shadow-md bg-gray-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Images */}
      <div className="relative aspect-[16/9] w-full">
        {allImages.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <Image
              src={image}
              alt={`${altText} - Hình ${index + 1}`}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-sm border-none rounded-full h-10 w-10 transition-all hover:scale-110"
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-sm border-none rounded-full h-10 w-10 transition-all hover:scale-110"
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {allImages.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all shadow-sm",
              index === currentIndex
                ? "bg-white w-6"
                : "bg-white/60 hover:bg-white/80"
            )}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 z-20">
        <div
          className={cn(
            "h-full bg-white transition-all",
            isPaused ? "w-0" : ""
          )}
          style={{
            width: isPaused
              ? `${(currentIndex / allImages.length) * 100}%`
              : "100%",
            animation: isPaused
              ? "none"
              : `progress ${autoSlideInterval}ms linear infinite`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        />
      </div>

      {/* Current slide indicator */}
      <div className="absolute top-3 right-3 bg-black/60 text-white text-xs font-medium px-2.5 py-1.5 rounded-full z-20">
        {currentIndex + 1} / {allImages.length}
      </div>
    </div>
  );
}
