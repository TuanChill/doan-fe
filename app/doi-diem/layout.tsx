import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đổi điểm | Bảo tàng LSQS Việt Nam",
  description:
    "Trang đổi điểm và thông tin về điểm của Bảo tàng lịch sử quân sự Việt Nam",
};

export default function ChangePointLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
