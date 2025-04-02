"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, AlertTriangle, Download } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/ui/animated-section";
import dynamic from "next/dynamic";
import confettiAnimation from "@/public/confetti-animation.json";
import successAnimation from "@/public/success-animation.json";
import { getInvoiceByTransId } from "@/request/invoice";
import { get } from "lodash";
import Image from "next/image";

// Dynamic import của Lottie
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <div className="w-24 h-24" />, // Loading placeholder
});

export default function PaymentSuccessPage() {
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<
    "success" | "pending" | "failed"
  >("pending");
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const lottieRef = useRef<any>(null);

  const handleDownloadTicket = async () => {
    try {
      const ticketUrl = get(orderDetails, "ticketUrl", "");
      // download file from url
      const response = await fetch(ticketUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `${get(orderDetails, "documentId", "")}.png`;
      a.click();
    } catch (error) {
      console.error("Payment verification error:", error);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const verifyPayment = async () => {
      setIsLoading(true);
      try {
        // Get payment parameters from URL
        const transId = searchParams.get("apptransid");

        if (!transId) {
          setPaymentStatus("failed");
          return;
        }

        const invoice = await getInvoiceByTransId(transId);

        // Check result code (0 is success for most Vietnamese payment gateways)
        if (invoice.data.length > 0) {
          setPaymentStatus("success");
          // Mock order details
          setOrderDetails(invoice.data[0]);
        } else {
          setPaymentStatus("failed");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        setPaymentStatus("failed");
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  // Play the animation when component mounts
  useEffect(() => {
    if (lottieRef.current && paymentStatus === "success") {
      lottieRef.current.play();
    }
  }, [paymentStatus]);

  useEffect(() => {
    if (isMounted) {
      lottieRef.current?.play();
    }
  }, [isMounted]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-olive-800 border-r-olive-800 border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang xác thực thanh toán...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection animation="fadeUp">
            <Card>
              <CardContent className="p-8">
                {paymentStatus === "success" ? (
                  <div className="text-center">
                    {new Date(
                      get(orderDetails, "invoice_details[0].validDate", "")
                    ) > new Date() && (
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
                    )}

                    {new Date(
                      get(orderDetails, "invoice_details[0].validDate", "")
                    ) < new Date() ? (
                      <div className="text-center">
                        <p className="text-red-600 mb-8 text-2xl font-bold">
                          Vé tham quan đã hết hạn sử dụng.
                        </p>
                      </div>
                    ) : (
                      <>
                        <h1 className="text-2xl font-bold mb-2">
                          Chúc mừng! Thanh toán thành công!
                        </h1>
                        <p className="text-gray-600 mb-8">
                          Cảm ơn {orderDetails.fullName || "quý khách"} đã đặt
                          vé tham quan Bảo tàng Lịch sử Quân sự Việt Nam.
                        </p>
                      </>
                    )}

                    {orderDetails && (
                      <div className="bg-gray-50 rounded-lg p-6 text-left mb-8">
                        <h2 className="text-lg font-semibold mb-4">
                          Chi tiết đơn hàng
                        </h2>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Mã đơn hàng:</span>
                            <span className="font-medium">
                              {get(orderDetails, "documentId", "--")}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Số tiền:</span>
                            <span className="font-medium">
                              {Number.parseInt(
                                get(orderDetails, "totalPrice", 0)
                              ).toLocaleString("vi-VN")}
                              VNĐ
                            </span>
                          </div>
                          {/* <div className="flex justify-between">
                            <span className="text-gray-600">
                              Phương thức thanh toán:
                            </span>
                            <span className="font-medium">
                              {orderDetails.paymentMethod}
                            </span>
                          </div> */}
                          <div className="flex justify-between">
                            <span className="text-gray-600">Mã giao dịch:</span>
                            <span className="font-medium">
                              {get(orderDetails, "transId", "--")}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Thời gian thanh toán:
                            </span>
                            <span className="font-medium">
                              {get(
                                orderDetails,
                                "createdAt",
                                "--"
                              ).toLocaleString("vi-VN")}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Số lượng vé:</span>
                            <span className="font-medium">
                              {get(orderDetails, "invoice_details.length", 0)}{" "}
                              vé
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Ngày tham quan:
                            </span>
                            <span className="font-medium">
                              {get(
                                orderDetails,
                                "invoice_details[0].validDate",
                                "--"
                              ).toLocaleString("vi-VN")}
                            </span>
                          </div>
                          <div className="space-y-2 p-2 bg-gray-100 rounded-lg">
                            {orderDetails.invoice_details.map(
                              (item: any, index: number) => (
                                <div
                                  className="flex justify-between"
                                  key={index}
                                >
                                  <span className="text-gray-600">
                                    {index + 1}.
                                  </span>
                                  <span className="text-gray-600">Tên vé:</span>
                                  <span className="font-medium">
                                    {get(item, "ticket.name", "--")}
                                  </span>
                                  <span className="text-gray-600">Giá vé:</span>
                                  <span className="font-medium">
                                    {get(item, "price", "--")}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                          {orderDetails.email && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Email:</span>
                              <span className="font-medium">
                                {orderDetails.email}
                              </span>
                            </div>
                          )}
                          {orderDetails.phoneNumber && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Số điện thoại:
                              </span>
                              <span className="font-medium">
                                {orderDetails.phoneNumber}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {get(orderDetails, "ticketUrl", "") && (
                      <div className="flex justify-center">
                        <Image
                          src={get(orderDetails, "ticketUrl", "")}
                          alt="QR Code"
                          width={200}
                          height={200}
                        />
                      </div>
                    )}

                    {new Date(
                      get(orderDetails, "invoice_details[0].validDate", "")
                    ) > new Date() && (
                      <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-green-800 mb-8">
                        <div className="flex items-start">
                          {/* <Mail className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" /> */}
                          <div>
                            <p className="font-bold mb-2">
                              Vui lòng kiểm tra email của bạn
                            </p>
                            <p className="text-sm">
                              Vé tham quan đã được gửi vào email{" "}
                              {orderDetails.email || "của bạn"}. Vui lòng kiểm
                              tra hộp thư, bao gồm cả thư mục spam.
                            </p>
                            <p className="text-sm mt-2">
                              Bạn cần xuất trình vé (in hoặc trên điện thoại)
                              khi đến tham quan bảo tàng.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        className="bg-red-700 hover:bg-red-800"
                        onClick={handleDownloadTicket}
                      >
                        <Download className="h-4 w-4 mr-2" /> Tải vé
                      </Button>
                      {/* <Button
                        variant="outline"
                        className="border-olive-800 text-olive-800 hover:bg-olive-800 hover:text-white"
                      >
                        <Share2 className="h-4 w-4 mr-2" /> Chia sẻ
                      </Button> */}
                      <Link href="/">
                        <Button variant="outline">
                          <Home className="h-4 w-4 mr-2" /> Về trang chủ
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <AlertTriangle className="h-12 w-12 text-red-600" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">
                      Thanh toán không thành công
                    </h1>
                    <p className="text-gray-600 mb-8">
                      Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại
                      hoặc chọn phương thức thanh toán khác.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/mua-ve">
                        <Button className="bg-red-700 hover:bg-red-800">
                          Thử lại
                        </Button>
                      </Link>
                      <Link href="/">
                        <Button variant="outline">
                          <Home className="h-4 w-4 mr-2" /> Về trang chủ
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
