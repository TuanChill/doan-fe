"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  CuboidIcon as Cube,
  Layers,
  Eye,
  Calendar,
  MapPin,
} from "lucide-react";

interface ArtifactTimelineProps {
  artifacts: Array<{
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
  }>;
  onView3D: (id: number) => void;
  onToggleCompare: (id: number) => void;
  compareItems: number[];
}

export default function ArtifactTimeline({
  artifacts,
  onView3D,
  onToggleCompare,
  compareItems,
}: ArtifactTimelineProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  // Sort artifacts by year
  const sortedArtifacts = [...artifacts].sort((a, b) => a.year - b.year);

  // Get unique periods
  const uniquePeriods = Array.from(new Set(artifacts.map((a) => a.period)));

  // Filter artifacts by selected period
  const filteredArtifacts = selectedPeriod
    ? sortedArtifacts.filter((a) => a.period === selectedPeriod)
    : sortedArtifacts;

  // Group artifacts by century
  const groupedByCentury: Record<string, typeof artifacts> = {};

  filteredArtifacts.forEach((artifact) => {
    const century = Math.floor(artifact.year / 100) + 1;
    const centuryKey = `Thế kỷ ${century}`;

    if (!groupedByCentury[centuryKey]) {
      groupedByCentury[centuryKey] = [];
    }

    groupedByCentury[centuryKey].push(artifact);
  });

  return (
    <div className="space-y-8">
      {/* Period filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="font-bold mb-3 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-olive-800" /> Duyệt theo thời kỳ
        </h3>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedPeriod === null ? "default" : "outline"}
            size="sm"
            className={
              selectedPeriod === null ? "bg-olive-800 hover:bg-olive-900" : ""
            }
            onClick={() => setSelectedPeriod(null)}
          >
            Tất cả
          </Button>

          {uniquePeriods.map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              className={
                selectedPeriod === period
                  ? "bg-olive-800 hover:bg-olive-900"
                  : ""
              }
              onClick={() => setSelectedPeriod(period)}
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>

        <div className="space-y-12">
          {Object.entries(groupedByCentury).map(([century, items]) => (
            <div key={century} className="relative">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-olive-800 text-white flex items-center justify-center z-10 mr-4">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">{century}</h3>
              </div>

              <div className="ml-16 space-y-6">
                {items.map((artifact) => (
                  <motion.div
                    key={artifact.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg shadow-sm border overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative h-48 sm:h-auto sm:w-48 bg-gray-100 flex-shrink-0">
                        <img
                          src={
                            artifact.image ||
                            "/placeholder.svg?height=400&width=400"
                          }
                          alt={artifact.name}
                          className="w-full h-full object-cover"
                        />

                        {/* Year badge */}
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-olive-800">
                            <Calendar className="h-3 w-3 mr-1" />{" "}
                            {artifact.year}
                          </Badge>
                        </div>

                        {/* Compare badge */}
                        {compareItems.includes(artifact.id) && (
                          <div className="absolute bottom-2 right-2">
                            <Badge className="bg-olive-800">
                              <Layers className="h-3 w-3 mr-1" /> So sánh
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="p-4 flex-1">
                        <h4 className="font-bold text-lg mb-1">
                          {artifact.name}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">
                          {artifact.description}
                        </p>

                        <div className="flex flex-wrap gap-x-6 gap-y-1 mb-3">
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

                            {artifact.has3D && (
                              <Button
                                size="sm"
                                className="bg-amber-500 hover:bg-amber-600 text-white"
                                onClick={() => onView3D(artifact.id)}
                              >
                                <Cube className="h-4 w-4 mr-1" /> Xem 3D
                              </Button>
                            )}

                            <Button
                              variant={
                                compareItems.includes(artifact.id)
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              className={
                                compareItems.includes(artifact.id)
                                  ? "bg-olive-800 hover:bg-olive-900"
                                  : ""
                              }
                              onClick={() => onToggleCompare(artifact.id)}
                            >
                              <Layers className="h-4 w-4 mr-1" />{" "}
                              {compareItems.includes(artifact.id)
                                ? "Đã thêm"
                                : "So sánh"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
