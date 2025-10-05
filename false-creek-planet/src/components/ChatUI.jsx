import React, { useEffect, useRef, useState } from "react";

/**
 * Presentational chat UI. It does not call the API itself.
 * It receives: messages, pending, onSend(text)
 */
export default function ChatUI({ messages, pending, onSend, title = "Gemini Chat" }) {
    const [input, setInput] = useState("");
    const listRef = useRef(null);

    // Auto-scroll on new messages
    useEffect(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }, [messages, pending]);

    const send = () => {
        const text = input.trim();
        if (!text || pending) return;
        onSend(text);
        setInput("");
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h2 style={{ margin: 0 }}>{title}</h2>
            </div>

            <div ref={listRef} style={styles.list}>
                {messages.map((m, i) => (
                    <div
                        key={i}
                        style={{
                            ...styles.bubble,
                            ...(m.role === "user" ? styles.user : styles.assistant)
                        }}
                    >
                        {m.text}
                    </div>
                ))}
                {pending && <div style={{ ...styles.bubble, ...styles.assistant }}>…thinking</div>}
            </div>

            <div style={styles.inputRow}>
                <textarea
                    style={styles.textarea}
                    placeholder="Type a message… (Shift+Enter for new line)"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    disabled={pending}
                />
                <button onClick={send} disabled={pending} style={styles.button}>
                    Send
                </button>
            </div>
            <div style={styles.hint}>* Do not share personal or sensitive information.</div>
        </div>
    );
}

const styles = {
    page: {
        maxWidth: 880,
        margin: "0 auto",
        padding: 16,
        color: "#e7ecff",
        fontFamily: "system-ui, Segoe UI, Arial",
        background: "transparent" // keep transparent so it can overlay a Scene
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12
    },
    list: {
        background: "#111935",
        borderRadius: 16,
        padding: 12,
        height: "50vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        boxShadow: "0 0 0 1px #1c2a57 inset"
    },
    bubble: {
        maxWidth: "78%",
        padding: "10px 12px",
        borderRadius: 12,
        lineHeight: 1.45,
        whiteSpace: "pre-wrap"
    },
    user: { alignSelf: "flex-end", background: "#2b3658" },
    assistant: { alignSelf: "flex-start", background: "#1a2547" },
    inputRow: { display: "flex", gap: 8, marginTop: 12 },
    textarea: {
        flex: 1,
        minHeight: 56,
        resize: "vertical",
        borderRadius: 10,
        padding: 10,
        border: "1px solid #263258",
        background: "#14203c",
        color: "#e7ecff"
    },
    button: {
        border: 0,
        borderRadius: 10,
        padding: "0 18px",
        fontWeight: 700,
        background: "#3a56d4",
        color: "white",
        cursor: "pointer"
    },
    hint: { marginTop: 8, fontSize: 12, color: "#91a3c7" }
};
