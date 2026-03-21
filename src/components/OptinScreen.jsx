 function OptinScreen({ navigate }) {
  return (
    <div>
      <div className="nav">
        <button className="btn" onClick={() => navigate('fears')}>Back</button>
        <span className="nav-title">Configure sharing</span>
      </div>

      <div className="step-indicator">
        <div className="step done">1</div>
        <div className="step active">2</div>
        <div className="step">3</div>
      </div>

      <div className="card">
        <p style={{ fontSize: '15px', fontWeight: '500', marginBottom: '12px' }}>
          What do you share?
        </p>

        <label>Share patient history with</label>
        <select>
          <option>All Kinetic clinics</option>
          <option>Clinics outside my postcode area</option>
          <option>Only clinics I approve manually</option>
        </select>

        <label>Time delay before sharing</label>
        <select>
          <option>No delay — share immediately after patient books elsewhere</option>
          <option>14-day delay after last appointment</option>
          <option>30-day delay after last appointment</option>
        </select>

        <label>Exclude note types</label>
        <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1a1a1a' }}>
            <input type="checkbox" defaultChecked /> Treatment summaries
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1a1a1a' }}>
            <input type="checkbox" defaultChecked /> Diagnosis codes
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1a1a1a' }}>
            <input type="checkbox" /> Billing notes
          </label>
        </div>
      </div>

      <button className="btn btn-primary" onClick={() => navigate('preview')}>
        Preview what you will share
      </button>
    </div>
  )
}

export default OptinScreen
