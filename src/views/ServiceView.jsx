import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import MetricCard from '../components/MetricCard'
import ChartCard from '../components/ChartCard'
import UpsellBanner from '../components/UpsellBanner'
import DataTable from '../components/DataTable'
import { serviceMetrics, serviceSeries, ticketTable, serviceCategories } from '../data/mockData'

const priorityStyle = { critical: 'badge-danger', high: 'badge-warning', medium: 'badge-brand', low: 'badge-gray' }
const statusStyle   = { open: 'badge-danger', 'in-progress': 'badge-info', resolved: 'badge-success' }

const ticketCols = [
  { key: 'id',       label: 'ID',       render: (r) => <span style={{ fontWeight: 700, color: 'var(--text-3)', fontFamily: 'monospace' }}>{r.id}</span> },
  { key: 'subject',  label: 'Subject',  render: (r) => <span className="td-label">{r.subject}</span> },
  { key: 'priority', label: 'Priority', render: (r) => <span className={`badge ${priorityStyle[r.priority]}`}>{r.priority}</span> },
  { key: 'assignee', label: 'Assignee' },
  { key: 'status',   label: 'Status',   render: (r) => <span className={`badge ${statusStyle[r.status]}`}>{r.status}</span> },
  { key: 'age',      label: 'Age',      render: (r) => <span style={{ color: 'var(--text-3)' }}>{r.age}</span> },
]

export default function ServiceView() {
  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-eyebrow">🎧 Service Hub</div>
          <div className="page-title">Customer Support</div>
          <div className="page-subtitle">Tickets, CSAT, SLA performance & NPS · Feb 2026</div>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-outline btn-sm">⬇ Export</button>
          <button className="btn btn-primary btn-sm">+ New Ticket</button>
        </div>
      </div>

      {/* Upsell — Enterprise AI routing */}
      <UpsellBanner
        icon="🤖"
        title="Upgrade to Service Enterprise — enable AI ticket routing and SLA enforcement"
        description="AI-powered ticket triage routes 80% of tickets to the right agent automatically, cutting first-response time by up to 40%. Add SLA policies, escalation rules, and CSAT reporting by segment."
        features={['AI ticket classification', 'Automated routing rules', 'SLA policies & alerts', 'Segment-level CSAT', 'Custom report builder']}
        ctaLabel="See Enterprise Plans"
      />

      {/* KPIs */}
      <div className="grid cols-4 gap-5 mb-8 mt-6">
        {serviceMetrics.map((m) => <MetricCard key={m.label} {...m} />)}
      </div>

      {/* Charts */}
      <div className="grid cols-12 gap-6 mb-8">
        <div className="col-span-8">
          <ChartCard title="Tickets Resolved & CSAT" subtitle="Monthly support volume and satisfaction score">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={serviceSeries} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="resolvedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="var(--brand-500)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--brand-500)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="csatGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="var(--success)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--success)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="resolved" tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="csat" orientation="right" domain={[85, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid var(--border)', fontSize: '12px', boxShadow: 'var(--shadow-lg)' }} />
                <Area yAxisId="resolved" type="monotone" dataKey="resolved" name="Tickets Resolved" stroke="var(--brand-500)" strokeWidth={2.5} fill="url(#resolvedGrad)" dot={false} />
                <Area yAxisId="csat"     type="monotone" dataKey="csat"     name="CSAT (%)"          stroke="var(--success)"   strokeWidth={2}   fill="url(#csatGrad)"    dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="col-span-4">
          <div className="card" style={{ height: '100%' }}>
            <div className="card-hd">
              <div>
                <div className="card-title">Ticket Categories</div>
                <div className="card-subtitle">This month's distribution</div>
              </div>
            </div>
            <div className="card-body">
              {serviceCategories.map((c) => (
                <div key={c.name} style={{ marginBottom: 'var(--s4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--s2)', fontSize: 'var(--text-xs)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-2)' }}>{c.name}</span>
                    <span style={{ color: 'var(--text-3)' }}>{c.count} · {c.pct}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${c.pct * 2}%`, background: c.color }} />
                  </div>
                </div>
              ))}

              <div className="callout callout-warning" style={{ marginTop: 'var(--s5)' }}>
                <div className="callout-icon">⚠️</div>
                <div className="callout-text">
                  <div className="callout-title">Response time at risk</div>
                  3 critical tickets have been open for {'>'} 4 hours. SLA breach in 2 hours.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Response time trend */}
      <div className="mb-8">
        <ChartCard title="Average Response Time" subtitle="Hours to first response · target ≤ 2 hours">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={serviceSeries} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `${v.toFixed(1)}h`} tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid var(--border)', fontSize: '12px', boxShadow: 'var(--shadow-lg)' }} formatter={(v) => [`${v.toFixed(1)}h`, 'Avg Response']} />
              <Bar dataKey="responseH" name="Avg Response (h)" fill="var(--info)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Ticket queue */}
      <DataTable
        title="Active Ticket Queue"
        subtitle="Sorted by priority and age"
        columns={ticketCols}
        rows={ticketTable}
      />
    </div>
  )
}
