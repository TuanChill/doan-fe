"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { login } from "@/request/auth";
import { useLoadingStore } from "@/stores/loading-store";
import { useSnackBarStore } from "@/stores/snackbar-store";
import { useUserStore } from "@/stores/user-store";
import { APP_ROUTES } from "@/const/route";
import { useRouter } from "@/hooks/use-router";

export default function LoginForm() {
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

  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const [success, error] = useSnackBarStore((state) => [
    state.success,
    state.error,
  ]);
  const [setAuth] = useUserStore((state) => [state.setAuth]);
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

  const handleChange = (e: any) => {
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
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name as keyof typeof errors]: "",
      });
    }
  };

  const handleCheckboxChange = (e: any) => {
    setFormData({
      ...formData,
      rememberMe: e.target.checked,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      showLoading();
      const response = await login(formData.identifier, formData.password);

      success("Đăng nhập thành công!");

      setAuth(response.user, response.jwt);
      router.push(APP_ROUTES.HOME);
    } catch (err) {
      console.error("Lỗi khi đăng nhập:", err);
      error("Đăng nhập không thành công");
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
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
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          Đăng nhập
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
