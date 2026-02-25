// ──────────────────────────────────────────
//  TIME-SERIES DATA (12 months)
// ──────────────────────────────────────────
const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan']

export const overviewSeries = months.map((month, i) => ({
  month,
  revenue:    380000 + i * 38000 + Math.sin(i) * 18000,
  leads:      1800   + i * 95   + Math.sin(i * 1.3) * 200,
  tickets:    840    + i * 28   + Math.sin(i * 0.9) * 60,
  sessions:   88000  + i * 3100 + Math.sin(i * 1.1) * 4000,
}))

export const marketingSeries = months.map((month, i) => ({
  month,
  leads:      980  + i * 60 + Math.sin(i * 1.3) * 80,
  opens:      42   + i * 0.25 + Math.sin(i * 0.8) * 2,
  conversions:7.2  + i * 0.12 + Math.sin(i * 1.5) * 0.4,
  spend:      18000 + i * 600 + Math.sin(i * 0.7) * 1200,
}))

export const salesSeries = months.map((month, i) => ({
  month,
  revenue:    62000  + i * 7200 + Math.sin(i * 1.1) * 5000,
  deals:      28     + i * 1.4  + Math.sin(i * 0.9) * 3,
  pipeline:   210000 + i * 14000 + Math.sin(i * 1.2) * 12000,
  winRate:    31     + i * 0.27 + Math.sin(i * 0.7) * 1.5,
}))

export const serviceSeries = months.map((month, i) => ({
  month,
  resolved:   820  + i * 36 + Math.sin(i * 1.4) * 50,
  csat:       91   + i * 0.28 + Math.sin(i * 0.6) * 0.8,
  responseH:  3.8  - i * 0.12 + Math.sin(i * 1.2) * 0.2,
  escalations:62   - i * 1.8 + Math.sin(i * 0.9) * 4,
}))

export const analyticsSeries = months.map((month, i) => ({
  month,
  sessions:   72000  + i * 4400 + Math.sin(i * 1.3) * 5000,
  users:      48000  + i * 2800 + Math.sin(i * 1.1) * 3200,
  convRate:   3.1    + i * 0.06 + Math.sin(i * 0.9) * 0.2,
  bounce:     46     - i * 0.32 + Math.sin(i * 0.7) * 1,
}))

export const commerceSeries = months.map((month, i) => ({
  month,
  orders:  2800  + i * 180 + Math.sin(i * 1.2) * 200,
  revenue: 48000 + i * 5000 + Math.sin(i * 1.1) * 4000,
  aov:     118   + i * 0.9 + Math.sin(i * 0.8) * 3,
  returns: 5.2   - i * 0.08 + Math.sin(i * 1.3) * 0.3,
}))

// ──────────────────────────────────────────
//  MARKETING DATA
// ──────────────────────────────────────────
export const marketingMetrics = [
  { label: 'Leads Generated',    value: '2,847',  trend: '+12.4%', dir: 'up',   compare: 'vs last period', accent: 'brand',   icon: '🎯', iconBg: 'icon-brand' },
  { label: 'Email Open Rate',    value: '45.2%',  trend: '+3.1pp', dir: 'up',   compare: 'vs last period', accent: 'success', icon: '📧', iconBg: 'icon-success' },
  { label: 'Campaign Conv. Rate',value: '8.7%',   trend: '+1.2pp', dir: 'up',   compare: 'vs last period', accent: 'info',    icon: '📈', iconBg: 'icon-info' },
  { label: 'Cost Per Lead',      value: '$34.50', trend: '-8.3%',  dir: 'up',   compare: 'vs last period', accent: 'warning', icon: '💸', iconBg: 'icon-warning' },
]

export const campaignTable = [
  { name: 'Q1 Brand Awareness',   channel: 'Paid Social', leads: 487, cpl: '$28.40', conv: '9.2%', status: 'active' },
  { name: 'Product Launch — Pro', channel: 'Email',       leads: 634, cpl: '$12.10', conv: '14.6%', status: 'active' },
  { name: 'Retargeting Sweep',    channel: 'Display',     leads: 218, cpl: '$41.20', conv: '5.8%',  status: 'paused' },
  { name: 'SEO Nurture Series',   channel: 'Organic',     leads: 391, cpl: '$8.70',  conv: '11.3%', status: 'active' },
  { name: 'Partner Co-marketing', channel: 'Events',      leads: 156, cpl: '$52.00', conv: '7.4%',  status: 'ended' },
]

