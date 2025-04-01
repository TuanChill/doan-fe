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
      <div className="relative aspect-auto">
        <Image
          src={mainImage}
          alt={altText}
          className="object-contain"
          width={800}
          height={800}
        />
      </div>
    );
  }

  return (
    <div
      className="relative min-h-[400px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Images */}
      <div className="relative h-full w-full">
        {allImages.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-500 max-w-[500px] max-h-[400px]",
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <Image
              src={image}
              alt={`${altText} - Hình ${index + 1}`}
              className="object-contain"
              width={500}
              height={400}
              layout="fixed"
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white border-none rounded-full h-8 w-8"
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
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white border-none rounded-full h-8 w-8"
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center gap-1">
        {allImages.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex ? "bg-white w-4" : "bg-white/50"
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
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div
          className={cn(
            "h-full bg-white/60 transition-all",
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
      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded z-20">
        {currentIndex + 1} / {allImages.length}
      </div>
    </div>
  );
}
