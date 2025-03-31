"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Home, Download, Share2, Award } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/ui/animated-section";
import Lottie from "lottie-react";
import confettiAnimation from "@/public/confetti-animation.json";
import successAnimation from "@/public/success-animation.json";

export default function RedeemSuccessPage() {
  const lottieRef = useRef<any>(null);
  const [ticketDetails, setTicketDetails] = useState({
    ticketName: "Vé tham quan VIP",
    ticketCount: 2,
    pointsUsed: 400,
    remainingPoints: 150,
    visitDate: new Date().toLocaleDateString("vi-VN"),
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0912345678",
    orderNumber: `TICKET-${Math.floor(100000 + Math.random() * 900000)}`,
  });

  // Play the animation when component mounts
  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection animation="fadeUp">
            <Card>
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="relative">
                    <div className="absolute top-0 left-0 right-0 z-10">
                      <Lottie
                        animationData={confettiAnimation}
                        loop={false}
                        autoplay={true}
                        style={{ height: 300 }}
                      />
                    </div>
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 relative z-20">
                      <Lottie
                        animationData={successAnimation}
                        loop={false}
                        autoplay={true}
                        style={{ height: 80 }}
                        lottieRef={lottieRef}
                      />
                    </div>
                  </div>

                  <h1 className="text-2xl font-bold mb-2">
                    Đổi điểm thành công!
                  </h1>
                  <p className="text-gray-600 mb-8">
                    Cảm ơn bạn đã sử dụng điểm tích lũy để đổi vé tham quan Bảo
                    tàng Lịch sử Quân sự Việt Nam.
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6 text-left mb-8">
                    <h2 className="text-lg font-semibold mb-4">
                      Chi tiết đơn hàng
                    </h2>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mã đơn hàng:</span>
                        <span className="font-medium">
                          {ticketDetails.orderNumber}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Loại vé:</span>
                        <span className="font-medium">
                          {ticketDetails.ticketName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Số lượng vé:</span>
                        <span className="font-medium">
                          {ticketDetails.ticketCount} vé
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Điểm đã sử dụng:</span>
                        <span className="font-medium">
                          {ticketDetails.pointsUsed} điểm
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Điểm còn lại:</span>
                        <span className="font-medium">
                          {ticketDetails.remainingPoints} điểm
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ngày tham quan:</span>
                        <span className="font-medium">
                          {ticketDetails.visitDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Họ tên:</span>
                        <span className="font-medium">
                          {ticketDetails.fullName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">
                          {ticketDetails.email}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Số điện thoại:</span>
                        <span className="font-medium">
                          {ticketDetails.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-green-800 mb-8">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold mb-2">
                          Vé đã được gửi đến email của bạn
                        </p>
                        <p className="text-sm">
                          Vé tham quan đã được gửi vào email{" "}
                          {ticketDetails.email}. Vui lòng kiểm tra hộp thư, bao
                          gồm cả thư mục spam.
                        </p>
                        <p className="text-sm mt-2">
                          Bạn cần xuất trình vé (in hoặc trên điện thoại) khi
                          đến tham quan bảo tàng.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      <Download className="h-4 w-4 mr-2" /> Tải vé
                    </Button>
                    <Button
                      variant="outline"
                      className="border-olive-800 text-olive-800 hover:bg-olive-800 hover:text-white"
                    >
                      <Share2 className="h-4 w-4 mr-2" /> Chia sẻ
                    </Button>
                    <Link href="/profile">
                      <Button variant="outline">
                        <Award className="h-4 w-4 mr-2" /> Xem điểm tích lũy
                      </Button>
                    </Link>
                    <Link href="/">
                      <Button variant="outline">
                        <Home className="h-4 w-4 mr-2" /> Về trang chủ
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
