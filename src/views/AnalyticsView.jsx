import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import MetricCard from '../components/MetricCard'
import ChartCard from '../components/ChartCard'
import UpsellBanner from '../components/UpsellBanner'
import { LockedFeatureCard } from '../components/UpsellBanner'
import DataTable from '../components/DataTable'
import { analyticsMetrics, analyticsSeries, topPages, trafficSources } from '../data/mockData'

const changeColor = (v) => v.startsWith('+') ? 'var(--success-dark)' : 'var(--danger-dark)'

const pageCols = [
  { key: 'page',     label: 'Page',     render: (r) => <code style={{ fontSize: 'var(--text-xs)', background: 'var(--gray-100)', padding: '2px 6px', borderRadius: 4, color: 'var(--text-2)' }}>{r.page}</code> },
  { key: 'sessions', label: 'Sessions', render: (r) => <strong>{r.sessions.toLocaleString()}</strong> },
  { key: 'bounce',   label: 'Bounce Rate' },
  { key: 'convRate', label: 'Conv. Rate', render: (r) => <span style={{ fontWeight: 700, color: 'var(--success-dark)' }}>{r.convRate}</span> },
  { key: 'change',   label: 'Change',    render: (r) => <span style={{ fontWeight: 700, color: changeColor(r.change) }}>{r.change}</span> },
]

export default function AnalyticsView() {
  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-eyebrow">📊 Analytics Hub</div>
          <div className="page-title">Website Analytics</div>
          <div className="page-subtitle">Traffic, conversions, user behavior · Feb 2026</div>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-outline btn-sm">⬇ Export</button>
          <button className="btn btn-primary btn-sm">+ New Report</button>
        </div>
      </div>

      {/* Upsell — Pro Analytics */}
      <UpsellBanner
        icon="📡"
        title="Upgrade to Analytics Pro — cohort analysis, custom dashboards, and data export"
        description="You're on the Starter analytics tier. Pro unlocks cohort retention analysis, fully custom drag-and-drop dashboards, scheduled email reports, and raw data export via API or CSV."
        features={['Cohort & retention analysis', 'Custom dashboards', 'Scheduled reports', 'Data export API', 'Session recordings']}
        ctaLabel="Upgrade to Pro"
      />

      {/* KPIs */}
      <div className="grid cols-4 gap-5 mb-8 mt-6">
        {analyticsMetrics.map((m) => <MetricCard key={m.label} {...m} />)}
      </div>

      {/* Sessions trend */}
      <div className="mb-8">
        <ChartCard title="Sessions & Users" subtitle="Daily unique visitors and session volume · 12 months">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={analyticsSeries} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="sessGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="var(--brand-500)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--brand-500)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="var(--success)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="var(--success)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '10px', border: '1px solid var(--border)', fontSize: '12px', boxShadow: 'var(--shadow-lg)' }}
                formatter={(v, n) => [`${(v / 1000).toFixed(1)}K`, n]}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Area type="monotone" dataKey="sessions" name="Sessions" stroke="var(--brand-500)" strokeWidth={2.5} fill="url(#sessGrad)" dot={false} />
              <Area type="monotone" dataKey="users"    name="Users"    stroke="var(--success)"   strokeWidth={2}   fill="url(#userGrad)"   dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Traffic sources + Conversion funnel */}
      <div className="grid cols-12 gap-6 mb-8">
        <div className="col-span-5">
          <div className="card">
            <div className="card-hd">
              <div>
                <div className="card-title">Traffic Sources</div>
                <div className="card-subtitle">Session breakdown by acquisition channel</div>
              </div>
            </div>
            <div className="card-body">
              {trafficSources.map((s) => (
                <div key={s.source} style={{ marginBottom: 'var(--s4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--s2)', fontSize: 'var(--text-xs)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s2)' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                      <span style={{ fontWeight: 600, color: 'var(--text-2)' }}>{s.source}</span>
                    </div>
                    <span style={{ color: 'var(--text-3)' }}>{s.sessions.toLocaleString()} · {s.pct}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${s.pct * 2.5}%`, background: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-7">
          <ChartCard title="Conversion Rate" subtitle="Monthly conversion % · target is 4%">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={analyticsSeries} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `${v.toFixed(1)}%`} domain={[2, 5]} tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid var(--border)', fontSize: '12px', boxShadow: 'var(--shadow-lg)' }} formatter={(v) => [`${v.toFixed(2)}%`, 'Conv. Rate']} />
                <Bar dataKey="convRate" name="Conv. Rate (%)" fill="var(--success)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>

      {/* Top pages */}
      <div className="mb-8">
        <DataTable
          title="Top Pages"
          subtitle="By session volume this period"
          columns={pageCols}
          rows={topPages}
        />
      </div>

      {/* Locked — cohort analysis */}
      <div className="section-hd mb-5">
        <div>
          <div className="section-title">Cohort Retention Analysis</div>
          <div className="section-subtitle">Track how users return over time after their first visit</div>
        </div>
      </div>
      <LockedFeatureCard
        icon="🔒"
        title="Cohort Analysis — Analytics Pro Feature"
        description="Cohort retention analysis shows you exactly how your product retains users week-over-week after their first session. Upgrade to Analytics Pro to unlock this and 12 more advanced reports."
        ctaLabel="Upgrade to Analytics Pro"
      />
    </div>
  )
}
