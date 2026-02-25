export default function Header() {
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <header className="app-header">
      {/* Brand */}
      <div className="header-brand">
        <div className="header-logo">UD</div>
        <div className="header-brand-text">
          <span className="header-brand-name">Unified Dashboard</span>
          <span className="header-brand-sub">Command Center</span>
        </div>
      </div>

      {/* Search */}
      <div className="header-center">
        <span className="header-search-icon">🔍</span>
        <span className="header-search-text">Search metrics, reports, products…</span>
        <span className="header-search-kb">⌘K</span>
      </div>

      {/* Actions */}
      <div className="header-actions">
        <div className="header-plan-badge">
          <div className="header-plan-dot" />
          Business Plan
        </div>

        <div className="header-divider" />

        <div className="header-action-btn" title="Notifications">
          🔔
          <div className="header-notif-dot" />
        </div>
        <div className="header-action-btn" title="Help">❓</div>
        <div className="header-action-btn" title="Settings">⚙️</div>

        <div className="header-divider" />

        <div className="header-avatar" title="Account">AJ</div>
      </div>
    </header>
  )
}