export const channelBreakdown = [
  { channel: 'Email',      value: 34, color: 'var(--brand-600)' },
  { channel: 'Paid Social',value: 28, color: 'var(--accent-purple-500)' },
  { channel: 'Organic',    value: 22, color: 'var(--success)' },
  { channel: 'Display',    value: 10, color: 'var(--info)' },
  { channel: 'Events',     value: 6,  color: 'var(--warning)' },
]

// ──────────────────────────────────────────
//  SALES DATA
// ──────────────────────────────────────────
export const salesMetrics = [
  { label: 'Total Revenue',   value: '$847K',  trend: '+18.7%', dir: 'up',   compare: 'vs last period', accent: 'success', icon: '💰', iconBg: 'icon-success' },
  { label: 'Pipeline Value',  value: '$2.1M',  trend: '+23.4%', dir: 'up',   compare: 'vs last period', accent: 'brand',   icon: '🔄', iconBg: 'icon-brand' },
  { label: 'Win Rate',        value: '34.2%',  trend: '+4.5pp', dir: 'up',   compare: 'vs last period', accent: 'info',    icon: '🏆', iconBg: 'icon-info' },
  { label: 'Avg Deal Size',   value: '$12.5K', trend: '-2.1%',  dir: 'down', compare: 'vs last period', accent: 'warning', icon: '📦', iconBg: 'icon-warning' },
]

export const dealTable = [
  { company: 'Acme Corp',         rep: 'Jordan K.',  stage: 'Proposal', value: '$48,000', prob: '75%', close: 'Feb 28' },
  { company: 'TechVision Inc.',   rep: 'Sam R.',     stage: 'Negotiation', value: '$124,000', prob: '60%', close: 'Mar 15' },
  { company: 'Nexus Solutions',   rep: 'Alex M.',    stage: 'Discovery', value: '$32,000', prob: '30%', close: 'Apr 1' },
  { company: 'Brightfield LLC',   rep: 'Casey T.',   stage: 'Closed Won', value: '$67,500', prob: '100%', close: 'Jan 31' },
  { company: 'PolarMed Systems',  rep: 'Morgan L.',  stage: 'Proposal', value: '$89,000', prob: '55%', close: 'Mar 8' },
]

export const pipelineStages = [
  { stage: 'Prospecting', count: 128, value: '$580K',  pct: 80 },
  { stage: 'Discovery',   count: 84,  value: '$420K',  pct: 65 },
  { stage: 'Proposal',    count: 47,  value: '$680K',  pct: 45 },
  { stage: 'Negotiation', count: 22,  value: '$490K',  pct: 30 },
  { stage: 'Closed Won',  count: 14,  value: '$320K',  pct: 20 },
]

// ──────────────────────────────────────────
//  SERVICE DATA
// ──────────────────────────────────────────
export const serviceMetrics = [
  { label: 'Tickets Resolved',  value: '1,247', trend: '+15.2%', dir: 'up',   compare: 'vs last period', accent: 'success', icon: '✅', iconBg: 'icon-success' },
  { label: 'CSAT Score',        value: '94.3%', trend: '+2.1pp', dir: 'up',   compare: 'vs last period', accent: 'brand',   icon: '⭐', iconBg: 'icon-brand' },
  { label: 'Avg Response Time', value: '2.4hr', trend: '-22.5%', dir: 'up',   compare: 'vs last period', accent: 'info',    icon: '⏱️', iconBg: 'icon-info' },
  { label: 'NPS Score',         value: '67',    trend: '+5pts',  dir: 'up',   compare: 'vs last period', accent: 'purple',  icon: '💜', iconBg: 'icon-purple' },
]

export const ticketTable = [
  { id: '#8821', subject: 'Integration failing on webhook endpoint', priority: 'critical', assignee: 'Priya N.', status: 'open', age: '4h' },
  { id: '#8816', subject: 'Export to CSV shows incorrect date format', priority: 'high', assignee: 'Devon W.', status: 'in-progress', age: '8h' },
  { id: '#8810', subject: 'Dashboard loading very slowly', priority: 'medium', assignee: 'Kenji O.', status: 'in-progress', age: '1d' },
  { id: '#8804', subject: 'Cannot invite additional team members', priority: 'high', assignee: 'Priya N.', status: 'open', age: '1d 6h' },
  { id: '#8798', subject: 'Chart rendering blank on Safari', priority: 'low', assignee: 'Unassigned', status: 'open', age: '2d' },
]

export const serviceCategories = [
  { name: 'Bug Reports',     count: 342, pct: 27, color: 'var(--danger)' },
  { name: 'How-to / Guides', count: 418, pct: 33, color: 'var(--brand-500)' },
  { name: 'Account / Billing',count: 186, pct: 15, color: 'var(--warning)' },
  { name: 'Feature Requests', count: 214, pct: 17, color: 'var(--accent-purple-500)' },
  { name: 'Other',            count: 87,  pct: 8,  color: 'var(--gray-400)' },
]

