// ─── Keyword → Intent mapping ────────────────────────────────────────────────
const KEYWORD_MAP = {
  revenue:    ['revenue', 'mrr', 'arr', 'income', 'earnings', 'money', 'profit', 'dropped', 'decline', 'growth'],
  pipeline:   ['pipeline', 'deal', 'deals', 'forecast', 'closing', 'quota', 'at risk', 'opportunity', 'opportunities'],
  marketing:  ['campaign', 'campaigns', 'email', 'newsletter', 'marketing', 'cpl', 'channel', 'ad spend', 'attribution'],
  leads:      ['lead', 'leads', 'lead generation', 'prospects', 'inbound', 'outbound', 'mql'],
  conversion: ['conversion', 'converting', 'funnel', 'cvr', 'opt-in', 'sign up', 'trial', 'onboarding'],
  service:    ['ticket', 'tickets', 'support', 'csat', 'nps', 'satisfaction', 'churn', 'retention', 'sla', 'escalation'],
  traffic:    ['traffic', 'session', 'sessions', 'visitor', 'bounce', 'pageview', 'analytics', 'organic', 'seo'],
  commerce:   ['order', 'orders', 'ecommerce', 'product', 'cart', 'abandonment', 'aov', 'return', 'refund', 'sku'],
  cost:       ['cac', 'cost', 'spend', 'roi', 'roas', 'efficiency', 'budget', 'cost per lead'],
}

export function matchIntent(question) {
  const lower = question.toLowerCase()
  for (const [intent, keywords] of Object.entries(KEYWORD_MAP)) {
    if (keywords.some(k => lower.includes(k))) return intent
  }
  return 'general'
}

