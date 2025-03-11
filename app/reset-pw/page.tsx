import ResetPasswordForm from "@/components/rspw-form";

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Đặt lại mật khẩu
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Tạo mật khẩu mới cho tài khoản của bạn
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
