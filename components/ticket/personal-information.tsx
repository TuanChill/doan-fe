"use client";

import type { UseFormReturn } from "react-hook-form";
import { ChevronRight, UserRound } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import AnimatedSection from "@/components/ui/animated-section";
import { ticketTypes } from "@/lib/ticket-data";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TicketFormValues } from "@/components/validation/ticket";
import { useUserStore } from "@/stores/user-store";
import { get } from "lodash";
interface PersonalInformationProps {
  form: UseFormReturn<TicketFormValues>;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  watchVisitDate: Date | undefined;
  totalTickets: number;
  totalPrice: number;
  watchAdultTickets: number;
  watchChildTickets: number;
  watchGroupTickets: number;
}

export default function PersonalInformation({
  form,
  handleNextStep,
  handlePrevStep,
  watchVisitDate,
  totalTickets,
  totalPrice,
  watchAdultTickets,
  watchChildTickets,
  watchGroupTickets,
}: PersonalInformationProps) {
  const { user } = useUserStore();

  return (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center mr-4">
          <UserRound className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold">Thông tin cá nhân</h2>
      </div>

      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="lastName">Họ tên</Label>
            <Input
              id="fullName"
              className="mt-1"
              placeholder="Nhập họ và tên của bạn"
              {...form.register("fullName", {
                setValueAs: (value) => value?.trim(),
              })}
              defaultValue={get(user, "fullName", "")}
            />
            {form.formState.errors.fullName && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.fullName.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="mt-1"
              placeholder="Nhập địa chỉ email của bạn"
              {...form.register("email", {
                setValueAs: (value) => value?.trim(),
              })}
              defaultValue={get(user, "email", "")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              id="phone"
              className="mt-1"
              placeholder="Nhập số điện thoại của bạn"
              {...form.register("phoneNumber", {
                setValueAs: (value) => value?.trim(),
              })}
              defaultValue={get(user, "phoneNumber", "") || ""}
            />
            {form.formState.errors.phoneNumber && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="bg-stone-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium mb-2">Tóm tắt đơn hàng</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Ngày tham quan:</span>
              <span className="font-medium">
                {watchVisitDate
                  ? format(watchVisitDate, "dd/MM/yyyy", { locale: vi })
                  : "Chưa chọn"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tổng số vé:</span>
              <span className="font-medium">{totalTickets} vé</span>
            </div>
            {watchAdultTickets > 0 && (
              <div className="flex justify-between">
                <span>Vé người lớn:</span>
                <span>
                  {watchAdultTickets} x{" "}
                  {ticketTypes[0].price.toLocaleString("vi-VN")} VNĐ
                </span>
              </div>
            )}
            {watchChildTickets > 0 && (
              <div className="flex justify-between">
                <span>Vé trẻ em:</span>
                <span>
                  {watchChildTickets} x{" "}
                  {ticketTypes[1].price.toLocaleString("vi-VN")} VNĐ
                </span>
              </div>
            )}
            {watchGroupTickets > 0 && (
              <div className="flex justify-between">
                <span>Vé đoàn:</span>
                <span>
                  {watchGroupTickets} x{" "}
                  {ticketTypes[2].price.toLocaleString("vi-VN")} VNĐ
                </span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-gray-200 font-medium">
              <span>Tổng tiền:</span>
              <span className="text-red-700">
                {totalPrice.toLocaleString("vi-VN")} VNĐ
              </span>
            </div>
          </div>
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
          onClick={handleNextStep}
          className="bg-red-700 hover:bg-red-800"
        >
          Thanh toán <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
