import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập | Bảo tàng LSQS Việt Nam",
  description:
    "Trang đăng nhập và thông tin về đăng nhập của Bảo tàng lịch sử quân sự Việt Nam",
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
