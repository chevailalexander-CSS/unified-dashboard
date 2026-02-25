export default function MetricCard({ label, value, unit, trend, dir, compare, accent = 'brand', icon, iconBg }) {
  const trendClass = dir === 'up' ? 'trend-up' : dir === 'down' ? 'trend-down' : 'trend-neutral'
  const trendArrow = dir === 'up' ? '↑' : dir === 'down' ? '↓' : '→'

  return (
    <div className="metric-card">
      <div className={`metric-card-accent accent-${accent}`} />

      <div className="metric-card-hd">
        <span className="metric-label">{label}</span>
        <div className={`metric-icon ${iconBg}`}>{icon}</div>
      </div>

      <div>
        <div className="metric-value">
          {value}
          {unit && <span className="metric-value-unit">{unit}</span>}
        </div>
      </div>

      <div className="metric-ft">
        <span className={`metric-trend ${trendClass}`}>
          {trendArrow} {trend}
        </span>
        <span className="metric-compare">{compare}</span>
      </div>
    </div>
  )
}
