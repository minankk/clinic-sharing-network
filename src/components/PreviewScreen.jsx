function PreviewScreen({ navigate, setCredits }) {

  const handleActivate = () => {
    setCredits(3)
    navigate('dashboard')
  }

  return (
    <div>
      <div className="nav">
        <button className="btn" onClick={() => navigate('optin')}>Back</button>
        <span className="nav-title">Preview and confirm</span>
      </div>

      <div className="step-indicator">
        <div className="step done">1</div>
        <div className="step done">2</div>
        <div className="step active">3</div>
      </div>

      <div className="card">
        <p style={{ fontSize: '15px', fontWeight: '500', marginBottom: '4px' }}>
          This is what another clinic sees
        </p>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '14px' }}>
          Read-only. No comments. Triggered only after patient has already booked elsewhere.
        </p>

        <div style={{ background: '#f4f4f2', borderRadius: '8px', padding: '12px', fontSize: '13px' }}>
          <div className="preview-row">
            <span style={{ color: '#666' }}>Patient ref</span>
            <span>KNT-4471</span>
          </div>
          <div className="preview-row">
            <span style={{ color: '#666' }}>Match triggered</span>
            <span>Patient booked at Harbour Physio on 18 Mar 2026</span>
          </div>
          <div className="preview-row">
            <span style={{ color: '#666' }}>Last seen at your clinic</span>
            <span>92 days ago</span>
          </div>
          <div className="preview-row">
            <span style={{ color: '#666' }}>Diagnosis</span>
            <span>Lumbar strain (M54.5)</span>
          </div>
          <div className="preview-row">
            <span style={{ color: '#666' }}>Treatment summary</span>
            <span>6-week course, discharged with home exercises</span>
          </div>
          <div className="preview-row">
            <span style={{ color: '#666' }}>Annotation layer</span>
            <span style={{ color: '#A32D2D' }}>Not available</span>
          </div>
        </div>

        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Billing notes, practitioner name and contact details are never shared. Data is only released via the Blind-Match Protocol — when a patient has already booked elsewhere.
        </p>
      </div>

      <div className="alert alert-success">
        Activating sharing gives you immediate access to 3 patient histories in your area.
      </div>

      <button className="btn btn-primary" onClick={handleActivate}>
        Activate sharing
      </button>
      <button className="btn btn-danger" onClick={() => navigate('landing')}>
        Not now
      </button>
    </div>
  )
}

export default PreviewScreen
