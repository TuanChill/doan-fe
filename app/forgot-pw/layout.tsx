import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quên mật khẩu | Bảo tàng LSQS Việt Nam",
  description:
    "Trang quên mật khẩu và hướng dẫn đặt lại mật khẩu của Bảo tàng lịch sử quân sự Việt Nam",
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
