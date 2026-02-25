import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import MetricCard from '../components/MetricCard'
import ChartCard from '../components/ChartCard'
import UpsellBanner from '../components/UpsellBanner'
import DataTable from '../components/DataTable'
import {
  marketingMetrics, marketingSeries, campaignTable, channelBreakdown,
} from '../data/mockData'

const statusColors = { active: 'badge-success', paused: 'badge-warning', ended: 'badge-gray' }

const campaignCols = [
  { key: 'name',    label: 'Campaign',  render: (r) => <span className="td-label">{r.name}</span> },
  { key: 'channel', label: 'Channel',   render: (r) => <span className="badge badge-gray">{r.channel}</span> },
  { key: 'leads',   label: 'Leads',     render: (r) => <strong>{r.leads}</strong> },
  { key: 'cpl',     label: 'CPL' },
  { key: 'conv',    label: 'Conv. Rate', render: (r) => <span style={{ color: 'var(--success-dark)', fontWeight: 700 }}>{r.conv}</span> },
  { key: 'status',  label: 'Status',    render: (r) => <span className={`badge ${statusColors[r.status]}`}>{r.status}</span> },
]

export default function MarketingView() {
  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-eyebrow">📣 Marketing Hub</div>
          <div className="page-title">Marketing Performance</div>
          <div className="page-subtitle">Campaigns, lead gen, and email performance · Feb 2026</div>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-outline btn-sm">⬇ Export</button>
          <button className="btn btn-primary btn-sm">+ New Campaign</button>
        </div>
      </div>

      {/* Upsell — A/B testing & AI */}
      <UpsellBanner
        icon="🧪"
        title="Upgrade to Marketing Pro — unlock A/B testing and AI content generation"
        description="Your current plan doesn't include multivariate A/B testing or AI-powered subject line optimization. Teams using these features average 2.4× higher email conversion rates."
        features={['A/B & multivariate testing', 'AI subject line optimizer', 'Predictive lead scoring', 'Advanced segmentation', 'Send-time optimization']}
        ctaLabel="Start Free Trial"
      />

      {/* KPIs */}
      <div className="grid cols-4 gap-5 mb-8 mt-6">
        {marketingMetrics.map((m) => <MetricCard key={m.label} {...m} />)}
      </div>

      {/* Charts row */}
      <div className="grid cols-12 gap-6 mb-8">
        <div className="col-span-8">
          <ChartCard title="Lead & Spend Trends" subtitle="Monthly leads generated vs. marketing spend">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={marketingSeries} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="mktLeadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="var(--brand-500)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--brand-500)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="mktSpendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="var(--warning)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--warning)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="leads" tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="spend" orientation="right" tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid var(--border)', fontSize: '12px', boxShadow: 'var(--shadow-lg)' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Area yAxisId="leads" type="monotone" dataKey="leads" name="Leads" stroke="var(--brand-500)" strokeWidth={2.5} fill="url(#mktLeadGrad)" dot={false} />
                <Area yAxisId="spend" type="monotone" dataKey="spend" name="Spend ($)" stroke="var(--warning)" strokeWidth={2} fill="url(#mktSpendGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="col-span-4">
          <ChartCard title="Channel Mix" subtitle="Lead source distribution">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={channelBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3}>
                  {channelBreakdown.map((entry) => (
                    <Cell key={entry.channel} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '10px', border: '1px solid var(--border)', fontSize: '12px' }}
                  formatter={(v, n, p) => [`${p.payload.value}%`, p.payload.channel]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s2)', marginTop: 'var(--s3)' }}>
              {channelBreakdown.map((ch) => (
                <div key={ch.channel} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 'var(--text-xs)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s2)' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: ch.color, flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-2)' }}>{ch.channel}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--text-1)' }}>{ch.value}%</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Email performance */}
      <div className="grid cols-12 gap-6 mb-8">
        <div className="col-span-8">
          <DataTable
            title="Active Campaigns"
            subtitle="Performance for the current period"
            columns={campaignCols}
            rows={campaignTable}
          />
        </div>

        <div className="col-span-4">
          <div className="card" style={{ height: '100%' }}>
            <div className="card-hd">
              <div>
                <div className="card-title">Email Funnel</div>
                <div className="card-subtitle">Average across all active campaigns</div>
              </div>
            </div>
            <div className="card-body">
              {[
                { label: 'Sent',     value: '84,240', pct: 100, color: 'brand' },
                { label: 'Delivered',value: '82,108', pct: 97,  color: 'brand' },
                { label: 'Opened',   value: '38,113', pct: 45,  color: 'success' },
                { label: 'Clicked',  value: '7,326',  pct: 9,   color: 'info' },
                { label: 'Converted',value: '7,326',  pct: 9,   color: 'warning' },
              ].map((s) => (
                <div key={s.label} className="stat-row">
                  <div>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-1)' }}>{s.label}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-3)', marginTop: 4 }}>
                      <div className="progress-track" style={{ width: 120 }}>
                        <div className={`progress-fill ${s.color}`} style={{ width: `${s.pct}%` }} />
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700 }}>{s.value}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-3)' }}>{s.pct}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conversion rate chart */}
      <ChartCard title="Conversion Rate Over Time" subtitle="Campaign conversion % across all channels · 12 months">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={marketingSeries} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: '10px', border: '1px solid var(--border)', fontSize: '12px', boxShadow: 'var(--shadow-lg)' }}
              formatter={(v) => [`${v.toFixed(1)}%`, 'Conversion Rate']}
            />
            <Bar dataKey="conversions" name="Conv. Rate (%)" fill="var(--brand-500)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}
