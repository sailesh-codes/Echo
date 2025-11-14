'use client'

/**
 * TypingIndicator Component
 * Animated loading state shown while waiting for AI response
 */
export default function TypingIndicator() {
  return (
    <div className="flex justify-start px-4">
      <div className="bg-gray-900 text-gray-100 rounded-2xl px-4 py-3 border border-primary-500/30 shadow-glow">
        <div className="flex gap-2">
          <div
            className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
            style={{ animationDelay: '0s' }}
          />
          <div
            className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
            style={{ animationDelay: '0.2s' }}
          />
          <div
            className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"
            style={{ animationDelay: '0.4s' }}
          />
        </div>
      </div>
    </div>
  )
}
