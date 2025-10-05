import { useCallback, useMemo, useState } from "react";

export function useChat(initialMessage = "Hello! How can I help you today?") {
    const [messages, setMessages] = useState(
        initialMessage ? [{ role: "assistant", text: initialMessage }] : []
    );
    const [pending, setPending] = useState(false);

    // Convert UI messages to the backend "history" shape
    const toHistory = useCallback(() => {
        const result = [];
        let cur = {};
        for (const m of messages) {
            if (m.role === "user") {
                if (Object.keys(cur).length) result.push(cur), (cur = {});
                cur.user = m.text;
            } else if (m.role === "assistant") {
                if (!cur.user && Object.keys(cur).length) result.push(cur), (cur = {});
                if (cur.user) {
                    cur.assistant = m.text;
                    result.push(cur);
                    cur = {};
                } else {
                    result.push({ assistant: m.text });
                }
            }
        }
        if (Object.keys(cur).length) result.push(cur);
        return result;
    }, [messages]);

    // Send a user message and get the model reply
    const send = useCallback(async (text) => {
        const content = text.trim();
        if (!content || pending) return;

        // Optimistic UI update
        setMessages((prev) => [...prev, { role: "user", text: content }]);
        setPending(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ history: toHistory(), message: content })
            });
            const data = await res.json();
            const reply = data?.reply ?? "⚠️ Invalid response from server.";
            setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
        } catch (e) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", text: "⚠️ Network or server error." }
            ]);
        } finally {
            setPending(false);
        }
    }, [pending, toHistory]);

    return useMemo(() => ({ messages, pending, send, setMessages }), [messages, pending, send]);
}
