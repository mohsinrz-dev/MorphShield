import { useState, useRef } from 'react'
import { analyzeMedia, runDemo } from '../services/api.js'
import RiskMeter from '../components/RiskMeter.jsx'
import { DemoBanner, WarningCard, Card, StatusPill } from '../components/shared.jsx'

function riskColor(n) {
  if (n < 31) return '#16a34a'
  if (n < 61) return '#d97706'
  return '#dc2626'
}

export default function Detection({ demoMode, setLastResult }) {
  const [audioStatus, setAudioStatus] = useState('idle')
  const [videoStatus, setVideoStatus] = useState('idle')
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [file, setFile] = useState(null)
  const fileRef = useRef()

  async function startDetection() {
    setRunning(true)
    setError(null)
    setResult(null)
    setAudioStatus('analyzing')
    setVideoStatus('analyzing')

    await new Promise(r => setTimeout(r, 1400))

    try {
      const data = demoMode
        ? await runDemo()
        : await analyzeMedia({ demoMode: false, fileName: file?.name })
      setResult(data)
      setLastResult(data)
      setAudioStatus('completed')
      setVideoStatus('completed')
    } catch {
      setError('Could not reach the backend. Make sure the Java server is running on localhost:8080.')
      setAudioStatus('error')
      setVideoStatus('error')
    } finally {
      setRunning(false)
    }
  }

  function reset() {
    setResult(null)
    setError(null)
    setAudioStatus('idle')
    setVideoStatus('idle')
    setFile(null)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-semibold text-white">Detection Dashboard</h1>
        {demoMode && (
          <span className="bg-amber-950 border border-amber-800 text-amber-400 text-xs font-mono font-bold px-2.5 py-1 rounded-full tracking-wider">
            DEMO MODE
          </span>
        )}
      </div>

      {demoMode && <DemoBanner />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card>
            <div className="font-medium text-white text-sm mb-3">Media Input</div>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-slate-700 hover:border-sky-700 rounded-lg p-8 text-center cursor-pointer transition-colors mb-3"
            >
              {file ? (
                <p className="text-sky-400 text-sm font-medium">{file.name}</p>
              ) : (
                <>
                  <p className="text-slate-400 text-sm">Click to upload a video or audio file</p>
                  <p className="text-slate-600 text-xs mt-1">Supported: MP4, WebM, MP3, WAV</p>
                </>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="video/*,audio/*"
              className="hidden"
              onChange={e => setFile(e.target.files?.[0] || null)}
            />
            {!demoMode && (
              <p className="text-xs text-slate-600 mb-3">
                Live camera detection requires a connected backend with media processing. File upload is supported.
              </p>
            )}
            <div className="flex gap-2">
              <button
                onClick={startDetection}
                disabled={running}
                className="flex-1 bg-sky-600 hover:bg-sky-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
              >
                {running ? 'Analyzing…' : 'Start Detection'}
              </button>
              <button
                onClick={reset}
                className="px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-2.5 rounded-lg text-sm transition-colors"
              >
                Reset
              </button>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <div className="text-xs text-slate-500 mb-2.5 font-medium">Audio Analysis</div>
              <StatusPill status={audioStatus} />
              {result && (
                <div className="mt-3">
                  <span className="font-mono font-bold text-2xl" style={{ color: riskColor(result.audioRisk) }}>
                    {result.audioRisk}
                  </span>
                  <span className="text-slate-600 text-xs ml-1">/ 100</span>
                </div>
              )}
              {!result && <p className="text-slate-700 text-xs mt-2">No result yet</p>}
            </Card>
            <Card>
              <div className="text-xs text-slate-500 mb-2.5 font-medium">Video Analysis</div>
              <StatusPill status={videoStatus} />
              {result && (
                <div className="mt-3">
                  <span className="font-mono font-bold text-2xl" style={{ color: riskColor(result.videoRisk) }}>
                    {result.videoRisk}
                  </span>
                  <span className="text-slate-600 text-xs ml-1">/ 100</span>
                </div>
              )}
              {!result && <p className="text-slate-700 text-xs mt-2">No result yet</p>}
            </Card>
          </div>

          {error && (
            <div className="bg-red-950 border border-red-800 rounded-xl p-4">
              <p className="text-red-300 text-sm font-medium mb-0.5">Backend unavailable</p>
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )}

          {result?.warning && <WarningCard demoMode={result.demoMode} />}

          {result && !result.warning && (
            <div className="bg-green-950 border border-green-800 rounded-xl p-4">
              <p className="text-green-400 font-semibold text-sm">No high-risk indicators detected</p>
              <p className="text-green-300 text-xs mt-1">
                Risk score is within the low-to-suspicious range based on current analysis.
              </p>
              {result.demoMode && (
                <p className="text-green-600 text-xs mt-1.5">Simulated result (Demo Mode).</p>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <Card className="flex flex-col items-center text-center">
            <div className="text-xs text-slate-500 mb-3 font-medium">Overall Risk Score</div>
            <RiskMeter value={result ? result.overallRisk : 0} />
            {result && (
              <div className="mt-3 text-xs text-slate-500">
                Latency: <span className="font-mono text-slate-300">{result.latencyMs} ms</span>
              </div>
            )}
            {!result && <p className="text-slate-700 text-xs mt-3">Run detection to see results</p>}
          </Card>

          <Card>
            <div className="text-xs text-slate-500 mb-3 font-medium">Risk Thresholds</div>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
                <p className="text-slate-300 text-xs font-medium">0 – 30: Low Risk</p>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <p className="text-slate-300 text-xs font-medium">31 – 60: Suspicious</p>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                <p className="text-slate-300 text-xs font-medium">61 – 100: High Risk</p>
              </div>
            </div>
            <p className="text-slate-700 text-xs mt-3 leading-relaxed">Prototype thresholds. Not scientifically validated.</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
