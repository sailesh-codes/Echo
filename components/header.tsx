'use client'

import { useState } from 'react'

interface HeaderProps {
  onClearHistory: () => void
}

/**
 * Header Component
 * Displays app title and settings icon for clearing chat history
 */
export default function Header({ onClearHistory }: HeaderProps) {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleClearClick = () => {
    setShowConfirm(true)
  }

  const confirmClear = () => {
    onClearHistory()
    setShowConfirm(false)
  }

  return (
    <header className="bg-neutral-800 border-b border-neutral-700 shadow-lg sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Echo</h1>

        {/* Settings button with confirmation dialog */}
        <div className="relative">
          <button
            onClick={handleClearClick}
            className="p-2 rounded-lg hover:bg-neutral-700 transition-colors duration-200"
            title="Clear chat history"
            aria-label="Settings"
          >
            <svg
              className="w-6 h-6 text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>

          {/* Confirmation dialog */}
          {showConfirm && (
            <div className="absolute right-0 mt-2 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl p-4 min-w-64 z-20">
              <p className="text-gray-200 mb-4 text-sm">
                Clear all chat history? This action cannot be undone.
              </p>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-3 py-2 rounded-lg bg-neutral-700 text-gray-200 hover:bg-neutral-600 transition-colors duration-200 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmClear}
                  className="px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 text-sm"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
