import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import MetricCard from '../components/MetricCard'
import ChartCard from '../components/ChartCard'
import UpsellBanner from '../components/UpsellBanner'
import { LockedFeatureCard } from '../components/UpsellBanner'
import DataTable from '../components/DataTable'
import { commerceMetrics, commerceSeries, topProducts } from '../data/mockData'

const productCols = [
  { key: 'name',    label: 'Product',   render: (r) => <span className="td-label">{r.name}</span> },
  { key: 'sku',     label: 'SKU',       render: (r) => <code style={{ fontSize: 'var(--text-xs)', background: 'var(--gray-100)', padding: '2px 6px', borderRadius: 4, color: 'var(--text-2)' }}>{r.sku}</code> },
  { key: 'units',   label: 'Units Sold', render: (r) => <strong>{r.units.toLocaleString()}</strong> },
  { key: 'revenue', label: 'Revenue',   render: (r) => <strong style={{ color: 'var(--success-dark)' }}>{r.revenue}</strong> },
  { key: 'margin',  label: 'Margin',    render: (r) => <span className="badge badge-success">{r.margin}</span> },
]

export default function CommerceView() {
  return (
    <div>
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-eyebrow">🛍️ Commerce Hub</div>
          <div className="page-title">Commerce Performance</div>
          <div className="page-subtitle">Orders, revenue, products & returns · Feb 2026</div>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-outline btn-sm">⬇ Export</button>
          <button className="btn btn-primary btn-sm">+ New Product</button>
        </div>
      </div>

      {/* Upsell — Commerce Plus */}
      <UpsellBanner
        icon="🛒"
        title="Add Commerce Plus — multi-currency, abandoned cart recovery, and loyalty programs"
        description="Teams on Commerce Plus recover an average of 18% of abandoned carts and see a 3.4× increase in repeat purchase rates through loyalty rewards. Multi-currency supports 40+ currencies with live FX rates."
        features={['Abandoned cart recovery', 'Multi-currency checkout', 'Loyalty & rewards program', 'Subscription billing', 'Advanced tax handling']}
        ctaLabel="Add Commerce Plus"
      />

      {/* KPIs */}
      <div className="grid cols-4 gap-5 mb-8 mt-6">
        {commerceMetrics.map((m) => <MetricCard key={m.label} {...m} />)}
      </div>

      {/* Revenue + AOV charts */}
      <div className="grid cols-12 gap-6 mb-8">
        <div className="col-span-8">
          <ChartCard title="Revenue & Orders" subtitle="Monthly gross revenue and order volume">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={commerceSeries} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="comRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="var(--brand-500)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--brand-500)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="comOrdGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="var(--success)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--success)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="rev" tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="orders" orientation="right" tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '10px', border: '1px solid var(--border)', fontSize: '12px', boxShadow: 'var(--shadow-lg)' }}
                  formatter={(v, n) => n === 'Revenue' ? [`$${(v/1000).toFixed(1)}K`, n] : [v.toFixed(0), n]}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Area yAxisId="rev"    type="monotone" dataKey="revenue" name="Revenue" stroke="var(--brand-500)" strokeWidth={2.5} fill="url(#comRevGrad)" dot={false} />
                <Area yAxisId="orders" type="monotone" dataKey="orders"  name="Orders"  stroke="var(--success)"   strokeWidth={2}   fill="url(#comOrdGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="col-span-4">
          <div className="card" style={{ height: '100%' }}>
            <div className="card-hd">
              <div>
                <div className="card-title">AOV & Return Rate</div>
                <div className="card-subtitle">Order quality metrics</div>
              </div>
            </div>
            <div className="card-body">
              {[
                { label: 'Avg Order Value',   value: '$128.70', note: '+$4.00 vs prev.', color: 'var(--success-dark)', good: true },
                { label: 'Return Rate',       value: '4.2%',    note: '-1.1pp vs prev.', color: 'var(--success-dark)', good: true },
                { label: 'Refund Amount',     value: '$26,100', note: '-8.3% vs prev.', color: 'var(--success-dark)', good: true },
                { label: 'Repeat Customers',  value: '38.4%',   note: '+2.7pp vs prev.', color: 'var(--success-dark)', good: true },
                { label: 'Cart Abandonment',  value: '67.2%',   note: '+1.4pp vs prev.', color: 'var(--danger-dark)', good: false },
              ].map((r) => (
                <div key={r.label} className="stat-row">
                  <span className="stat-row-label">{r.label}</span>
                  <div style={{ textAlign: 'right' }}>
                    <div className="stat-row-value">{r.value}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: r.color, fontWeight: 600 }}>{r.note}</div>
                  </div>
                </div>
              ))}

              <div className="callout callout-warning" style={{ marginTop: 'var(--s5)' }}>
                <div className="callout-icon">💡</div>
                <div className="callout-text">
                  <div className="callout-title">Cart abandonment up</div>
                  67.2% abandonment rate. Upgrade to Commerce Plus to recover lost carts automatically.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top products */}
      <div className="mb-8">
        <DataTable
          title="Top Products by Revenue"
          subtitle="This period's best-performing SKUs"
          columns={productCols}
          rows={topProducts}
        />
      </div>

      {/* AOV trend */}
      <div className="mb-8">
        <ChartCard title="Average Order Value Trend" subtitle="AOV improvement over 12 months">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={commerceSeries} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `$${v.toFixed(0)}`} domain={[100, 145]} tick={{ fontSize: 11, fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid var(--border)', fontSize: '12px', boxShadow: 'var(--shadow-lg)' }} formatter={(v) => [`$${v.toFixed(2)}`, 'AOV']} />
              <Bar dataKey="aov" name="AOV ($)" fill="var(--warning)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Locked — loyalty program */}
      <div className="section-hd mb-5">
        <div>
          <div className="section-title">Loyalty Program Dashboard</div>
          <div className="section-subtitle">Track points, tiers, redemptions, and program ROI</div>
        </div>
      </div>
      <LockedFeatureCard
        icon="🏅"
        title="Loyalty Program — Commerce Plus Feature"
        description="Set up a tiered loyalty rewards program and track points issued, tier upgrades, redemptions, and estimated program ROI — all in one place. Available on Commerce Plus."
        ctaLabel="Add Commerce Plus"
      />
    </div>
  )
}
