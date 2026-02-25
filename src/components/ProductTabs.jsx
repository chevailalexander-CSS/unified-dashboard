export default function ProductTabs({ tabs, activeTab, onTabChange }) {
  return (
    <nav className="app-tabs">
      <div className="tabs-inner">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-item${activeTab === tab.id ? ' active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-icon-wrap">{tab.icon}</span>
            {tab.label}
            {tab.chip && <span className="tab-chip">{tab.chip}</span>}
          </button>
        ))}
      </div>
    </nav>
  )
}
