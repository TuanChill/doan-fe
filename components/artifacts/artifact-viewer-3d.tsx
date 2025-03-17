"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  Share2,
  Loader,
} from "lucide-react";

interface ArtifactViewer3DProps {
  artifactId: number;
}

export default function ArtifactViewer3D({
  artifactId,
}: ArtifactViewer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // In a real implementation, you would load a 3D model based on the artifactId
  // For this example, we'll simulate loading and show a placeholder

  useEffect(() => {
    // Simulate loading the 3D model
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [artifactId]);

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }

    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="flex flex-col h-[500px]" ref={containerRef}>
      <div className="flex-1 bg-gray-900 relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <Loader className="h-10 w-10 animate-spin mx-auto mb-4" />
              <p>Đang tải mô hình 3D...</p>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            {/* This would be replaced with an actual 3D viewer component */}
            <div className="text-center text-white">
              <img
                src={`/placeholder.svg?height=400&width=400&text=3D Model ${artifactId}`}
                alt="3D Model Placeholder"
                className="mx-auto mb-4 h-64"
              />
              <p className="text-gray-400">
                Đây là vị trí hiển thị mô hình 3D. Trong triển khai thực tế, bạn
                sẽ thấy mô hình 3D tương tác tại đây.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-3 flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
          >
            <RotateCw className="h-4 w-4 mr-1" /> Xoay
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
          >
            <ZoomIn className="h-4 w-4 mr-1" /> Phóng to
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
          >
            <ZoomOut className="h-4 w-4 mr-1" /> Thu nhỏ
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
          >
            <Share2 className="h-4 w-4 mr-1" /> Chia sẻ
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
          >
            <Download className="h-4 w-4 mr-1" /> Tải xuống
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
            onClick={toggleFullscreen}
          >
            <Maximize2 className="h-4 w-4 mr-1" /> Toàn màn hình
          </Button>
        </div>
      </div>
    </div>
  );
}
