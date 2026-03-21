function FearsScreen({ navigate }) {
  return (
    <div>
      <div className="nav">
        <button className="btn" onClick={() => navigate('landing')}>Back</button>
        <span className="nav-title">How sharing works</span>
      </div>

      <div className="card">
        <p style={{ fontSize: '15px', fontWeight: '500', marginBottom: '4px' }}>
          We designed this for competitors
        </p>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '14px' }}>
          The two most common concerns — and how the system addresses them.
        </p>

        <div className="fear-item">
          <div style={{ fontSize: '16px', width: '24px', flexShrink: 0 }}>1</div>
          <div>
            <strong style={{ fontSize: '14px' }}>"Sharing helps patients switch to rivals"</strong>
            <br />
            <span style={{ color: '#666', fontSize: '13px' }}>
              Patient history is only ever requested after a patient has already booked at a new clinic via the Blind-Match Protocol. By the time data is shared, that patient was already gone. Sharing simply extracts a network credit from a lost customer.
            </span>
          </div>
        </div>

        <div className="fear-item">
          <div style={{ fontSize: '16px', width: '24px', flexShrink: 0 }}>2</div>
          <div>
            <strong style={{ fontSize: '14px' }}>"Other physios will judge my clinical decisions"</strong>
            <br />
            <span style={{ color: '#666', fontSize: '13px' }}>
              Shared notes are strictly read-only summaries. There is no annotation layer. Competitors cannot comment on or critique your work because the system does not support it. This is a structural guarantee, not a policy promise.
            </span>
          </div>
        </div>
      </div>

      <div className="card">
        <p style={{ fontSize: '15px', fontWeight: '500', marginBottom: '12px' }}>
          The credit model
        </p>

        <div className="fear-item">
          <div style={{ fontWeight: '500', width: '24px', flexShrink: 0, color: '#1D9E75' }}>+</div>
          <div style={{ fontSize: '14px' }}>
            <strong>Earn 1 credit</strong> every time a patient history you share is accessed by another clinic
          </div>
        </div>

        <div className="fear-item">
          <div style={{ fontWeight: '500', width: '24px', flexShrink: 0, color: '#A32D2D' }}>-</div>
          <div style={{ fontSize: '14px' }}>
            <strong>Spend 1 credit</strong> to access a patient history from another clinic
          </div>
        </div>

        <div className="fear-item">
          <div style={{ fontWeight: '500', width: '24px', flexShrink: 0, color: '#854F0B' }}>!</div>
          <div style={{ fontSize: '14px' }}>
            <strong>Credits expire after 90 days</strong> — prevents hoarding and keeps the network liquid
          </div>
        </div>
      </div>

      <button className="btn btn-primary" onClick={() => navigate('optin')}>
        Set up sharing for Northside Physio
      </button>
    </div>
  )
}

export default FearsScreen
