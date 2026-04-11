import { useState, useEffect, useRef } from 'react'

const ALL_PATIENTS = [
  { id: 'KNT-4471', tags: ['Lumbar strain', '92 days ago'], clinic: 'Harbour Physio' },
  { id: 'KNT-5892', tags: ['Rotator cuff', '3 months ago'], clinic: 'Westside Physio' },
  { id: 'KNT-6103', tags: ['Knee rehab', '8 months ago'], clinic: 'City Physio' },
]

const ACTIVITY_FEED = [
  { text: 'KNT-7821 accessed by Harbour Physio', time: '2 hours ago' },
  { text: 'KNT-9103 accessed by City Physio', time: '5 hours ago' },
  { text: 'KNT-6612 accessed by Westside Physio', time: 'yesterday' },
]

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16)
}

function Dashboard({
  credits,
  creditsEarned,
  creditsSpent,
  spendCredit,
  accessedPatients,
  timeDelay
}) {
  const [progress, setProgress] = useState(83)
  const [logs, setLogs] = useState([
    '> SYSTEM INIT: Node connected to Kinetic Network.',
    '> Awaiting inbound Blind-Match queries...'
  ])
  const [simulating, setSimulating] = useState(false)
  const [devMode, setDevMode] = useState(false)
  const [localCredits, setLocalCredits] = useState(credits)
  const [localEarned, setLocalEarned] = useState(creditsEarned)
  const [localSpent, setLocalSpent] = useState(creditsSpent)
  const [simulationRun, setSimulationRun] = useState(false)
  const terminalEndRef = useRef(null)

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs])

  useEffect(() => {
    const timer = setTimeout(() => setProgress(84), 600)
    return () => clearTimeout(timer)
  }, [])

  const delayLabel = timeDelay === 'none' ? 'Immediate' : `${timeDelay}-day delay`
  const allAccessed = accessedPatients.length === ALL_PATIENTS.length

  const addLog = (msg) => setLogs(prev => [...prev, msg])

  const handleAccess = (patientId) => {
    if (localCredits <= 0) return
    spendCredit(patientId)
    setLocalCredits(c => c - 1)
    setLocalSpent(s => s + 1)
    const patient = ALL_PATIENTS.find(p => p.id === patientId)
    triggerBlindMatch(patientId, patient.clinic)
  }

  const triggerBlindMatch = async (patientId, requestingClinic) => {
    const raw = `${patientId}-2025`
    const hash = await sha256(raw)
    const sequence = [
      { time: 200,  msg: `> OUTBOUND QUERY TRIGGERED` },
      { time: 500,  msg: `> Requesting clinic: ${requestingClinic}` },
      { time: 900,  msg: `> Raw identifier: "${raw}"` },
      { time: 1300, msg: `> SHA-256 hash: ${hash}...` },
      { time: 1700, msg: `> Broadcasting zero-knowledge query to Kinetic Network...` },
      { time: 2000, msg: `> Raw identifier discarded from memory.` },
      { time: 2500, msg: `> MATCH FOUND at: [REDACTED until credit confirmed]` },
      { time: 3000, msg: `> Confirming credit transfer...` },
      { time: 3400, msg: `> Credit confirmed. Match: Northside Physio` },
      { time: 3800, msg: `> Read-only payload delivered to ${requestingClinic}.` },
      { time: 4200, msg: `> Northside Physio credited +1. Raw identifier never transmitted.` },
    ]
    sequence.forEach(({ time, msg }) => {
      setTimeout(() => addLog(msg), time)
    })
  }

  const runSimulation = () => {
    if (simulating) return
    setSimulating(true)
    setSimulationRun(true)

    const sequence = [
      { time: 500,  msg: '> FAST-FORWARD INITIATED: Simulating 30 days of network activity...' },
      { time: 1200, msg: '> INBOUND QUERY: hash(Patient + DOB) -> f3a91c2d...' },
      { time: 1800, msg: '> BLIND-MATCH CONFIRMED: Local record found for KNT-7199.' },
      { time: 2400, msg: '> Validating Time-Delay Protocol...' },
      { time: 3000, msg: '> Protocol cleared. Transmitting read-only payload.' },
      { time: 3400, action: () => {
        setLocalCredits(c => c + 1)
        setLocalEarned(e => e + 1)
        addLog('> SUCCESS: +1 Network Credit added to ledger.')
      }},
      { time: 4500, msg: '> CRON JOB: Running 90-day credit expiry check...' },
      { time: 5200, msg: '> RESULT: 1 unspent credit expired to maintain network liquidity.' },
      { time: 5600, action: () => {
        setLocalCredits(c => Math.max(0, c - 1))
        setProgress(p => Math.min(p + 4, 88))
        addLog('> METRIC UPDATE: Local opt-in rate increased to 88%.')
      }},
      { time: 6400, msg: '> INBOUND QUERY: hash(Patient + DOB) -> b2e74f9a...' },
      { time: 7000, msg: '> BLIND-MATCH CONFIRMED: Local record found for KNT-8832.' },
      { time: 7400, action: () => {
        setLocalCredits(c => c + 1)
        setLocalEarned(e => e + 1)
        addLog('> SUCCESS: +1 Network Credit added to ledger.')
      }},
      { time: 8200, msg: '> SIMULATION COMPLETE. 30-day cycle finished. System holding.' },
      { time: 8400, action: () => setSimulating(false) }
    ]

    sequence.forEach(({ time, msg, action }) => {
      setTimeout(() => {
        if (msg) addLog(msg)
        if (action) action()
      }, time)
    })
  }

  const devState = {
    screen: 'dashboard',
    clinic: 'Northside Physio',
    isActivated: true,
    timeDelay: timeDelay,
    credits: {
      available: localCredits,
      earned: localEarned,
      spent: localSpent,
      expiryDays: 67
    },
    network: {
      optInRate: `${progress}%`,
      totalClinics: 1847,
    },
    patients: ALL_PATIENTS.map(p => ({
      id: p.id,
      accessed: accessedPatients.includes(p.id)
    })),
    blindMatchProtocol: {
      hashAlgorithm: 'SHA-256',
      rawIdentifierTransmitted: false,
      payloadFields: ['diagnosisCode', 'treatmentSummary', 'dates'],
      annotationLayer: false
    }
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <p style={{ fontSize: '14px', fontWeight: '500' }}>Northside Physio</p>
          <span className="badge badge-success">Sharing active</span>
          <span className="badge badge-info">{delayLabel}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            className="btn"
            onClick={() => setDevMode(d => !d)}
            style={{
              margin: 0,
              padding: '4px 10px',
              fontSize: '11px',
              background: devMode ? '#1a1a1a' : 'transparent',
              color: devMode ? '#00ff00' : '#666',
              borderColor: devMode ? '#1a1a1a' : '#ccc',
              fontFamily: 'monospace'
            }}
          >
            {devMode ? 'DEV ON' : 'DEV OFF'}
          </button>
          <button
            className="btn btn-primary"
            onClick={runSimulation}
            disabled={simulating}
            style={{
              margin: 0,
              padding: '4px 10px',
              fontSize: '12px',
              background: '#1a1a1a',
              borderColor: '#1a1a1a'
            }}
          >
            {simulating ? 'Simulating...' : '▶ Simulate 30 Days'}
          </button>
        </div>
      </div>

      <div className="metric-grid">
        <div className="metric">
          <div className="metric-label">Credits available</div>
          <div className="metric-value" style={{
            transition: 'color 0.3s',
            color: simulating ? '#185FA5' : '#1a1a1a'
          }}>
            {localCredits}
          </div>
        </div>
        <div className="metric">
          <div className="metric-label">Credits earned</div>
          <div className="metric-value">{localEarned}</div>
        </div>
        <div className="metric">
          <div className="metric-label">Credits spent</div>
          <div className="metric-value">{localSpent}</div>
        </div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%`, transition: 'width 0.8s ease' }}
        />
      </div>
      <p style={{ fontSize: '12px', color: '#666', marginBottom: '1rem' }}>
        {progress}% of clinics in your postcode area are now sharing — your activation contributed to this
      </p>

      {localCredits === 0 && !allAccessed && (
        <div className="alert alert-warn">
          No credits remaining. Your shared histories are still active — you will earn credits as other clinics access them.
        </div>
      )}

      {devMode && (
        <div style={{
          background: '#0a0a0a',
          color: '#00ff00',
          fontFamily: 'monospace',
          fontSize: '11px',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '1rem',
          lineHeight: '1.6'
        }}>
          <p style={{
            fontSize: '11px',
            color: '#666',
            marginBottom: '8px',
            borderBottom: '1px solid #333',
            paddingBottom: '4px'
          }}>
            SYSTEM STATE (DEV MODE)
          </p>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {JSON.stringify(devState, null, 2)}
          </pre>
        </div>
      )}

      <div className="card">
        <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '10px' }}>
          Patients with available history
        </p>
        {ALL_PATIENTS.map(pt => {
          const isAccessed = accessedPatients.includes(pt.id)
          return (
            <div className="patient-row" key={pt.id}>
              <div>
                <span style={{ fontSize: '14px' }}>{pt.id}</span>
                <br />
                {pt.tags.map(t => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
              {isAccessed
                ? <span className="badge badge-success">Accessed</span>
                : (
                  <button
                    className="btn btn-primary"
                    style={{ fontSize: '12px', padding: '5px 12px' }}
                    onClick={() => handleAccess(pt.id)}
                    disabled={localCredits === 0}
                  >
                    Access (1 credit)
                  </button>
                )
              }
            </div>
          )
        })}
        {allAccessed && (
          <p style={{ fontSize: '13px', color: '#666', marginTop: '10px' }}>
            All available histories accessed. Share more patient records to grow your credit balance.
          </p>
        )}
      </div>

      <div className="card">
        <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '10px' }}>
          Network activity — your shared histories
        </p>
        {ACTIVITY_FEED.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: i < ACTIVITY_FEED.length - 1
                ? '0.5px solid rgba(0,0,0,0.08)'
                : 'none',
              fontSize: '13px'
            }}
          >
            <div>
              <span>{item.text}</span>
              <br />
              <span style={{ color: '#666', fontSize: '12px' }}>{item.time}</span>
            </div>
            <span className="badge badge-success">+1 credit</span>
          </div>
        ))}
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Credits expire 90 days after being earned. Current balance expires in 67 days.
        </p>
      </div>

      <div className="card" style={{
        background: '#0a0a0a',
        border: 'none',
        padding: '12px'
      }}>
        <p style={{
          fontSize: '11px',
          color: '#666',
          marginBottom: '8px',
          borderBottom: '1px solid #333',
          paddingBottom: '4px',
          fontFamily: 'monospace'
        }}>
          SYSTEM LOGS (BLIND-MATCH PROTOCOL)
        </p>
        <div style={{
          height: '160px',
          overflowY: 'auto',
          fontSize: '11px',
          lineHeight: '1.6',
          fontFamily: 'monospace',
          color: '#00ff00'
        }}>
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '3px' }}>{log}</div>
          ))}
          <div ref={terminalEndRef} />
        </div>
      </div>

    </div>
  )
}

export default Dashboard
