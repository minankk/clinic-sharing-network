function LandingScreen({ navigate, isActivated }) {
  const lockedPatients = [
    { id: 'KNT-4471', tag: 'Lumbar strain' },
    { id: 'KNT-5892', tag: 'Rotator cuff' },
    { id: 'KNT-6103', tag: 'Knee rehab' },
  ]

  return (
    <div>
      <p style={{ fontSize: '13px', color: '#666', marginBottom: '1.5rem' }}>
        Kinetic — shared patient history network &nbsp;&bull;&nbsp; 1,847 clinics
      </p>

      <div className="social-proof">
        94 clinics joined this week. Network clinics receive an average of 4.2 patient histories per month.
      </div>

      <div className="metric-grid">
        <div className="metric">
          <div className="metric-label">Network clinics</div>
          <div className="metric-value">1,847</div>
        </div>
        <div className="metric">
          <div className="metric-label">Histories shared today</div>
          <div className="metric-value">312</div>
        </div>
        <div className="metric">
          <div className="metric-label">Local opt-in rate</div>
          <div className="metric-value">84%</div>
        </div>
      </div>

      <div className="card">
        <p style={{ fontSize: '15px', fontWeight: '500', marginBottom: '4px' }}>
          Northside Physio — not yet sharing
        </p>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '14px' }}>
          3 of your patients have history at other clinics in the network. You cannot access it until you start sharing.
        </p>

        <div style={{ marginBottom: '16px' }}>
          {lockedPatients.map(p => (
            <div key={p.id} className="patient-row" style={{ opacity: 1 }}>
              <div>
                <span style={{ fontSize: '14px' }}>{p.id}</span>
                <br />
                <span
                  className="tag"
                  style={{
                    filter: 'blur(4px)',
                    userSelect: 'none',
                    display: 'inline-block',
                    marginTop: '2px'
                  }}
                >
                  {p.tag}
                </span>
              </div>
              <span style={{ fontSize: '18px' }}>&#128274;</span>
            </div>
          ))}
        </div>

        <div className="alert alert-warn" style={{ marginTop: 0 }}>
          You are missing context on 3 active patients. Join the network to unlock their history.
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigate('optin')}
        >
          Unlock network access
        </button>
      </div>
    </div>
  )
}

export default LandingScreen
