import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký | Bảo tàng LSQS Việt Nam",
  description:
    "Trang đăng ký và thông tin về đăng ký của Bảo tàng lịch sử quân sự Việt Nam",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
