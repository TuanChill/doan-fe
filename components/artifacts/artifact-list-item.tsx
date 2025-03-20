"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, MapPin, Layers, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArtifactListItemProps {
  artifact: any;
  onToggleCompare: (id: number) => void;
  isInCompare: boolean;
}

export default function ArtifactListItem({
  artifact,
  onToggleCompare,
  isInCompare,
}: ArtifactListItemProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Đảm bảo các trường dữ liệu phù hợp với API
  const {
    id,
    name,
    description,
    image_url,
    category_name,
    year,
    location_name,
  } = artifact;

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
                src={image_url || "/placeholder.svg?height=400&width=400"}
                alt={name}
                className="w-full h-full object-cover"
              />

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
                  <h3 className="font-bold text-lg mb-1">{name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-1 mb-3">
                {year && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span>{year}</span>
                  </div>
                )}
                {location_name && (
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span>{location_name}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-2">
                <div>
                  {category_name && (
                    <Badge variant="outline" className="mr-2">
                      {category_name}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => (window.location.href = `/hien-vat/${id}`)}
                  >
                    <Eye className="h-4 w-4 mr-1" /> Chi tiết
                  </Button>
                  <Button
                    variant={isInCompare ? "default" : "outline"}
                    size="sm"
                    className={
                      isInCompare ? "bg-olive-800 hover:bg-olive-900" : ""
                    }
                    onClick={() => onToggleCompare(id)}
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
