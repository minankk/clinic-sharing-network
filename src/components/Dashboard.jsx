import { useState, useEffect } from 'react'

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

function Dashboard({
  credits,
  creditsEarned,
  creditsSpent,
  spendCredit,
  accessedPatients,
  timeDelay
}) {
  const [progress, setProgress] = useState(83)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(84), 600)
    return () => clearTimeout(timer)
  }, [])

  const delayLabel = timeDelay === 'none'
    ? 'Immediate'
    : `${timeDelay}-day delay`

  const allAccessed = accessedPatients.length === ALL_PATIENTS.length

  return (
    <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '1.5rem'
      }}>
        <p style={{ fontSize: '14px', fontWeight: '500' }}>Northside Physio</p>
        <span className="badge badge-success">Sharing active</span>
        <span className="badge badge-info">{delayLabel}</span>
      </div>

      <div className="metric-grid">
        <div className="metric">
          <div className="metric-label">Credits available</div>
          <div className="metric-value">{credits}</div>
        </div>
        <div className="metric">
          <div className="metric-label">Credits earned</div>
          <div className="metric-value">{creditsEarned}</div>
        </div>
        <div className="metric">
          <div className="metric-label">Credits spent</div>
          <div className="metric-value">{creditsSpent}</div>
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

      {credits === 0 && !allAccessed && (
        <div className="alert alert-warn">
          No credits remaining. Your shared histories are still active — you will earn credits as other clinics access them.
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
                    onClick={() => spendCredit(pt.id)}
                    disabled={credits === 0}
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
    </div>
  )
}

export default Dashboard
