import Link from 'next/link';

export default function SemesterMid({ params }) {
  const { sem } = params;

  // Subjects based on user request mapping to dynamic routing
  const semesterSubjects = {
    'I': [
      "Matrices and Calculus",
      "Applied Physics",
      "Programming for Problem Solving",
      "English for Skill Enhancement",
      "Elements of Computer Science & Engineering",
      "Environmental Science"
    ],
    'II': [
      "Ordinary Differential Equations and Vector Calculus",
      "Engineering Chemistry",
      "Basic Electrical Engineering",
      "Electronic Devices and Circuits"
    ],
    'III': [
      "Mathematical and Statistical Foundations",
      "Data Structures",
      "Computer Organization and Architecture",
      "Software Engineering",
      "Operating Systems",
      "Constitution of India"
    ],
    'IV': [
      "Discrete Mathematics",
      "Automata Theory and Compiler Design",
      "Database Management Systems",
      "Introduction to Artificial Intelligence",
      "Object Oriented Programming through Java"
    ],
    'V': [
      "Design and Analysis of Algorithms",
      "Machine Learning",
      "Computer Networks",
      "Business Economics & Financial Analysis",
      "Web Programming",
      "Intellectual Property Rights",
      "Mobile Computing"
    ],
    'VI': [
      "Knowledge Representation and Reasoning",
      "Natural Language Processing",
      "Data Warehousing and Business Intelligence",
      "Fundamentals of Internet of Things",
      "Ad-Hoc & Sensor Networks",
      "Data Analytics"
    ]
  };

  const subjects = semesterSubjects[sem] || [];

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ borderBottom: '2px solid #0070f3', paddingBottom: '10px' }}>
        Semester {sem} - Subjects
      </h2>
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {subjects.map((sub, index) => (
          <Link key={index} href={`/semester/${sem}/${encodeURIComponent(sub)}`} style={{
            padding: '15px 20px',
            backgroundColor: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            textDecoration: 'none',
            color: '#0070f3',
            fontSize: '16px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            display: 'block'
          }}>
            {sub}
          </Link>
        ))}
        {subjects.length === 0 && <p>No subjects found for this semester.</p>}
      </div>
      <div style={{ marginTop: '30px' }}>
        <Link href="/semester" style={{ color: '#555', textDecoration: 'none' }}>
          &larr; Back to Semesters
        </Link>
      </div>
    </div>
  );
}
