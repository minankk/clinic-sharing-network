function OptinScreen({ navigate, timeDelay, setTimeDelay }) {
  return (
    <div>
      <div className="nav">
        <button className="btn" onClick={() => navigate('landing')}>Back</button>
        <span className="nav-title">Configure sharing</span>
      </div>

      <div className="step-indicator">
        <div className="step done">1</div>
        <div className="step active">2</div>
        <div className="step">3</div>
      </div>

      <div className="card">
        <p style={{ fontSize: '15px', fontWeight: '500', marginBottom: '4px' }}>
          One setting. That is all.
        </p>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '16px' }}>
          The data payload is fixed — diagnosis codes, treatment summaries and dates. This guarantees network quality for every clinic. The only thing you control is timing.
        </p>

        <label>Share patient history</label>
        <select
          value={timeDelay}
          onChange={e => setTimeDelay(e.target.value)}
        >
          <option value="none">Immediately after patient books elsewhere</option>
          <option value="14">After a 14-day delay from last appointment</option>
          <option value="30">After a 30-day delay from last appointment</option>
        </select>

        <div style={{
          background: '#f4f4f2',
          borderRadius: '8px',
          padding: '12px',
          marginTop: '16px',
          fontSize: '13px',
          color: '#666'
        }}>
          <p style={{ fontWeight: '500', color: '#1a1a1a', marginBottom: '6px' }}>
            What is always shared
          </p>
          <p style={{ marginBottom: '4px' }}>Diagnosis codes</p>
          <p style={{ marginBottom: '4px' }}>Treatment summaries</p>
          <p style={{ marginBottom: '4px' }}>Dates of treatment</p>
          <p style={{ marginTop: '8px', fontSize: '12px' }}>
            Billing notes, practitioner identity and contact details are never shared.
          </p>
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => navigate('preview')}
      >
        Preview shared data
      </button>
    </div>
  )
}

export default OptinScreen
