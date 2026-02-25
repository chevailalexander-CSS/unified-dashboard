import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import MetricCard from '../components/MetricCard'
import ChartCard from '../components/ChartCard'
import { CrossSellCard } from '../components/UpsellBanner'
import {
  overviewMetrics, overviewSeries, overviewInsights, productCards,
} from '../data/mockData'

const fmt = (v) =>
  v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M`
  : v >= 1000 ? `$${(v / 1000).toFixed(0)}K`
  : v

function ProductOverviewCard({ card, onNavigate }) {
  return (
    <div className="product-ov-card" onClick={() => onNavigate(card.id)}>
      <div className="product-ov-card-hd">
        <div className="product-ov-icon" style={{ background: card.iconBg }}>{card.icon}</div>
        <span className={`badge ${card.status === 'active' ? 'badge-success' : 'badge-gray'}`}>
          {card.status === 'active' ? '● Active' : 'Inactive'}
        </span>
      </div>

      <div>
        <div className="product-ov-name">{card.name}</div>
        <div className="product-ov-tagline">{card.tagline}</div>
      </div>

      <div className="product-ov-metrics">
        {card.metrics.map((m) => (
          <div key={m.label} className="product-ov-row">
            <span className="product-ov-label">{m.label}</span>
            <span className="product-ov-value">{m.value}</span>
          </div>
        ))}
      </div>

      <div className="product-ov-footer">
        <div className="product-ov-cta">
          View {card.name} dashboard →
        </div>
      </div>
    </div>
  )
}

export default function OverviewView({ onNavigate }) {
  return (
    <div>
      {/* Page header */}
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-eyebrow">⬡ All Products</div>
          <div className="page-title">Business Overview</div>
          <div className="page-subtitle">
            Insights across all 5 active products · Updated just now
          </div>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-outline btn-sm">⬇ Export</button>
          <button className="btn btn-outline btn-sm">📅 Feb 2026</button>
          <button className="btn btn-primary btn-sm">+ Add Widget</button>
        </div>
      </div>

      {/* Global upsell — cross-sell missing product */}
      <div className="upsell-banner mb-6">
        <div className="upsell-banner-left">
          <div className="upsell-icon">🚀</div>
          <div>
            <div className="upsell-title">You're using 5 of 6 products — unlock the full suite</div>
            <div className="upsell-desc">
              Add <strong>Content Hub</strong> to centralize your CMS, SEO insights, and publish content
              from the same platform you already use. Teams with Content Hub see 34% higher organic traffic.
            </div>
            <div className="upsell-features">
              {['AI content generation', 'SEO optimization', 'Multi-channel publishing', 'Content analytics'].map((f) => (
                <span key={f} className="upsell-feat"><span className="upsell-feat-check">✓</span>{f}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="upsell-banner-right">
          <button className="btn-upsell">Add Content Hub →</button>
          <button className="upsell-dismiss" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'var(--text-xs)', color: 'var(--gray-400)' }}>
            Dismiss
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid cols-5 gap-5 mb-8">
        {overviewMetrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      {/* Combined trend + Product grid */}
      <div className="grid cols-12 gap-6 mb-8">
        {/* Revenue trend */}
        <div className="col-span-8">
          <ChartCard title="Revenue Trend" subtitle="Combined across all hubs · last 12 months">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={overviewSeries} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="var(--brand-500)" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="var(--brand-500)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={fmt} tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '10px', border: '1px solid var(--border)', fontSize: '12px', boxShadow: 'var(--shadow-lg)' }}
                  formatter={(v) => [fmt(v), 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--brand-500)" strokeWidth={2.5} fill="url(#revGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Activity volume */}
        <div className="col-span-4">
          <ChartCard title="Activity Volume" subtitle="Leads · Tickets · Sessions">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={overviewSeries.slice(-6)} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '10px', border: '1px solid var(--border)', fontSize: '12px', boxShadow: 'var(--shadow-lg)' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="leads"   name="Leads"   fill="var(--brand-500)"          radius={[3,3,0,0]} />
                <Bar dataKey="tickets" name="Tickets" fill="var(--accent-purple-500)"  radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* Product Cards + Insights */}
      <div className="grid cols-12 gap-6 mb-8">
        {/* Product grid */}
        <div className="col-span-8">
          <div className="section-hd">
            <div>
              <div className="section-title">Product Performance</div>
              <div className="section-subtitle">Click any card to open the full product dashboard</div>
            </div>
          </div>
          <div className="grid cols-3 gap-5">
            {productCards.map((card) => (
              <ProductOverviewCard key={card.id} card={card} onNavigate={onNavigate} />
            ))}
          </div>
        </div>

        {/* Insights panel */}
        <div className="col-span-4">
          <div className="section-hd">
            <div>
              <div className="section-title">AI Insights</div>
              <div className="section-subtitle">Detected across all products</div>
            </div>
            <button className="btn btn-ghost btn-sm">View all</button>
          </div>
          <div className="insight-list">
            {overviewInsights.map((ins) => (
              <div key={ins.title} className="insight-item">
                <div className="insight-dot" style={{ background: ins.color }} />
                <div className="insight-body">
                  <div className="insight-item-title">{ins.title}</div>
                  <div className="insight-item-desc">{ins.desc}</div>
                  <div className="insight-item-action">{ins.action} →</div>
                </div>
                <div className="insight-meta">{ins.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Health scorecard */}
      <div className="section-hd mb-5">
        <div>
          <div className="section-title">Product Health Scorecard</div>
          <div className="section-subtitle">Month-to-date performance vs. targets</div>
        </div>
      </div>
      <div className="card mb-8">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Primary KPI</th>
                <th>Target</th>
                <th>Actual</th>
                <th>Attainment</th>
                <th>Trend</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { product: 'Marketing Hub', kpi: 'Leads', target: '2,500', actual: '2,847', pct: 114, dir: 'up', status: 'on-track' },
                { product: 'Sales Hub',     kpi: 'Revenue', target: '$720K', actual: '$847K', pct: 118, dir: 'up', status: 'on-track' },
                { product: 'Service Hub',   kpi: 'CSAT',  target: '93%',   actual: '94.3%', pct: 101, dir: 'up', status: 'on-track' },
                { product: 'Analytics Hub', kpi: 'Sessions', target: '120K', actual: '124.6K', pct: 104, dir: 'up', status: 'on-track' },
                { product: 'Commerce Hub',  kpi: 'Orders', target: '4,000', actual: '4,829', pct: 121, dir: 'up', status: 'on-track' },
              ].map((row) => (
                <tr key={row.product}>
                  <td><span className="td-label">{row.product}</span></td>
                  <td>{row.kpi}</td>
                  <td>{row.target}</td>
                  <td><strong>{row.actual}</strong></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s3)' }}>
                      <div className="progress-track" style={{ width: 80 }}>
                        <div
                          className="progress-fill success"
                          style={{ width: `${Math.min(row.pct, 100)}%` }}
                        />
                      </div>
                      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--success-dark)' }}>
                        {row.pct}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="metric-trend trend-up">↑ vs target</span>
                  </td>
                  <td>
                    <span className="badge badge-success">On Track</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
