import { useState } from 'react'
import { runRobustnessTest } from '../services/api.js'
import { DemoBanner, Card } from '../components/shared.jsx'

const tests = [
  { id: 'ORIGINAL',          label: 'Original Media',       desc: 'Baseline detection on unmodified media.' },
  { id: 'COMPRESSION',       label: 'Compressed Media',     desc: 'Detection after heavy video/audio compression.' },
  { id: 'NOISY_AUDIO',       label: 'Noisy Audio',          desc: 'Detection with background noise added to audio.' },
  { id: 'LOW_RESOLUTION',    label: 'Low Resolution Video', desc: 'Detection on significantly downscaled video.' },
  { id: 'LIGHTING_VARIATION',label: 'Lighting Variation',   desc: 'Detection on video with altered lighting conditions.' },
]

function statusColor(s) {
  if (s === 'PASS') return '#16a34a'
  if (s === 'FAIL') return '#dc2626'
  if (s === 'NOT_IMPLEMENTED') return '#d97706'
  if (s === 'ERROR') return '#dc2626'
  return '#94a3b8'
}

export default function Robustness({ demoMode }) {
  const [results, setResults] = useState({})
  const [running, setRunning] = useState(null)

  async function handleRunTest(id) {
    setRunning(id)
    try {
      const data = await runRobustnessTest(id)
      setResults(prev => ({ ...prev, [id]: data }))
    } catch {
      setResults(prev => ({ ...prev, [id]: { status: 'ERROR', message: 'Backend unavailable. Start the Java server on port 8080.' } }))
    } finally {
      setRunning(null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold text-white mb-1.5">Robustness Testing</h1>
      <p className="text-slate-400 text-sm mb-6">Test how the detection system responds to different media conditions.</p>
      {demoMode && <DemoBanner />}
      <div className="flex flex-col gap-3">
        {tests.map(t => {
          const r = results[t.id]
          return (
            <Card key={t.id} className="flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm">{t.label}</p>
                <p className="text-slate-500 text-xs mt-0.5">{t.desc}</p>
                {!r && <span className="text-slate-700 text-xs mt-1 block">Not tested yet</span>}
                {r?.status === 'ERROR' && <span className="text-red-400 text-xs mt-1 block">{r.message}</span>}
                {r && r.status !== 'ERROR' && (
                  <div className="flex flex-wrap gap-4 mt-1.5">
                    <span className="text-xs text-slate-500">
                      Status: <span style={{ color: statusColor(r.status) }} className="font-medium">{r.status}</span>
                    </span>
                    {r.riskScore != null && (
                      <span className="text-xs text-slate-500">Risk: <span className="font-mono text-white">{r.riskScore}</span></span>
                    )}
                    {r.latencyMs != null && (
                      <span className="text-xs text-slate-500">Latency: <span className="font-mono text-white">{r.latencyMs} ms</span></span>
                    )}
                    {r.message && <span className="text-xs text-slate-500 w-full">{r.message}</span>}
                  </div>
                )}
              </div>
              <button
                onClick={() => handleRunTest(t.id)}
                disabled={running === t.id}
                className="bg-sky-700 hover:bg-sky-600 disabled:opacity-40 text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                {running === t.id ? 'Running…' : 'Run Test'}
              </button>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
