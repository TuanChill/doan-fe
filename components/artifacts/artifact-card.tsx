"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  Calendar,
  MapPin,
  Layers,
  Info,
  Volume2,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ArtifactCardProps {
  artifact: {
    id: number;
    name: string;
    description: string;
    image: string;
    category: string;
    period: string;
    year: number;
    location: string;
    has3D: boolean;
    hasAudio: boolean;
  };
  onView3D: (id: number) => void;
  onToggleCompare: (id: number) => void;
  isInCompare: boolean;
}

export default function ArtifactCard({
  artifact,
  onView3D,
  onToggleCompare,
  isInCompare,
}: ArtifactCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div
          className="relative h-48 bg-gray-100"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={artifact.image || "/placeholder.svg?height=400&width=600"}
            alt={artifact.name}
            className="w-full h-full object-cover"
          />

          {/* Hover overlay */}
          <div
            className={cn(
              "absolute inset-0 bg-black/60 flex items-center justify-center gap-2 transition-opacity duration-200",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <Button
              size="sm"
              className="bg-white text-gray-800 hover:bg-gray-100"
              onClick={() =>
                (window.location.href = `/hien-vat/${artifact.id}`)
              }
            >
              <Eye className="h-4 w-4 mr-1" /> Chi tiết
            </Button>
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {artifact.hasAudio && (
              <Badge className="bg-blue-500 hover:bg-blue-600">
                <Volume2 className="h-3 w-3 mr-1" /> Audio
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          <h3 className="font-bold text-lg mb-1 line-clamp-1">
            {artifact.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {artifact.description}
          </p>

          <div className="mt-auto space-y-1 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
              <span>{artifact.year}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{artifact.location}</span>
            </div>
          </div>

          <div className="mt-3 flex justify-between">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() =>
                (window.location.href = `/hien-vat/${artifact.id}`)
              }
            >
              <Info className="h-3 w-3 mr-1" /> Chi tiết
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