// ─── Simulated AI Response Library ───────────────────────────────────────────
export const RESPONSES = {
  revenue: {
    headline: 'Your revenue story this quarter',
    body: [
      "Revenue came in at **$284,000** for the period — down 8.3% from last month but up **23% year-over-year**. The dip is largely explained by 3 Enterprise deals totaling $240K that slipped into Q1.",
      "Your Mid-Market segment stayed stable (+2%) and SMB grew 15%, which suggests the core motion is healthy. Enterprise is the lever to watch.",
      "Win rate in Enterprise dropped from 28% → 21% this quarter. Deal cycle length is the culprit — Enterprise averages 67 days vs 34 for Mid-Market.",
    ],
    metrics: [
      { label: 'Revenue',      value: '$284K',  trend: '↓ 8.3%',  dir: 'down' },
      { label: 'Pipeline',     value: '$1.84M', trend: '↑ 4.1%',  dir: 'up'   },
      { label: 'Win Rate',     value: '24%',    trend: '↓ 4pp',   dir: 'down' },
      { label: 'Deals Closed', value: '41',     trend: '↓ 7',     dir: 'down' },
    ],
    upsell: {
      icon: '🔮',
      product: 'Sales Intelligence',
      pitch: 'Sales Intelligence surfaces at-risk deals 2–3 weeks earlier using engagement signals, competitor mentions, and stakeholder mapping. 3 of the Enterprise deals that slipped showed warning signals for 18+ days before closing.',
      cta: 'Start free 14-day trial',
      secondary: 'See how it works',
      accent: 'brand',
    },
    related: [
      'Which deals are most at risk this quarter?',
      'What\'s our average sales cycle by segment?',
      'How can I improve Enterprise win rate?',
    ],
  },

  pipeline: {
    headline: 'Your pipeline health at a glance',
    body: [
      "Your current pipeline sits at **$1.84M** across 41 active opportunities — a healthy **6.5× coverage ratio** against your monthly quota.",
      "However, 18% of pipeline has been stuck in 'Proposal Sent' for more than 30 days without movement. Stalled deals like these are 3× more likely to slip.",
      "Top 5 deals represent 62% of total pipeline value. Single-threading risk is high on 4 of them — only one stakeholder engaged.",
    ],
    metrics: [
      { label: 'Pipeline',  value: '$1.84M', trend: '↑ 4.1%',  dir: 'up'   },
      { label: 'Coverage',  value: '6.5×',   trend: '↑ 0.8×',  dir: 'up'   },
      { label: 'At-Risk',   value: '18%',    trend: '↑ 3pp',   dir: 'down' },
      { label: 'Avg Deal',  value: '$44.9K', trend: '↑ 12%',   dir: 'up'   },
    ],
    upsell: {
      icon: '🔮',
      product: 'Sales Intelligence',
      pitch: 'Get deal health scores, multi-threading alerts, and AI-generated next-best-actions for every deal in your pipeline. Teams using Sales Intelligence improve win rates by an average of 19%.',
      cta: 'Try Sales Intelligence free',
      secondary: 'View a live demo',
      accent: 'brand',
    },
    related: [
      'Why did revenue drop last month?',
      'What\'s our win rate by deal size?',
      'Show me deals closing this month',
    ],
  },

  marketing: {
    headline: 'Your marketing performance breakdown',
    body: [
      "Your campaigns generated **3,847 leads** this month at an average cost of **$47 per lead** — 12% more efficient than last month.",
      "Email remains your highest-ROI channel with a 24.3% open rate and 4.1% CTR. Paid search volume is up but CPL jumped 18% — worth investigating budget allocation.",
      "Your Enterprise webinar series outperformed all other content types, driving 22% of qualified leads from just 6% of total budget.",
    ],
    metrics: [
      { label: 'Leads',      value: '3,847', trend: '↑ 18%',    dir: 'up'   },
      { label: 'Cost/Lead',  value: '$47',   trend: '↓ 12%',    dir: 'up'   },
      { label: 'Email Open', value: '24.3%', trend: '↑ 2.1pp',  dir: 'up'   },
      { label: 'Conv. Rate', value: '3.2%',  trend: '↓ 0.4pp',  dir: 'down' },
    ],
    upsell: {
      icon: '✨',
      product: 'AI Content Generation',
      pitch: 'Your webinar content outperforms everything else by 3×. AI Content Generation can scale that format — generating on-brand scripts, landing pages, and follow-up sequences in minutes, not weeks.',
      cta: 'Generate your first asset free',
      secondary: 'See content examples',
      accent: 'purple',
    },
    related: [
      'Which marketing channel has the best ROI?',
      'Why is my conversion rate dropping?',
      'How can I reduce cost per lead?',
    ],
  },

  leads: {
    headline: 'Your lead generation and quality analysis',
    body: [
      "You generated **3,847 leads** this month — up 18% — but qualified pipeline from those leads is only up 4%, signaling a lead quality gap.",
      "Top source: Organic Search (34% of leads, 5.1% MQL rate). Worst performer: Paid Social (22% of budget, 1.8% MQL rate).",
      "Lead-to-opportunity conversion sits at 3.2% vs your 5% target. The biggest drop-off happens within the **first 48 hours** of lead creation — faster response drives 2× better outcomes.",
    ],
    metrics: [
      { label: 'Leads',      value: '3,847', trend: '↑ 18%',    dir: 'up'   },
      { label: 'MQL Rate',   value: '3.2%',  trend: '↓ 0.4pp',  dir: 'down' },
      { label: 'Lead→Opp',   value: '12.1%', trend: '↓ 1.8pp',  dir: 'down' },
      { label: 'CPL',        value: '$47',   trend: '↓ 12%',    dir: 'up'   },
    ],
    upsell: {
      icon: '🧪',
      product: 'A/B Testing Suite',
      pitch: '48-hour drop-off on new leads is often a landing page or email copy problem. Run multivariate tests on your top lead sources and recover an estimated 800–1,200 leads/month based on your current volume.',
      cta: 'Start A/B testing free',
      secondary: 'See the full analysis',
      accent: 'info',
    },
    related: [
      'Which channels generate the best quality leads?',
      'Why is my lead-to-opportunity rate dropping?',
      'How do I improve lead response time?',
    ],
  },

  conversion: {
    headline: 'Your conversion funnel analysis',
    body: [
      "Overall conversion rate is **3.2%** — down 0.4 points from last month and 1.8 points below your 5% target.",
      "The biggest drop is at Trial → Paid (step 3 of your funnel): **28% conversion vs 41% industry benchmark**. Users who don't complete onboarding within 7 days almost never convert.",
      "Top converting traffic: Blog organic (6.1%) and Webinar attendees (8.4%). Lowest converters: Paid social (1.2%) and display retargeting (0.9%).",
    ],
    metrics: [
      { label: 'Conv. Rate',  value: '3.2%',  trend: '↓ 0.4pp',  dir: 'down' },
      { label: 'Trial→Paid',  value: '28%',   trend: '↓ 6pp',    dir: 'down' },
      { label: 'Onboarding',  value: '52%',   trend: '↓ 8pp',    dir: 'down' },
      { label: 'Sessions',    value: '48.2K', trend: '↑ 11%',    dir: 'up'   },
    ],
    upsell: {
      icon: '🧪',
      product: 'A/B Testing + Personalization',
      pitch: 'Recovering trial-to-paid from 28% to industry benchmark (41%) is worth ~$180K in ARR at your current traffic volume. A/B Testing identifies the onboarding changes that move the needle fastest — most teams see results in 2 weeks.',
      cta: 'Run your first experiment',
      secondary: 'Open ROI calculator',
      accent: 'info',
    },
    related: [
      'Which pages have the highest drop-off?',
      'What\'s the best traffic source for conversions?',
      'How do I improve trial-to-paid conversion?',
    ],
  },

  service: {
    headline: 'Your customer service and satisfaction overview',
    body: [
      "You resolved **1,247 tickets** this month with an average **CSAT of 4.2/5** — solid, but 12 tickets are breaching SLA today creating churn risk.",
      "Response time averaged 2.3 hours, above your 2-hour SLA target. Billing and Technical issues account for 68% of all ticket volume.",
      "NPS is 42, up 3 points month-over-month. Detractors cluster around slow response times and **repeat contacts** — 28% of your ticket volume is the same question asked again.",
    ],
    metrics: [
      { label: 'CSAT',         value: '4.2/5', trend: '↑ 0.1',    dir: 'up'   },
      { label: 'NPS',          value: '42',    trend: '↑ 3pts',   dir: 'up'   },
      { label: 'Resolved',     value: '1,247', trend: '↑ 8%',     dir: 'up'   },
      { label: 'Avg Response', value: '2.3hr', trend: '↑ 0.3hr',  dir: 'down' },
    ],
    upsell: {
      icon: '🤖',
      product: 'AI Support Chatbot',
      pitch: '28% of your ticket volume is repeat contacts — exactly the use case AI Chatbot handles automatically. Customers get instant answers 24/7, your team handles the complex cases. Average ticket deflection rate: 35%.',
      cta: 'Deploy chatbot in 1 day',
      secondary: 'See deflection rates',
      accent: 'success',
    },
    related: [
      'Which ticket types are breaching SLA most?',
      'Why is my NPS lower than expected?',
      'How can I reduce repeat contacts?',
    ],
  },

  traffic: {
    headline: 'Your web traffic and engagement breakdown',
    body: [
      "Your site attracted **48,200 sessions** this month — up 11% — driven by a 24% surge in organic search following recent content updates.",
      "Bounce rate is 38.4%, trending down 2 points MoM. Average session duration is 3m 42s — strong engagement for a B2B SaaS property.",
      "The /pricing page has a **72% drop-off rate** with users spending an average of 8 seconds. This is a significant conversion signal worth investigating immediately.",
    ],
    metrics: [
      { label: 'Sessions',    value: '48.2K', trend: '↑ 11%',    dir: 'up'   },
      { label: 'Bounce Rate', value: '38.4%', trend: '↓ 2.1pp',  dir: 'up'   },
      { label: 'Avg Duration',value: '3m 42s',trend: '↑ 0.3m',   dir: 'up'   },
      { label: 'Conv. Rate',  value: '3.2%',  trend: '↓ 0.4pp',  dir: 'down' },
    ],
    upsell: {
      icon: '📊',
      product: 'Advanced Analytics',
      pitch: 'The /pricing page drop-off alone could be costing 200+ leads/month. Advanced Analytics gives you session recordings, heatmaps, and funnel analysis to identify and fix exactly these friction points.',
      cta: 'Get Advanced Analytics',
      secondary: 'View a heatmap demo',
      accent: 'purple',
    },
    related: [
      'Which pages are converting best?',
      'What\'s driving my organic traffic growth?',
      'Why is bounce rate elevated on mobile?',
    ],
  },

  commerce: {
    headline: 'Your ecommerce performance summary',
    body: [
      "**2,847 orders** placed this month generating **$892,000 in gross revenue** — up 14% month-over-month. AOV climbed to $313, up $28 from last month.",
      "Cart abandonment is 68.4% — 3 points above industry average. The largest drop-off point is the shipping estimate step, where 41% of abandonment happens.",
      "Top 10 products represent 71% of total revenue. Two SKUs in that group have critically low inventory — less than 5 days of stock at current velocity.",
    ],
    metrics: [
      { label: 'Orders',      value: '2,847', trend: '↑ 14%',    dir: 'up'   },
      { label: 'Revenue',     value: '$892K', trend: '↑ 14%',    dir: 'up'   },
      { label: 'AOV',         value: '$313',  trend: '↑ $28',    dir: 'up'   },
      { label: 'Abandonment', value: '68.4%', trend: '↑ 3.2pp',  dir: 'down' },
    ],
    upsell: {
      icon: '🛍️',
      product: 'Commerce Pro',
      pitch: 'Recovering 5% of your cart abandonment translates to ~$44K/month in recovered revenue at your current AOV. Commerce Pro includes abandoned cart recovery flows, smart product recommendations, and low-stock alerts.',
      cta: 'Start Commerce Pro trial',
      secondary: 'Calculate your recovery',
      accent: 'warning',
    },
    related: [
      'Which products are driving the most revenue?',
      'How can I reduce cart abandonment?',
      'What inventory is at risk this week?',
    ],
  },

  cost: {
    headline: 'Your spend efficiency and CAC analysis',
    body: [
      "Blended Customer Acquisition Cost is **$184** — up 9% this month, driven by CPL increases in paid search (+18%) and paid social (+24%).",
      "Email and organic content remain your most efficient channels with effective CAC of $67 and $89 respectively.",
      "Total marketing spend was $181K this month. Reallocating 15% from paid social to email and content could reduce blended CAC by an estimated **11%** based on current performance ratios.",
    ],
    metrics: [
      { label: 'Blended CAC', value: '$184',  trend: '↑ 9%',   dir: 'down' },
      { label: 'Email CAC',   value: '$67',   trend: '↓ 4%',   dir: 'up'   },
      { label: 'Paid CAC',    value: '$310',  trend: '↑ 22%',  dir: 'down' },
      { label: 'Total Spend', value: '$181K', trend: '↑ 6%',   dir: 'down' },
    ],
    upsell: {
      icon: '✨',
      product: 'Marketing Attribution Pro',
      pitch: 'Multi-touch attribution shows exactly which touchpoints drive conversions, so you can cut spend on what doesn\'t work and double down on what does. Most teams reduce wasted spend by 18–30% in the first 90 days.',
      cta: 'See your attribution data',
      secondary: 'View attribution models',
      accent: 'purple',
    },
    related: [
      'Which marketing channel has the best ROI?',
      'How can I reduce cost per lead?',
      'What\'s the payback period on a new customer?',
    ],
  },

  general: {
    headline: 'Your business overview — key signals this month',
    body: [
      "Your business is performing well across most dimensions. Revenue is up **23% year-over-year**, leads are growing at 18%, and customer satisfaction (CSAT 4.2) remains strong.",
      "Three areas warrant attention: Enterprise win rate (21%, down from 28%), lead-to-opportunity conversion (3.2% vs 5% target), and cart abandonment (68.4%, above industry average).",
      "Your strongest lever right now is organic content — it's your most efficient acquisition channel and momentum is building. Doubling down here has an outsized ROI vs paid.",
    ],
    metrics: [
      { label: 'Revenue', value: '$284K', trend: '↑ 23% YoY', dir: 'up' },
      { label: 'Leads',   value: '3,847', trend: '↑ 18%',     dir: 'up' },
      { label: 'CSAT',    value: '4.2/5', trend: '↑ 0.1',     dir: 'up' },
      { label: 'NPS',     value: '42',    trend: '↑ 3pts',     dir: 'up' },
    ],
    upsell: {
      icon: '⚡',
      product: 'Unified Intelligence Suite',
      pitch: 'All your data, one AI. Get cross-product insights, predictive alerts, and recommended actions that span Sales, Marketing, Service, and Commerce — surfaced automatically before you need to ask.',
      cta: 'See the full suite',
      secondary: 'Schedule a demo',
      accent: 'brand',
    },
    related: [
      'Why did revenue drop last month?',
      'Which marketing channels are working best?',
      'How can I reduce customer churn?',
    ],
  },
}

