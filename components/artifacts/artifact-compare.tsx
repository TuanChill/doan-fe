"use client";
import { Button } from "@/components/ui/button";
import {
  X,
  CuboidIcon as Cube,
  Eye,
  ArrowLeft,
  Check,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ArtifactCompareProps {
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
  onClose: () => void;
  onRemove: (id: number) => void;
}

export default function ArtifactCompare({
  artifacts,
  onClose,
  onRemove,
}: ArtifactCompareProps) {
  // Get all properties to compare
  const properties = [
    { label: "Năm", key: "year" },
    { label: "Thời kỳ", key: "period" },
    { label: "Loại hiện vật", key: "category" },
    { label: "Khu vực trưng bày", key: "location" },
    { label: "Mô hình 3D", key: "has3D", type: "boolean" },
    { label: "Thuyết minh", key: "hasAudio", type: "boolean" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-bold text-lg">
          So sánh hiện vật ({artifacts.length})
        </h3>
        <Button variant="outline" size="sm" onClick={onClose}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Quay lại
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-4 text-left w-40 bg-gray-50">Hiện vật</th>
              {artifacts.map((artifact) => (
                <th
                  key={artifact.id}
                  className="p-4 text-center min-w-[250px] border-l"
                >
                  <div className="relative">
                    <button
                      className="absolute top-0 right-0 text-gray-400 hover:text-gray-600"
                      onClick={() => onRemove(artifact.id)}
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <div className="h-40 mb-3">
                      <img
                        src={
                          artifact.image ||
                          "/placeholder.svg?height=300&width=300"
                        }
                        alt={artifact.name}
                        className="h-full mx-auto object-contain"
                      />
                    </div>
                    <h4 className="font-bold text-lg mb-1">{artifact.name}</h4>
                    <div className="flex justify-center gap-2 mt-2">
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
                        >
                          <Cube className="h-4 w-4 mr-1" /> Xem 3D
                        </Button>
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.key} className="border-t">
                <td className="p-4 font-medium bg-gray-50">{property.label}</td>
                {artifacts.map((artifact) => {
                  const value = artifact[property.key as keyof typeof artifact];

                  // Check if all values are the same
                  const allSameValue = artifacts.every(
                    (a) => a[property.key as keyof typeof a] === value
                  );

                  return (
                    <td
                      key={`${artifact.id}-${property.key}`}
                      className={cn(
                        "p-4 text-center border-l",
                        allSameValue ? "bg-green-50" : ""
                      )}
                    >
                      {property.type === "boolean" ? (
                        value ? (
                          <Check className="h-5 w-5 text-green-600 mx-auto" />
                        ) : (
                          <Minus className="h-5 w-5 text-gray-400 mx-auto" />
                        )
                      ) : (
                        <span>{value}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr className="border-t">
              <td className="p-4 font-medium bg-gray-50">Mô tả</td>
              {artifacts.map((artifact) => (
                <td
                  key={`${artifact.id}-description`}
                  className="p-4 text-sm border-l"
                >
                  {artifact.description}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
