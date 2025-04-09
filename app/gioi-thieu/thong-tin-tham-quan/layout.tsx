import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thông tin tham quan | Bảo tàng LSQS Việt Nam",
  description:
    "Trang thông tin tham quan và hướng dẫn tham quan của Bảo tàng lịch sử quân sự Việt Nam",
};

export default function VisitInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
