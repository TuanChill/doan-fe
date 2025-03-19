import { fdAxios } from "@/components/config/axios.config";

export const sendChatMessage = async (sessionId: string,message: string) => {
  const response = await fdAxios.post("/chat", {
    message,
    sessionId,
  });

  return response.data;
};

export const getChatHistory = async (sessionId: string) => {
  const response = await fdAxios.get("/chat/messages", {
    params: { sessionId },
  });
  return response.data;
};

