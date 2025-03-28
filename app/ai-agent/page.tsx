"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MessageSquareText,
  Send,
  ThumbsUp,
  ThumbsDown,
  Bot,
  Mic,
  Volume2,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Loading } from "@/components/common/loading";
import { sendChatMessage, getChatHistory } from "@/request/chat";
import { useSessionStore } from "@/stores/user-store";
import { v4 as uuidv4 } from "uuid";

// Inline AnimatedSection component to avoid import issues
interface AnimatedSectionProps {
  children: ReactNode;
  animation?: "fadeUp" | "fadeIn" | "slideIn";
  className?: string;
}

function AnimatedSection({
  children,
  animation = "fadeIn",
  className,
}: AnimatedSectionProps) {
  const getAnimationClass = () => {
    switch (animation) {
      case "fadeUp":
        return "animate-fadeUp";
      case "slideIn":
        return "animate-slideIn";
      case "fadeIn":
      default:
        return "animate-fadeIn";
    }
  };

  return <div className={cn(getAnimationClass(), className)}>{children}</div>;
}

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: string; // String timestamp to avoid hydration issues
  isSpeaking?: boolean;
};

const SUGGESTED_QUESTIONS = [
  "Bảo tàng có những khu vực trưng bày nào?",
  "Giờ mở cửa của bảo tàng là khi nào?",
  "Có những hiện vật nổi bật nào trong bảo tàng?",
  "Lịch sử hình thành của bảo tàng?",
  "Làm thế nào để đến bảo tàng bằng phương tiện công cộng?",
];

