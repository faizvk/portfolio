import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Trash2,
  Copy,
  Check,
} from "lucide-react";

const STARTERS = [
  "What does Faiz work on at Synup?",
  "Walk me through Promptive AI.",
  "What's the full tech stack?",
  "How do I get in touch?",
];

const FOLLOWUP_POOL = {
  synup: [
    "What's the tech stack at Synup?",
    "Show me a project case study.",
    "How do I contact him?",
  ],
  project: [
    "What other projects has Faiz built?",
    "Show me the live demo.",
    "Where's the source code?",
  ],
  stack: [
    "Tell me about his Synup work.",
    "Show me his projects.",
    "Where's his resume?",
  ],
  contact: [
    "Where's his GitHub?",
    "What's his LinkedIn?",
    "Show me his resume.",
  ],
  resume: [
    "What's his current role?",
    "Show me his best project.",
    "How do I contact him?",
  ],
  default: [
    "Tell me about Synup.",
    "Show me his projects.",
    "Where's his resume?",
  ],
};

function pickFollowups(lastUser) {
  if (!lastUser) return FOLLOWUP_POOL.default;
  const t = lastUser.toLowerCase();
  if (/synup|work|job|role|company|experience/.test(t)) return FOLLOWUP_POOL.synup;
  if (/project|nexkart|promptive|jobpilot|smartchain|build/.test(t))
    return FOLLOWUP_POOL.project;
  if (/stack|tech|language|framework|tool|skill/.test(t))
    return FOLLOWUP_POOL.stack;
  if (/contact|email|reach|hire|recruit/.test(t)) return FOLLOWUP_POOL.contact;
  if (/resume|cv/.test(t)) return FOLLOWUP_POOL.resume;
  return FOLLOWUP_POOL.default;
}

const INITIAL_GREETING = {
  role: "assistant",
  content:
    "Hey — I'm Faiz's portfolio assistant. Ask me about his work at Synup, his side projects, or his stack.",
};

const STORAGE_KEY = "fz-chat-history-v1";

