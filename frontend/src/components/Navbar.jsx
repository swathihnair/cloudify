import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Cloud, CloudDrizzle, Wand2 } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Show back button on all screens except home
  const showBack = location.pathname !== '/'
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 cloud-container border-b border-white/30 m-0 rounded-none">
      <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Left Section: Back Button or Logo */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-max">
          {showBack ? (
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
              aria-label="Go back"
            >
              <ArrowLeft size={20} className="text-blue-600" />
            </button>
          ) : null}
          
          {/* Brand Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Cloud size={24} className="text-blue-500" />
            <span className="font-bold text-lg sm:text-xl text-blue-600 hidden xs:inline">
              Cloudify
            </span>
          </button>
        </div>

        {/* Center: Screen Title (Optional, can display context) */}
        <div className="hidden sm:flex flex-1 justify-center">
          {/* This space can be used for contextual titles */}
        </div>

        {/* Right Section: Navigation Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => navigate('/cloudify-object')}
            className="cloud-button px-2 sm:px-3 py-2 text-sm sm:text-base flex items-center gap-1 sm:gap-2"
            title="Cloudify Anything"
          >
            <Wand2 size={18} />
            <span className="hidden xs:inline">Cloudify</span>
            <span className="hidden sm:inline">Object</span>
          </button>
          
          <button
            onClick={() => navigate('/history')}
            className="cloud-button px-2 sm:px-3 py-2 text-sm sm:text-base flex items-center gap-1 sm:gap-2"
          >
            <CloudDrizzle size={18} />
            <span className="hidden xs:inline">My Clouds</span>
            <span className="xs:hidden">Clouds</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
