"use client";

import type { UseFormReturn } from "react-hook-form";

import { ChevronRight, CreditCard, QrCode, Wallet } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { ticketTypes } from "@/lib/ticket-data";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  onSubmit: (data: TicketFormValues) => Promise<void>;
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
  onSubmit,
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
                <RadioGroupItem value="vnpay" id="vnpay" />
                <Label
                  htmlFor="vnpay"
                  className="cursor-pointer flex items-center"
                >
                  <QrCode className="h-5 w-5 mr-2 text-gray-700" />
                  Thanh toán qua ZaloPay
                </Label>
              </div>
            </RadioGroup>
            <p className="text-sm text-red-500 mb-2">
              {form.formState.errors.paymentMethod?.message
                ? "Vui lòng chọn phương thức thanh toán"
                : ""}
            </p>
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

                {watchGroupTickets > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Vé đoàn x {watchGroupTickets}</span>
                    <span>
                      {(
                        watchGroupTickets * ticketTypes[2].price
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
          type="button"
          className="bg-red-700 hover:bg-red-800"
          disabled={isLoading}
          onClick={() => {
            const formData = form.getValues();
            onSubmit(formData);
          }}
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
