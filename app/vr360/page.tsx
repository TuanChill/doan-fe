"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { APP_ROUTES } from "@/const/route";
import { useRouter } from "@/hooks/use-router";
import { Info, MapIcon as Map360, Eye } from "lucide-react";
import Link from "next/link";

export default function VR360Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-r from-stone-900 to-stone-800 flex items-center">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tham Quan VR360°
            </h1>
            <p className="text-xl mb-8">
              Trải nghiệm không gian bảo tàng với công nghệ thực tế ảo 360 độ
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - VR Tour */}
            <div className="lg:w-3/4">
              <Tabs defaultValue="exhibition-1" className="w-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Khám phá các khu vực</h2>
                  <TabsList className="bg-stone-200">
                    <TabsTrigger value="exhibition-1">Khu vực 1</TabsTrigger>
                    <TabsTrigger value="exhibition-2">Khu vực 2</TabsTrigger>
                    <TabsTrigger value="exhibition-3">Khu vực 3</TabsTrigger>
                    <TabsTrigger value="exhibition-4">Khu vực 4</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="exhibition-1" className="mt-0">
                  <VR360Viewer
                    title="Khu trưng bày chiến tranh chống Pháp"
                    description="Khám phá các hiện vật, hình ảnh và tài liệu về cuộc kháng chiến chống thực dân Pháp (1945-1954)."
                  />
                </TabsContent>

                <TabsContent value="exhibition-2" className="mt-0">
                  <VR360Viewer
                    title="Khu trưng bày chiến tranh chống Mỹ"
                    description="Tìm hiểu về cuộc kháng chiến chống Mỹ cứu nước (1954-1975) qua các hiện vật và tài liệu lịch sử."
                  />
                </TabsContent>

                <TabsContent value="exhibition-3" className="mt-0">
                  <VR360Viewer
                    title="Khu trưng bày vũ khí"
                    description="Khám phá bộ sưu tập vũ khí đa dạng từ các thời kỳ lịch sử khác nhau của quân đội Việt Nam."
                  />
                </TabsContent>

                <TabsContent value="exhibition-4" className="mt-0">
                  <VR360Viewer
                    title="Khu trưng bày hiện vật lịch sử"
                    description="Tham quan bộ sưu tập các hiện vật lịch sử quý giá liên quan đến quân đội và các cuộc chiến tranh."
                  />
                </TabsContent>
              </Tabs>

              {/* Exhibition Items */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">
                  Hiện vật nổi bật trong khu vực
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((item) => (
                    <Card
                      key={item}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div
                        className="aspect-video bg-cover bg-center"
                        style={{
                          backgroundImage: `url('/placeholder.svg?height=300&width=500')`,
                        }}
                      ></div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2">
                          Hiện vật lịch sử {item}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          Mô tả ngắn về hiện vật và ý nghĩa lịch sử của nó.
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="h-4 w-4 mr-2" /> Xem chi tiết
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Info */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-amber-600" />
                  Hướng dẫn sử dụng
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-amber-600 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      1
                    </span>
                    <span>
                      Chọn khu vực bạn muốn tham quan từ các tab phía trên.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-600 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      2
                    </span>
                    <span>Sử dụng chuột để kéo và xoay góc nhìn 360 độ.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-600 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      3
                    </span>
                    <span>
                      Nhấp vào các điểm đánh dấu để xem thông tin chi tiết về
                      hiện vật.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-600 text-white rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                      4
                    </span>
                    <span>
                      Sử dụng nút điều khiển để phóng to, thu nhỏ hoặc xem toàn
                      cảnh.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Map360 className="h-5 w-5 mr-2 text-blue-600" />
                  Các khu vực tham quan
                </h3>
                <ul className="space-y-2">
                  <TourArea
                    name="Khu trưng bày chiến tranh chống Pháp"
                    count={15}
                  />
                  <TourArea
                    name="Khu trưng bày chiến tranh chống Mỹ"
                    count={22}
                  />
                  <TourArea name="Khu trưng bày vũ khí" count={18} />
                  <TourArea name="Khu trưng bày hiện vật lịch sử" count={12} />
                  <TourArea name="Khu trưng bày ngoài trời" count={8} />
                </ul>
              </div>

              <div className="bg-red-50 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4">Tham quan thực tế</h3>
                <p className="text-gray-700 mb-4">
                  Bạn muốn tham quan bảo tàng trực tiếp? Hãy mua vé ngay!
                </p>
                <Button
                  onClick={() => router.push(APP_ROUTES.MUA_VE)}
                  className="w-full bg-red-700 hover:bg-red-800 text-white"
                >
                  Mua vé tham quan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// VR360 Viewer Component
function VR360Viewer({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-video bg-stone-800">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=720&width=1280')",
          }}
        ></div>

        {/* VR Controls - This would be replaced with actual VR viewer */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 rounded-full px-4 py-2 flex items-center space-x-3">
          <button className="text-white hover:text-amber-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button className="text-white hover:text-amber-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="text-white hover:text-amber-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
              />
            </svg>
          </button>
          <button className="text-white hover:text-amber-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* VR Hotspots - These would be interactive points in a real VR tour */}
        <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-amber-600 rounded-full animate-pulse cursor-pointer"></div>
        <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-amber-600 rounded-full animate-pulse cursor-pointer"></div>
        <div className="absolute bottom-1/3 left-1/2 w-8 h-8 bg-amber-600 rounded-full animate-pulse cursor-pointer"></div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Chế độ ảnh
            </Button>
            <Button variant="outline" size="sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Chế độ video
            </Button>
          </div>
          <Button className="bg-amber-600 hover:bg-amber-700">
            Toàn màn hình
          </Button>
        </div>
      </div>
    </div>
  );
}

// Tour Area Component
function TourArea({ name, count }: { name: string; count: number }) {
  return (
    <Link
      href="#"
      className="flex items-center justify-between p-2 hover:bg-blue-100 rounded-md transition-colors"
    >
      <span className="font-medium">{name}</span>
      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
        {count} hiện vật
      </span>
    </Link>
  );
}
