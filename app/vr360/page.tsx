"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_ROUTES } from "@/const/route";
import { useRouter } from "next/navigation";
import { Info, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { getFeaturedArtifact } from "@/request/exhibit";
import { get } from "lodash";

export default function VR360Page() {
  const router = useRouter();
  const [exhibitionItems, setExhibitionItems] = useState<any[]>([]);

  const handleGetExhibitionItems = async () => {
    try {
      const res = await getFeaturedArtifact(1, 3);
      setExhibitionItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetExhibitionItems();
  }, []);

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
        <div className="mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - VR Tour */}
            <div className="lg:w-3/4">
              <h2 className="text-2xl font-bold">Khám phá các khu vực</h2>
              <div className="w-full h-[800px] rounded-lg overflow-hidden mt-3">
                <iframe
                  src={process.env.NEXT_PUBLIC_IFRAME_VR_TOUR}
                  className="w-full h-full"
                />
              </div>

              {/* Exhibition Items */}
              {exhibitionItems.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6">
                    Hiện vật nổi bật trong khu vực
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {exhibitionItems.map((item) => (
                      <Card
                        key={get(item, "documentId", "")}
                        className="overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div
                          className="aspect-video bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${get(
                              item,
                              "image.url",
                              ""
                            )})`,
                          }}
                        ></div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg mb-2">
                            {get(item, "name", "")}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {get(item, "history", "")}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() =>
                              router.push(
                                `${APP_ROUTES.HIEN_VAT}/${get(
                                  item,
                                  "documentId",
                                  ""
                                )}`
                              )
                            }
                          >
                            <Eye className="h-4 w-4 mr-2" /> Xem chi tiết
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
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
                    <span className="bg-amber-600 text-white rounded-full min-w-6 min-h-6 flex items-center justify-center mr-2 mt-0.5">
                      1
                    </span>
                    <span>
                      Chọn khu vực bạn muốn tham quan từ các tab phía trên.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-600 text-white rounded-full min-w-6 min-h-6 flex items-center justify-center mr-2 mt-0.5">
                      2
                    </span>
                    <span>Sử dụng chuột để kéo và xoay góc nhìn 360 độ.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-600 text-white rounded-full min-w-6 min-h-6 flex items-center justify-center mr-2 mt-0.5">
                      3
                    </span>
                    <span>
                      Nhấp vào các điểm đánh dấu để xem thông tin chi tiết về
                      hiện vật.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-amber-600 text-white rounded-full min-w-6 min-h-6 flex items-center justify-center mr-2 mt-0.5">
                      4
                    </span>
                    <span>
                      Sử dụng nút điều khiển để phóng to, thu nhỏ hoặc xem toàn
                      cảnh.
                    </span>
                  </li>
                </ul>
              </div>

              {/* <div className="bg-blue-50 rounded-lg shadow-md p-6 mb-6">
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
              </div> */}

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
