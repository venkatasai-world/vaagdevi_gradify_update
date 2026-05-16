'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
  const router = useRouter();
  const [selectedSemester, setSelectedSemester] = useState('V');
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('studentUser');
    if (storedData) {
      setStudentData(JSON.parse(storedData));
    } else {
      router.push('/studentlogin');
    }
  }, [router]);

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

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push('/');
  };

  const subjectsToRender = semesterSubjects[selectedSemester] || [];

  return (
    <>
      <style jsx global>{`
        body {
          font-family: Arial, sans-serif;
          background-color: #e6f7ff;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          flex-direction: column;
        }

        .dashboard-box {
          background-color: #ffffff;
          border: 3px solid #4CAF50;
          border-radius: 20px;
          padding: 30px;
          width: 95%;
          max-width: 900px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          text-align: center;
          margin-bottom: 20px;
        }

        h2 {
          color: #d80000;
          margin-bottom: 20px;
        }

        .avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid black;
          margin: 0 auto 20px auto;
        }

        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .details {
          margin-bottom: 30px;
        }
        
        .semester-selector {
          margin: 20px 0;
          padding: 10px;
          background: #f9f9f9;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
        }
        
        .semester-selector select {
          padding: 8px 15px;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 16px;
        }

        .download_pdf {
          margin-top: 20px;
        }

        .download_pdf a button {
          padding: 12px 24px;
          font-size: 16px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .download_pdf a button:hover {
          background-color: #45a049;
        }

        /* Marks Table */
        .marks-table {
          width: 100%;
          border-collapse: collapse;
          box-shadow: 0 0 8px #ccc;
          border-radius: 10px;
          overflow: hidden;
          background-color: white;
          margin-top: 20px;
        }

        .marks-table th, .marks-table td {
          padding: 12px 15px;
          border: 1px solid #ddd;
          text-align: center;
        }

        .marks-table th {
          background-color: #4CAF50;
          color: white;
        }

        .marks-table tr:nth-child(even) {
          background-color: #f2f2f2;
        }

        .marks-table tr:hover {
          background-color: #d4f5ff;
        }

        @media (max-width: 600px) {
          .marks-table th, .marks-table td {
            font-size: 14px;
            padding: 8px;
          }
        }
      `}</style>
      
      <button 
        onClick={handleLogout} 
        style={{ position: 'fixed', top: '20px', right: '20px', padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Logout
      </button>

      <div className="dashboard-box">
        <h2>STUDENT DASHBOARD</h2>

        <div className="avatar">
          <img 
            src={studentData?.gender?.toLowerCase() === 'female' ? '/images/female.png' : '/images/male.png'} 
            alt="Student Avatar" 
            onError={(e)=>{e.target.onerror = null; e.target.src="https://img.freepik.com/premium-vector/boy-with-hoodie-that-says-hes-boy_1230457-43316.jpg"}} 
          />
        </div>

        <div className="details" id="studentDetails">
          <p><strong>Name:</strong> <span>{studentData?.name || 'Loading...'}</span></p>
          <p><strong>HT No:</strong> <span>{studentData?.rollNo || 'Loading...'}</span></p>
          <p><strong>Section:</strong> <span>{studentData?.section || 'Loading...'}</span></p>
        </div>
        
        <div className="semester-selector">
          <label htmlFor="semesterSelect"><strong>Select Semester:</strong></label>
          <select 
            id="semesterSelect" 
            value={selectedSemester} 
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            {Object.keys(semesterSubjects).map(sem => (
              <option key={sem} value={sem}>Semester {sem}</option>
            ))}
          </select>
        </div>

        {/* Marks Table */}
        <table className="marks-table" id="marksTable">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Subject Name</th>
              <th>Mid 1</th>
              <th>Mid 2</th>
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
            {subjectsToRender.map((subject, index) => {
              // Get actual marks from database if available
              let mid1 = 'NA';
              let mid2 = 'NA';
              let avg = 'NA';
              let isSpecial = false;

              if (studentData?.subjects && studentData.subjects[subject]) {
                const marks = studentData.subjects[subject];
                mid1 = marks['Mid 1'] || 'NA';
                mid2 = marks['Mid 2'] || 'NA';
                avg = marks['Average'] || 'NA';
                if (mid1 !== 'NA' || mid2 !== 'NA') {
                  isSpecial = true;
                }
              }

              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{subject}</td>
                  <td style={isSpecial ? {color: '#2e7d32', fontWeight: 'bold'} : {}}>{mid1}</td>
                  <td style={isSpecial ? {color: '#2e7d32', fontWeight: 'bold'} : {}}>{mid2}</td>
                  <td style={isSpecial ? {color: '#1976d2', fontWeight: 'bold'} : {}}>{avg}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="download_pdf">
          <a href="https://jntuh.ac.in/uploads/academics/R22B.Tech.CSE(AIML)CourseStructureSyllabus2.pdf" target="_blank" rel="noreferrer">
            <button>Download Syllabus</button>
          </a>
        </div>
        

      </div>
    </>
  );
}
