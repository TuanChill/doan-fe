"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Sparkles, Eye } from "lucide-react";
import { get } from "lodash";

interface ArtifactSpotlightProps {
  artifact: any;
}

export default function ArtifactSpotlight({
  artifact,
}: ArtifactSpotlightProps) {
  // Đảm bảo các trường dữ liệu phù hợp với API
  const { id, name, description, image, category_name, year, location_name } =
    artifact;

  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20 z-10"></div>

      <div className="relative h-96 bg-gray-900">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${get(image, "url", "")}`}
          alt={name}
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

            <h2 className="text-3xl md:text-4xl font-bold mb-3">{name}</h2>
            <p className="text-gray-200 mb-6">{description}</p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
              {year && (
                <div className="flex items-center text-gray-300">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{year}</span>
                </div>
              )}
              {location_name && (
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{location_name}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              {category_name && (
                <Badge className="bg-white/20 hover:bg-white/30 text-white">
                  {category_name}
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                className="bg-white text-gray-900 hover:bg-gray-100"
                onClick={() =>
                  (window.location.href = `/hien-vat/${get(
                    artifact,
                    "documentId",
                    ""
                  )}`)
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