// ─── Default auto-surfaced insights ──────────────────────────────────────────
export const DEFAULT_INSIGHTS = [
  {
    id: 'revenue-trend',
    type: 'positive',
    icon: '📈',
    title: 'Revenue up 23% year-over-year',
    body: 'MRR grew to $284K this month, pacing ahead of annual target. 3 Enterprise deals slipped to Q1 — keep a close eye on those in your pipeline.',
    stat: '$284K MRR · ↑ 23% YoY',
    upsell: {
      icon: '🔮',
      label: 'Sales Intelligence',
      teaser: 'Predict which deals will slip before they do.',
      cta: 'Try free →',
      accent: 'brand',
    },
  },
  {
    id: 'lead-conversion',
    type: 'warning',
    icon: '⚠️',
    title: 'Lead conversion below 5% target',
    body: 'Converting at 3.2% vs your 5% goal. The gap is largest in the first 48 hours — faster response doubles conversion outcomes across every channel.',
    stat: '3.2% · 1.8pp below target',
    upsell: {
      icon: '🧪',
      label: 'A/B Testing Suite',
      teaser: 'Find the landing page and email copy that converts.',
      cta: 'Start testing →',
      accent: 'info',
    },
  },
  {
    id: 'service-risk',
    type: 'warning',
    icon: '🎧',
    title: '12 tickets breaching SLA today',
    body: 'Billing and Technical categories drive 68% of volume. 28% of tickets are repeat contacts — a high-deflection use case that can be automated.',
    stat: '2.3hr avg response · SLA: 2hr',
    upsell: {
      icon: '🤖',
      label: 'AI Chatbot',
      teaser: 'Deflect repeat questions 24/7 without adding headcount.',
      cta: 'Deploy in 1 day →',
      accent: 'success',
    },
  },
  {
    id: 'organic-growth',
    type: 'positive',
    icon: '🌱',
    title: 'Organic traffic surged 24% this month',
    body: 'Recent content updates are paying off. Organic is now your most efficient acquisition channel at $89 CAC — far below the $310 paid average.',
    stat: '48.2K sessions · $89 CAC',
    upsell: {
      icon: '📊',
      label: 'Advanced Analytics',
      teaser: 'Identify exactly which content drives real conversions.',
      cta: 'Explore →',
      accent: 'purple',
    },
  },
  {
    id: 'cart-abandonment',
    type: 'opportunity',
    icon: '🛒',
    title: '$44K/mo in recoverable cart revenue',
    body: 'Cart abandonment is 68.4% — above industry average. Drop-off spikes at the shipping estimate step. Proven recovery flows typically recapture 5–8%.',
    stat: '68.4% abandonment · ~$44K recoverable',
    upsell: {
      icon: '🛍️',
      label: 'Commerce Pro',
      teaser: 'Recover abandoned carts automatically with proven flows.',
      cta: 'Start trial →',
      accent: 'warning',
    },
  },
]

