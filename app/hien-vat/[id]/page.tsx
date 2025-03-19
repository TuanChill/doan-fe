"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Share2,
  CuboidIcon as Cube,
  Volume2,
  Download,
  Info,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";
import { cn } from "@/lib/utils";
import { getExhibit, getExhibitList } from "@/request/exhibit";
import { get } from "lodash";
import ImageCarousel from "@/components/artifacts/image-carousel";

export default function ArtifactDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [artifact, setArtifact] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [relatedArtifacts, setRelatedArtifacts] = useState<any[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch artifact data
  const fetchArtifactData = async (id: string) => {
    setIsLoading(true);
    try {
      // Fetch artifact details
      const response = await getExhibit(id);
      const artifactData = get(response, "data", null);

      if (artifactData) {
        setArtifact(artifactData);

        // Fetch related artifacts
        const relatedResponse = await getExhibitList(1, 4);
        const relatedData = get(relatedResponse, "data", []);
        setRelatedArtifacts(relatedData.slice(0, 4)); // Limit to 4 related items
      }
    } catch (error) {
      console.error("Error fetching artifact data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data when component mounts or ID changes
  useEffect(() => {
    if (params.id) {
      fetchArtifactData(params.id as string);
    }
  }, [params.id]);

  // Handle audio playback
  const toggleAudio = () => {
    if (!artifact || !get(artifact, "audio.url", null)) return;

    if (!audioRef.current) {
      // Create audio element if it doesn't exist
      const audio = new Audio(
        `${process.env.NEXT_PUBLIC_API_URL}${get(artifact, "audio.url", "")}`
      );
      audioRef.current = audio;

      // Add event listeners
      audio.addEventListener("ended", () => setIsAudioPlaying(false));
      audio.addEventListener("pause", () => setIsAudioPlaying(false));
      audio.addEventListener("play", () => setIsAudioPlaying(true));
    }

    if (isAudioPlaying) {
      audioRef.current.pause();
      // Đảm bảo cập nhật state khi dừng âm thanh
      setIsAudioPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Error playing audio:", err);
        setIsAudioPlaying(false);
      });
    }
  };

  // Clean up audio on unmount or when artifact changes
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [params.id]);

  // Handle back navigation
  const handleBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-olive-800 border-r-olive-800 border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin hiện vật...</p>
        </div>
      </div>
    );
  }

  if (!artifact) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <Info className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Không tìm thấy hiện vật</h2>
          <p className="text-gray-600 mb-6">
            Hiện vật bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
          <Button onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Quay lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-r from-stone-900 to-stone-800 flex items-center">
        <motion.div
          className="absolute inset-0 bg-black/60 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <motion.div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${`${process.env.NEXT_PUBLIC_API_URL}${get(
              artifact,
              "image.url",
              ""
            )}`})`,
          }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        ></motion.div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl text-white">
            <AnimatedSection animation="fadeUp" delay={0.3}>
              <Button
                variant="outline"
                size="sm"
                className="mb-4 bg-transparent border-white/50 text-white hover:bg-white/20"
                onClick={handleBack}
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Quay lại
              </Button>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {get(artifact, "name", "--")}
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fadeUp" delay={0.5}>
              <div className="flex flex-wrap gap-3 mb-6">
                {get(artifact, "category_name", null) && (
                  <Badge className="bg-white/20 hover:bg-white/30 text-white">
                    {get(artifact, "category_name", "--")}
                  </Badge>
                )}
                {get(artifact, "period_name", null) && (
                  <Badge className="bg-white/20 hover:bg-white/30 text-white">
                    {get(artifact, "period_name", "--")}
                  </Badge>
                )}
                {get(artifact, "has_3d_model", null) && (
                  <Badge className="bg-amber-500 hover:bg-amber-600">
                    <Cube className="h-3 w-3 mr-1" /> Mô hình 3D
                  </Badge>
                )}
                {get(artifact, "has_audio", null) && (
                  <Badge className="bg-blue-500 hover:bg-blue-600">
                    <Volume2 className="h-3 w-3 mr-1" /> Thuyết minh
                  </Badge>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Image and Actions */}
              <div className="lg:w-2/5">
                <AnimatedSection animation="fadeLeft">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <ImageCarousel
                      mainImage={`${process.env.NEXT_PUBLIC_API_URL}${get(
                        artifact,
                        "image.url",
                        ""
                      )}`}
                      additionalImages={get(artifact, "images", []).map(
                        (img: any) =>
                          `${process.env.NEXT_PUBLIC_API_URL}${img.url}`
                      )}
                      altText={get(artifact, "name", "--")}
                    />

                    <div className="p-4 flex flex-wrap gap-2">
                      {get(artifact, "audio.url", null) && (
                        <Button
                          className={cn(
                            "flex-1",
                            isAudioPlaying
                              ? "bg-blue-700"
                              : "bg-blue-600 hover:bg-blue-700"
                          )}
                          onClick={toggleAudio}
                        >
                          <Volume2 className="h-4 w-4 mr-2" />{" "}
                          {isAudioPlaying ? "Dừng" : "Nghe"} thuyết minh
                        </Button>
                      )}
                    </div>

                    <div className="p-4 pt-0 flex flex-wrap gap-2">
                      <Button variant="outline" className="flex-1">
                        <Share2 className="h-4 w-4 mr-2" /> Chia sẻ
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Download className="h-4 w-4 mr-2" /> Tải ảnh
                      </Button>
                    </div>
                  </div>
                </AnimatedSection>

                {/* Audio Player (if available) */}
                {get(artifact, "has_audio", null) && isAudioPlaying && (
                  <AnimatedSection
                    animation="fadeLeft"
                    delay={0.2}
                    className="mt-4"
                  >
                    <div className="bg-white rounded-lg shadow-md p-4">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Volume2 className="h-5 w-5 mr-2 text-blue-600" />{" "}
                        Thuyết minh
                      </h3>
                      <div className="w-full flex items-center gap-2">
                        <div className="flex-grow h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 animate-pulse"
                            style={{
                              width: isAudioPlaying ? "100%" : "0%",
                              animation: isAudioPlaying
                                ? "progress 30s linear infinite"
                                : "none",
                            }}
                          ></div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-shrink-0"
                          onClick={toggleAudio}
                        >
                          {isAudioPlaying ? "Dừng" : "Phát"}
                        </Button>
                      </div>
                    </div>
                  </AnimatedSection>
                )}

                {/* Metadata */}
                <AnimatedSection
                  animation="fadeLeft"
                  delay={0.3}
                  className="mt-4"
                >
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="font-medium mb-3">Thông tin chi tiết</h3>
                    <div className="space-y-3">
                      {get(artifact, "year", null) && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Năm:</span>
                          <span className="font-medium">
                            {get(artifact, "year", "--")}
                          </span>
                        </div>
                      )}
                      {get(artifact, "period_name", null) && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Thời kỳ:</span>
                          <span className="font-medium">
                            {get(artifact, "period_name", "--")}
                          </span>
                        </div>
                      )}
                      {get(artifact, "category_name", null) && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Loại hiện vật:</span>
                          <span className="font-medium">
                            {get(artifact, "category_name", "--")}
                          </span>
                        </div>
                      )}
                      {get(artifact, "location_name", null) && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Khu vực trưng bày:
                          </span>
                          <span className="font-medium">
                            {get(artifact, "location_name", "--")}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mã hiện vật:</span>
                        <span className="font-medium">
                          BT-
                          {get(artifact, "documentId", 0)
                            .toString()
                            .padStart(6, "0")}
                        </span>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* Right Column - Details */}
              <div className="lg:w-3/5">
                <AnimatedSection animation="fadeRight">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="border-b">
                      <div className="flex">
                        <button
                          className={cn(
                            "px-4 py-3 font-medium text-sm",
                            activeTab === "overview"
                              ? "border-b-2 border-olive-800 text-olive-800"
                              : "text-gray-600 hover:text-gray-900"
                          )}
                          onClick={() => setActiveTab("overview")}
                        >
                          Tổng quan
                        </button>
                        <button
                          className={cn(
                            "px-4 py-3 font-medium text-sm",
                            activeTab === "history"
                              ? "border-b-2 border-olive-800 text-olive-800"
                              : "text-gray-600 hover:text-gray-900"
                          )}
                          onClick={() => setActiveTab("history")}
                        >
                          Lịch sử
                        </button>
                        <button
                          className={cn(
                            "px-4 py-3 font-medium text-sm",
                            activeTab === "significance"
                              ? "border-b-2 border-olive-800 text-olive-800"
                              : "text-gray-600 hover:text-gray-900"
                          )}
                          onClick={() => setActiveTab("significance")}
                        >
                          Ý nghĩa
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      {activeTab === "overview" && (
                        <div>
                          <h2 className="text-2xl font-bold mb-4">
                            {get(artifact, "name", "--")}
                          </h2>
                          <p className="text-gray-700 mb-6">
                            {get(artifact, "description", "--")}
                          </p>

                          <div className="flex items-center space-x-4 mb-6">
                            {get(artifact, "year", null) && (
                              <div className="flex items-center text-gray-600">
                                <Calendar className="h-5 w-5 mr-2" />
                                <span>{get(artifact, "year", "--")}</span>
                              </div>
                            )}
                            {get(artifact, "location_name", null) && (
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-5 w-5 mr-2" />
                                <span>
                                  {get(artifact, "location_name", "--")}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="prose max-w-none">
                            {get(artifact, "overview_content", null) && (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: get(
                                    artifact,
                                    "overview_content",
                                    "--"
                                  ),
                                }}
                              />
                            )}
                          </div>
                        </div>
                      )}

                      {activeTab === "history" && (
                        <div>
                          <h2 className="text-2xl font-bold mb-4">
                            Lịch sử hiện vật
                          </h2>
                          <div className="prose max-w-none">
                            {get(artifact, "history", null) && (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: get(artifact, "history", "--"),
                                }}
                              />
                            )}
                          </div>
                        </div>
                      )}

                      {activeTab === "significance" && (
                        <div>
                          <h2 className="text-2xl font-bold mb-4">
                            Ý nghĩa lịch sử
                          </h2>
                          <div className="prose max-w-none">
                            {get(artifact, "historicalSignificance", null) && (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: get(
                                    artifact,
                                    "historicalSignificance",
                                    "--"
                                  ),
                                }}
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </AnimatedSection>

                {/* Additional Images */}
                {get(artifact, "additional_images", null) &&
                  get(artifact, "additional_images.length", 0) > 0 && (
                    <AnimatedSection
                      animation="fadeRight"
                      delay={0.2}
                      className="mt-6"
                    >
                      <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="font-medium mb-4">Hình ảnh bổ sung</h3>
                        <div className="grid grid-cols-4 gap-2">
                          {get(artifact, "additional_images", []).map(
                            (img: any, i: number) => (
                              <div
                                key={i}
                                className="aspect-square bg-gray-100 rounded-md overflow-hidden"
                              >
                                <img
                                  src={
                                    img.url ||
                                    `/placeholder.svg?height=200&width=200&text=Image ${
                                      i + 1
                                    }`
                                  }
                                  alt={`${name} - Hình ${i + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </AnimatedSection>
                  )}
              </div>
            </div>

            {/* Related Artifacts */}
            {relatedArtifacts.length > 0 && (
              <AnimatedSection animation="fadeUp" delay={0.4} className="mt-12">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold mb-6">Hiện vật liên quan</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {relatedArtifacts.map((relatedArtifact) => (
                      <div
                        key={relatedArtifact.id}
                        className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() =>
                          router.push(`/hien-vat/${relatedArtifact.id}`)
                        }
                      >
                        <div className="aspect-square bg-gray-100">
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}${get(
                              relatedArtifact,
                              "image.url",
                              ""
                            )}`}
                            alt={relatedArtifact.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="font-medium text-sm line-clamp-1">
                            {get(relatedArtifact, "name", "--")}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            <Badge className="bg-amber-500 hover:bg-amber-600">
                              {get(
                                relatedArtifact,
                                "category_artifact.name",
                                "--"
                              )}
                            </Badge>
                            •{" "}
                            <Badge className="bg-blue-500 hover:bg-blue-600">
                              {get(relatedArtifact, "year", "--")}
                            </Badge>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
