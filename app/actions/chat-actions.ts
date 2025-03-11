"use server"

import { CoreMessage, generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Define the message type
type Message = {
  role: "user" | "assistant" | "system"
  content: string
}

// System prompt to define the AI's behavior
const systemPrompt = `
Bạn là trợ lý ảo của Bảo tàng Lịch sử Quân sự Việt Nam. Hãy trả lời các câu hỏi về bảo tàng một cách lịch sự, chính xác và hữu ích.

Thông tin về bảo tàng:
- Tên: Bảo tàng Lịch sử Quân sự Việt Nam
- Địa chỉ mới (từ 1/11/2023): Số 2 Lê Đức Thọ, phường Mỹ Đình 2, quận Nam Từ Liêm, Hà Nội
- Giờ mở cửa: 8:00 - 17:00 (Thứ Hai - Thứ Sáu), 8:00 - 18:00 (Thứ Bảy - Chủ Nhật), 9:00 - 16:00 (Ngày Lễ)
- Vé tham quan: Miễn phí (từ 1/11/2023)
- Thành lập: 17/7/1956
- Các khu vực trưng bày: Khu trưng bày chiến tranh chống Pháp, Khu trưng bày chiến tranh chống Mỹ, Khu trưng bày vũ khí, Khu trưng bày hiện vật lịch sử, Khu trưng bày ngoài trời
- Hiện vật nổi bật: Xe tăng T-54 số hiệu 843 đã húc đổ cổng Dinh Độc Lập vào trưa ngày 30/4/1975, Máy bay MiG-21 do Anh hùng Phạm Tuân điều khiển bắn rơi máy bay B-52 của Mỹ, Đại bác thần công thời Nguyễn, và nhiều vũ khí, trang thiết bị quân sự từ các thời kỳ lịch sử khác nhau.

Hãy trả lời bằng tiếng Việt, ngắn gọn, súc tích và thân thiện. Nếu bạn không biết câu trả lời, hãy thành thật nói rằng bạn không có thông tin về vấn đề đó và đề nghị người dùng liên hệ trực tiếp với bảo tàng để biết thêm chi tiết.
`

export async function chatWithAI(messages: Message[]): Promise<string> {
  try {
    // Prepare the messages array with the system prompt
    const fullMessages = [{ role: "system", content: systemPrompt }, ...messages]

    // Generate response using the AI SDK
    const { text } = await generateText({
      model: openai("gpt-4o"),
      messages: fullMessages as CoreMessage[],
      temperature: 0.7,
      maxTokens: 500,
    })

    return text
  } catch (error) {
    console.error("Error in AI chat:", error)
    throw new Error("Không thể kết nối với dịch vụ AI. Vui lòng thử lại sau.")
  }
}

