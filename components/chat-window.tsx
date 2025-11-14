'use client'

import { useEffect, useRef } from 'react'
import ChatMessage from './chat-message'
import TypingIndicator from './typing-indicator'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface ChatWindowProps {
  messages: Message[]
  isLoading: boolean
}

export default function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-aqua-900/50 scrollbar-track-transparent pb-40">
      <div className="h-full flex flex-col">
        {messages.length === 0 && !isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-16 pb-40">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-aqua-500 to-aqua-300 flex items-center justify-center mb-6">
              <span className="text-4xl text-black">✨</span>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-aqua-400 to-aqua-200 bg-clip-text text-transparent mb-2">Echo</h2>
            <p className="text-xl text-aqua-300/80 mb-8">Intelligent AI Assistant</p>
            <p className="text-5xl font-light text-white/90 mb-12">Ask me anything.</p>
          </div>
        ) : (
          /* Messages container */
          <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-6 pb-40">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Typing indicator when loading (if no messages) */}
        {messages.length === 0 && isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <TypingIndicator />
          </div>
        )}
      </div>
    </div>
  )
}
