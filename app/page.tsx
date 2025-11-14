'use client'

import { useState, useEffect } from 'react'
import { callAiApi } from './actions'
import Header from '@/components/header'
import ChatWindow from '@/components/chat-window'
import InputBar from '@/components/input-bar'
import Sidebar from '@/components/sidebar' // Added import for Sidebar component

// Type definitions for chat messages
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true) // Added state for sidebar

  // Load chat history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('chat-history')
    if (saved) {
      try {
        setMessages(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load chat history:', e)
      }
    }
  }, [])

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chat-history', JSON.stringify(messages))
    }
  }, [messages])

  /**
   * Handle new user message submission
   * Adds user message immediately and fetches AI response via server action
   */
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await callAiApi(text)

      // Add AI response to chat
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Failed to fetch AI response:', error)

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Clear all chat history from state and localStorage
   */
  const handleClearHistory = () => {
    setMessages([])
    localStorage.removeItem('chat-history')
  }

  return (
    <div className="flex h-screen bg-[#0f0f0f]">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} onClearHistory={handleClearHistory} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Chat window */}
        <ChatWindow messages={messages} isLoading={isLoading} />

        {/* Input bar */}
        <InputBar onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}
