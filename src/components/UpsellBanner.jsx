import { useState } from 'react'

export default function UpsellBanner({ icon, title, description, features = [], ctaLabel = 'Upgrade Now', onCta, onDismiss }) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  function handleDismiss() {
    setDismissed(true)
    onDismiss?.()
  }

  return (
    <div className="upsell-banner">
      <div className="upsell-banner-left">
        <div className="upsell-icon">{icon}</div>
        <div>
          <div className="upsell-title">{title}</div>
          <div className="upsell-desc">{description}</div>
          {features.length > 0 && (
            <div className="upsell-features">
              {features.map((f) => (
                <span key={f} className="upsell-feat">
                  <span className="upsell-feat-check">✓</span>
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="upsell-banner-right">
        <button className="btn-upsell" onClick={onCta}>
          {ctaLabel} →
        </button>
        <button className="upsell-dismiss" onClick={handleDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  )
}

export function LockedFeatureCard({ icon = '🔒', title, description, ctaLabel = 'Unlock Feature', onCta }) {
  return (
    <div className="locked-card">
      <div className="locked-icon">{icon}</div>
      <div className="locked-title">{title}</div>
      <div className="locked-desc">{description}</div>
      <button className="btn-upsell" onClick={onCta}>{ctaLabel} →</button>
    </div>
  )
}

export function CrossSellCard({ icon, iconBg, name, description, ctaLabel = 'Learn More', onCta }) {
  return (
    <div className="cross-sell-card" onClick={onCta}>
      <div className="cross-sell-icon" style={{ background: iconBg }}>{icon}</div>
      <div>
        <div className="cross-sell-name">{name}</div>
        <div className="cross-sell-desc">{description}</div>
      </div>
      <div className="cross-sell-cta">{ctaLabel} →</div>
    </div>
  )
}
