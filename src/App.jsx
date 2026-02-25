import { useState } from 'react'
import Header from './components/Header'
import ProductTabs from './components/ProductTabs'
import OverviewView  from './views/OverviewView'
import MarketingView from './views/MarketingView'
import SalesView     from './views/SalesView'
import ServiceView   from './views/ServiceView'
import AnalyticsView from './views/AnalyticsView'
import CommerceView  from './views/CommerceView'

const TABS = [
  { id: 'overview',   label: 'All Products',   icon: '⬡', chip: 'Default' },
  { id: 'marketing',  label: 'Marketing Hub',  icon: '📣' },
  { id: 'sales',      label: 'Sales Hub',      icon: '💰' },
  { id: 'service',    label: 'Service Hub',    icon: '🎧' },
  { id: 'analytics',  label: 'Analytics Hub',  icon: '📊' },
  { id: 'commerce',   label: 'Commerce Hub',   icon: '🛍️' },
]

const VIEWS = {
  overview:  OverviewView,
  marketing: MarketingView,
  sales:     SalesView,
  service:   ServiceView,
  analytics: AnalyticsView,
  commerce:  CommerceView,
}

export default function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const ActiveView = VIEWS[activeTab]

  return (
    <div className="app">
      <Header />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ProductTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="app-content">
          <ActiveView onNavigate={setActiveTab} />
        </main>
      </div>
    </div>
  )
}
