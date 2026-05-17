import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  CornerDownLeft,
} from "lucide-react";

const STARTERS = [
  "What does Faiz work on at Synup?",
  "Walk me through Promptive AI.",
  "What's the full tech stack?",
  "How do I get in touch?",
];

const INITIAL_GREETING = {
  role: "assistant",
  content:
    "Hey — I'm Faiz's portfolio assistant. Ask me about his work at Synup, his side projects, or his stack.",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_GREETING]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, pending]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || pending) return;

    const next = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setPending(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((m) => m !== INITIAL_GREETING),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "(no reply)" },
      ]);
    } catch (err) {
      setError(
        err.message?.includes("Failed to fetch")
          ? "Can't reach the chat service. Try again in a moment."
          : err.message || "Something went wrong."
      );
    } finally {
      setPending(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      {/* Launcher button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat with Faiz's assistant"}
        aria-expanded={open}
        className={`fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[70] inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#C5F542] border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${
          open ? "rotate-90" : ""
        }`}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-black border-2 border-[#C5F542] rounded-full" />
        )}
      </button>

      {/* Chat panel */}
      <div
        role="dialog"
        aria-label="Chat with Faiz's portfolio assistant"
        aria-hidden={!open}
        className={`fixed z-[65] bottom-24 right-3 left-3 md:left-auto md:right-7 md:bottom-28 md:w-[380px] origin-bottom-right transition-all duration-300 ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-white border-2 border-black rounded-3xl shadow-[6px_6px_0_0_#000] flex flex-col overflow-hidden max-h-[78vh] md:max-h-[560px]">
          {/* Header */}
          <header className="flex items-center justify-between px-5 py-4 border-b-2 border-black bg-[#C5F542]">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-9 h-9 bg-black text-[#C5F542] border-2 border-black rounded-full">
                <Sparkles size={16} />
              </span>
              <div>
                <p className="font-black text-sm leading-tight">Ask Faiz</p>
                <p className="font-mono text-[10px] uppercase tracking-widest font-bold text-black/65">
                  Powered by Gemini
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="inline-flex items-center justify-center w-9 h-9 bg-white border-2 border-black rounded-full hover:bg-black hover:text-[#C5F542] transition-colors"
            >
              <X size={16} />
            </button>
          </header>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#FAFAF7]"
          >
            {messages.map((m, i) => (
              <MessageBubble key={i} role={m.role} content={m.content} />
            ))}

            {pending && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-black rounded-2xl rounded-bl-md px-4 py-3 inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}

            {error && (
              <div className="bg-black text-[#C5F542] border-2 border-black rounded-2xl px-4 py-3 text-xs font-mono">
                {error}
              </div>
            )}

            {messages.length <= 1 && !pending && (
              <div className="pt-1">
                <p className="font-mono text-[10px] uppercase tracking-widest font-bold text-black/55 mb-2">
                  Try asking
                </p>
                <div className="flex flex-wrap gap-2">
                  {STARTERS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="text-left text-xs font-bold text-black bg-white border-2 border-black rounded-full px-3 py-2 hover:bg-[#C5F542] hover:shadow-[2px_2px_0_0_#000] transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 px-3 py-3 border-t-2 border-black bg-white"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask anything…"
              rows={1}
              maxLength={500}
              className="flex-1 resize-none bg-[#FAFAF7] border-2 border-black rounded-2xl px-4 py-2.5 text-sm font-medium placeholder:text-black/40 focus:outline-none focus:bg-white"
            />
            <button
              type="submit"
              disabled={pending || !input.trim()}
              aria-label="Send"
              className="inline-flex items-center justify-center w-11 h-11 bg-[#C5F542] border-2 border-black rounded-full shadow-[3px_3px_0_0_#000] hover:shadow-[1px_1px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-40 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0_0_#000]"
            >
              <Send size={16} />
            </button>
          </form>

          <p className="px-4 py-2 text-[10px] font-mono uppercase tracking-widest font-bold text-black/40 bg-white border-t border-black/10 flex items-center justify-between">
            <span>AI may be inaccurate · verify before trusting</span>
            <CornerDownLeft size={11} />
          </p>
        </div>
      </div>
    </>
  );
}

function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed border-2 border-black ${
          isUser
            ? "bg-[#C5F542] text-black rounded-br-md font-medium"
            : "bg-white text-black rounded-bl-md font-medium"
        }`}
      >
        {content.split("\n").map((line, i) => (
          <p key={i} className={i > 0 ? "mt-1" : ""}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
