import React, { useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Camera, Upload, ArrowLeft, CheckCircle } from 'lucide-react'
import Mascot from '../components/Mascot'
import FloatingClouds from '../components/FloatingClouds'

export default function CameraCapture() {
  const navigate = useNavigate()
  const location = useLocation()
  const lookingFor = location.state?.lookingFor // Get the matched shape from Object Match
  const fileInputRef = useRef(null)
  const cameraInputRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = () => {
    if (selectedFile) {
      setIsLoading(true)
      setTimeout(() => {
        navigate('/processing', { state: { file: selectedFile, preview, huntingFor: lookingFor } })
      }, 300)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#D0E8FF] via-[#E8F3FF] to-[#FFFFFF] p-4 sm:p-6 lg:p-8 flex flex-col relative">
      {/* Floating background clouds */}
      <FloatingClouds />

      {/* Header */}
      <div className="mb-6 flex items-center justify-between relative z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="cloud-container rounded-full p-3 shadow-md hover:shadow-lg transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-sky-700" />
        </motion.button>
        <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">Capture Cloud</h2>
        <div className="w-11" />
      </div>

      {/* Looking For Banner */}
      {lookingFor && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 relative z-10 max-w-4xl mx-auto w-full"
        >
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-2xl p-4 shadow-2xl border-2 border-white/30">
            <div className="flex items-center gap-4">
              <div className="text-5xl">
                {lookingFor === 'IceCream' && '🍦'}
                {lookingFor === 'Lion' && '🦁'}
                {lookingFor === 'Dog' && '🐕'}
                {lookingFor === 'Bear' && '🐻'}
                {lookingFor === 'Horse' && '🐴'}
                {lookingFor === 'Cat' && '🐱'}
                {lookingFor === 'Rabbit' && '🐰'}
                {lookingFor === 'Elephant' && '🐘'}
                {lookingFor === 'Dinosaur' && '🦖'}
                {lookingFor === 'Dragon' && '🐉'}
                {lookingFor === 'Whale' && '🐋'}
                {lookingFor === 'Bird' && '🐦'}
                {lookingFor === 'Butterfly' && '🦋'}
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-semibold mb-1">🎯 ON A MISSION</p>
                <p className="text-white text-lg font-black">
                  Looking for {lookingFor === 'IceCream' ? 'Fluffy' : lookingFor} Clouds!
                </p>
              </div>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl"
              >
                🔍
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Mascot */}
      <div className="flex justify-center mb-6 lg:mb-8 relative z-10">
        <Mascot mood={preview ? 'excited' : 'curious'} size="md" />
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full relative z-10">
        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="cloud-container p-4 sm:p-6 lg:p-8 mb-6 flex-1 flex flex-col"
        >
          {!preview ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-sky-100 to-blue-100 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-sky-300">
                <Cloud className="w-20 h-20 sm:w-24 sm:h-24 text-sky-300 mb-4" />
                <p className="text-sky-600 font-medium mb-2 text-center">No cloud selected</p>
                <p className="text-sky-500 text-sm text-center px-4">
                  Upload or capture a photo of clouds
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden">
                <img
                  src={preview}
                  alt="Cloud preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full p-2 shadow-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="absolute inset-0 border-4 border-white/50 rounded-2xl" />
              </div>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <div className="space-y-3 max-w-md mx-auto w-full">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => cameraInputRef.current?.click()}
            disabled={isLoading}
            className="w-full rounded-2xl bg-white text-sky-600 px-6 py-4 font-semibold shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 hover:shadow-xl transition-shadow"
          >
            <Camera className="w-6 h-6" />
            {preview ? 'Take Another Photo' : 'Take Photo'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="w-full rounded-2xl bg-white/80 backdrop-blur-md text-sky-700 px-6 py-4 font-medium shadow-md flex items-center justify-center gap-3 disabled:opacity-50 hover:bg-white transition-colors"
          >
            <Upload className="w-5 h-5" />
            Upload from Gallery
          </motion.button>

          {preview && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-4 font-bold shadow-lg disabled:opacity-50 hover:shadow-xl transition-shadow"
            >
              Analyze Cloud ✨
            </motion.button>
          )}
        </div>
      </div>

      {/* Hidden Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Loading Overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 border-4 border-white border-t-transparent rounded-full"
          />
        </motion.div>
      )}
    </div>
  )
}

function Cloud({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.5 14.25c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5c-.15 0-.29.01-.44.04A4.99 4.99 0 0 0 14 6c-1.64 0-3.09.79-4 2.01A3.5 3.5 0 0 0 6.5 11.5c0 .17.01.33.04.5A3.5 3.5 0 0 0 4 15.5c0 1.93 1.57 3.5 3.5 3.5h12c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.25-2.5-2.25z" />
    </svg>
  )
}
