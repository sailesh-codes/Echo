'use client'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface ChatMessageProps {
  message: Message
}

/**
 * ChatMessage Component
 * Updated to use gradient styling for modern design
 */
export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}>
      <div
        className={`max-w-2xl rounded-xl px-4 py-3 ${
          isUser
            ? 'bg-[#0a0f13] text-aqua-100 border-r-4 border-aqua-400/80 backdrop-blur-sm ml-auto'
            : 'bg-[#0a0f13] text-aqua-100 border-l-4 border-aqua-500/80 backdrop-blur-sm'
        }`}
      >
        <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
          {message.content.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
