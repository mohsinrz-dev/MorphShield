import { Card } from '../components/shared.jsx'

const team = [
  { name: 'Mohsin', role: 'Team Lead',                detail: 'Project architecture, system design, and team coordination.' },
  { name: 'Neha',   role: 'Frontend Developer',       detail: 'React interface, component design, and user experience.' },
  { name: 'Monika', role: 'Backend & AI',             detail: 'Spring Boot APIs, detection service, and risk calculation logic.' },
  { name: 'Faisal', role: 'Presentation & Research',  detail: 'Research, deepfake literature review, and hackathon demo preparation.' },
  { name: 'Kabya',  role: 'Testing, Debugging & Hosting', detail: 'Testing, debugging, and hosting the MorphShield application.' },
]

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold text-white mb-2">About MorphShield</h1>
      <p className="text-slate-400 text-sm leading-relaxed mb-8">
        MorphShield is a hackathon prototype developed by Team DIAMOND for the 2026 Deepfake Defense track.
        It demonstrates a full-stack architecture for real-time deepfake voice and video risk detection —
        combining a React frontend with a Java Spring Boot backend. The system is designed to be demo-ready
        for a first-round hackathon presentation, with a clear separation between the simulated demo layer
        and a real AI integration layer that can be connected over time.
      </p>

      <h2 className="text-base font-semibold text-white mb-4">Team DIAMOND</h2>
      <div className="flex flex-col gap-3 mb-8">
        {team.map(m => (
          <Card key={m.name} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-sky-950 border border-sky-800 flex items-center justify-center text-sky-400 font-bold text-sm shrink-0">
              {m.name[0]}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">
                {m.name} <span className="text-sky-400 font-normal text-xs ml-1">— {m.role}</span>
              </p>
              <p className="text-slate-500 text-xs mt-0.5">{m.detail}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <p className="text-xs text-slate-500 leading-relaxed">
          <span className="text-slate-400 font-medium">Disclaimer:</span> MorphShield is a proof-of-concept built during a 24-hour hackathon.
          No accuracy or performance claims are made. Demo Mode values are simulated and do not reflect any actual AI measurements.
          This application should not be used for real-world security decisions.
        </p>
      </div>
    </div>
  )
}
