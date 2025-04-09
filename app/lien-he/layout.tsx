import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên hệ | Bảo tàng LSQS Việt Nam",
  description:
    "Liên hệ với chúng tôi để biết thêm thông tin về di tích lịch sử",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
