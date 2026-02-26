import { useState, useRef } from 'react'
import {
  matchIntent,
  RESPONSES,
  DEFAULT_INSIGHTS,
  BUILDER_GOALS,
  GOAL_INSIGHT_MAP,
  SUGGESTED_QUESTIONS,
} from '../data/agentData'

// ─── Inline bold markdown renderer (safe — hardcoded data only) ───────────────
function RichText({ text }) {
  const html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  return <p dangerouslySetInnerHTML={{ __html: html }} />
}

// ─── Accent class helper ──────────────────────────────────────────────────────
function accentClass(accent) {
  const map = { brand: 'agent-accent-brand', info: 'agent-accent-info', success: 'agent-accent-success', warning: 'agent-accent-warning', purple: 'agent-accent-purple' }
  return map[accent] || 'agent-accent-brand'
}

export default function AgentView() {
  const [query, setQuery]                     = useState('')
  const [response, setResponse]               = useState(null)
  const [isTyping, setIsTyping]               = useState(false)
  const [activeGoal, setActiveGoal]           = useState(null)
  const [focusArea, setFocusArea]             = useState('all')
  const [timeRange, setTimeRange]             = useState('30d')
  const [highlightedIds, setHighlightedIds]   = useState([])
  const [builderDone, setBuilderDone]         = useState(false)
  const inputRef = useRef(null)

  // ── Ask / submit ──────────────────────────────────────────────────────────
  const handleAsk = (q) => {
    const question = (q || query).trim()
    if (!question) return
    setIsTyping(true)
    setResponse(null)
    setTimeout(() => {
      const intent = matchIntent(question)
      setResponse({ question, ...RESPONSES[intent] })
      setIsTyping(false)
    }, 1350)
  }

  const handleSuggestion = (q) => {
    setQuery(q)
    handleAsk(q)
  }

  const handleBack = () => {
    setResponse(null)
    setIsTyping(false)
    setQuery('')
  }

  // ── Builder ───────────────────────────────────────────────────────────────
  const handleBuilderGenerate = () => {
    if (!activeGoal) return
    setHighlightedIds(GOAL_INSIGHT_MAP[activeGoal] || [])
    setBuilderDone(true)
  }

  const showingResponse = response || isTyping

  return (
    <div className="agent-view">

      {/* ════════ Ask Bar ════════ */}
      <div className="agent-hero">
        <div className="agent-hero-inner">
          <div className="agent-ask-wrap">
            <span className="agent-bot-icon" aria-hidden>🤖</span>
            <input
              ref={inputRef}
              className="agent-ask-input"
              placeholder="Ask anything about your business… e.g. 'Why did revenue drop?' or 'How are my campaigns performing?'"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAsk()}
            />
            <button
              className="btn btn-primary agent-ask-btn"
              onClick={() => handleAsk()}
              disabled={!query.trim() || isTyping}
            >
              {isTyping ? <span className="agent-btn-dots"><span /><span /><span /></span> : 'Ask →'}
            </button>
          </div>

          {!showingResponse && (
            <div className="agent-suggestions-row">
              <span className="agent-suggestions-label">Try:</span>
              {SUGGESTED_QUESTIONS.map(q => (
                <button key={q} className="agent-chip" onClick={() => handleSuggestion(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ════════ Response Mode ════════ */}
      {showingResponse && (
        <div className="agent-response-wrap">
          <button className="agent-back-btn" onClick={handleBack}>
            ← Back to overview
          </button>

          {isTyping ? (
            <div className="agent-typing-state">
              <span className="agent-typing-avatar">🤖</span>
              <div className="agent-typing-bubble">
                <span className="agent-typing-dots-lg">
                  <span /><span /><span />
                </span>
                <span className="agent-typing-label">Analyzing your data…</span>
              </div>
            </div>
          ) : response && (
            <div className="agent-response-card">

              {/* Header */}
              <div className="agent-response-header">
                <span className="agent-response-avatar">🤖</span>
                <div>
                  <div className="agent-response-question">"{response.question}"</div>
                  <h2 className="agent-response-headline">{response.headline}</h2>
                </div>
              </div>

              {/* Body paragraphs */}
              <div className="agent-response-body">
                {response.body.map((para, i) => (
                  <RichText key={i} text={para} />
                ))}
              </div>

              {/* ── Contextual upsell (inline within answer) ── */}
              <div className={`agent-inline-upsell ${accentClass(response.upsell.accent)}`}>
                <div className="agent-inline-upsell-icon">{response.upsell.icon}</div>
                <div className="agent-inline-upsell-body">
                  <div className="agent-inline-upsell-product">{response.upsell.product}</div>
                  <p className="agent-inline-upsell-pitch">{response.upsell.pitch}</p>
                  <div className="agent-inline-upsell-actions">
                    <button className="btn btn-primary btn-sm">{response.upsell.cta}</button>
                    <button className="btn btn-outline btn-sm">{response.upsell.secondary}</button>
                  </div>
                </div>
              </div>

              {/* Metric snapshot */}
              <div className="agent-metric-row">
                {response.metrics.map(m => (
                  <div key={m.label} className={`agent-metric-chip metric-${m.dir}`}>
                    <span className="agent-metric-label">{m.label}</span>
                    <span className="agent-metric-value">{m.value}</span>
                    <span className={`agent-metric-trend trend-${m.dir}`}>{m.trend}</span>
                  </div>
                ))}
              </div>

              {/* Related questions */}
              <div className="agent-related">
                <span className="agent-related-label">Related questions</span>
                <div className="agent-related-chips">
                  {response.related.map(q => (
                    <button key={q} className="agent-chip" onClick={() => handleSuggestion(q)}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      )}

      {/* ════════ Default Mode: Builder + Insights ════════ */}
      {!showingResponse && (
        <div className="agent-default-layout">

          {/* ── Left: Builder ── */}
          <aside className="agent-builder">
            <div className="agent-builder-hd">
              <div className="agent-builder-eyebrow">Quick Setup</div>
              <h3 className="agent-builder-title">Build your view</h3>
              <p className="agent-builder-subtitle">
                Tell us what matters most and we'll highlight the right insights.
              </p>
            </div>

            <div className="agent-builder-section">
              <label className="agent-builder-label">Primary goal</label>
              <div className="agent-goal-grid">
                {BUILDER_GOALS.map(goal => (
                  <button
                    key={goal.id}
                    className={`agent-goal-btn${activeGoal === goal.id ? ' active' : ''}`}
                    onClick={() => { setActiveGoal(goal.id); setBuilderDone(false); setHighlightedIds([]) }}
                  >
                    <span className="agent-goal-icon">{goal.icon}</span>
                    <span className="agent-goal-label">{goal.label}</span>
                    <span className="agent-goal-desc">{goal.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="agent-builder-row-2">
              <div className="agent-builder-section">
                <label className="agent-builder-label">Focus area</label>
                <select
                  className="agent-select"
                  value={focusArea}
                  onChange={e => setFocusArea(e.target.value)}
                >
                  <option value="all">All products</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="service">Service</option>
                  <option value="analytics">Analytics</option>
                  <option value="commerce">Commerce</option>
                </select>
              </div>

              <div className="agent-builder-section">
                <label className="agent-builder-label">Time range</label>
                <div className="agent-time-chips">
                  {[['7d','7D'],['30d','30D'],['90d','90D'],['12m','12M']].map(([val, lbl]) => (
                    <button
                      key={val}
                      className={`agent-time-chip${timeRange === val ? ' active' : ''}`}
                      onClick={() => setTimeRange(val)}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary agent-builder-cta"
              onClick={handleBuilderGenerate}
              disabled={!activeGoal}
            >
              {builderDone ? 'Update insights' : 'Generate my insights →'}
            </button>
            {!activeGoal && (
              <p className="agent-builder-hint">Select a goal above to get started</p>
            )}
          </aside>

          {/* ── Right: Auto-surfaced Insights ── */}
          <section className="agent-insights-panel">
            <div className="agent-insights-hd">
              <div>
                <h3 className="agent-insights-title">Top Insights</h3>
                <p className="agent-insights-subtitle">
                  {builderDone
                    ? `Filtered for: ${BUILDER_GOALS.find(g => g.id === activeGoal)?.label} · ${timeRange === '7d' ? 'Last 7 days' : timeRange === '30d' ? 'Last 30 days' : timeRange === '90d' ? 'Last 90 days' : 'Last 12 months'}`
                    : 'Auto-surfaced from your connected data · Last 30 days'
                  }
                </p>
              </div>
              <span className="badge badge-success" style={{ flexShrink: 0 }}>● Live</span>
            </div>

            <div className="agent-insights-list">
              {DEFAULT_INSIGHTS.map(insight => {
                const isHighlighted = highlightedIds.length === 0 || highlightedIds.includes(insight.id)
                const isDimmed      = highlightedIds.length > 0   && !highlightedIds.includes(insight.id)

                return (
                  <div
                    key={insight.id}
                    className={[
                      'insight-card',
                      `insight-${insight.type}`,
                      isDimmed      ? 'insight-dimmed'      : '',
                      isHighlighted && highlightedIds.length > 0 ? 'insight-highlighted' : '',
                    ].join(' ')}
                  >
                    {/* Card main content */}
                    <div className="insight-card-main">
                      <div className="insight-card-top">
                        <span className="insight-card-icon">{insight.icon}</span>
                        <div className="insight-card-title-wrap">
                          <div className="insight-card-title">{insight.title}</div>
                          <div className="insight-card-stat">{insight.stat}</div>
                        </div>
                      </div>
                      <p className="insight-card-body">{insight.body}</p>
                      <button
                        className="agent-chip insight-ask-btn"
                        onClick={() => handleSuggestion(`Tell me more about ${insight.title.toLowerCase()}`)}
                      >
                        Ask AI about this →
                      </button>
                    </div>

                    {/* ── Contextual upsell strip (data-contextual) ── */}
                    <div className={`insight-upsell-strip ${accentClass(insight.upsell.accent)}`}>
                      <span className="insight-upsell-icon">{insight.upsell.icon}</span>
                      <span className="insight-upsell-label">{insight.upsell.label}</span>
                      <span className="insight-upsell-teaser">{insight.upsell.teaser}</span>
                      <button className="insight-upsell-cta">{insight.upsell.cta}</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

        </div>
      )}
    </div>
  )
}
