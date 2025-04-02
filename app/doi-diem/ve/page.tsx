"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  CalendarIcon,
  Award,
  Ticket,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import AnimatedSection from "@/components/ui/animated-section";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useUserStore } from "@/stores/user-store";
import { useLoadingStore } from "@/stores/loading-store";
import { pointToTicket } from "@/request/ticket";
import { SnackbarTypes, useSnackBarStore } from "@/stores/snackbar-store";

// Định nghĩa schema cho form
const formSchema = z.object({
  fullName: z.string().min(2, { message: "Họ tên phải có ít nhất 2 ký tự" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  phone: z.string().min(10, { message: "Số điện thoại không hợp lệ" }),
  visitDate: z.date({ required_error: "Vui lòng chọn ngày tham quan" }),
  numberOfTickets: z.coerce
    .number()
    .min(1, { message: "Số lượng vé phải ít nhất là 1" })
    .max(5, { message: "Số lượng vé tối đa là 5" }),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function RedeemPointsPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user, reload } = useUserStore();
  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const { show } = useSnackBarStore();

  // Thông tin vé và điểm
  const ticketInfo = {
    name: "Vé tham quan bảo tàng",
    description: "Vé tham quan bảo tàng đổi điểm",
    pointsRequired: 2000,
    userPoints: user?.point,
  };

  // Khởi tạo form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      numberOfTickets: 1,
      note: "",
    },
  });

  // Tính toán tổng điểm cần đổi
  const watchNumberOfTickets = form.watch("numberOfTickets") || 1;
  const totalPointsRequired = ticketInfo.pointsRequired * watchNumberOfTickets;
  const remainingPoints = ticketInfo.userPoints
    ? ticketInfo.userPoints - totalPointsRequired
    : 0;
  const isEnoughPoints = remainingPoints >= 0;

  // Xử lý submit form
  const onSubmit = async (data: FormValues) => {
    if (!isEnoughPoints) {
      setError("Bạn không đủ điểm để đổi vé này");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      showLoading();
      const res = await pointToTicket({
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phone,
        visitDate: data.visitDate,
      });

      // Giả định thành công
      setIsSuccess(true);
      show(
        SnackbarTypes.success,
        "Đổi điểm thành công! Vé sẽ được gửi đến email của bạn."
      );

      reload();
      // Chuyển hướng sau 3 giây
      setTimeout(() => {
        router.push(`/mua-ve/mua-ve-thanh-cong?apptransid=${res?.transId}`);
      }, 3000);
    } catch (err) {
      console.error("Error redeeming points:", err);
      setError("Đã xảy ra lỗi khi đổi điểm. Vui lòng thử lại sau.");
      show(
        SnackbarTypes.error,
        "Đã xảy ra lỗi khi đổi điểm. Vui lòng thử lại sau."
      );
    } finally {
      setIsSubmitting(false);
      hideLoading();
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-gradient-to-r from-olive-900 to-olive-800 flex items-center">
        <motion.div
          className="absolute inset-0 bg-black/40 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <motion.div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        ></motion.div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-white w-full">
            <AnimatedSection animation="fadeUp" delay={0.3}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Đổi Điểm Lấy Vé
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fadeUp" delay={0.5}>
              <p className="text-xl mb-4">
                Sử dụng điểm tích lũy của bạn để đổi lấy vé tham quan bảo tàng
              </p>
              <div className="h-1 w-20 bg-amber-600 mb-6"></div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto">
            <Link
              href="/doi-diem"
              className="inline-flex items-center text-olive-800 hover:text-olive-900 mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại danh sách quà
            </Link>

            {isSuccess ? (
              <AnimatedSection animation="fadeUp">
                <Alert className="bg-green-50 border-green-200 mb-6">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <AlertTitle className="text-green-800">
                    Đổi điểm thành công!
                  </AlertTitle>
                  <AlertDescription className="text-green-700">
                    Yêu cầu đổi điểm của bạn đã được xử lý thành công. Vé tham
                    quan sẽ được gửi đến email của bạn.
                    <br />
                    Đang chuyển hướng đến trang xác nhận...
                  </AlertDescription>
                </Alert>
              </AnimatedSection>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Thông tin vé và điểm */}
                <div className="md:col-span-1">
                  <AnimatedSection animation="fadeLeft">
                    <Card>
                      <CardHeader className="bg-amber-50">
                        <CardTitle className="flex items-center text-amber-800">
                          <Award className="mr-2 h-5 w-5 text-amber-600" />
                          Thông tin đổi điểm
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {ticketInfo.name}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {ticketInfo.description}
                            </p>
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Điểm yêu cầu:
                              </span>
                              <span className="font-medium">
                                {ticketInfo.pointsRequired} điểm/vé
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Số lượng vé:
                              </span>
                              <span className="font-medium">
                                {watchNumberOfTickets} vé
                              </span>
                            </div>
                            <div className="flex justify-between font-medium">
                              <span>Tổng điểm cần đổi:</span>
                              <span className="text-amber-600">
                                {totalPointsRequired} điểm
                              </span>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Điểm hiện có:
                              </span>
                              <span className="font-medium">
                                {ticketInfo.userPoints} điểm
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Điểm còn lại:
                              </span>
                              <span
                                className={cn(
                                  "font-medium",
                                  isEnoughPoints
                                    ? "text-green-600"
                                    : "text-red-600"
                                )}
                              >
                                {remainingPoints} điểm
                              </span>
                            </div>
                          </div>

                          {!isEnoughPoints && (
                            <Alert variant="destructive">
                              <AlertCircle className="h-4 w-4" />
                              <AlertTitle>Không đủ điểm</AlertTitle>
                              <AlertDescription>
                                Bạn không có đủ điểm để đổi số lượng vé này. Vui
                                lòng giảm số lượng vé hoặc tích thêm điểm.
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                </div>

                {/* Form nhập thông tin */}
                <div className="md:col-span-2">
                  <AnimatedSection animation="fadeRight">
                    <Card>
                      <CardHeader>
                        <CardTitle>Thông tin đặt vé</CardTitle>
                        <CardDescription>
                          Vui lòng nhập thông tin của bạn để hoàn tất việc đổi
                          điểm lấy vé
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-6"
                        >
                          <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="fullName">Họ và tên</Label>
                              <Input
                                id="fullName"
                                placeholder="Nguyễn Văn A"
                                {...form.register("fullName")}
                              />
                              {form.formState.errors.fullName && (
                                <p className="text-sm text-red-500">
                                  {form.formState.errors.fullName.message}
                                </p>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  id="email"
                                  type="email"
                                  placeholder="example@email.com"
                                  {...form.register("email")}
                                />
                                {form.formState.errors.email && (
                                  <p className="text-sm text-red-500">
                                    {form.formState.errors.email.message}
                                  </p>
                                )}
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="phone">Số điện thoại</Label>
                                <Input
                                  id="phone"
                                  placeholder="0912345678"
                                  {...form.register("phone")}
                                />
                                {form.formState.errors.phone && (
                                  <p className="text-sm text-red-500">
                                    {form.formState.errors.phone.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <Label htmlFor="visitDate">
                                  Ngày tham quan
                                </Label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !form.watch("visitDate") &&
                                          "text-muted-foreground"
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {form.watch("visitDate") ? (
                                        format(form.watch("visitDate"), "PPP", {
                                          locale: vi,
                                        })
                                      ) : (
                                        <span>Chọn ngày</span>
                                      )}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={form.watch("visitDate")}
                                      onSelect={(date) =>
                                        form.setValue("visitDate", date as Date)
                                      }
                                      disabled={(date) => date < new Date()}
                                      initialFocus
                                      locale={vi}
                                    />
                                  </PopoverContent>
                                </Popover>
                                {form.formState.errors.visitDate && (
                                  <p className="text-sm text-red-500">
                                    {form.formState.errors.visitDate.message}
                                  </p>
                                )}
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="numberOfTickets">
                                  Số lượng vé
                                </Label>
                                <Input
                                  id="numberOfTickets"
                                  type="number"
                                  min={1}
                                  value={1}
                                  disabled
                                  {...form.register("numberOfTickets")}
                                />
                                {form.formState.errors.numberOfTickets && (
                                  <p className="text-sm text-red-500">
                                    {
                                      form.formState.errors.numberOfTickets
                                        .message
                                    }
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="note">
                                Ghi chú (không bắt buộc)
                              </Label>
                              <textarea
                                id="note"
                                className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive-800"
                                placeholder="Nhập ghi chú nếu có..."
                                {...form.register("note")}
                              ></textarea>
                            </div>
                          </div>

                          {error && (
                            <Alert variant="destructive">
                              <AlertCircle className="h-4 w-4" />
                              <AlertTitle>Lỗi</AlertTitle>
                              <AlertDescription>{error}</AlertDescription>
                            </Alert>
                          )}
                        </form>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={() => router.push("/doi-diem")}
                        >
                          Hủy
                        </Button>
                        <Button
                          onClick={form.handleSubmit(onSubmit)}
                          disabled={isSubmitting || !isEnoughPoints}
                          className="bg-amber-600 hover:bg-amber-700"
                        >
                          {isSubmitting ? (
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
                              <Ticket className="mr-2 h-4 w-4" /> Xác nhận đổi
                              điểm
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  </AnimatedSection>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
