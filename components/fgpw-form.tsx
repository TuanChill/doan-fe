"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSnackBarStore } from "@/stores/snackbar-store";
import { useLoadingStore } from "@/stores/loading-store";
import { APP_ROUTES } from "@/const/route";
import { forgotPassword } from "@/request/auth";

// Define the schema using zod
const schema = z.object({
  email: z.string().email("Vui lòng nhập email hợp lệ"),
});

export default function ForgotPasswordForm() {
  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const { success, error } = useSnackBarStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: { email: string }) => {
    showLoading();

    try {
      await forgotPassword(data.email);
      success("Email đặt lại mật khẩu đã được gửi đến email của bạn.");
    } catch (err: any) {
      error(err.response.data.error.message);
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              {...register("email")}
              className={`mt-1 block w-full px-3 py-2 bg-white border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            Gửi hướng dẫn đặt lại mật khẩu
          </button>

          <div className="text-center">
            <Link
              href={APP_ROUTES.LOGIN}
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại trang đăng nhập
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
