'use client'

import { useRef, useState, useEffect } from 'react'

interface InputBarProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
}

export default function InputBar({ onSendMessage, isLoading }: InputBarProps) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [input])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSendMessage(input)
      setInput('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 py-4 px-4 border-t border-primary-500/20 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto">
        <form 
          onSubmit={handleSubmit} 
          className="flex items-end gap-3 bg-gray-900/80 rounded-xl p-1.5 border border-primary-500/30 shadow-glow-md"
        >
          {/* Text mode selector */}
          <div className="flex items-center gap-2 bg-primary-500/10 hover:bg-primary-500/20 transition-colors rounded-xl px-3 py-2 cursor-pointer">
            <span className="text-primary-300 text-sm font-medium">Text</span>
            <svg className="w-4 h-4 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="w-full bg-gray-800/80 text-white placeholder-primary-400/60 text-sm px-4 py-3 pr-12 focus:outline-none resize-none overflow-hidden rounded-lg border border-primary-500/30 focus:border-primary-400/70 transition-all duration-200 shadow-inner"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            {input && (
              <button
                type="button"
                className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1.5 text-primary-300 hover:text-white rounded-full hover:bg-primary-500/20 transition-colors"
                onClick={() => setInput('')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`p-2.5 rounded-xl transition-all ${
              isLoading || !input.trim()
                ? 'bg-primary-900/20 text-primary-500/50 cursor-not-allowed'
                : 'bg-primary-500 text-white hover:bg-primary-400 hover:shadow-glow-md hover:scale-105 transform transition-all duration-200'
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-primary-300/30 border-t-primary-300 rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
