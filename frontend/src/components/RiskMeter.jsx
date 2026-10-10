function riskColor(value) {
  if (value < 31) return '#16a34a'
  if (value < 61) return '#d97706'
  return '#dc2626'
}

function riskLabel(value) {
  if (value < 31) return 'Low Risk'
  if (value < 61) return 'Suspicious'
  return 'High Synthetic-Media Risk'
}

export default function RiskMeter({ value = 0 }) {
  const r = 78
  const cx = 90
  const cy = 92
  const arcLength = Math.PI * r
  const dashOffset = arcLength * (1 - Math.min(value, 100) / 100)
  const color = riskColor(value)
  const arcPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`

  return (
    <div className="flex flex-col items-center">
      <svg width="180" height="105" viewBox="0 0 180 105">
        <path d={arcPath} fill="none" stroke="#1e3a52" strokeWidth="10" strokeLinecap="round" />
        <path
          d={arcPath}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={arcLength}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.4s' }}
        />
        <text x={cx} y={cy - 10} textAnchor="middle" fill="white" fontSize="32" fontWeight="700" fontFamily="JetBrains Mono, monospace">
          {value}
        </text>
        <text x={cx} y={cy + 8} textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="Inter, sans-serif">
          out of 100
        </text>
      </svg>
      <span style={{ color, fontWeight: 600, fontSize: 13 }}>{riskLabel(value)}</span>
    </div>
  )
}
