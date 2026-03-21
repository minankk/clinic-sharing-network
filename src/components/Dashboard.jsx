import { useState } from 'react'

const initialPatients = [
  { id: 'KNT-4471', tags: ['Lumbar strain', '92 days ago'], accessed: false },
  { id: 'KNT-5892', tags: ['Rotator cuff', '3 months ago'], accessed: false },
  { id: 'KNT-6103', tags: ['Knee rehab', '8 months ago'], accessed: false },
]

function Dashboard({ credits, setCredits }) {
  const [patients, setPatients] = useState(initialPatients)

  const accessPatient = (id) => {
    if (credits <= 0) return
    setCredits(c => c - 1)
    setPatients(p => p.map(pt => pt.id === id ? { ...pt, accessed: true } : pt))
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '14px', fontWeight: '500' }}>Northside Physio</p>
        <span className="badge badge-success">Sharing active</span>
      </div>

      <div className="metric-grid">
        <div className="metric">
          <div className="metric-label">Credits available</div>
          <div className="metric-value">{credits}</div>
        </div>
        <div className="metric">
          <div className="metric-label">Histories shared</div>
          <div className="metric-value">7</div>
        </div>
        <div className="metric">
          <div className="metric-label">Credits earned</div>
          <div className="metric-value">3</div>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: '84%' }} />
      </div>
      <p style={{ fontSize: '12px', color: '#666', marginBottom: '1rem' }}>
        84% of clinics in your postcode area are sharing
      </p>

      {credits === 0 && (
        <div className="alert alert-warn">
          No credits remaining. Share more patient histories to earn credits.
        </div>
      )}

      <div className="card">
        <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '10px' }}>
          Patients with available history
        </p>
        {patients.map(pt => (
          <div className="patient-row" key={pt.id}>
            <div>
              <span style={{ fontSize: '14px' }}>{pt.id}</span>
              <br />
              {pt.tags.map(t => <span className="tag" key={t}>{t}</span>)}
            </div>
            {pt.accessed
              ? <span className="badge badge-success">Accessed</span>
              : <button
                  className="btn btn-primary"
                  style={{ fontSize: '12px', padding: '5px 12px' }}
                  onClick={() => accessPatient(pt.id)}
                  disabled={credits === 0}
                >
                  Access (1 credit)
                </button>
            }
          </div>
        ))}
      </div>

      <div className="card">
        <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
          Network activity
        </p>
        <p style={{ fontSize: '13px', color: '#666' }}>
          Your shared histories have been accessed 7 times this month, earning 3 credits. Credits expire in 67 days.
        </p>
      </div>
    </div>
  )
}

export default Dashboard
