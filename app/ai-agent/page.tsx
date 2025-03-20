"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MessageSquareText,
  Send,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedSection from "@/components/ui/animated-section";
import { Loading } from "@/components/common/loading";
import { sendChatMessage, getChatHistory } from "@/request/chat";
import { useSessionStore } from "@/stores/user-store";
import { v4 as uuidv4 } from "uuid";

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
  const [isMounted, setIsMounted] = useState(false);

  const { sessionId, setSessionId } = useSessionStore();

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
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

    try {
      // Ensure we have a sessionId before making the API call
      let currentSessionId = sessionId;
      if (!currentSessionId) {
        currentSessionId = uuidv4();
        setSessionId(currentSessionId);
      }

      // Get all previous messages in the format expected by the API
      const messageHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Add the new user message
      messageHistory.push({
        role: "user",
        content: userMessage.content,
      });

      // Call the AI service with the guaranteed sessionId
      const aiResponse = await sendChatMessage(
        currentSessionId,
        userMessage.content
      );

      // Add AI response to messages
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            aiResponse || "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error getting AI response:", error);

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  const handleGetChatHistory = async () => {
    // Ensure we have a sessionId before making the API call
    let currentSessionId = sessionId;
    if (!currentSessionId) {
      currentSessionId = uuidv4();
      setSessionId(currentSessionId);
    }
    try {
      const chatHistory = await getChatHistory(currentSessionId);

      if (chatHistory.length > 0) {
        setMessages(chatHistory);
      }
    } catch (error) {
      console.error("Error getting chat history:", error);
    }
  };

  useEffect(() => {
    handleGetChatHistory();
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <Loading />;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection animation="fadeUp">
              <h1 className="text-4xl font-bold mb-4">AI Hỏi Đáp</h1>
              <p className="text-xl">
                Trò chuyện với trợ lý ảo thông minh của Bảo tàng Lịch sử Quân sự
                Việt Nam
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Chat Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
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
                  <div
                    ref={chatContainerRef}
                    className="custom-scrollbar p-4 h-[500px] overflow-y-auto flex flex-col space-y-4 bg-gray-50"
                  >
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
                          className={cn(
                            "max-w-[80%] p-3 rounded-lg",
                            message.role === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-white border border-gray-200"
                          )}
                        >
                          <p>{message.content}</p>
                          <div
                            className={cn(
                              "text-xs mt-1",
                              message.role === "user"
                                ? "text-blue-100"
                                : "text-gray-500"
                            )}
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

                    <div ref={messagesEndRef} />
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
                {/* Info Card */}
                <Card className="shadow-md bg-blue-50">
                  <div className="p-4">
                    <h3 className="font-bold mb-2 flex items-center">
                      <Bot className="h-5 w-5 mr-2 text-blue-600" />
                      Về trợ lý ảo
                    </h3>
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