// ─── Builder goals ─────────────────────────────────────────────────────────────
export const BUILDER_GOALS = [
  { id: 'revenue',    label: 'Grow Revenue',          icon: '💰', description: 'Pipeline, deal velocity, and win rates' },
  { id: 'marketing',  label: 'Improve Marketing ROI', icon: '🎯', description: 'Spend efficiency, leads, and campaigns' },
  { id: 'retention',  label: 'Reduce Churn',          icon: '🔄', description: 'CSAT, NPS, and customer health signals' },
  { id: 'conversion', label: 'Increase Conversions',  icon: '📈', description: 'Funnel, landing pages, and trial flow' },
  { id: 'commerce',   label: 'Grow Ecommerce',        icon: '🛍️', description: 'Abandonment, AOV, and revenue recovery' },
]

// Which insight IDs to highlight per goal
export const GOAL_INSIGHT_MAP = {
  revenue:    ['revenue-trend', 'lead-conversion'],
  marketing:  ['lead-conversion', 'organic-growth'],
  retention:  ['service-risk', 'lead-conversion'],
  conversion: ['lead-conversion', 'organic-growth'],
  commerce:   ['cart-abandonment', 'revenue-trend'],
}

// ─── Suggested starter questions ─────────────────────────────────────────────
export const SUGGESTED_QUESTIONS = [
  'How can I improve conversion?',
  'When should I make a new promotion?',
  'Which marketing channel has the best ROI?',
  'What\'s causing cart abandonment?',
  'How healthy is my pipeline?',
  'Why are tickets breaching SLA?',
]
