export default function TodoPage({ title, route, features = [], apiEndpoints = [] }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-amber-950 border-2 border-amber-600 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">🚧</span>
          <span className="text-amber-400 font-mono font-bold text-sm tracking-wider">NOT YET BUILT</span>
        </div>
        <h1 className="text-white text-2xl font-bold mb-2">{title}</h1>
        <p className="text-amber-300 text-sm">
          This page exists in the Figma prototype but has not been converted to code yet.
          The backend API for this page <span className="font-semibold text-white">is already complete</span>.
          Only the frontend UI needs to be built.
        </p>
        <p className="text-amber-500 text-xs mt-2">Route: <span className="font-mono text-amber-300">{route}</span></p>
      </div>

      {features.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-4">
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">What this page should show (from Figma)</p>
          <ul className="space-y-2">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-slate-600 mt-0.5">•</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {apiEndpoints.length > 0 && (
        <div className="bg-slate-900 border border-green-900 rounded-xl p-5">
          <p className="text-green-400 text-xs font-semibold uppercase tracking-wider mb-3">✅ Backend API already ready</p>
          <ul className="space-y-1">
            {apiEndpoints.map((e, i) => (
              <li key={i} className="font-mono text-xs text-slate-300 bg-slate-800 px-3 py-1.5 rounded">{e}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
