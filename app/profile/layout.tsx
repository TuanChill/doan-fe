import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tài khoản | Bảo tàng LSQS Việt Nam",
  description:
    "Trang tài khoản và thông tin về tài khoản của Bảo tàng lịch sử quân sự Việt Nam",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
