'use client';
export default function DunkiPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#111', color: '#fff', flexDirection: 'column' }}>
      <h1 style={{ fontSize: '3rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#ffeb3b' }}>
        Dunki Page
      </h1>
      <p style={{ marginTop: '20px', fontSize: '1.2rem', opacity: 0.8, textAlign: 'center', maxWidth: '600px' }}>
        Welcome to the Dunki page! This is the customized component you requested.
        It has a distinct dark theme and acts as a placeholder for any special content.
      </p>
      <a href="/" style={{ marginTop: '30px', color: '#fff', border: '1px solid #fff', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px', transition: 'background 0.3s' }}
         onMouseOver={(e) => e.target.style.background = '#333'}
         onMouseOut={(e) => e.target.style.background = 'transparent'}
      >
        Return to Home
      </a>
    </div>
  );
}