// Format date consistently to avoid hydration issues
const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function AIAgentPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { sessionId, setSessionId } = useSessionStore();

  // Initial message with string timestamp instead of Date object
  const initialMessage = {
    role: "assistant" as const,
    content:
      "Xin chào! Tôi là trợ lý ảo của Bảo tàng Lịch sử Quân sự Việt Nam. Tôi có thể giúp gì cho bạn?",
    timestamp: formatTime(new Date()),
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [isListening, setIsListening] = useState(false);
  const [currentSpeakingIndex, setCurrentSpeakingIndex] = useState<
    number | null
  >(null);
  const recognitionRef = useRef<any>(null);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(false);

  // Client-side only code
  useEffect(() => {
    setIsMounted(true);

    // Check for speech recognition support
    const hasSpeechRecognition =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    setHasSpeechSupport(!!hasSpeechRecognition);

    // Initialize speech recognition only on client
    if (hasSpeechRecognition) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "vi-VN";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };
    }

    // Get chat history
    handleGetChatHistory();

    // Clean up speech synthesis on unmount
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current && isMounted) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, isMounted]);

  // Toggle speech recognition
  const toggleListening = () => {
    if (!hasSpeechSupport || !isMounted) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (error) {
        console.error("Error starting speech recognition:", error);
      }
    }
  };

  // Improved language detection
  const detectLanguage = (text: string): "vi" | "en" => {
    // Vietnamese specific characters
    const vietnamesePattern =
      /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/gi;

    // Common Vietnamese words that would indicate Vietnamese text
    const vietnameseWords =
      /\b(của|và|hoặc|những|các|trong|với|là|có|không|được|tôi|bạn|chúng|họ|nó|này|khi|nếu|vì|từ|đến|về|theo|cùng|cho|tại|trên|dưới)\b/gi;

    // Count Vietnamese characters
    const matches = text.match(vietnamesePattern) || [];
    const vietnameseCharCount = matches.length;

    // Check for Vietnamese words
    const wordMatches = text.match(vietnameseWords) || [];
    const vietnameseWordCount = wordMatches.length;

    // Calculate text length without spaces
    const textLength = text.replace(/\s/g, "").length;

    // If more than 10% of characters are Vietnamese or there are multiple Vietnamese words, consider it Vietnamese
    if (
      vietnameseCharCount > 0 &&
      (vietnameseCharCount / textLength > 0.1 || vietnameseWordCount >= 2)
    ) {
      return "vi";
    }

    // Check for common English words to confirm it's English
    const englishWords =
      /\b(the|and|or|of|to|in|is|are|that|this|with|for|on|at|by|from|an|as|it|was|be|have|has|had|will|would|should|could|can|may|might)\b/gi;
    const englishWordMatches = text.match(englishWords) || [];

    // If there are English words and very few Vietnamese characters, it's likely English
    if (
      englishWordMatches.length > 0 &&
      vietnameseCharCount / textLength < 0.1
    ) {
      return "en";
    }

    // Default to English if we can't determine
    return "en";
  };

  // Text to speech function for a specific message
  const speakMessage = (text: string, index: number) => {
    if (
      !isMounted ||
      typeof window === "undefined" ||
      !("speechSynthesis" in window)
    )
      return;

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    // If this message is already speaking, just stop it
    if (currentSpeakingIndex === index) {
      setCurrentSpeakingIndex(null);
      return;
    }

    // Detect language
    const language = detectLanguage(text);

    const utterance = new SpeechSynthesisUtterance(text);

    // Set language based on detected language
    if (language === "vi") {
      utterance.lang = "vi-VN";
    } else {
      utterance.lang = "en-US";
    }

    // Find appropriate voice based on detected language
    const voices = window.speechSynthesis.getVoices();
    if (language === "vi") {
      const vietnameseVoice = voices.find((voice) => voice.lang.includes("vi"));
      if (vietnameseVoice) {
        utterance.voice = vietnameseVoice;
      }
    } else {
      const englishVoice = voices.find((voice) => voice.lang.includes("en"));
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
    }

    utterance.onstart = () => {
      setCurrentSpeakingIndex(index);
    };

    utterance.onend = () => {
      setCurrentSpeakingIndex(null);
    };

    utterance.onerror = () => {
      setCurrentSpeakingIndex(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !isMounted) return;

    // Add user message with string timestamp
    const userMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: formatTime(new Date()),
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

      const responseText =
        aiResponse || "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.";

      // Add AI response to messages with string timestamp
      const newMessage = {
        role: "assistant" as const,
        content: responseText,
        timestamp: formatTime(new Date()),
      };

      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);

      // Add error message with string timestamp
      const errorMessage = "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
          timestamp: formatTime(new Date()),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    if (!isMounted) return;
    setInputValue(question);
  };

  const handleGetChatHistory = async () => {
    if (!isMounted) return;

    // Ensure we have a sessionId before making the API call
    let currentSessionId = sessionId;
    if (!currentSessionId) {
      currentSessionId = uuidv4();
      setSessionId(currentSessionId);
    }
    try {
      const chatHistory = await getChatHistory(currentSessionId);

      if (chatHistory.length > 0) {
        // Convert Date objects to strings for hydration safety
        const formattedHistory = chatHistory.map(
          (msg: { timestamp: string | number | Date }) => ({
            ...msg,
            timestamp:
              typeof msg.timestamp === "string"
                ? msg.timestamp
                : formatTime(new Date(msg.timestamp)),
          })
        );
        setMessages(formattedHistory);
      }
    } catch (error) {
      console.error("Error getting chat history:", error);
    }
  };

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
                              : "bg-white border border-gray-200",
                            currentSpeakingIndex === index
                              ? "border-green-500 border-2"
                              : ""
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
                            {message.timestamp}
                          </div>

                          <div className="flex items-center mt-2 space-x-2">
                            {message.role === "assistant" && (
                              <>
                                <button className="text-gray-500 hover:text-blue-600">
                                  <ThumbsUp className="h-4 w-4" />
                                </button>
                                <button className="text-gray-500 hover:text-red-600">
                                  <ThumbsDown className="h-4 w-4" />
                                </button>
                              </>
                            )}
                            <button
                              className={cn(
                                "ml-auto text-gray-500 hover:text-green-600",
                                currentSpeakingIndex === index
                                  ? "text-green-600"
                                  : ""
                              )}
                              onClick={() =>
                                speakMessage(message.content, index)
                              }
                              title={
                                currentSpeakingIndex === index
                                  ? "Dừng đọc"
                                  : "Đọc tin nhắn này"
                              }
                            >
                              <Volume2 className="h-4 w-4" />
                            </button>
                          </div>
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
                      {hasSpeechSupport && (
                        <Button
                          onClick={toggleListening}
                          className={`px-3 ${
                            isListening
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-gray-600 hover:bg-gray-700"
                          }`}
                          type="button"
                          title={
                            isListening ? "Dừng ghi âm" : "Ghi âm giọng nói"
                          }
                        >
                          <Mic
                            className={`h-5 w-5 ${
                              isListening ? "animate-pulse" : ""
                            }`}
                          />
                        </Button>
                      )}
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

                {/* Suggested Questions */}
                <Card className="shadow-md mt-4">
                  <div className="p-4">
                    <h3 className="font-bold mb-2 flex items-center">
                      <Mic className="h-5 w-5 mr-2 text-blue-600" />
                      Hướng dẫn sử dụng
                    </h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <Mic className="h-4 w-4 mr-2 mt-0.5 text-gray-600" />
                        <span>Nhấn nút mic để nói câu hỏi của bạn</span>
                      </li>
                      <li className="flex items-start">
                        <Send className="h-4 w-4 mr-2 mt-0.5 text-gray-600" />
                        <span>Nhấn nút gửi để gửi câu hỏi</span>
                      </li>
                      <li className="flex items-start">
                        <Volume2 className="h-4 w-4 mr-2 mt-0.5 text-gray-600" />
                        <span>
                          Nhấn nút loa ở mỗi tin nhắn để nghe nội dung
                        </span>
                      </li>
                    </ul>
                  </div>
                </Card>

                {/* Suggested Questions */}
                <Card className="shadow-md mt-4">
                  <div className="p-4">
                    <h3 className="font-bold mb-2 flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2 text-blue-600" />
                      Câu hỏi gợi ý
                    </h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                      {SUGGESTED_QUESTIONS.map((question, index) => (
                        <li key={index}>
                          <button
                            onClick={() => handleSuggestedQuestion(question)}
                            className="text-left hover:text-blue-600 transition-colors"
                          >
                            {question}
                          </button>
                        </li>
                      ))}
                    </ul>
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
