"use client";

import type { UseFormReturn } from "react-hook-form";
import {
  BadgeInfo,
  CalendarDays,
  CalendarIcon,
  ChevronRight,
  Clock,
  Ticket,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import AnimatedSection from "@/components/ui/animated-section";
import { ticketTypes } from "@/lib/ticket-data";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { TicketFormValues } from "@/components/validation/ticket";
import { vi } from "date-fns/locale";

interface TicketSelectionProps {
  form: UseFormReturn<TicketFormValues>;
  handleNextStep: () => void;
  totalTickets: number;
  totalPrice: number;
}

export default function TicketSelection({
  form,
  handleNextStep,
  totalTickets,
  totalPrice,
}: TicketSelectionProps) {
  const watchVisitDate = form.watch("visitDate");

  return (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center mr-4">
          <Ticket className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold">Chọn loại vé và số lượng</h2>
      </div>

      <div className="mb-8">
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-6">
          <div className="flex items-start">
            <BadgeInfo className="h-5 w-5 mr-3 text-amber-600 mt-0.5" />
            <div>
              <p className="font-medium text-amber-800">Thông báo quan trọng</p>
              <p className="text-sm text-amber-800">
                Từ ngày 1/11/2023, Bảo tàng mở cửa miễn phí tham quan tại địa
                điểm mới. Giao diện mua vé này chỉ dành cho mục đích minh họa.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <CalendarDays className="h-5 w-5 mr-2 text-red-700" /> Chọn ngày
              tham quan
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="visitDate">Ngày tham quan</Label>
                <div className="mt-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] justify-start text-left font-normal",
                          !watchVisitDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {watchVisitDate ? (
                          format(watchVisitDate, "PPP")
                        ) : (
                          <span>Chọn ngày tham quan</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={watchVisitDate}
                        onSelect={(date) =>
                          form.setValue("visitDate", date as Date)
                        }
                        disabled={(date) => date < new Date()}
                        initialFocus
                        locale={vi}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                {form.formState.errors.visitDate && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.visitDate.message}
                  </p>
                )}
              </div>
              <div>
                <Label>Giờ mở cửa</Label>
                <div className="mt-1 p-2.5 border border-gray-300 rounded-md bg-gray-50 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>8:00 - 17:00</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Ticket className="h-5 w-5 mr-2 text-red-700" /> Loại vé và số
              lượng
            </h3>

            <div className="space-y-4">
              {ticketTypes.map((ticket) => (
                <div key={ticket.id} className="bg-stone-50 p-4 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="mb-2 sm:mb-0">
                      <div className="font-medium">{ticket.name}</div>
                      <div className="text-sm text-gray-600">
                        {ticket.description}
                      </div>
                      <div className="font-medium text-red-700 mt-1">
                        {ticket.price.toLocaleString("vi-VN")} VNĐ
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const currentValue =
                            form.getValues(`${ticket.id}Tickets` as any) || 0;
                          if (currentValue > 0) {
                            form.setValue(
                              `${ticket.id}Tickets` as any,
                              currentValue - 1
                            );
                          }
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      </Button>
                      <Input
                        type="number"
                        className="w-16 mx-2 text-center"
                        min="0"
                        {...form.register(`${ticket.id}Tickets` as any)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const currentValue =
                            Number(
                              form.getValues(`${ticket.id}Tickets` as any)
                            ) || 0;
                          form.setValue(
                            `${ticket.id}Tickets` as any,
                            currentValue + 1
                          );
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {form.formState.errors.adultTickets && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.adultTickets.message}
                </p>
              )}

              <div className="bg-stone-100 p-4 rounded-lg mt-4">
                <div className="flex justify-between font-medium">
                  <span>Tổng số vé:</span>
                  <span>{totalTickets} vé</span>
                </div>
                <div className="flex justify-between font-medium text-lg mt-2">
                  <span>Tổng tiền:</span>
                  <span className="text-red-700">
                    {totalPrice.toLocaleString("vi-VN")} VNĐ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          onClick={handleNextStep}
          className="bg-red-700 hover:bg-red-800"
        >
          Tiếp tục <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
