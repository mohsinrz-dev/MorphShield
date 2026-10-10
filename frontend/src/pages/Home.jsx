import { useNavigate } from 'react-router-dom'
import { Card } from '../components/shared.jsx'

const team = [
  { name: 'Mohsin', role: 'Team Lead' },
  { name: 'Neha', role: 'Frontend Developer' },
  { name: 'Monika', role: 'Backend & AI' },
  { name: 'Faisal', role: 'Presentation & Research' },
  { name: 'Kabya', role: 'Testing, Debugging & Hosting' },
]

const steps = [
  { n: '1', title: 'Input Media', body: 'Upload a video or audio file, or use your camera if browser permissions allow.' },
  { n: '2', title: 'Analysis', body: 'The backend processes audio and video signals independently through separate analysis modules.' },
  { n: '3', title: 'Risk Output', body: 'A combined risk score and level is returned to the dashboard. A warning appears if the threshold is crossed.' },
]

const capabilities = [
  { title: 'Voice Analysis', body: 'Examines audio characteristics that may indicate synthetic speech or voice-cloning patterns.' },
  { title: 'Video Analysis', body: 'Inspects video frames for visual inconsistencies commonly found in manipulated media.' },
  { title: 'Risk Scoring', body: 'Combines audio and video signals into a configurable 0–100 risk score with three levels.' },
  { title: 'Demo Mode', body: 'Fully functional prototype demonstration without requiring a live media source or connected AI model.' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-sky-950 border border-sky-800 text-sky-400 text-xs font-mono font-semibold px-3 py-1 rounded-full mb-6">
          <span>HACKATHON PROTOTYPE</span>
          <span className="text-sky-700">·</span>
          <span>TEAM DIAMOND</span>
          <span className="text-sky-700">·</span>
          <span>2026</span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">MorphShield</h1>
        <p className="text-lg text-sky-400 font-medium mb-5">Real-Time Deepfake Voice &amp; Video Scam Detection</p>
        <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed mb-8">
          Deepfake technology is increasingly weaponised in fraud, impersonation, and misinformation campaigns.
          MorphShield is a prototype platform that analyses voice and video media for characteristics consistent
          with synthetic content, and surfaces a risk score to help users make more informed decisions.
        </p>
        <button onClick={() => navigate('/detection')} className="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
          Start Detection
        </button>
      </div>

      <section className="mb-14">
        <h2 className="text-base font-semibold text-white mb-5">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map(s => (
            <div key={s.n} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-900 text-sky-400 flex items-center justify-center font-mono font-bold text-sm mb-3">
                {s.n}
              </div>
              <div className="font-semibold text-white text-sm mb-1">{s.title}</div>
              <div className="text-slate-400 text-xs leading-relaxed">{s.body}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-base font-semibold text-white mb-5">Key capabilities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {capabilities.map(c => (
            <Card key={c.title}>
              <div className="font-medium text-white text-sm mb-1">{c.title}</div>
              <div className="text-slate-400 text-xs leading-relaxed">{c.body}</div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-base font-semibold text-white mb-5">Team DIAMOND</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {team.map(m => (
            <div key={m.name} className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
              <div className="w-10 h-10 rounded-full bg-sky-950 border border-sky-800 mx-auto mb-2.5 flex items-center justify-center text-sky-400 font-bold text-sm">
                {m.name[0]}
              </div>
              <div className="text-white font-semibold text-sm">{m.name}</div>
              <div className="text-slate-500 text-xs mt-0.5">{m.role}</div>
            </div>
          ))}
        </div>
      </section>

      <p className="text-center text-xs text-slate-700 leading-relaxed max-w-xl mx-auto">
        MorphShield is a hackathon prototype. It does not provide production-level deepfake detection
        and should not be relied upon for real security decisions.
      </p>
    </div>
  )
}
