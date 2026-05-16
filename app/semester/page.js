'use client';
import Link from 'next/link';

export default function Semesters() {
  const semesters = ['I', 'II', 'III', 'IV', 'V', 'VI'];
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ borderBottom: '2px solid #0070f3', paddingBottom: '10px' }}>Select Your Semester</h2>
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {semesters.map(sem => (
          <Link key={sem} href={`/semester/${sem}`} style={{
            padding: '15px 20px',
            backgroundColor: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            textDecoration: 'none',
            color: '#333',
            fontSize: '18px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            display: 'block'
          }}>
            Semester {sem} &rarr;
          </Link>
        ))}
      </div>
      <div style={{ marginTop: '30px' }}>
         {/* Simple logout mechanism by clearing cookie */}
         <Link href="/login" onClick={() => { document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; }} style={{ color: '#d9534f', textDecoration: 'none' }}>
           Logout
         </Link>
      </div>
    </div>
  );
}
