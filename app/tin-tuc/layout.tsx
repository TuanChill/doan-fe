import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin tức | Bảo tàng LSQS Việt Nam",
  description:
    "Trang tin tức và thông báo của Bảo tàng lịch sử quân sự Việt Nam",
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
