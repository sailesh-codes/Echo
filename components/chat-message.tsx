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
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300 px-4`}>
      <div
        className={`max-w-2xl rounded-lg px-5 py-4 ${
          isUser
            ? 'bg-gray-900 text-white border-r-2 border-primary-400 ml-auto shadow-glow'
            : 'bg-gray-900 text-gray-100 border-l-2 border-primary-500 shadow-glow'
        }`}
      >
        <p className="text-[15px] leading-relaxed break-words whitespace-pre-wrap font-light">
          {message.content.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {line === '' ? <br /> : null}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
