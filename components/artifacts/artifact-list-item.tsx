"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, MapPin, Layers, Volume2, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArtifactListItemProps {
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

export default function ArtifactListItem({
  artifact,
  onView3D,
  onToggleCompare,
  isInCompare,
}: ArtifactListItemProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            <div className="relative h-48 sm:h-auto sm:w-48 bg-gray-100 flex-shrink-0">
              <img
                src={artifact.image || "/placeholder.svg?height=400&width=400"}
                alt={artifact.name}
                className="w-full h-full object-cover"
              />

              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {artifact.hasAudio && (
                  <Badge className="bg-blue-500 hover:bg-blue-600">
                    <Volume2 className="h-3 w-3 mr-1" /> Audio
                  </Badge>
                )}
              </div>

              {/* Favorite button */}
              <button
                className={cn(
                  "absolute top-2 right-2 p-1.5 rounded-full transition-colors",
                  isFavorite
                    ? "bg-red-500 text-white"
                    : "bg-white/80 text-gray-600 hover:bg-white"
                )}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  className="h-4 w-4"
                  fill={isFavorite ? "currentColor" : "none"}
                />
              </button>

              {/* Compare badge */}
              {isInCompare && (
                <div className="absolute bottom-2 right-2">
                  <Badge className="bg-olive-800">
                    <Layers className="h-3 w-3 mr-1" /> So sánh
                  </Badge>
                </div>
              )}
            </div>

            <div className="p-4 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg mb-1">{artifact.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {artifact.description}
                  </p>
                </div>
                <div className="flex gap-1 ml-2"></div>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-1 mb-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span>{artifact.year}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span>{artifact.location}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <div>
                  <Badge variant="outline" className="mr-2">
                    {artifact.category}
                  </Badge>
                  <Badge variant="outline">{artifact.period}</Badge>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      (window.location.href = `/hien-vat/${artifact.id}`)
                    }
                  >
                    <Eye className="h-4 w-4 mr-1" /> Chi tiết
                  </Button>
                  <Button
                    variant={isInCompare ? "default" : "outline"}
                    size="sm"
                    className={
                      isInCompare ? "bg-olive-800 hover:bg-olive-900" : ""
                    }
                    onClick={() => onToggleCompare(artifact.id)}
                  >
                    <Layers className="h-4 w-4 mr-1" />{" "}
                    {isInCompare ? "Đã thêm" : "So sánh"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
