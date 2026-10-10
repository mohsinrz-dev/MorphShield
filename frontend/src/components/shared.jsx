export function DemoBanner() {
  return (
    <div className="bg-amber-950 border border-amber-800 rounded-lg px-4 py-2.5 flex items-start gap-2 mb-4">
      <span className="text-amber-400 font-mono text-xs font-bold tracking-wider mt-0.5 shrink-0">DEMO MODE</span>
      <span className="text-amber-300 text-xs leading-relaxed">
        Detection results shown here are simulated for prototype demonstration. They do not represent real AI analysis.
      </span>
    </div>
  )
}

export function WarningCard({ demoMode }) {
  return (
    <div className="bg-red-950 border border-red-700 rounded-xl p-5">
      <p className="text-red-400 font-semibold text-sm mb-1.5">⚠ Possible Synthetic Media Detected</p>
      <p className="text-red-200 text-sm leading-relaxed">
        Some characteristics of this media may be consistent with synthetic or manipulated content.
        Treat the call cautiously and verify the person's identity through another trusted channel.
      </p>
      {demoMode && (
        <p className="text-red-500 text-xs mt-2.5 opacity-70">This is a simulated result (Demo Mode).</p>
      )}
    </div>
  )
}

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-xl p-5 ${className}`}>
      {children}
    </div>
  )
}

export function StatusPill({ status }) {
  const styles = {
    idle:      { dot: 'bg-slate-600', text: 'text-slate-400', label: 'Waiting' },
    analyzing: { dot: 'bg-amber-400 animate-pulse', text: 'text-amber-300', label: 'Analyzing…' },
    completed: { dot: 'bg-green-500', text: 'text-green-400', label: 'Completed' },
    error:     { dot: 'bg-red-500', text: 'text-red-400', label: 'Error' },
  }
  const s = styles[status] || styles.idle
  return (
    <span className={`flex items-center gap-1.5 text-sm ${s.text}`}>
      <span className={`w-2 h-2 rounded-full inline-block ${s.dot}`} />
      {s.label}
    </span>
  )
}
