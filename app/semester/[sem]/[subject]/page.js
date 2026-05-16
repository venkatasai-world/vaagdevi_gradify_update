export default function SubjectDetails({ params }) {
  // Decode the parameters to handle spaces and special characters
  const sem = decodeURIComponent(params.sem);
  const subject = decodeURIComponent(params.subject);

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#333', borderBottom: '2px solid #0070f3', paddingBottom: '10px' }}>
        Subject Details
      </h2>
      <div style={{ marginTop: '20px', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <p style={{ marginBottom: '10px' }}><strong>Semester:</strong> {sem}</p>
        <p style={{ marginBottom: '20px' }}><strong>Subject Name:</strong> {subject}</p>
        
        <h3 style={{ marginBottom: '15px', color: '#444' }}>Mid Semester Marks</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '10px', background: '#f9f9f9', textAlign: 'left' }}>Exam</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', background: '#f9f9f9', textAlign: 'left' }}>Max Marks</th>
              <th style={{ border: '1px solid #ccc', padding: '10px', background: '#f9f9f9', textAlign: 'left' }}>Obtained</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Mid 1</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>25</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', color: '#888' }}>Not updated</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>Mid 2</td>
              <td style={{ border: '1px solid #ccc', padding: '10px' }}>25</td>
              <td style={{ border: '1px solid #ccc', padding: '10px', color: '#888' }}>Not updated</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: '30px' }}>
        <a href={`/semester/${encodeURIComponent(sem)}`} style={{ color: '#0070f3', textDecoration: 'none' }}>
          &larr; Back to Subjects
        </a>
      </div>
    </div>
  );
}
