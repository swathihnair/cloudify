import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Upload, RotateCcw, Download } from 'lucide-react'
import Mascot from '../components/Mascot'
import FloatingClouds from '../components/FloatingClouds'
import { cloudifyObject } from '../api'

export default function CloudifyObjectScreen() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setError(null)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCloudify = async () => {
    if (!selectedFile) return
    setIsLoading(true)
    setError(null)

    try {
      const cloudResult = await cloudifyObject(selectedFile)
      setResult({
        originalImage: preview,
        cloudImage: cloudResult.cloud_image_url,
        description: cloudResult.description,
        objectType: cloudResult.object_type,
      })
    } catch (err) {
      setError('Failed to cloudify object. Please try again.')
      console.error('Cloudify error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTryAgain = () => {
    setPreview(null)
    setSelectedFile(null)
    setResult(null)
    setError(null)
  }

  const handleDownload = async () => {
    if (!result?.cloudImage) return
    try {
      const link = document.createElement('a')
      link.href = result.cloudImage
      link.download = `cloudified-${result.objectType}-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error('Download error:', err)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-400 via-sky-200 to-blue-50 p-4 sm:p-6 lg:p-8 flex flex-col relative overflow-hidden">
      {/* Floating background clouds */}
      <FloatingClouds />

      {/* Header */}
      <div className="mb-6 flex items-center justify-between relative z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="rounded-full bg-white/80 backdrop-blur-md p-3 shadow-md hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-sky-700" />
        </motion.button>
        <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">Cloudify Anything ✨</h2>
        <div className="w-11" />
      </div>

      {/* Mascot */}
      <div className="flex justify-center mb-6 lg:mb-8 relative z-20">
        <Mascot mood={isLoading ? 'processing' : result ? 'result' : 'curious'} size="md" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full relative z-10">
        {!result ? (
          <>
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="cloud-container p-4 sm:p-6 lg:p-8 mb-6 flex-1 flex flex-col"
            >
              {!preview ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full max-w-sm text-center">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="mb-6"
                    >
                      <div className="text-6xl mb-4">🎨</div>
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl font-bold text-sky-900 mb-2">
                      Upload Any Object
                    </h3>
                    <p className="text-sky-600 mb-6 text-sm sm:text-base">
                      Upload a photo of an ice cream, car, animal, or anything else. We'll transform it into a magical cloud! ☁️✨
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-4 font-bold shadow-lg flex items-center justify-center gap-3 hover:shadow-xl transition-shadow"
                    >
                      <Upload className="w-6 h-6" />
                      Choose Photo
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="mb-6 rounded-2xl overflow-hidden bg-gray-100 w-full max-w-xs">
                    <img
                      src={preview}
                      alt="Object preview"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <p className="text-sky-700 font-semibold mb-6 text-center text-sm sm:text-base">
                    Ready to cloudify this? ✨
                  </p>
                  <div className="flex gap-3 flex-wrap justify-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-2xl bg-white/80 backdrop-blur-md text-sky-600 px-6 py-2 sm:py-3 font-semibold shadow-md hover:bg-white transition-colors text-sm sm:text-base"
                    >
                      Choose Another
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCloudify}
                      disabled={isLoading}
                      className="rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-2 sm:py-3 font-bold shadow-lg disabled:opacity-50 hover:shadow-xl transition-shadow text-sm sm:text-base flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          Cloudifying...
                        </>
                      ) : (
                        <>
                          🪄 Cloudify
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl bg-red-100 border-2 border-red-300 p-4 mb-4 text-red-900 font-semibold text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <>
            {/* Comparison View */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="cloud-container p-4 sm:p-6 lg:p-8 mb-6 flex-1 flex flex-col"
            >
              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-sky-900 mb-6 text-center">
                Your Cloud Transformation ✨
              </h3>

              {/* Side by Side Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 flex-1">
                {/* Original */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-2xl bg-gray-100 overflow-hidden"
                >
                  <div className="bg-gradient-to-b from-sky-200 to-gray-100 px-3 py-2 text-center">
                    <p className="text-xs sm:text-sm font-semibold text-sky-700">Original Object</p>
                  </div>
                  <img
                    src={result.originalImage}
                    alt="Original"
                    className="w-full h-auto object-contain"
                  />
                </motion.div>

                {/* Cloud Result */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-2xl bg-gradient-to-br from-sky-100 to-blue-50 overflow-hidden border-2 border-sky-300"
                >
                  <div className="bg-gradient-to-b from-blue-200 to-sky-100 px-3 py-2 text-center">
                    <p className="text-xs sm:text-sm font-semibold text-blue-700">Cloud Version</p>
                  </div>
                  <img
                    src={result.cloudImage}
                    alt="Cloud result"
                    className="w-full h-auto object-contain"
                  />
                </motion.div>
              </div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-sky-50 rounded-2xl p-4 mb-6"
              >
                <p className="text-sky-900 text-center text-sm sm:text-base italic">
                  "{result.description}"
                </p>
                <p className="text-sky-700 text-center text-xs sm:text-sm mt-2 font-semibold">
                  Object Type: <span className="text-sky-900">{result.objectType}</span>
                </p>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex gap-3 flex-wrap justify-center">
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDownload}
                  className="rounded-2xl bg-gradient-to-r from-sky-500 to-blue-500 text-white px-6 py-2 sm:py-3 font-bold shadow-lg flex items-center gap-2 hover:shadow-xl transition-shadow text-sm sm:text-base"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  Download Cloud
                </motion.button>

                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleTryAgain}
                  className="rounded-2xl bg-white/80 backdrop-blur-md text-sky-600 px-6 py-2 sm:py-3 font-semibold shadow-md flex items-center gap-2 hover:bg-white transition-colors text-sm sm:text-base"
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                  Try Another
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}