function loadHistory() {
  if (typeof window === "undefined") return [INITIAL_GREETING];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [INITIAL_GREETING];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return [INITIAL_GREETING];
    return parsed;
  } catch {
    return [INITIAL_GREETING];
  }
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(loadHistory);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore quota / private-mode errors
    }
  }, [messages]);

  // Auto-scroll on new messages or typing
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, pending]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const clear = () => {
    setMessages([INITIAL_GREETING]);
    setError(null);
  };

  const send = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || pending) return;

    const userMsg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setPending(true);
    setError(null);

    // Add a placeholder bot message that we'll stream into
    const botIndex = next.length;
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      // Exclude the greeting from what we send upstream
      const payload = next.filter((m) => m !== INITIAL_GREETING);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });

      // Error path — try to parse JSON error envelope from server
      if (!res.ok) {
        let errMsg = `Request failed (${res.status})`;
        try {
          const data = await res.json();
          const detail = data?.detail ? ` — ${data.detail}` : "";
          errMsg = `${data?.error || errMsg}${detail}`;
        } catch {
          // body wasn't JSON; keep the generic message
        }
        throw new Error(errMsg);
      }

      // Success path — stream if possible, fall back to text otherwise
      let acc = "";
      if (res.body && typeof res.body.getReader === "function") {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const copy = [...prev];
            copy[botIndex] = { role: "assistant", content: acc };
            return copy;
          });
        }
      } else {
        acc = await res.text();
        setMessages((prev) => {
          const copy = [...prev];
          copy[botIndex] = { role: "assistant", content: acc };
          return copy;
        });
      }

      if (!acc.trim()) {
        setMessages((prev) => {
          const copy = [...prev];
          copy[botIndex] = {
            role: "assistant",
            content: "Sorry — I couldn't generate a response. Try rephrasing?",
          };
          return copy;
        });
      }
    } catch (err) {
      setMessages((prev) => prev.slice(0, botIndex)); // drop empty bubble
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

  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
  const lastMsg = messages[messages.length - 1];
  const showFollowups =
    !pending &&
    !error &&
    messages.length > 1 &&
    lastMsg?.role === "assistant" &&
    lastMsg.content.trim().length > 0;

  return (
    <>
      {/* Launcher */}
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

      {/* Panel */}
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
            <div className="flex items-center gap-2">
              {messages.length > 1 && (
                <button
                  type="button"
                  onClick={clear}
                  aria-label="Clear conversation"
                  title="Clear conversation"
                  className="inline-flex items-center justify-center w-9 h-9 bg-white border-2 border-black rounded-full hover:bg-black hover:text-[#C5F542] transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="inline-flex items-center justify-center w-9 h-9 bg-white border-2 border-black rounded-full hover:bg-black hover:text-[#C5F542] transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </header>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#FAFAF7]"
          >
            {messages.map((m, i) => (
              <MessageBubble key={i} role={m.role} content={m.content} />
            ))}

            {pending && lastMsg?.role === "assistant" && !lastMsg.content && (
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

            {/* Starter chips (greeting state) */}
            {messages.length <= 1 && !pending && (
              <div className="pt-1">
                <p className="font-mono text-[10px] uppercase tracking-widest font-bold text-black/55 mb-2">
                  Try asking
                </p>
                <div className="flex flex-wrap gap-2">
                  {STARTERS.map((q) => (
                    <SuggestionChip key={q} onClick={() => send(q)}>
                      {q}
                    </SuggestionChip>
                  ))}
                </div>
              </div>
            )}

            {/* Follow-up chips (after each bot reply) */}
            {showFollowups && (
              <div className="pt-1">
                <p className="font-mono text-[10px] uppercase tracking-widest font-bold text-black/55 mb-2">
                  Follow up
                </p>
                <div className="flex flex-wrap gap-2">
                  {pickFollowups(lastUserMsg?.content).map((q) => (
                    <SuggestionChip key={q} onClick={() => send(q)}>
                      {q}
                    </SuggestionChip>
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

          <p className="px-4 py-2 text-[10px] font-mono uppercase tracking-widest font-bold text-black/40 bg-white border-t border-black/10">
            AI may be inaccurate · verify before trusting
          </p>
        </div>
      </div>
    </>
  );
}

function SuggestionChip({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left text-xs font-bold text-black bg-white border-2 border-black rounded-full px-3 py-2 hover:bg-[#C5F542] hover:shadow-[2px_2px_0_0_#000] transition-all"
    >
      {children}
    </button>
  );
}

function MessageBubble({ role, content }) {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);
  const lines = content.split("\n");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={`group flex ${isUser ? "justify-end" : "justify-start"} relative`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed border-2 border-black ${
          isUser
            ? "bg-[#C5F542] text-black rounded-br-md font-medium"
            : "bg-white text-black rounded-bl-md font-medium"
        }`}
      >
        {lines.map((line, i) => {
          // Accept any of: "- foo", "* foo", "• foo" as a bullet.
          // Important: must NOT match `**foo**` (bold) which also starts with `*`.
          const bulletMatch = line.match(/^\s*(?:[-•]|\*(?!\*))\s+(.*)/);
          if (bulletMatch) {
            return (
              <div
                key={i}
                className="flex items-start gap-2 mt-1.5 first:mt-0"
              >
                <span className="text-[#9BC91F] font-black select-none">
                  ›
                </span>
                <span>{renderInline(bulletMatch[1])}</span>
              </div>
            );
          }
          if (line.trim() === "") return <div key={i} className="h-1.5" />;
          return (
            <p key={i} className={i > 0 ? "mt-1" : ""}>
              {renderInline(line)}
            </p>
          );
        })}
      </div>

      {!isUser && content.trim().length > 0 && (
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy reply"
          title={copied ? "Copied" : "Copy reply"}
          className="absolute -bottom-2 left-3 opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center justify-center w-7 h-7 bg-white border-2 border-black rounded-full shadow-[2px_2px_0_0_#000] hover:bg-[#C5F542]"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
        </button>
      )}
    </div>
  );
}

// Tiny inline-markdown renderer: [text](url), **bold**, *italic*, `code`.
// No third-party dep, no dangerouslySetInnerHTML — XSS-safe.
function renderInline(text) {
  const pattern =
    /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*\n]+)\*)|(`([^`]+)`)/g;
  const out = [];
  let last = 0;
  let m;
  let key = 0;

  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      out.push(
        <SafeLink key={key++} href={m[3]}>
          {m[2]}
        </SafeLink>
      );
    } else if (m[4]) {
      out.push(
        <strong key={key++} className="font-black">
          {m[5]}
        </strong>
      );
    } else if (m[6]) {
      out.push(
        <em key={key++} className="italic">
          {m[7]}
        </em>
      );
    } else if (m[8]) {
      out.push(
        <code
          key={key++}
          className="font-mono text-[12px] bg-[#EEFBC9] border border-black/15 rounded px-1.5 py-0.5"
        >
          {m[9]}
        </code>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function SafeLink({ href, children }) {
  const safe =
    typeof href === "string" &&
    (/^https?:\/\//i.test(href) ||
      /^mailto:/i.test(href) ||
      href.startsWith("/") ||
      href.startsWith("#"));

  if (!safe) return <>{children}</>;

  const external = /^https?:\/\//i.test(href);
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="underline decoration-2 underline-offset-2 decoration-[#9BC91F] font-bold hover:bg-[#C5F542] hover:text-black transition-colors"
    >
      {children}
    </a>
  );
}
