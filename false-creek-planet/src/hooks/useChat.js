import { useCallback, useMemo, useRef, useState, useEffect } from "react";

export function useChat(initialMessage = "Hello! How can I help you today?") {
    const [messages, setMessages] = useState(
        initialMessage ? [{ role: "assistant", text: initialMessage }] : []
    );
    const [pending, setPending] = useState(false);
    const abortRef = useRef(null);

    const MAX_TURNS = 10; // keep last N user/assistant pairs

    // Build backend "history" array from UI messages
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

        // keep last N exchanges to reduce tokens
        return result.slice(-MAX_TURNS);
    }, [messages]);

    const send = useCallback(
        async (text) => {
            const content = (text ?? "").trim();
            if (!content || pending) return;

            // take a snapshot of history BEFORE optimistic UI update
            const historySnapshot = toHistory();

            // optimistic UI
            setMessages((prev) => [...prev, { role: "user", text: content }]);
            setPending(true);

            // cancel any in-flight request
            if (abortRef.current) abortRef.current.abort();
            const controller = new AbortController();
            abortRef.current = controller;

            try {
                const res = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ history: historySnapshot, message: content }),
                    signal: controller.signal,
                });

                // handle non-2xx and non-JSON responses robustly
                const textBody = await res.text();
                if (!res.ok) {
                    throw new Error(textBody || `HTTP ${res.status}`);
                }

                let data;
                try {
                    data = textBody ? JSON.parse(textBody) : {};
                } catch {
                    throw new Error("Invalid JSON response");
                }

                const reply = data?.reply ?? "⚠️ Invalid response from server.";
                setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
            } catch (e) {
                if (e.name === "AbortError") return; // request was cancelled
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", text: `⚠️ ${e.message || "Network error."}` },
                ]);
            } finally {
                setPending(false);
                if (abortRef.current === controller) abortRef.current = null;
            }
        },
        [pending, toHistory]
    );

    const cancel = useCallback(() => {
        if (abortRef.current) abortRef.current.abort();
    }, []);

    const reset = useCallback(() => {
        cancel();
        setMessages(initialMessage ? [{ role: "assistant", text: initialMessage }] : []);
        setPending(false);
    }, [cancel, initialMessage]);

    useEffect(() => {
        return () => {
            if (abortRef.current) abortRef.current.abort();
        };
    }, []);

    return useMemo(
        () => ({ messages, pending, send, setMessages, cancel, reset }),
        [messages, pending, send, cancel, reset]
    );
}
