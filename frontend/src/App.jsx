import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingScreen from './screens/LandingScreen'
import CameraCapture from './screens/CameraCapture'
import ProcessingScreen from './screens/ProcessingScreen'
import CloudCardScreen from './screens/CloudCardScreen'
import PersonalityStats from './screens/PersonalityStats'
import HumanVsAiScreen from './screens/HumanVsAiScreen'
import CloudOfTheDayScreen from './screens/CloudOfTheDayScreen'
import CloudHistoryScreen from './screens/CloudHistoryScreen'
import ObjectMatchScreen from './screens/ObjectMatchScreen'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full relative bg-gradient-to-b from-[#D0E8FF] via-[#E8F3FF] to-[#FFFFFF]">
        <Navbar />
        <main className="pt-16 sm:pt-20">
          <Routes>
            <Route path="/" element={<LandingScreen />} />
            <Route path="/capture" element={<CameraCapture />} />
            <Route path="/processing" element={<ProcessingScreen />} />
            <Route path="/reveal/:id" element={<CloudCardScreen />} />
            <Route path="/stats/:id" element={<PersonalityStats />} />
            <Route path="/poll/:id" element={<HumanVsAiScreen />} />
            <Route path="/featured" element={<CloudOfTheDayScreen />} />
            <Route path="/history" element={<CloudHistoryScreen />} />
            <Route path="/object-match" element={<ObjectMatchScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
