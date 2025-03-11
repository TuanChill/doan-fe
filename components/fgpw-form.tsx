"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";
import {
  findUserByEmail,
  generateResetToken,
  sendPasswordResetEmail,
} from "@/lib/auth-service";

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const validateEmail = () => {
    if (!email) {
      setError("Vui lòng nhập email");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Vui lòng nhập email hợp lệ");
      return false;
    }
    setError("");
    return true;
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) validateEmail();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail()) return;

    setIsLoading(true);
    setError("");

    try {
      // Gọi API đặt lại mật khẩu
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Xử lý các loại lỗi khác nhau
        if (data.error === "Email không tồn tại") {
          // Không hiển thị lỗi này để tránh tiết lộ thông tin
          // Thay vào đó, vẫn hiển thị màn hình thành công
          setIsSubmitted(true);
        } else {
          throw new Error(
            data.error || "Không thể gửi yêu cầu đặt lại mật khẩu"
          );
        }
      } else {
        // Hiển thị thông báo thành công
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đặt lại mật khẩu:", error);
      setError("Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  // Giả lập xử lý quên mật khẩu trực tiếp (không qua API)
  const handleSubmitDirect = async (e) => {
    e.preventDefault();

    if (!validateEmail()) return;

    setIsLoading(true);
    setError("");

    try {
      // Tìm người dùng theo email
      const user = await findUserByEmail(email);

      // Luôn hiển thị màn hình thành công, ngay cả khi email không tồn tại
      // Đây là biện pháp bảo mật để tránh tiết lộ thông tin về email đã đăng ký

      if (user) {
        // Nếu tìm thấy người dùng, tạo token và gửi email
        const token = await generateResetToken(user.id);
        const resetUrl = `${window.location.origin}/reset-password?token=${token}`;
        await sendPasswordResetEmail(email, resetUrl);
      }

      // Hiển thị thông báo thành công bất kể email có tồn tại hay không
      setIsSubmitted(true);
    } catch (error) {
      console.error("Lỗi khi xử lý yêu cầu quên mật khẩu:", error);
      setError("Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      {!isSubmitted ? (
        <form onSubmit={handleSubmitDirect}>
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
                value={email}
                onChange={handleChange}
                disabled={isLoading}
                className={`mt-1 block w-full px-3 py-2 bg-white border ${
                  error ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                "Gửi hướng dẫn đặt lại mật khẩu"
              )}
            </button>

            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại trang đăng nhập
              </Link>
            </div>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
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
            <h3 className="text-lg font-medium text-gray-900">
              Kiểm tra email của bạn
            </h3>
            <p className="text-sm text-gray-600">
              Nếu email <span className="font-medium">{email}</span> đã được
              đăng ký trong hệ thống, chúng tôi đã gửi hướng dẫn đặt lại mật
              khẩu. Vui lòng kiểm tra hộp thư đến và thư rác của bạn.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Thử với email khác
            </button>

            <Link
              href="/login"
              className="inline-flex items-center justify-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại trang đăng nhập
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
