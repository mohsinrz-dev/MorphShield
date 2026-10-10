import { DemoBanner, Card } from '../components/shared.jsx'

function riskColor(n) {
  if (n < 31) return '#16a34a'
  if (n < 61) return '#d97706'
  return '#dc2626'
}

export default function Results({ result, demoMode }) {
  const rows = result ? [
    { label: 'Audio Risk',        value: result.audioRisk + ' / 100',   mono: true },
    { label: 'Video Risk',        value: result.videoRisk + ' / 100',   mono: true },
    { label: 'Overall Risk',      value: result.overallRisk + ' / 100', mono: true, bold: true },
    { label: 'Risk Level',        value: result.riskLevel,              color: riskColor(result.overallRisk) },
    { label: 'Warning Triggered', value: result.warning ? 'Yes' : 'No', color: result.warning ? '#dc2626' : '#16a34a' },
    { label: 'Processing Time',   value: result.latencyMs + ' ms',      mono: true },
    { label: 'Mode',              value: result.demoMode ? 'Demo Mode' : 'Live Analysis' },
    { label: 'Timestamp',         value: new Date().toLocaleString() },
  ] : []

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold text-white mb-5">Detection Results</h1>
      {demoMode && <DemoBanner />}
      {!result ? (
        <Card className="text-center py-14">
          <p className="text-slate-500 text-sm">No detection has been run yet.</p>
          <p className="text-slate-600 text-xs mt-1">Go to the Detection page and start an analysis.</p>
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="divide-y divide-slate-800">
            {rows.map(r => (
              <div key={r.label} className="flex justify-between items-center px-5 py-3.5">
                <span className="text-slate-400 text-sm">{r.label}</span>
                <span
                  style={{ color: r.color || '#f8fafc', fontWeight: r.bold ? 700 : 500 }}
                  className={`text-sm ${r.mono ? 'font-mono' : ''}`}
                >
                  {r.value}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
