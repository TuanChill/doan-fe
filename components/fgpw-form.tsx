"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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

    try {
      // Gọi API đặt lại mật khẩu ở đây
      // Ví dụ:
      // await resetPassword(email)

      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Hiển thị thông báo thành công
      setIsSubmitted(true);
    } catch (error) {
      setError("Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-6 px-6 md:px-8">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={handleChange}
                disabled={isLoading}
                className={`${
                  error ? "border-destructive" : ""
                } h-11 text-base`}
              />
              {error && <p className="text-xs text-destructive">{error}</p>}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 px-6 md:px-8 pb-6">
            <Button
              type="submit"
              className="w-full h-11 text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                "Gửi hướng dẫn đặt lại mật khẩu"
              )}
            </Button>

            <Link
              href="/login"
              className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại trang đăng nhập
            </Link>
          </CardFooter>
        </form>
      ) : (
        <CardContent className="space-y-6 pt-6 px-6 md:px-8 pb-6">
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
              Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến{" "}
              <span className="font-medium">{email}</span>. Vui lòng kiểm tra
              hộp thư đến và thư rác của bạn.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="w-full h-11 text-base"
            >
              Thử với email khác
            </Button>

            <Link
              href="/login"
              className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại trang đăng nhập
            </Link>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
