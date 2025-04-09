import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lịch sử | Bảo tàng LSQS Việt Nam",
  description:
    "Trang lịch sử và thông tin về lịch sử của Bảo tàng lịch sử quân sự Việt Nam",
};

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
