"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MessageSquareText,
  Send,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
} from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const SUGGESTED_QUESTIONS = [
  "Bảo tàng có những khu vực trưng bày nào?",
  "Giờ mở cửa của bảo tàng là khi nào?",
  "Có những hiện vật nổi bật nào trong bảo tàng?",
  "Lịch sử hình thành của bảo tàng?",
  "Làm thế nào để đến bảo tàng bằng phương tiện công cộng?",
];

export default function AIAgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Xin chào! Tôi là trợ lý ảo của Bảo tàng Lịch sử Quân sự Việt Nam. Tôi có thể giúp gì cho bạn?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: getSimulatedResponse(inputValue),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    handleSendMessage();
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">AI Hỏi Đáp</h1>
            <p className="text-xl">
              Trò chuyện với trợ lý ảo thông minh của Bảo tàng Lịch sử Quân sự
              Việt Nam
            </p>
          </div>
        </div>
      </section>

      {/* Chat Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Main Chat */}
              <div className="md:w-3/4">
                <Card className="shadow-lg">
                  {/* Chat Header */}
                  <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center">
                    <MessageSquareText className="h-6 w-6 mr-2" />
                    <h2 className="text-lg font-bold">Trợ lý ảo Bảo tàng</h2>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 h-[500px] overflow-y-auto flex flex-col space-y-4 bg-gray-50">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.role === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-white border border-gray-200"
                          }`}
                        >
                          <p>{message.content}</p>
                          <div
                            className={`text-xs mt-1 ${
                              message.role === "user"
                                ? "text-blue-100"
                                : "text-gray-500"
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>

                          {message.role === "assistant" && (
                            <div className="flex items-center mt-2 space-x-2">
                              <button className="text-gray-500 hover:text-blue-600">
                                <ThumbsUp className="h-4 w-4" />
                              </button>
                              <button className="text-gray-500 hover:text-red-600">
                                <ThumbsDown className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 p-3 rounded-lg max-w-[80%]">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
                            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce delay-100"></div>
                            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce delay-200"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t">
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                        placeholder="Nhập câu hỏi của bạn..."
                        className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isLoading}
                        className="bg-blue-600 hover:bg-blue-700 rounded-l-none"
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="md:w-1/4">
                {/* Suggested Questions */}
                <Card className="shadow-md mb-6">
                  <div className="p-4 border-b">
                    <h3 className="font-bold flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                      Câu hỏi gợi ý
                    </h3>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-2">
                      {SUGGESTED_QUESTIONS.map((question, index) => (
                        <li key={index}>
                          <button
                            onClick={() => handleSuggestedQuestion(question)}
                            className="text-left text-blue-600 hover:text-blue-800 hover:underline w-full"
                          >
                            {question}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>

                {/* Info Card */}
                <Card className="shadow-md bg-blue-50">
                  <div className="p-4">
                    <h3 className="font-bold mb-2">Về trợ lý ảo</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Trợ lý ảo của Bảo tàng Lịch sử Quân sự Việt Nam được phát
                      triển để cung cấp thông tin chính xác về bảo tàng, hiện
                      vật và lịch sử quân sự Việt Nam.
                    </p>
                    <p className="text-sm text-gray-700">
                      Trợ lý có thể trả lời các câu hỏi về giờ mở cửa, giá vé,
                      các khu vực trưng bày, và thông tin chi tiết về các hiện
                      vật trong bảo tàng.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper function to simulate AI responses
function getSimulatedResponse(question: string): string {
  const lowerQuestion = question.toLowerCase();

  if (
    lowerQuestion.includes("khu vực") ||
    lowerQuestion.includes("trưng bày")
  ) {
    return "Bảo tàng có nhiều khu vực trưng bày khác nhau, bao gồm: Khu trưng bày về chiến tranh chống Pháp, Khu trưng bày về chiến tranh chống Mỹ, Khu trưng bày vũ khí, Khu trưng bày hiện vật lịch sử, và Khu trưng bày ngoài trời với nhiều vũ khí, phương ti��n quân sự lớn.";
  }

  if (lowerQuestion.includes("giờ") || lowerQuestion.includes("mở cửa")) {
    return "Bảo tàng mở cửa từ 8:00 đến 17:00 từ Thứ Hai đến Thứ Sáu, 8:00 đến 18:00 vào Thứ Bảy và Chủ Nhật, và 9:00 đến 16:00 vào các ngày lễ. Bảo tàng đóng cửa vào một số ngày lễ đặc biệt, vui lòng kiểm tra trang web chính thức để biết thông tin cập nhật nhất.";
  }

  if (lowerQuestion.includes("hiện vật") || lowerQuestion.includes("nổi bật")) {
    return "Một số hiện vật nổi bật tại bảo tàng bao gồm: Xe tăng T-54 đầu tiên tiến vào Dinh Độc Lập ngày 30/4/1975, máy bay MiG-21 của Anh hùng Phạm Tuân, đại bác thần công thời Nguyễn, và nhiều vũ khí, trang thiết bị quân sự từ các thời kỳ lịch sử khác nhau.";
  }

  if (
    lowerQuestion.includes("lịch sử") ||
    lowerQuestion.includes("hình thành")
  ) {
    return "Bảo tàng Lịch sử Quân sự Việt Nam được thành lập ngày 17/7/1956, là một trong những bảo tàng đầu tiên của Việt Nam. Ban đầu, bảo tàng có tên là Bảo tàng Quân đội, sau đó đổi tên thành Bảo tàng Lịch sử Quân sự Việt Nam vào năm 2002. Bảo tàng hiện đang lưu giữ và trưng bày hơn 15.000 hiện vật, tài liệu quý giá về lịch sử quân sự của dân tộc Việt Nam.";
  }

  if (lowerQuestion.includes("đến") || lowerQuestion.includes("phương tiện")) {
    return "Bảo tàng nằm tại địa chỉ 28A Điện Biên Phủ, Ba Đình, Hà Nội. Bạn có thể đến bảo tàng bằng nhiều phương tiện công cộng như xe buýt (các tuyến 09, 22, 45 đều có điểm dừng gần bảo tàng). Nếu đi bằng taxi hoặc xe riêng, bạn có thể dễ dàng tìm thấy bảo tàng gần Lăng Chủ tịch Hồ Chí Minh và Quảng trường Ba Đình.";
  }

  if (lowerQuestion.includes("vé") || lowerQuestion.includes("giá")) {
    return "Giá vé tham quan bảo tàng như sau: Vé thường: 30.000 VNĐ/người, Vé VIP (có hướng dẫn viên riêng): 50.000 VNĐ/người, Vé đoàn (từ 20 người trở lên): 25.000 VNĐ/người. Trẻ em dưới 6 tuổi, người cao tuổi trên 70 tuổi, và thương binh được miễn phí vé vào cửa.";
  }

  return "Cảm ơn câu hỏi của bạn. Tôi là trợ lý ảo của Bảo tàng Lịch sử Quân sự Việt Nam. Tôi có thể cung cấp thông tin về giờ mở cửa, giá vé, các khu vực trưng bày, và thông tin chi tiết về các hiện vật trong bảo tàng. Bạn có thể hỏi tôi bất kỳ câu hỏi nào liên quan đến bảo tàng.";
}
