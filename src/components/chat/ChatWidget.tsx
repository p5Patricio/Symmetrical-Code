import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function ChatWidget() {
  const { t, i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: t('chat.welcome') },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cuando cambia el idioma, actualizar SOLO el mensaje de bienvenida (índice 0)
  useEffect(() => {
    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === 0 && msg.role === 'model'
          ? { ...msg, text: t('chat.welcome') }
          : msg
      )
    );
  }, [i18n.language, t]);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus en input cuando se abre el chat
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages,
          language: i18n.language, // enviamos el idioma actual al backend
        }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [...prev, { role: 'model', text: data.reply }]);
      } else {
        throw new Error(data.error || t('chat.error_unknown'));
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : t('chat.error_connect');
      setError(errorMsg);
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: t('chat.error_message') },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed bottom-6 right-6 z-50
          w-14 h-14 rounded-full
          flex items-center justify-center
          text-xl font-bold
          transition-all duration-300 ease-out
          ${isOpen
            ? 'bg-[#070d14] border border-[rgba(0,229,255,0.3)] rotate-90'
            : 'bg-gradient-to-br from-[#00e5ff] to-[#1565ff] text-[#020408] hover:scale-110 hover:shadow-[0_0_40px_rgba(0,229,255,0.5)]'
          }
        `}
        aria-label={isOpen ? t('chat.aria_close') : t('chat.aria_open')}
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Panel de chat */}
      <div
        className={`
          fixed bottom-24 right-6 z-50
          w-[360px] max-w-[calc(100vw-48px)]
          h-[500px] max-h-[calc(100vh-140px)]
          rounded-2xl
          flex flex-col
          overflow-hidden
          transition-all duration-300 ease-out
          origin-bottom-right
          ${isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
          }
        `}
        style={{
          background: 'rgba(7, 13, 20, 0.95)',
          border: '1px solid rgba(0, 229, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 60px rgba(0, 229, 255, 0.1), 0 20px 40px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-5 py-4 shrink-0"
          style={{
            borderBottom: '1px solid rgba(0, 229, 255, 0.1)',
            background: 'linear-gradient(135deg, rgba(0,229,255,0.08) 0%, rgba(21,101,255,0.05) 100%)',
          }}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00e5ff] to-[#1565ff] flex items-center justify-center text-[#020408] text-lg font-bold">
              S
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#070d14]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white truncate">Symmetrical Bot</h3>
            <p className="text-xs text-[#00e5ff]/70 font-mono">{t('chat.subtitle')}</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/40 hover:text-white transition-colors p-1"
            aria-label={t('chat.aria_close')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Área de mensajes */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                  ${msg.role === 'user'
                    ? 'bg-gradient-to-br from-[#00e5ff] to-[#1565ff] text-[#020408] font-medium rounded-br-md'
                    : 'bg-[rgba(255,255,255,0.03)] text-[#e2e8f0] border border-[rgba(0,229,255,0.08)] rounded-bl-md'
                  }
                `}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Indicador de "escribiendo..." */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(0,229,255,0.08)] rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00e5ff]/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#00e5ff]/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#00e5ff]/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <span className="text-xs text-red-400/80 bg-red-400/5 border border-red-400/10 rounded-full px-3 py-1">
                {error}
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div
          className="shrink-0 px-4 py-3 flex gap-2"
          style={{
            borderTop: '1px solid rgba(0, 229, 255, 0.08)',
            background: 'rgba(2, 4, 8, 0.6)',
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('chat.placeholder')}
            disabled={isTyping}
            className="
              flex-1
              bg-[rgba(255,255,255,0.03)]
              border border-[rgba(0,229,255,0.12)]
              rounded-xl
              px-4 py-2.5
              text-sm text-white
              placeholder:text-white/25
              focus:outline-none focus:border-[rgba(0,229,255,0.4)] focus:shadow-[0_0_15px_rgba(0,229,255,0.1)]
              transition-all
              disabled:opacity-50
            "
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className={`
              w-10 h-10 rounded-xl
              flex items-center justify-center
              transition-all duration-200
              ${input.trim() && !isTyping
                ? 'bg-gradient-to-br from-[#00e5ff] to-[#1565ff] text-[#020408] hover:scale-105 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]'
                : 'bg-[rgba(255,255,255,0.03)] text-white/20 cursor-not-allowed'
              }
            `}
            aria-label={t('chat.aria_send')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}