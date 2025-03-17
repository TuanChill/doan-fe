"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Sparkles, Eye, Volume2 } from "lucide-react";

interface ArtifactSpotlightProps {
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
}

export default function ArtifactSpotlight({
  artifact,
}: ArtifactSpotlightProps) {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20 z-10"></div>

      <div className="relative h-96 bg-gray-900">
        <img
          src={artifact.image || "/placeholder.svg?height=800&width=1200"}
          alt={artifact.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl text-white">
            <div className="flex items-center mb-4">
              <Sparkles className="h-5 w-5 text-amber-400 mr-2" />
              <span className="text-amber-400 font-medium">
                Hiện vật nổi bật hôm nay
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              {artifact.name}
            </h2>
            <p className="text-gray-200 mb-6">{artifact.description}</p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
              <div className="flex items-center text-gray-300">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{artifact.year}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{artifact.location}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <Badge className="bg-white/20 hover:bg-white/30 text-white">
                {artifact.category}
              </Badge>
              <Badge className="bg-white/20 hover:bg-white/30 text-white">
                {artifact.period}
              </Badge>
              {artifact.hasAudio && (
                <Badge className="bg-blue-500 hover:bg-blue-600">
                  <Volume2 className="h-3 w-3 mr-1" /> Thuyết minh
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                className="bg-white text-gray-900 hover:bg-gray-100"
                onClick={() =>
                  (window.location.href = `/hien-vat/${artifact.id}`)
                }
              >
                <Eye className="h-4 w-4 mr-2" /> Xem chi tiết
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