// ──────────────────────────────────────────
//  ANALYTICS DATA
// ──────────────────────────────────────────
export const analyticsMetrics = [
  { label: 'Total Sessions',    value: '124.6K', trend: '+8.3%',  dir: 'up',   compare: 'vs last period', accent: 'brand',   icon: '👁️', iconBg: 'icon-brand' },
  { label: 'Conversion Rate',   value: '3.8%',   trend: '+0.5pp', dir: 'up',   compare: 'vs last period', accent: 'success', icon: '🎯', iconBg: 'icon-success' },
  { label: 'Bounce Rate',       value: '42.1%',  trend: '-3.2pp', dir: 'up',   compare: 'vs last period', accent: 'warning', icon: '↩️', iconBg: 'icon-warning' },
  { label: 'Avg Session',       value: '3m 42s', trend: '+0.8%',  dir: 'up',   compare: 'vs last period', accent: 'info',    icon: '⏱️', iconBg: 'icon-info' },
]

export const topPages = [
  { page: '/dashboard',        sessions: 28420, bounce: '28.4%', convRate: '6.2%', change: '+12%' },
  { page: '/pricing',          sessions: 18640, bounce: '41.2%', convRate: '9.8%', change: '+24%' },
  { page: '/features',         sessions: 14280, bounce: '38.6%', convRate: '4.1%', change: '+8%' },
  { page: '/integrations',     sessions: 9840,  bounce: '52.3%', convRate: '2.8%', change: '-3%' },
  { page: '/blog/guide-setup', sessions: 7620,  bounce: '64.1%', convRate: '1.4%', change: '+31%' },
]

export const trafficSources = [
  { source: 'Organic Search', sessions: 48420, pct: 39, color: 'var(--success)' },
  { source: 'Direct',         sessions: 28640, pct: 23, color: 'var(--brand-500)' },
  { source: 'Paid Search',    sessions: 18280, pct: 15, color: 'var(--info)' },
  { source: 'Social',         sessions: 14840, pct: 12, color: 'var(--accent-purple-500)' },
  { source: 'Referral',       sessions: 7620,  pct: 6,  color: 'var(--warning)' },
  { source: 'Email',          sessions: 6900,  pct: 5,  color: 'var(--danger)' },
]

// ──────────────────────────────────────────
//  COMMERCE DATA
// ──────────────────────────────────────────
export const commerceMetrics = [
  { label: 'Total Orders',    value: '4,829', trend: '+22.1%', dir: 'up',   compare: 'vs last period', accent: 'success', icon: '🛍️', iconBg: 'icon-success' },
  { label: 'Gross Revenue',   value: '$621K', trend: '+16.8%', dir: 'up',   compare: 'vs last period', accent: 'brand',   icon: '💳', iconBg: 'icon-brand' },
  { label: 'Avg Order Value', value: '$128',  trend: '+3.2%',  dir: 'up',   compare: 'vs last period', accent: 'info',    icon: '📦', iconBg: 'icon-info' },
  { label: 'Return Rate',     value: '4.2%',  trend: '-1.1pp', dir: 'up',   compare: 'vs last period', accent: 'warning', icon: '↩️', iconBg: 'icon-warning' },
]

export const topProducts = [
  { name: 'Pro Plan — Annual',   sku: 'PRO-12M',   units: 842,  revenue: '$210,500', margin: '82%' },
  { name: 'Starter — Monthly',  sku: 'STR-1M',    units: 1640, revenue: '$82,000',  margin: '76%' },
  { name: 'Enterprise License', sku: 'ENT-LIC',   units: 28,   revenue: '$140,000', margin: '88%' },
  { name: 'Add-on: Analytics',  sku: 'ADD-ANA',   units: 514,  revenue: '$51,400',  margin: '91%' },
  { name: 'Add-on: Automations',sku: 'ADD-AUTO',  units: 388,  revenue: '$38,800',  margin: '90%' },
]

