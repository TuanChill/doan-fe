"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Share2,
  Heart,
  CuboidIcon as Cube,
  Volume2,
  Download,
  ThumbsUp,
  Info,
  ChevronRight,
  ChevronLeft,
  X,
} from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";
import { cn } from "@/lib/utils";
import ArtifactViewer3D from "@/components/artifacts/artifact-viewer-3d";
import { artifactsData } from "@/lib/artifacts-data";

export default function ArtifactDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [artifact, setArtifact] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(false);
  const [show3DViewer, setShow3DViewer] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [relatedArtifacts, setRelatedArtifacts] = useState<any[]>([]);

  // Get artifact data
  useEffect(() => {
    if (params.id) {
      const id = Number(params.id);
      const foundArtifact = artifactsData.find((a) => a.id === id);

      if (foundArtifact) {
        setArtifact(foundArtifact);

        // Get related artifacts (same category or period)
        const related = artifactsData
          .filter(
            (a) =>
              a.id !== id &&
              (a.category === foundArtifact.category ||
                a.period === foundArtifact.period)
          )
          .slice(0, 4);

        setRelatedArtifacts(related);
      }

      setIsLoading(false);
    }
  }, [params.id]);

  // Handle audio playback
  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

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
            backgroundImage: `url(${
              artifact.image || "/placeholder.svg?height=1080&width=1920"
            })`,
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
                {artifact.name}
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fadeUp" delay={0.5}>
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge className="bg-white/20 hover:bg-white/30 text-white">
                  {artifact.category}
                </Badge>
                <Badge className="bg-white/20 hover:bg-white/30 text-white">
                  {artifact.period}
                </Badge>
                {artifact.has3D && (
                  <Badge className="bg-amber-500 hover:bg-amber-600">
                    <Cube className="h-3 w-3 mr-1" /> Mô hình 3D
                  </Badge>
                )}
                {artifact.hasAudio && (
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
                    <div className="relative aspect-square">
                      <img
                        src={
                          artifact.image ||
                          "/placeholder.svg?height=800&width=800"
                        }
                        alt={artifact.name}
                        className="w-full h-full object-contain"
                      />

                      {/* Favorite button */}
                      <button
                        className={cn(
                          "absolute top-4 right-4 p-2 rounded-full transition-colors",
                          isFavorite
                            ? "bg-red-500 text-white"
                            : "bg-white/80 text-gray-600 hover:bg-white"
                        )}
                        onClick={() => setIsFavorite(!isFavorite)}
                      >
                        <Heart
                          className="h-5 w-5"
                          fill={isFavorite ? "currentColor" : "none"}
                        />
                      </button>
                    </div>

                    <div className="p-4 flex flex-wrap gap-2">
                      {artifact.has3D && (
                        <Button
                          className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
                          onClick={() => setShow3DViewer(true)}
                        >
                          <Cube className="h-4 w-4 mr-2" /> Xem mô hình 3D
                        </Button>
                      )}

                      {artifact.hasAudio && (
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
                {artifact.hasAudio && isAudioPlaying && (
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
                      <audio
                        controls
                        className="w-full"
                        autoPlay
                        onEnded={() => setIsAudioPlaying(false)}
                      >
                        <source
                          src="/audio-placeholder.mp3"
                          type="audio/mpeg"
                        />
                        Trình duyệt của bạn không hỗ trợ phát âm thanh.
                      </audio>
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
                      <div className="flex justify-between">
                        <span className="text-gray-600">Năm:</span>
                        <span className="font-medium">{artifact.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Thời kỳ:</span>
                        <span className="font-medium">{artifact.period}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Loại hiện vật:</span>
                        <span className="font-medium">{artifact.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Khu vực trưng bày:
                        </span>
                        <span className="font-medium">{artifact.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mã hiện vật:</span>
                        <span className="font-medium">
                          BT-{artifact.id.toString().padStart(6, "0")}
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
                            {artifact.name}
                          </h2>
                          <p className="text-gray-700 mb-6">
                            {artifact.description}
                          </p>

                          <div className="flex items-center space-x-4 mb-6">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="h-5 w-5 mr-2" />
                              <span>{artifact.year}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <MapPin className="h-5 w-5 mr-2" />
                              <span>{artifact.location}</span>
                            </div>
                          </div>

                          <div className="prose max-w-none">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Nullam auctor, nisl eget ultricies
                              tincidunt, nisl nisl aliquam nisl, eget aliquam
                              nisl nisl eget nisl. Nullam auctor, nisl eget
                              ultricies tincidunt, nisl nisl aliquam nisl, eget
                              aliquam nisl nisl eget nisl.
                            </p>
                            <p>
                              Sed do eiusmod tempor incididunt ut labore et
                              dolore magna aliqua. Ut enim ad minim veniam, quis
                              nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur.
                            </p>
                            <h3>Đặc điểm nổi bật</h3>
                            <ul>
                              <li>
                                Được chế tạo vào năm {artifact.year} trong thời
                                kỳ {artifact.period}
                              </li>
                              <li>
                                Có ý nghĩa lịch sử quan trọng trong cuộc kháng
                                chiến
                              </li>
                              <li>
                                Là một trong những hiện vật quý giá của bảo tàng
                              </li>
                              <li>
                                Được bảo quản và trưng bày tại{" "}
                                {artifact.location}
                              </li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {activeTab === "history" && (
                        <div>
                          <h2 className="text-2xl font-bold mb-4">
                            Lịch sử hiện vật
                          </h2>
                          <div className="prose max-w-none">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Nullam auctor, nisl eget ultricies
                              tincidunt, nisl nisl aliquam nisl, eget aliquam
                              nisl nisl eget nisl. Nullam auctor, nisl eget
                              ultricies tincidunt, nisl nisl aliquam nisl, eget
                              aliquam nisl nisl eget nisl.
                            </p>
                            <p>
                              Sed do eiusmod tempor incididunt ut labore et
                              dolore magna aliqua. Ut enim ad minim veniam, quis
                              nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur.
                            </p>
                            <h3>Quá trình sử dụng</h3>
                            <p>
                              Excepteur sint occaecat cupidatat non proident,
                              sunt in culpa qui officia deserunt mollit anim id
                              est laborum. Lorem ipsum dolor sit amet,
                              consectetur adipiscing elit, sed do eiusmod tempor
                              incididunt ut labore et dolore magna aliqua.
                            </p>
                            <h3>Quá trình bảo tồn</h3>
                            <p>
                              Ut enim ad minim veniam, quis nostrud exercitation
                              ullamco laboris nisi ut aliquip ex ea commodo
                              consequat. Duis aute irure dolor in reprehenderit
                              in voluptate velit esse cillum dolore eu fugiat
                              nulla pariatur.
                            </p>
                          </div>
                        </div>
                      )}

                      {activeTab === "significance" && (
                        <div>
                          <h2 className="text-2xl font-bold mb-4">
                            Ý nghĩa lịch sử
                          </h2>
                          <div className="prose max-w-none">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Nullam auctor, nisl eget ultricies
                              tincidunt, nisl nisl aliquam nisl, eget aliquam
                              nisl nisl eget nisl. Nullam auctor, nisl eget
                              ultricies tincidunt, nisl nisl aliquam nisl, eget
                              aliquam nisl nisl eget nisl.
                            </p>
                            <p>
                              Sed do eiusmod tempor incididunt ut labore et
                              dolore magna aliqua. Ut enim ad minim veniam, quis
                              nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure
                              dolor in reprehenderit in voluptate velit esse
                              cillum dolore eu fugiat nulla pariatur.
                            </p>
                            <h3>Vai trò trong lịch sử</h3>
                            <p>
                              Excepteur sint occaecat cupidatat non proident,
                              sunt in culpa qui officia deserunt mollit anim id
                              est laborum. Lorem ipsum dolor sit amet,
                              consectetur adipiscing elit, sed do eiusmod tempor
                              incididunt ut labore et dolore magna aliqua.
                            </p>
                            <h3>Giá trị văn hóa</h3>
                            <p>
                              Ut enim ad minim veniam, quis nostrud exercitation
                              ullamco laboris nisi ut aliquip ex ea commodo
                              consequat. Duis aute irure dolor in reprehenderit
                              in voluptate velit esse cillum dolore eu fugiat
                              nulla pariatur.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </AnimatedSection>

                {/* Additional Images */}
                <AnimatedSection
                  animation="fadeRight"
                  delay={0.2}
                  className="mt-6"
                >
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-medium mb-4">Hình ảnh bổ sung</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="aspect-square bg-gray-100 rounded-md overflow-hidden"
                        >
                          <img
                            src={`/placeholder.svg?height=200&width=200&text=Image ${i}`}
                            alt={`${artifact.name} - Hình ${i}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>

                {/* User Interaction */}
                <AnimatedSection
                  animation="fadeRight"
                  delay={0.3}
                  className="mt-6"
                >
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-medium mb-4">Đánh giá và phản hồi</h3>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Button variant="outline" size="sm" className="mr-2">
                          <ThumbsUp className="h-4 w-4 mr-1" /> Hữu ích (24)
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="h-4 w-4 mr-1" /> Yêu thích (12)
                        </Button>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">
                          Đã xem: 1,245 lượt
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="Để lại bình luận của bạn..."
                        className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-olive-800"
                      />
                      <Button className="rounded-l-none bg-olive-800 hover:bg-olive-900">
                        Gửi
                      </Button>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>

            {/* Related Artifacts */}
            <AnimatedSection animation="fadeUp" delay={0.4} className="mt-12">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-6">Hiện vật liên quan</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {relatedArtifacts.map((relatedArtifact) => (
                    <div
                      key={relatedArtifact.id}
                      className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      onClick={() =>
                        router.push(`/hien-vat/${relatedArtifact.id}`)
                      }
                    >
                      <div className="aspect-square bg-gray-100">
                        <img
                          src={
                            relatedArtifact.image ||
                            "/placeholder.svg?height=300&width=300"
                          }
                          alt={relatedArtifact.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-sm line-clamp-1">
                          {relatedArtifact.name}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {relatedArtifact.period} • {relatedArtifact.year}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Navigation */}
            <AnimatedSection animation="fadeUp" delay={0.5} className="mt-8">
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Quay lại danh sách
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/hien-vat/${artifact.id - 1}`)}
                    disabled={artifact.id <= 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Hiện vật trước
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/hien-vat/${artifact.id + 1}`)}
                    disabled={artifact.id >= artifactsData.length}
                  >
                    Hiện vật tiếp theo <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 3D Viewer Modal */}
      {show3DViewer && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold text-lg">{artifact.name} - Xem 3D</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShow3DViewer(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              <ArtifactViewer3D artifactId={artifact.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
