export default function TestPage() {
  return (
    <div style={{ padding: '50px', background: 'linear-gradient(to bottom, #60a5fa, #3b82f6)', minHeight: '100vh' }}>
      <h1 style={{ color: 'white', fontSize: '48px', textAlign: 'center' }}>
        🎉 NETTO LAUNDRY TEST PAGE
      </h1>
      <p style={{ color: 'white', textAlign: 'center', fontSize: '20px' }}>
        Jika Anda melihat halaman ini, berarti routing sudah bekerja!
      </p>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <a href="/login" style={{ 
          background: 'white', 
          color: '#3b82f6', 
          padding: '15px 30px', 
          borderRadius: '25px', 
          textDecoration: 'none',
          fontWeight: 'bold',
          display: 'inline-block'
        }}>
          GO TO LOGIN
        </a>
      </div>
    </div>
  );
}
