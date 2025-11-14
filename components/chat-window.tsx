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
    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-800/30 scrollbar-track-transparent pb-40 bg-black">
      <div className="h-full flex flex-col">
        {messages.length === 0 && !isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-16 pb-40">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mb-6 shadow-glow">
              <span className="text-4xl text-black">✨</span>
            </div>
            <h2 className="text-5xl font-bold text-white mb-3">Echo</h2>
            <p className="text-xl text-primary-300/90 mb-10 font-light">Your Intelligent AI Assistant</p>
            <div className="max-w-2xl mx-auto">
              <p className="text-4xl font-light text-white/80 mb-12 leading-tight">
                How can I help you <span className="text-primary-400">today</span>?
              </p>
            </div>
          </div>
        ) : (
          /* Messages container */
          <div className="w-full max-w-4xl mx-auto px-4 py-8 space-y-6 pb-40 bg-black">
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
