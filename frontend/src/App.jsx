import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Detection from './pages/Detection.jsx'
import Results from './pages/Results.jsx'
import Robustness from './pages/Robustness.jsx'
import Settings from './pages/Settings.jsx'
import About from './pages/About.jsx'
import Login from './pages/Login.jsx'
import GetStarted from './pages/GetStarted.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import History from './pages/History.jsx'
import SafetyTips from './pages/SafetyTips.jsx'
import VoiceDetection from './pages/VoiceDetection.jsx'
import DetectionResult from './pages/DetectionResult.jsx'
import LiveCallDetection from './pages/LiveCallDetection.jsx'
import LiveCallGuardian from './pages/LiveCallGuardian.jsx'

export default function App() {
  const [demoMode, setDemoMode] = useState(true)
  const [lastResult, setLastResult] = useState(null)
  const [settings, setSettings] = useState({ threshold: 60, audioEnabled: true, videoEnabled: true, warningEnabled: true })

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0f1a' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detect" element={<Detection demoMode={demoMode} setLastResult={setLastResult} lastResult={lastResult} />} />
            <Route path="/results" element={<Results result={lastResult} demoMode={demoMode} />} />
            <Route path="/robustness" element={<Robustness demoMode={demoMode} />} />
            <Route path="/settings" element={<Settings settings={settings} setSettings={setSettings} demoMode={demoMode} setDemoMode={setDemoMode} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/history" element={<History />} />
            <Route path="/safety-tips" element={<SafetyTips />} />
            <Route path="/voice-detection" element={<VoiceDetection setLastResult={setLastResult} />} />
            <Route path="/detection-result" element={<DetectionResult result={lastResult} />} />
            <Route path="/live-call" element={<LiveCallDetection setLastResult={setLastResult} />} />
            <Route path="/live-guardian" element={<LiveCallGuardian />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
