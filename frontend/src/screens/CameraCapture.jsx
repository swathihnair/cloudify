import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Camera, Upload, ArrowLeft, CheckCircle } from 'lucide-react'
import Mascot from '../components/Mascot'

export default function CameraCapture() {
  const navigate = useNavigate()
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
        navigate('/processing', { state: { file: selectedFile, preview } })
      }, 300)
    }
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-sky-400 via-sky-200 to-blue-50 p-4 flex flex-col">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="rounded-full bg-white/80 backdrop-blur-md p-3 shadow-md hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-sky-700" />
        </motion.button>
        <h2 className="text-2xl font-bold text-white">Capture Cloud</h2>
        <div className="w-11" />
      </div>

      {/* Mascot */}
      <div className="flex justify-center mb-6">
        <Mascot mood={preview ? 'excited' : 'curious'} size="md" />
      </div>

      {/* Preview Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl bg-white/80 backdrop-blur-md shadow-sm border border-white/60 p-6 mb-6 flex-1 flex flex-col"
      >
        {!preview ? (
          <div className="aspect-square bg-gradient-to-br from-sky-100 to-blue-100 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-sky-300 mb-4">
            <Cloud className="w-24 h-24 text-sky-300 mb-4" />
            <p className="text-sky-600 font-medium mb-2">No cloud selected</p>
            <p className="text-sky-500 text-sm text-center px-4">
              Upload or capture a photo of clouds
            </p>
          </div>
        ) : (
          <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
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
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => cameraInputRef.current?.click()}
            disabled={isLoading}
            className="w-full rounded-2xl bg-white text-sky-600 px-6 py-4 font-semibold shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <Camera className="w-6 h-6" />
            {preview ? 'Take Another Photo' : 'Take Photo'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="w-full rounded-2xl bg-white/80 backdrop-blur-md text-sky-700 px-6 py-4 font-medium shadow-md flex items-center justify-center gap-3 disabled:opacity-50"
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
              className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-4 font-bold shadow-lg disabled:opacity-50"
            >
              Analyze Cloud ✨
            </motion.button>
          )}
        </div>
      </motion.div>

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
