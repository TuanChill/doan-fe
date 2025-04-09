import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mua vé | Bảo tàng LSQS Việt Nam",
  description:
    "Trang mua vé và thông tin về giá vé của Bảo tàng lịch sử quân sự Việt Nam",
};

export default function BuyTicketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