// ──────────────────────────────────────────
//  OVERVIEW / ALL PRODUCTS
// ──────────────────────────────────────────
export const overviewMetrics = [
  { label: 'Total Revenue',     value: '$847K',   trend: '+18.7%', dir: 'up',   compare: 'vs prev. period', accent: 'success', icon: '💰', iconBg: 'icon-success' },
  { label: 'Active Customers',  value: '6,284',   trend: '+9.4%',  dir: 'up',   compare: 'vs prev. period', accent: 'brand',   icon: '👥', iconBg: 'icon-brand' },
  { label: 'Leads Generated',   value: '2,847',   trend: '+12.4%', dir: 'up',   compare: 'vs prev. period', accent: 'info',    icon: '🎯', iconBg: 'icon-info' },
  { label: 'Tickets Resolved',  value: '1,247',   trend: '+15.2%', dir: 'up',   compare: 'vs prev. period', accent: 'purple',  icon: '✅', iconBg: 'icon-purple' },
  { label: 'NPS Score',         value: '67',      trend: '+5pts',  dir: 'up',   compare: 'vs prev. period', accent: 'warning', icon: '⭐', iconBg: 'icon-warning' },
]

export const productCards = [
  {
    id: 'marketing',
    name: 'Marketing Hub',
    tagline: 'Campaigns, leads & automation',
    icon: '📣',
    iconBg: 'linear-gradient(135deg, #EEF2FF, #E0E7FF)',
    status: 'active',
    metrics: [
      { label: 'Leads',      value: '2,847' },
      { label: 'Open Rate',  value: '45.2%' },
      { label: 'Conv. Rate', value: '8.7%' },
    ],
    highlight: '+12.4% leads this period',
    highlightDir: 'up',
  },
  {
    id: 'sales',
    name: 'Sales Hub',
    tagline: 'Pipeline, deals & forecasting',
    icon: '💰',
    iconBg: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)',
    status: 'active',
    metrics: [
      { label: 'Revenue',    value: '$847K' },
      { label: 'Pipeline',   value: '$2.1M' },
      { label: 'Win Rate',   value: '34.2%' },
    ],
    highlight: '+18.7% revenue this period',
    highlightDir: 'up',
  },
  {
    id: 'service',
    name: 'Service Hub',
    tagline: 'Support, CSAT & SLA tracking',
    icon: '🎧',
    iconBg: 'linear-gradient(135deg, #F5F3FF, #EDE9FE)',
    status: 'active',
    metrics: [
      { label: 'Resolved',   value: '1,247' },
      { label: 'CSAT',       value: '94.3%' },
      { label: 'NPS',        value: '67' },
    ],
    highlight: '2.4hr avg response time',
    highlightDir: 'up',
  },
  {
    id: 'analytics',
    name: 'Analytics Hub',
    tagline: 'Traffic, funnels & behavior',
    icon: '📊',
    iconBg: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
    status: 'active',
    metrics: [
      { label: 'Sessions',   value: '124.6K' },
      { label: 'Conv. Rate', value: '3.8%' },
      { label: 'Bounce',     value: '42.1%' },
    ],
    highlight: '+8.3% sessions this period',
    highlightDir: 'up',
  },
  {
    id: 'commerce',
    name: 'Commerce Hub',
    tagline: 'Orders, revenue & products',
    icon: '🛍️',
    iconBg: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)',
    status: 'active',
    metrics: [
      { label: 'Orders',     value: '4,829' },
      { label: 'Revenue',    value: '$621K' },
      { label: 'AOV',        value: '$128' },
    ],
    highlight: '+22.1% orders this period',
    highlightDir: 'up',
  },
]

export const overviewInsights = [
  {
    title: 'Revenue milestone reached 🎉',
    desc: 'You crossed $800K in monthly recurring revenue for the first time. Sales Hub drove 68% of this growth through expanded deal sizes.',
    color: 'var(--success)',
    product: 'Sales Hub',
    time: '2h ago',
    action: 'View Revenue Report',
  },
  {
    title: 'Lead quality improving across all channels',
    desc: 'Your Marketing Hub campaigns show a 1.2pp conversion rate lift. Organic and email channels are the top performers this month.',
    color: 'var(--brand-600)',
    product: 'Marketing Hub',
    time: '6h ago',
    action: 'View Campaign Details',
  },
  {
    title: 'CSAT dropped 2.1 points for enterprise tier',
    desc: 'Enterprise customers in the EMEA region report slower response times. Consider adding regional agents to address the gap.',
    color: 'var(--warning)',
    product: 'Service Hub',
    time: '1d ago',
    action: 'View Ticket Queue',
  },
  {
    title: 'Commerce AOV up 3.2% — upsells working',
    desc: 'The Add-on: Analytics upsell campaign contributed $51K in incremental revenue. Pro Annual plan conversions rose 8% week-over-week.',
    color: 'var(--accent-purple-500)',
    product: 'Commerce Hub',
    time: '1d ago',
    action: 'View Products Report',
  },
]
