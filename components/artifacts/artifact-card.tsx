"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, MapPin, Layers, Info, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { get } from "lodash";

interface ArtifactCardProps {
  artifact: any;
  onToggleCompare: (id: number) => void;
  isInCompare: boolean;
}

export default function ArtifactCard({
  artifact,
  onToggleCompare,
  isInCompare,
}: ArtifactCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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
            src={`${process.env.NEXT_PUBLIC_API_URL}${get(
              artifact,
              "image.url",
              ""
            )}`}
            alt={get(artifact, "name", "--")}
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
                (window.location.href = `/hien-vat/${get(
                  artifact,
                  "documentId",
                  0
                )}`)
              }
            >
              <Eye className="h-4 w-4 mr-1" /> Chi tiết
            </Button>
          </div>
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          <h3 className="font-bold text-lg mb-1 line-clamp-1">
            {get(artifact, "name", "--")}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {get(artifact, "description", "--")}
          </p>

          <div className="mt-auto space-y-1 text-sm text-gray-600">
            {get(artifact, "year", null) && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>{get(artifact, "year", "--")}</span>
              </div>
            )}
            {get(artifact, "location_name", null) && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="truncate">
                  {get(artifact, "location_name", "--")}
                </span>
              </div>
            )}
          </div>

          <div className="mt-3 flex justify-between">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() =>
                (window.location.href = `/hien-vat/${get(
                  artifact,
                  "documentId",
                  0
                )}`)
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
