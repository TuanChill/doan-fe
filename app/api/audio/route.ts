import { NextResponse } from "next/server"

export async function GET() {
  // Trong thực tế, bạn sẽ lấy URL audio từ database hoặc storage
  return NextResponse.json({
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    title: "Lịch Sử Bảo Tàng Quân Sự Việt Nam",
  })
}

