import LoginForm from "@/components/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Đăng nhập tài khoản
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Đăng nhập vào hệ thống để trải nghiệm tham quan
            {/* <Link
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Bạn chưa có tài khoản?
            </Link> */}
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
