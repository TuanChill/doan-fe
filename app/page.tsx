import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Ticket,
  Map,
  MessageSquareText,
  Newspaper,
  Image,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-stone-900 to-stone-800 flex items-center">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Bảo tàng Lịch sử Quân sự Việt Nam
            </h1>
            <p className="text-xl mb-8">
              Khám phá di sản lịch sử quân sự hào hùng của dân tộc Việt Nam
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-red-700 hover:bg-red-800 text-white"
              >
                Mua vé tham quan <Ticket className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                Tìm hiểu thêm <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* VR360 Tour Highlight */}
      <section className="py-16 bg-olive-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Tham Quan VR360°
              </h2>
              <p className="text-lg mb-6">
                Trải nghiệm tham quan ảo với công nghệ VR360° - khám phá bảo
                tàng từ mọi góc nhìn, mọi lúc, mọi nơi.
              </p>
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                Bắt đầu tham quan VR360° <Map className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="md:w-1/2 relative">
              <div className="aspect-video rounded-lg overflow-hidden border-4 border-amber-600 shadow-xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('/placeholder.svg?height=720&width=1280')",
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-amber-600 flex items-center justify-center cursor-pointer hover:bg-amber-700 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  VR360°
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Khám Phá Bảo Tàng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-olive-800 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('/placeholder.svg?height=400&width=600')",
                  }}
                ></div>
                <div className="absolute top-4 left-4 bg-red-700 text-white p-2 rounded-full">
                  <Newspaper className="h-6 w-6" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Tin Tức & Sự Kiện</h3>
                <p className="text-gray-600 mb-4">
                  Cập nhật những tin tức và sự kiện mới nhất tại bảo tàng.
                </p>
                <Link
                  href="/tin-tuc"
                  className="text-red-700 font-medium flex items-center"
                >
                  Xem tất cả <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-olive-800 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('/placeholder.svg?height=400&width=600')",
                  }}
                ></div>
                <div className="absolute top-4 left-4 bg-amber-600 text-white p-2 rounded-full">
                  <Map className="h-6 w-6" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Tham Quan VR360°</h3>
                <p className="text-gray-600 mb-4">
                  Trải nghiệm tham quan ảo với công nghệ thực tế ảo 360 độ.
                </p>
                <Link
                  href="/vr360"
                  className="text-amber-600 font-medium flex items-center"
                >
                  Khám phá ngay <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-olive-800 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('/placeholder.svg?height=400&width=600')",
                  }}
                ></div>
                <div className="absolute top-4 left-4 bg-blue-600 text-white p-2 rounded-full">
                  <MessageSquareText className="h-6 w-6" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">AI Hỏi Đáp</h3>
                <p className="text-gray-600 mb-4">
                  Đặt câu hỏi và nhận câu trả lời từ trợ lý ảo thông minh.
                </p>
                <Link
                  href="/ai-agent"
                  className="text-blue-600 font-medium flex items-center"
                >
                  Hỏi ngay <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-olive-800 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('/placeholder.svg?height=400&width=600')",
                  }}
                ></div>
                <div className="absolute top-4 left-4 bg-green-700 text-white p-2 rounded-full">
                  <Image className="h-6 w-6" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Hiện Vật Trưng Bày</h3>
                <p className="text-gray-600 mb-4">
                  Khám phá bộ sưu tập hiện vật quý giá của bảo tàng.
                </p>
                <Link
                  href="/hien-vat"
                  className="text-green-700 font-medium flex items-center"
                >
                  Xem bộ sưu tập <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exhibition Highlights */}
      <section className="py-16 bg-stone-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Hiện Vật Nổi Bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div
                  className="h-64 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/placeholder.svg?height=500&width=500')`,
                  }}
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    Hiện vật lịch sử {item}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Mô tả ngắn về hiện vật và ý nghĩa lịch sử của nó.
                  </p>
                  <Link
                    href={`/hien-vat/${item}`}
                    className="text-olive-800 font-medium flex items-center"
                  >
                    Xem chi tiết <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button
              variant="outline"
              className="border-olive-800 text-olive-800 hover:bg-olive-800 hover:text-white"
            >
              Xem tất cả hiện vật
            </Button>
          </div>
        </div>
      </section>

      {/* AI Agent Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Trợ Lý Ảo Thông Minh
              </h2>
              <p className="text-lg mb-6">
                Đặt câu hỏi và nhận câu trả lời ngay lập tức về lịch sử, hiện
                vật và thông tin bảo tàng từ trợ lý ảo AI.
              </p>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Trò chuyện với AI <MessageSquareText className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
              <div className="flex flex-col space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
                    <p className="text-gray-800">
                      Xin chào! Tôi là trợ lý ảo của Bảo tàng Lịch sử Quân sự
                      Việt Nam. Tôi có thể giúp gì cho bạn?
                    </p>
                  </div>
                </div>
                <div className="flex items-start justify-end">
                  <div className="bg-blue-600 text-white rounded-lg p-3 max-w-[80%]">
                    <p>Bảo tàng có những khu vực trưng bày nào?</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
                    <p className="text-gray-800">
                      Bảo tàng có nhiều khu vực trưng bày khác nhau, bao gồm:
                      Khu trưng bày về chiến tranh chống Pháp, Khu trưng bày về
                      chiến tranh chống Mỹ, Khu trưng bày vũ khí, và Khu trưng
                      bày hiện vật lịch sử...
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex">
                <input
                  type="text"
                  placeholder="Nhập câu hỏi của bạn..."
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket Purchase */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Mua Vé Tham Quan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-t-4 border-red-700">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Vé Thường</h3>
                <div className="text-3xl font-bold text-red-700 mb-4">
                  30.000 VNĐ
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Tham quan toàn bộ bảo tàng
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Tài liệu hướng dẫn
                  </li>
                  <li className="flex items-center text-gray-500">
                    <svg
                      className="h-5 w-5 text-gray-400 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Hướng dẫn viên
                  </li>
                </ul>
                <Button className="w-full bg-red-700 hover:bg-red-800 text-white">
                  Mua vé
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-t-4 border-amber-600 transform scale-105">
              <div className="absolute top-0 right-0 bg-amber-600 text-white px-3 py-1 text-sm font-medium">
                Phổ biến nhất
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Vé VIP</h3>
                <div className="text-3xl font-bold text-amber-600 mb-4">
                  50.000 VNĐ
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Tham quan toàn bộ bảo tàng
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Tài liệu hướng dẫn cao cấp
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Hướng dẫn viên riêng
                  </li>
                </ul>
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  Mua vé
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-t-4 border-blue-600">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Vé Đoàn</h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  25.000 VNĐ/người
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Tham quan toàn bộ bảo tàng
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Tài liệu hướng dẫn
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Hướng dẫn viên cho đoàn
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Mua vé
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
