"use client";

import type { UseFormReturn } from "react-hook-form";

import {
  CheckIcon as BankCheck,
  ChevronRight,
  CreditCard,
  QrCode,
  Wallet,
} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { ticketTypes } from "@/lib/ticket-data";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TicketFormValues } from "@/components/validation/ticket";

interface PaymentMethodProps {
  form: UseFormReturn<TicketFormValues>;
  handlePrevStep: () => void;
  isLoading: boolean;
  watchPaymentMethod: string;
  watchVisitDate: Date | undefined;
  totalTickets: number;
  totalPrice: number;
  watchAdultTickets: number;
  watchChildTickets: number;
  watchSeniorTickets: number;
  watchGroupTickets: number;
}

export default function PaymentMethod({
  form,
  handlePrevStep,
  isLoading,
  watchPaymentMethod,
  watchVisitDate,
  totalTickets,
  totalPrice,
  watchAdultTickets,
  watchChildTickets,
  watchSeniorTickets,
  watchGroupTickets,
}: PaymentMethodProps) {
  return (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center mr-4">
          <CreditCard className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold">Phương thức thanh toán</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h3 className="font-medium mb-4">Chọn phương thức thanh toán</h3>
            <RadioGroup
              defaultValue={watchPaymentMethod}
              onValueChange={(value: any) =>
                form.setValue("paymentMethod", value as any)
              }
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 bg-white border rounded-lg p-3 cursor-pointer hover:bg-stone-50 transition-colors">
                <RadioGroupItem value="card" id="card" />
                <Label
                  htmlFor="card"
                  className="cursor-pointer flex items-center"
                >
                  <CreditCard className="h-5 w-5 mr-2 text-gray-700" />
                  Thẻ tín dụng / ghi nợ
                </Label>
              </div>
              <div className="flex items-center space-x-2 bg-white border rounded-lg p-3 cursor-pointer hover:bg-stone-50 transition-colors">
                <RadioGroupItem value="qrcode" id="qrcode" />
                <Label
                  htmlFor="qrcode"
                  className="cursor-pointer flex items-center"
                >
                  <QrCode className="h-5 w-5 mr-2 text-gray-700" />
                  Quét mã QR (VNPay, ZaloPay)
                </Label>
              </div>
              <div className="flex items-center space-x-2 bg-white border rounded-lg p-3 cursor-pointer hover:bg-stone-50 transition-colors">
                <RadioGroupItem value="bank" id="bank" />
                <Label
                  htmlFor="bank"
                  className="cursor-pointer flex items-center"
                >
                  <BankCheck className="h-5 w-5 mr-2 text-gray-700" />
                  Chuyển khoản ngân hàng
                </Label>
              </div>
              <div className="flex items-center space-x-2 bg-white border rounded-lg p-3 cursor-pointer hover:bg-stone-50 transition-colors">
                <RadioGroupItem value="ewallet" id="ewallet" />
                <Label
                  htmlFor="ewallet"
                  className="cursor-pointer flex items-center"
                >
                  <Wallet className="h-5 w-5 mr-2 text-gray-700" />
                  Ví điện tử (MoMo, ShopeePay)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Payment method specific forms */}
          <div className="mt-6">
            {watchPaymentMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Số thẻ</Label>
                  <Input
                    id="cardNumber"
                    className="mt-1"
                    placeholder="1234 5678 9012 3456"
                    {...form.register("cardNumber")}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardExpiry">Ngày hết hạn</Label>
                    <Input
                      id="cardExpiry"
                      className="mt-1"
                      placeholder="MM/YY"
                      {...form.register("cardExpiry")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardCvc">CVC/CVV</Label>
                    <Input
                      id="cardCvc"
                      className="mt-1"
                      placeholder="123"
                      {...form.register("cardCvc")}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cardName">Tên chủ thẻ</Label>
                  <Input
                    id="cardName"
                    className="mt-1"
                    placeholder="NGUYEN VAN A"
                    {...form.register("cardName")}
                  />
                </div>
              </div>
            )}

            {watchPaymentMethod === "qrcode" && (
              <div className="p-6 border border-gray-200 rounded-lg bg-stone-50 text-center">
                <div className="mb-4">
                  <div className="bg-white p-4 rounded-lg inline-block">
                    <div className="w-48 h-48 bg-stone-100 mx-auto flex items-center justify-center">
                      <QrCode className="h-24 w-24 text-gray-400" />
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">
                  Quét mã QR bằng ứng dụng VNPay hoặc ZaloPay để thanh toán
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Mã QR có hiệu lực trong 15 phút
                </p>
              </div>
            )}

            {watchPaymentMethod === "bank" && (
              <div className="p-6 border border-gray-200 rounded-lg bg-stone-50">
                <h4 className="font-medium mb-2">Thông tin chuyển khoản</h4>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ngân hàng:</span>
                    <span className="font-medium">Vietcombank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số tài khoản:</span>
                    <span className="font-medium">1234567890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Chủ tài khoản:</span>
                    <span className="font-medium">
                      BẢO TÀNG LỊCH SỬ QUÂN SỰ VIỆT NAM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nội dung CK:</span>
                    <span className="font-medium">
                      MUSEUM {form.getValues("lastName")}{" "}
                      {form.getValues("phone")}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Sau khi chuyển khoản, vui lòng nhấn nút &quot;Hoàn tất thanh
                  toán&quot; để hoàn tất quá trình đặt vé.
                </p>
              </div>
            )}

            {watchPaymentMethod === "ewallet" && (
              <div className="p-6 border border-gray-200 rounded-lg bg-stone-50">
                <div className="mb-4">
                  <h4 className="font-medium mb-3">Chọn ví điện tử</h4>
                  <Select defaultValue="momo">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="momo">Ví MoMo</SelectItem>
                      <SelectItem value="shopeepay">ShopeePay</SelectItem>
                      <SelectItem value="zalopay">ZaloPay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <p className="mb-4 text-gray-700">
                    Bạn sẽ được chuyển đến trang thanh toán của ví điện tử sau
                    khi nhấn nút &quot;Hoàn tất thanh toán&quot;
                  </p>
                  <Wallet className="h-16 w-16 text-pink-500 mx-auto" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">Tóm tắt đơn hàng</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Ngày tham quan:</span>
                  <span>
                    {watchVisitDate
                      ? format(watchVisitDate, "dd/MM/yyyy", { locale: vi })
                      : "Chưa chọn"}
                  </span>
                </div>

                {watchAdultTickets > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Vé người lớn x {watchAdultTickets}</span>
                    <span>
                      {(
                        watchAdultTickets * ticketTypes[0].price
                      ).toLocaleString("vi-VN")}{" "}
                      VNĐ
                    </span>
                  </div>
                )}

                {watchChildTickets > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Vé trẻ em x {watchChildTickets}</span>
                    <span>
                      {(
                        watchChildTickets * ticketTypes[1].price
                      ).toLocaleString("vi-VN")}{" "}
                      VNĐ
                    </span>
                  </div>
                )}

                {watchSeniorTickets > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Vé người cao tuổi x {watchSeniorTickets}</span>
                    <span>
                      {(
                        watchSeniorTickets * ticketTypes[2].price
                      ).toLocaleString("vi-VN")}{" "}
                      VNĐ
                    </span>
                  </div>
                )}

                {watchGroupTickets > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Vé đoàn x {watchGroupTickets}</span>
                    <span>
                      {(
                        watchGroupTickets * ticketTypes[3].price
                      ).toLocaleString("vi-VN")}{" "}
                      VNĐ
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between font-medium">
                  <span>Tổng số vé:</span>
                  <span>{totalTickets} vé</span>
                </div>
                <div className="flex justify-between font-medium text-lg mt-1">
                  <span>Tổng tiền:</span>
                  <span className="text-red-700">
                    {totalPrice.toLocaleString("vi-VN")} VNĐ
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-2">
                  Vé sẽ được gửi qua email sau khi thanh toán thành công.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={handlePrevStep}>
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Quay lại
        </Button>
        <Button
          type="submit"
          className="bg-red-700 hover:bg-red-800"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Đang xử lý...
            </>
          ) : (
            <>
              Hoàn tất thanh toán <ChevronRight className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
