function LandingScreen({ navigate }) {
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
          <div className="metric-label">Avg opt-in rate</div>
          <div className="metric-value">84%</div>
        </div>
      </div>

      <div className="card">
        <p style={{ fontSize: '15px', fontWeight: '500', marginBottom: '6px' }}>
          Northside Physio — not yet sharing
        </p>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px' }}>
          You currently have 0 credits. You cannot access patient history until you start sharing.
        </p>
        <div className="alert alert-warn">
          You are missing context on 3 patients seen at other clinics this month.
        </div>
        <button className="btn btn-primary" onClick={() => navigate('fears')}>
          See how sharing works
        </button>
      </div>
    </div>
  )
}

export default LandingScreen
