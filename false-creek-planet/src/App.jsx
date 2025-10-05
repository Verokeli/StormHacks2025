// src/App.jsx
import React, { useState } from "react";
import Scene from "./pages/Scene.jsx";
import ChatPage from "./pages/Chat.jsx"; // temporary chat page
import "./styles/scene.css";

export default function App() {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      {/* Minimal floating toggle to avoid layout conflicts */}
      <div
        style={{
          position: "fixed",
          top: 12,
          right: 12,
          zIndex: 1000,
          pointerEvents: "auto"
        }}
      >
        <button
          type="button"
          onClick={() => setShowChat((v) => !v)}
          aria-pressed={showChat}
          aria-label={showChat ? "Close chat" : "Open chat"}
          style={{
            border: 0,
            borderRadius: 12,
            padding: "8px 12px",
            fontWeight: 700,
            cursor: "pointer",
            background: "#3a56d4",
            color: "#fff",
            boxShadow: "0 6px 14px rgba(0,0,0,.25)"
          }}
        >
          {showChat ? "← Back to Scene" : "💬 Open Chat"}
        </button>
      </div>

      {/* Render either Scene or Chat without touching existing Scene layout */}
      {showChat ? <ChatPage /> : <Scene />}
    </>
  );
}
