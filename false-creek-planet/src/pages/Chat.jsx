import React from "react";
import { useChat } from "../hooks/useChat.js";
import ChatUI from "../components/ChatUI.jsx";

export default function ChatPage() {
    const { messages, pending, send } = useChat();
    return <ChatUI messages={messages} pending={pending} onSend={send} title="Gemini Chat" />;
}
