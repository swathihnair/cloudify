import axios from 'axios'

const API_BASE = '/api'

export const analyzeCloud = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await axios.post(`${API_BASE}/analyze`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}

export const cloudifyObject = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await axios.post(`${API_BASE}/cloudify-object`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}

export const submitPoll = async (cloudId, userGuess) => {
  const response = await axios.post(`${API_BASE}/clouds/${cloudId}/poll`, {
    user_guess: userGuess
  })
  return response.data
}

export const getFeaturedCloud = async () => {
  const response = await axios.get(`${API_BASE}/clouds/featured`)
  return response.data
}

export const getCloudHistory = async (filter = 'all') => {
  const response = await axios.get(`${API_BASE}/clouds/history`, {
    params: { filter }
  })
  return response.data
}
