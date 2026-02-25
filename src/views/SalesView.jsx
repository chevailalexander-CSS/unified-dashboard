import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import MetricCard from '../components/MetricCard'
import ChartCard from '../components/ChartCard'
import UpsellBanner from '../components/UpsellBanner'
import DataTable from '../components/DataTable'
import { salesMetrics, salesSeries, dealTable, pipelineStages } from '../data/mockData'

const stageColors = { Prospecting: 'badge-gray', Discovery: 'badge-info', Proposal: 'badge-brand', Negotiation: 'badge-warning', 'Closed Won': 'badge-success' }
const probColors  = (p) => p === '100%' ? 'var(--success-dark)' : parseInt(p) >= 60 ? 'var(--info-dark)' : 'var(--text-2)'

const dealCols = [
  { key: 'company', label: 'Company',    render: (r) => <span className="td-label">{r.company}</span> },
  { key: 'rep',     label: 'Rep' },
  { key: 'stage',   label: 'Stage',     render: (r) => <span className={`badge ${stageColors[r.stage] || 'badge-gray'}`}>{r.stage}</span> },
  { key: 'value',   label: 'Value',     render: (r) => <strong>{r.value}</strong> },
  { key: 'prob',    label: 'Win Prob.', render: (r) => <span style={{ fontWeight: 700, color: probColors(r.prob) }}>{r.prob}</span> },
  { key: 'close',   label: 'Est. Close' },
]

export default function SalesView() {
  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-eyebrow">💰 Sales Hub</div>
          <div className="page-title">Sales Performance</div>
          <div className="page-subtitle">Pipeline, deals, forecasting & revenue · Feb 2026</div>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-outline btn-sm">⬇ Export</button>
          <button className="btn btn-primary btn-sm">+ Add Deal</button>
        </div>
      </div>

      {/* Upsell — Sales Intelligence */}
      <UpsellBanner
        icon="🔭"
        title="Add Sales Intelligence — see buyer intent signals before your reps even reach out"
        description="Sales Intelligence enriches your CRM with real-time intent data, LinkedIn insights, and automated outreach sequences. Reps using it close 28% more deals and ramp 3 weeks faster."
        features={['Buyer intent signals', 'Auto-enriched contacts', 'AI-powered forecasting', 'Automated sequences', 'Competitive battlecards']}
        ctaLabel="Try for Free"
      />

      {/* KPIs */}
      <div className="grid cols-4 gap-5 mb-8 mt-6">
        {salesMetrics.map((m) => <MetricCard key={m.label} {...m} />)}
      </div>

      {/* Revenue + Win Rate charts */}
      <div className="grid cols-12 gap-6 mb-8">
        <div className="col-span-8">
          <ChartCard title="Revenue & Pipeline" subtitle="Monthly revenue realized vs. pipeline built">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={salesSeries} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="revGradS" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="var(--success)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--success)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="pipeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="var(--brand-500)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--brand-500)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '10px', border: '1px solid var(--border)', fontSize: '12px', boxShadow: 'var(--shadow-lg)' }}
                  formatter={(v, n) => [`$${(v/1000).toFixed(0)}K`, n]}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Area type="monotone" dataKey="pipeline" name="Pipeline" stroke="var(--brand-500)" strokeWidth={2} fill="url(#pipeGrad)" dot={false} />
                <Area type="monotone" dataKey="revenue"  name="Revenue"  stroke="var(--success)"   strokeWidth={2.5} fill="url(#revGradS)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="col-span-4">
          <div className="card" style={{ height: '100%' }}>
            <div className="card-hd">
              <div>
                <div className="card-title">Pipeline Stages</div>
                <div className="card-subtitle">Deals & value by stage</div>
              </div>
            </div>
            <div className="card-body">
              {pipelineStages.map((s) => (
                <div key={s.stage} style={{ marginBottom: 'var(--s4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--s2)', fontSize: 'var(--text-xs)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-2)' }}>{s.stage}</span>
                    <span style={{ color: 'var(--text-3)' }}>{s.count} deals · {s.value}</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill brand" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Win rate over time */}
      <div className="mb-8">
        <ChartCard title="Win Rate Trend" subtitle="Monthly deal win rate % · target is 35%">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={salesSeries} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="winGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="var(--info)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--info)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${v.toFixed(0)}%`} domain={[25, 40]} tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '10px', border: '1px solid var(--border)', fontSize: '12px', boxShadow: 'var(--shadow-lg)' }}
                formatter={(v) => [`${v.toFixed(1)}%`, 'Win Rate']}
              />
              <Area type="monotone" dataKey="winRate" name="Win Rate (%)" stroke="var(--info)" strokeWidth={2.5} fill="url(#winGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Top deals */}
      <DataTable
        title="Top Deals — Open Pipeline"
        subtitle="Sorted by estimated close date"
        columns={dealCols}
        rows={dealTable}
      />
    </div>
  )
}
