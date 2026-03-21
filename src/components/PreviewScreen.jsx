function PreviewScreen({ navigate, activate, timeDelay }) {
  const delayLabel = timeDelay === 'none'
    ? 'Immediately after patient books elsewhere'
    : `After a ${timeDelay}-day delay from last appointment`

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
          This is exactly what another clinic sees
        </p>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '14px' }}>
          Read-only. No annotation layer. Triggered only after a patient has already booked elsewhere via the Blind-Match Protocol — by that point, they were already gone.
        </p>

        <div style={{
          background: '#f4f4f2',
          borderRadius: '8px',
          padding: '12px',
          fontSize: '13px',
          marginBottom: '12px'
        }}>
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
            <span style={{ color: '#666' }}>Comments / annotations</span>
            <span style={{ color: '#A32D2D' }}>Not available — read only</span>
          </div>
          <div className="preview-row">
            <span style={{ color: '#666' }}>Practitioner identity</span>
            <span style={{ color: '#A32D2D' }}>Not available — never shared</span>
          </div>
        </div>

        <div style={{
          background: '#E6F1FB',
          borderRadius: '8px',
          padding: '10px 12px',
          fontSize: '13px',
          color: '#185FA5',
          marginBottom: '12px'
        }}>
          Your sharing delay: <strong>{delayLabel}</strong>
        </div>

        <p style={{ fontSize: '12px', color: '#666' }}>
          Billing notes, practitioner name and contact details are never shared under any circumstances.
        </p>
      </div>

      <div className="alert alert-success">
        Activating sharing gives you immediate access to 3 patient histories in your area.
      </div>

      <button className="btn btn-primary" onClick={activate}>
        Activate sharing
      </button>
      <button className="btn btn-danger" onClick={() => navigate('landing')}>
        Not now
      </button>
    </div>
  )
}

export default PreviewScreen
