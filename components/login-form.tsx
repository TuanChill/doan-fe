"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({
    identifier: "",
    password: "",
  });
  const [apiError, setApiError] = useState("");
  const router = useRouter();

  const validateForm = () => {
    let valid = true;
    const newErrors = { identifier: "", password: "" };

    // Kiểm tra identifier (username hoặc email)
    if (!formData.identifier) {
      newErrors.identifier = "Vui lòng nhập tên đăng nhập hoặc email";
      valid = false;
    } else if (formData.identifier.includes(" ")) {
      newErrors.identifier =
        "Tên đăng nhập hoặc email không được chứa khoảng trắng";
      valid = false;
    }

    // Kiểm tra mật khẩu
    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
      valid = false;
    } else if (formData.password.includes(" ")) {
      newErrors.password = "Mật khẩu không được chứa khoảng trắng";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Loại bỏ khoảng trắng cho identifier và password
    if (name === "identifier" || name === "password") {
      setFormData({
        ...formData,
        [name]: value.trim(),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Xóa lỗi khi người dùng bắt đầu nhập lại
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    // Xóa lỗi API khi người dùng thay đổi dữ liệu
    if (apiError) {
      setApiError("");
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      rememberMe: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setApiError("");

    try {
      // Gọi API đăng nhập
      const response = await fetch("http://14.225.211.42/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: formData.identifier,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Xử lý lỗi từ API
        if (data.error && data.error.message) {
          setApiError(data.error.message);
        } else {
          setApiError(
            "Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập."
          );
        }
        return;
      }

      // Đăng nhập thành công
      // Hiển thị thông báo thành công
      alert("Đăng nhập thành công!");

      // Chuyển hướng đến trang chủ
      router.push("/page");
      // Lưu token
      if (data.jwt) {
        localStorage.setItem("authToken", data.jwt);

        // Lưu thông tin người dùng nếu cần
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      }

      // Chuyển hướng đến trang chính sau khi đăng nhập
      router.push("/dashboard");
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      setApiError(
        "Đã xảy ra lỗi khi kết nối đến máy chủ. Vui lòng thử lại sau."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {apiError && (
          <div
            className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{apiError}</span>
          </div>
        )}

        <div>
          <label
            htmlFor="identifier"
            className="block text-sm font-medium text-gray-700"
          >
            Tên đăng nhập hoặc Email
          </label>
          <input
            id="identifier"
            name="identifier"
            type="text"
            placeholder="username hoặc email"
            value={formData.identifier}
            onChange={handleChange}
            disabled={isLoading}
            className={`mt-1 block w-full px-3 py-2 bg-white border ${
              errors.identifier ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.identifier && (
            <p className="mt-1 text-xs text-red-500">{errors.identifier}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Mật khẩu
          </label>
          <div className="relative mt-1">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              className={`block w-full px-3 py-2 bg-white border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10`}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleCheckboxChange}
              disabled={isLoading}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-700"
            >
              Ghi nhớ đăng nhập
            </label>
          </div>
          <Link
            href="/forgot-pw"
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Quên mật khẩu?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang đăng nhập...
            </>
          ) : (
            "Đăng nhập"
          )}
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-600">
        Chưa có tài khoản?{" "}
        <Link
          href="/register"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Đăng ký
        </Link>
      </div>
    </div>
  );
}
