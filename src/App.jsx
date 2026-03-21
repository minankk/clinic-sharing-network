import { useState } from 'react'
import LandingScreen from './components/LandingScreen'
import FearsScreen from './components/FearsScreen'
import OptinScreen from './components/OptinScreen'
import PreviewScreen from './components/PreviewScreen'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [screen, setScreen] = useState('landing')
  const [credits, setCredits] = useState(0)

  const navigate = (s) => setScreen(s)

  return (
    <div className="app">
      {screen === 'landing' && <LandingScreen navigate={navigate} />}
      {screen === 'fears' && <FearsScreen navigate={navigate} />}
      {screen === 'optin' && <OptinScreen navigate={navigate} />}
      {screen === 'preview' && <PreviewScreen navigate={navigate} setCredits={setCredits} />}
      {screen === 'dashboard' && <Dashboard navigate={navigate} credits={credits} setCredits={setCredits} />}
    </div>
  )
}

export default App
