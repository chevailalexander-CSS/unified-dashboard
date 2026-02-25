import { useState } from 'react'

const PERIODS = ['7D', '30D', '90D', '12M']

export default function ChartCard({ title, subtitle, children, defaultPeriod = '30D', onPeriodChange, actions }) {
  const [period, setPeriod] = useState(defaultPeriod)

  function handlePeriod(p) {
    setPeriod(p)
    onPeriodChange?.(p)
  }

  return (
    <div className="card">
      <div className="card-hd">
        <div>
          <div className="card-title">{title}</div>
          {subtitle && <div className="card-subtitle">{subtitle}</div>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s3)' }}>
          {actions}
          <div className="period-selector">
            {PERIODS.map((p) => (
              <button
                key={p}
                className={`period-btn${period === p ? ' active' : ''}`}
                onClick={() => handlePeriod(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="card-body">{children}</div>
    </div>
  )
}
