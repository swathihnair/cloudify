import { useState, useCallback } from 'react'
import axios from 'axios'

const MOCK_MODE = false // Toggle for standalone development
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Mock prediction data for testing
const MOCK_PREDICTIONS = {
  dinosaur: {
    category: 'dinosaur',
    confidence: 82,
    alt_category: 'dragon',
    alt_confidence: 64,
    region: { x: 120, y: 340, width: 200, height: 150 },
    personality: {
      name: 'Fluffy Rex',
      trait: 'Sleepy but powerful',
      caption: 'Looks like it woke up five minutes ago but is ready to conquer the sky.',
      stats: {
        cuteness: 91,
        chaos: 74,
        fluffiness: 96,
        main_character_energy: 88,
        dinosaur_energy: 82
      }
    }
  },
  dragon: {
    category: 'dragon',
    confidence: 78,
    alt_category: 'phoenix',
    alt_confidence: 71,
    region: { x: 100, y: 250, width: 220, height: 180 },
    personality: {
      name: 'Sky Flame',
      trait: 'Mystical and majestic',
      caption: 'Ancient and powerful, surveying the realm from above.',
      stats: {
        cuteness: 65,
        chaos: 88,
        fluffiness: 42,
        main_character_energy: 94,
        dragon_energy: 96
      }
    }
  },
  bunny: {
    category: 'bunny',
    confidence: 85,
    alt_category: 'sheep',
    alt_confidence: 68,
    region: { x: 140, y: 320, width: 180, height: 160 },
    personality: {
      name: 'Cottontail',
      trait: 'Fluffy and hopeful',
      caption: 'Bouncing through the sky with endless energy and joy.',
      stats: {
        cuteness: 98,
        chaos: 62,
        fluffiness: 99,
        main_character_energy: 75,
        bunny_energy: 91
      }
    }
  },
  whale: {
    category: 'whale',
    confidence: 79,
    alt_category: 'dolphin',
    alt_confidence: 66,
    region: { x: 80, y: 380, width: 280, height: 120 },
    personality: {
      name: 'Azure Voyager',
      trait: 'Gentle giant',
      caption: 'Floating serenely through the sky ocean, singing ancient songs.',
      stats: {
        cuteness: 88,
        chaos: 35,
        fluffiness: 72,
        main_character_energy: 70,
        whale_energy: 89
      }
    }
  },
  unicorn: {
    category: 'unicorn',
    confidence: 81,
    alt_category: 'pegasus',
    alt_confidence: 75,
    region: { x: 130, y: 300, width: 210, height: 170 },
    personality: {
      name: 'Starlight',
      trait: 'Magical and whimsical',
      caption: 'A rare celestial being bringing wonder and enchantment.',
      stats: {
        cuteness: 92,
        chaos: 71,
        fluffiness: 85,
        main_character_energy: 89,
        unicorn_energy: 94
      }
    }
  }
}

export const usePrediction = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [prediction, setPrediction] = useState(null)

  const predict = useCallback(async (imageFile, huntingFor = null) => {
    setLoading(true)
    setError(null)

    try {
      if (MOCK_MODE) {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Return random mock prediction
        const mockKeys = Object.keys(MOCK_PREDICTIONS)
        const randomKey = mockKeys[Math.floor(Math.random() * mockKeys.length)]
        const mockData = MOCK_PREDICTIONS[randomKey]

        setPrediction(mockData)
        return mockData
      } else {
        // Real API call
        const formData = new FormData()
        formData.append('file', imageFile)
        
        // Build URL with query parameter if hunting
        let url = `${API_BASE}/api/analyze`
        if (huntingFor) {
          url += `?hunting_for=${encodeURIComponent(huntingFor)}`
        }

        const response = await axios.post(url, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 30000
        })

        // Map backend response to frontend format
        const data = response.data
        const mappedData = {
          category: data.top_guess?.toLowerCase(),
          confidence: data.confidence_score,
          alt_category: data.runner_up_guess?.toLowerCase(),
          alt_confidence: data.runner_up_score,
          original_image_url: data.original_image_url,
          outlined_image_url: data.outlined_image_url, // NEW: outlined version
          region: { x: 25, y: 25, width: 50, height: 50 }, // placeholder
          personality: {
            name: data.character_name,
            trait: data.personality_type,
            caption: data.quote,
            stats: data.stats
          }
        }

        setPrediction(mappedData)
        return mappedData
      }
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || 'Failed to analyze cloud'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setPrediction(null)
    setError(null)
  }, [])

  return { predict, loading, error, prediction, reset }
}

export default usePrediction
