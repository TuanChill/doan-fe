import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Home,
  Search,
  Map,
  MessageSquareText,
  Ticket,
  ArrowLeft,
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Main Content */}
      <section className="flex-grow py-12 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Military-themed 404 illustration */}
            <div className="flex justify-center mb-12">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-olive-100 rounded-full"></div>
                <div className="absolute inset-4 border-4 border-dashed border-olive-300 rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-red-700 rounded-full flex items-center justify-center mb-4">
                      <span className="font-bold text-3xl text-white">404</span>
                    </div>
                    <div className="font-bold text-olive-800">
                      Không tìm thấy
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-amber-600 rounded-full"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-8 h-8 bg-amber-600 rounded-full"></div>
                <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-amber-600 rounded-full"></div>
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-amber-600 rounded-full"></div>
              </div>
            </div>

            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Trang bạn tìm kiếm không tồn tại
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Có thể trang này đã bị xóa, đổi tên hoặc tạm thời không khả
                dụng. Bạn có thể quay lại trang chủ hoặc thử một trong những
                liên kết dưới đây.
              </p>
            </div>

            {/* Navigation Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              <NavigationCard
                icon={<Home className="h-6 w-6" />}
                title="Trang chủ"
                description="Quay lại trang chủ của bảo tàng"
                href="/"
                color="bg-olive-800"
              />
              <NavigationCard
                icon={<Map className="h-6 w-6" />}
                title="Tham quan VR360°"
                description="Khám phá bảo tàng với công nghệ VR360°"
                href="/vr360"
                color="bg-amber-600"
              />
              <NavigationCard
                icon={<MessageSquareText className="h-6 w-6" />}
                title="AI Hỏi đáp"
                description="Đặt câu hỏi cho trợ lý ảo của bảo tàng"
                href="/ai-agent"
                color="bg-blue-600"
              />
              <NavigationCard
                icon={<Ticket className="h-6 w-6" />}
                title="Mua vé"
                description="Mua vé tham quan bảo tàng trực tuyến"
                href="/mua-ve"
                color="bg-red-700"
              />
            </div>

            {/* Search and Back Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Button
                variant="outline"
                className="border-olive-800 text-olive-800 hover:bg-olive-800 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang trước
              </Button>
              <div className="relative w-full md:w-auto md:flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Tìm kiếm trong bảo tàng..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive-800"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Military-themed decorative footer */}
      <div className="h-8 bg-gradient-to-r from-red-700 via-olive-800 to-amber-600"></div>
    </div>
  );
}

// Navigation Card Component
function NavigationCard({
  icon,
  title,
  description,
  href,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: string;
}) {
  return (
    <Link href={href} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full">
        <div className={`${color} p-4 text-white`}>{icon}</div>
        <div className="p-4">
          <h3 className="font-bold mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
}
