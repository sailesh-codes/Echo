'use client'

import { useState } from 'react'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  onClearHistory: () => void
}

export default function Sidebar({ isOpen, onToggle, onClearHistory }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onToggle}
        />
      )}

      {/* Toggle button for small screens */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="md:hidden fixed left-4 top-4 z-40 p-2 hover:bg-neutral-800 rounded-lg text-gray-300 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:relative h-full z-50 ${
          isOpen ? 'w-64' : 'w-0'
        } bg-black border-r border-aqua-900/30 flex flex-col transition-all duration-300 overflow-hidden`}
      >
        {/* Logo Section */}
        <div className="p-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-aqua-500 to-aqua-300 flex items-center justify-center">
              <span className="text-white font-bold text-base">✨</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-base">Echo</h1>
              <p className="text-gray-400 text-xs">Intelligent AI Assistant</p>
            </div>
          </div>

          {/* Modern Input Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Ask me anything..."
              className="w-full bg-black text-white text-sm rounded-xl px-4 pl-12 py-3 focus:outline-none focus:ring-2 focus:ring-aqua-500/50 border border-aqua-900/50"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-aqua-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-aqua-200 rounded-lg px-3 py-1 text-sm font-medium hover:opacity-90 transition-opacity">
              Ask
            </button>
          </div>
          
          {/* User Profile */}
          <button className="w-full text-left hover:bg-aqua-900/20 p-3 rounded-lg transition-colors flex items-center gap-2 text-sm text-aqua-200 mt-4">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-aqua-500 to-aqua-300 flex items-center justify-center text-xs font-bold text-black">
              S
            </div>
            <span>sailesh</span>
          </button>
        </div>
      </aside>
    </>
  )
}
