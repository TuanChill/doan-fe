"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "@/hooks/use-router";
import { useLoadingStore } from "@/stores/loading-store";
import { register } from "@/request/auth";
import { useSnackBarStore } from "@/stores/snackbar-store";
import { APP_ROUTES } from "@/const/route";
import { useUserStore } from "@/stores/user-store";
import Link from "next/link";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: "",
  });

  const [showLoading, hideLoading] = useLoadingStore((state) => [
    state.show,
    state.hide,
  ]);
  const router = useRouter();
  const [success, error] = useSnackBarStore((state) => [
    state.success,
    state.error,
  ]);
  const [setAuth] = useUserStore((state) => [state.setAuth]);
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: "",
    };

    // Kiểm tra username
    if (!formData.username) {
      newErrors.username = "Vui lòng nhập tên người dùng";
      valid = false;
    } else if (formData.username.includes(" ")) {
      newErrors.username = "Tên người dùng không được chứa khoảng trắng";
      valid = false;
    }

    // Kiểm tra email
    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
      valid = false;
    } else if (formData.email.includes(" ")) {
      newErrors.email = "Email không được chứa khoảng trắng";
      valid = false;
    }

    // Kiểm tra mật khẩu
    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      valid = false;
    } else if (formData.password.includes(" ")) {
      newErrors.password = "Mật khẩu không được chứa khoảng trắng";
      valid = false;
    }

    // Kiểm tra xác nhận mật khẩu
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
      valid = false;
    }

    // Kiểm tra đồng ý điều khoản
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "Bạn phải đồng ý với điều khoản sử dụng";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // Loại bỏ khoảng trắng cho username, email và password
    if (name === "username" || name === "email" || name === "password") {
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
        [name]: "",
      });
    }
  };

  const handleCheckboxChange = (e: any) => {
    setFormData({
      ...formData,
      agreeTerms: e.target.checked,
    });

    // Xóa lỗi khi người dùng đánh dấu checkbox
    if (errors.agreeTerms) {
      setErrors({
        ...errors,
        agreeTerms: "",
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      showLoading();
      const response = await register(
        formData.username,
        formData.email,
        formData.password
      );

      success("Đăng ký thành công!");

      setAuth(response.user, response.jwt);
      router.push(APP_ROUTES.HOME);
    } catch (err) {
      console.error(err);
      error("Đăng ký không thành công");
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Tên người dùng
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Nhập tên người dùng..."
            value={formData.username}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 bg-white border ${
              errors.username ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.username && (
            <p className="mt-1 text-xs text-red-500">{errors.username}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 bg-white border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
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

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Xác nhận mật khẩu
          </label>
          <div className="relative mt-1">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`block w-full px-3 py-2 bg-white border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
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
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-start">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={handleCheckboxChange}
              className="h-4 w-4 mt-1 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="agreeTerms"
              className="ml-2 block text-sm text-gray-700"
            >
              Tôi đồng ý với{" "}
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Điều khoản sử dụng
              </a>{" "}
              và{" "}
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Chính sách bảo mật
              </a>
            </label>
          </div>
          {errors.agreeTerms && (
            <p className="mt-1 text-xs text-red-500">{errors.agreeTerms}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          Đăng ký
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-600 flex gap-2 justify-center">
        <span>Đã có tài khoản?</span>
        <Link
          href={APP_ROUTES.LOGIN}
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}
