import { useState } from 'react'
import LandingScreen from './components/LandingScreen'
import OptinScreen from './components/OptinScreen'
import PreviewScreen from './components/PreviewScreen'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [screen, setScreen] = useState('landing')
  const [isActivated, setIsActivated] = useState(false)
  const [credits, setCredits] = useState(0)
  const [creditsEarned, setCreditsEarned] = useState(0)
  const [creditsSpent, setCreditsSpent] = useState(0)
  const [timeDelay, setTimeDelay] = useState('none')
  const [accessedPatients, setAccessedPatients] = useState([])

  const navigate = (s) => setScreen(s)

  const activate = () => {
    if (!isActivated) {
      setIsActivated(true)
      setCredits(3)
      setCreditsEarned(3)
    }
    navigate('dashboard')
  }

  const spendCredit = (patientId) => {
    if (credits <= 0) return
    setCredits(c => c - 1)
    setCreditsSpent(s => s + 1)
    setAccessedPatients(p => [...p, patientId])
  }

  return (
    <div className="app">
      {screen === 'landing' && (
        <LandingScreen navigate={navigate} isActivated={isActivated} />
      )}
      {screen === 'optin' && (
        <OptinScreen navigate={navigate} timeDelay={timeDelay} setTimeDelay={setTimeDelay} />
      )}
      {screen === 'preview' && (
        <PreviewScreen navigate={navigate} activate={activate} timeDelay={timeDelay} />
      )}
      {screen === 'dashboard' && (
        <Dashboard
          navigate={navigate}
          credits={credits}
          creditsEarned={creditsEarned}
          creditsSpent={creditsSpent}
          spendCredit={spendCredit}
          accessedPatients={accessedPatients}
          timeDelay={timeDelay}
        />
      )}
    </div>
  )
}

export default App
