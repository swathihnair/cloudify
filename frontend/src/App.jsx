import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import Capture from './screens/Capture'
import Processing from './screens/Processing'
import CharacterReveal from './screens/CharacterReveal'
import PersonalityStats from './screens/PersonalityStats'
import Poll from './screens/Poll'
import CloudOfTheDay from './screens/CloudOfTheDay'
import History from './screens/History'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/capture" element={<Capture />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/reveal/:id" element={<CharacterReveal />} />
        <Route path="/stats/:id" element={<PersonalityStats />} />
        <Route path="/poll/:id" element={<Poll />} />
        <Route path="/featured" element={<CloudOfTheDay />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
