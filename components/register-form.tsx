"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
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
  const [apiError, setApiError] = useState("");
  const router = useRouter();

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

  const handleChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setApiError("");

    try {
      // Gọi API đăng ký
      const response = await fetch(
        "http://14.225.211.42/api/auth/local/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Xử lý lỗi từ API
        if (data.error && data.error.message) {
          setApiError(data.error.message);
        } else {
          setApiError("Đăng ký không thành công. Vui lòng thử lại sau.");
        }
        return;
      }

      // Đăng ký thành công
      // Lưu token nếu API trả về
      if (data.jwt) {
        localStorage.setItem("authToken", data.jwt);

        // Lưu thông tin người dùng nếu cần
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      }

      // Hiển thị thông báo thành công
      alert("Đăng ký thành công!");

      // Chuyển hướng đến trang đăng nhập
      router.push("/login");
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
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
            disabled={isLoading}
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
            disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
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
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang xử lý...
            </>
          ) : (
            "Đăng ký"
          )}
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-600">
        Đã có tài khoản?{" "}
        <a
          href="/login"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Đăng nhập
        </a>
      </div>
    </div>
  );
}
