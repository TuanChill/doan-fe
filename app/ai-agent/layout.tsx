import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Agent | Bảo tàng LSQS Việt Nam",
  description:
    "Trang AI Agent và thông tin về AI Agent của Bảo tàng lịch sử quân sự Việt Nam",
};

export default function AiAgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
