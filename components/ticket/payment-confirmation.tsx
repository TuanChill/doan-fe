import Link from "next/link";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import AnimatedSection from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { ticketTypes } from "@/lib/ticket-data";

interface PaymentConfirmationProps {
  orderNumber: string;
  visitDate: Date | undefined;
  totalTickets: number;
  totalPrice: number;
  adultsCount: number;
  childrenCount: number;
  seniorsCount: number;
  groupsCount: number;
}

export default function PaymentConfirmation({
  orderNumber,
  visitDate,
  totalTickets,
  totalPrice,
  adultsCount,
  childrenCount,
  seniorsCount,
  groupsCount,
}: PaymentConfirmationProps) {
  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-green-600"
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
        </div>
        <h2 className="text-2xl font-bold mb-2">Thanh toán thành công!</h2>
        <p className="text-gray-600">
          Cảm ơn bạn đã đặt vé tham quan Bảo tàng Lịch sử Quân sự Việt Nam.
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
          <div className="bg-red-700 text-white p-4">
            <h3 className="text-xl font-bold">Thông tin đặt vé</h3>
          </div>
          <div className="p-4">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Mã đơn hàng:</span>
              <span className="font-medium">{orderNumber}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Ngày tham quan:</span>
              <span className="font-medium">
                {visitDate
                  ? format(visitDate, "dd/MM/yyyy", { locale: vi })
                  : "Chưa chọn"}
              </span>
            </div>

            <div className="mt-2 mb-3">
              <h4 className="font-medium text-gray-700">Chi tiết vé:</h4>
              <div className="text-sm space-y-1 mt-1">
                {adultsCount > 0 && (
                  <div className="flex justify-between">
                    <span>Vé người lớn:</span>
                    <span>
                      {adultsCount} x{" "}
                      {ticketTypes[0].price.toLocaleString("vi-VN")} VNĐ
                    </span>
                  </div>
                )}
                {childrenCount > 0 && (
                  <div className="flex justify-between">
                    <span>Vé trẻ em:</span>
                    <span>
                      {childrenCount} x{" "}
                      {ticketTypes[1].price.toLocaleString("vi-VN")} VNĐ
                    </span>
                  </div>
                )}
                {seniorsCount > 0 && (
                  <div className="flex justify-between">
                    <span>Vé người cao tuổi:</span>
                    <span>
                      {seniorsCount} x{" "}
                      {ticketTypes[2].price.toLocaleString("vi-VN")} VNĐ
                    </span>
                  </div>
                )}
                {groupsCount > 0 && (
                  <div className="flex justify-between">
                    <span>Vé đoàn:</span>
                    <span>
                      {groupsCount} x{" "}
                      {ticketTypes[3].price.toLocaleString("vi-VN")} VNĐ
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Tổng số vé:</span>
              <span className="font-medium">{totalTickets} vé</span>
            </div>
            <div className="flex justify-between py-2 mb-4">
              <span className="text-gray-600">Tổng tiền:</span>
              <span className="font-bold text-red-700">
                {totalPrice.toLocaleString("vi-VN")} VNĐ
              </span>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-green-800 text-sm">
              <p>
                <strong>Lưu ý quan trọng:</strong>
              </p>
              <p className="mt-1">
                Vé tham quan đã được gửi vào email của bạn. Vui lòng kiểm tra
                hộp thư, bao gồm cả thư mục spam.
              </p>
              <p className="mt-1">
                Bạn cần xuất trình vé (in hoặc trên điện thoại) khi đến tham
                quan bảo tàng.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-red-700 hover:bg-red-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            In vé
          </Button>
          <Link href="/">
            <Button variant="outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Về trang chủ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
