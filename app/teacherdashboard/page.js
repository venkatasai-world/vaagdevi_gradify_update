'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';

export default function TeacherDashboard() {
  const router = useRouter();
  const [faculty, setFaculty] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [students, setStudents] = useState([]);
  const [exam, setExam] = useState('Mid 1');
  const [editMode, setEditMode] = useState(false);
  const [marksInput, setMarksInput] = useState({});
  const [saving, setSaving] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('—');
  const [loading, setLoading] = useState(false);

  // Load faculty from localStorage on mount
  useEffect(() => {
    const storedFaculty = localStorage.getItem('facultyUser');
    if (storedFaculty) {
      const parsed = JSON.parse(storedFaculty);
      setFaculty(parsed);

      // Get unique subjects and auto-select the first one
      const unique = [...new Set((parsed.assignments || []).map(a => a.subject))];
      if (unique.length > 0) {
        setSelectedSubject(unique[0]);
        // Find sections available for this subject and auto-select first
        const sections = (parsed.assignments || [])
          .filter(a => a.subject === unique[0])
          .map(a => a.section)
          .sort();
        if (sections.length > 0) setSelectedSection(sections[0]);
      }
    } else {
      router.push('/teacherlogin');
    }
  }, [router]);

  // Derive unique subjects and sections from assignments
  const uniqueSubjects = useMemo(() => {
    if (!faculty?.assignments) return [];
    return [...new Set(faculty.assignments.map(a => a.subject))];
  }, [faculty]);

  const sectionsForSubject = useMemo(() => {
    if (!faculty?.assignments || !selectedSubject) return [];
    return faculty.assignments
      .filter(a => a.subject === selectedSubject)
      .map(a => a.section)
      .sort();
  }, [faculty, selectedSubject]);

  // Fetch students when subject+section+exam changes
  useEffect(() => {
    if (selectedSubject && selectedSection) {
      fetchStudents();
    }
  }, [selectedSubject, selectedSection, exam]);

  const fetchStudents = async () => {
    if (!selectedSubject || !selectedSection) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/students?section=${selectedSection}`);
      if (res.ok) {
        const data = await res.json();
        setStudents(data);

        const initialMarks = {};
        data.forEach(student => {
          let subjectMarks = null;
          if (student.subjects) {
            subjectMarks = typeof student.subjects.get === 'function'
              ? student.subjects.get(selectedSubject)
              : student.subjects[selectedSubject];
          }
          let currentMark = '';
          if (subjectMarks && subjectMarks[exam] && subjectMarks[exam] !== 'NA') {
            currentMark = subjectMarks[exam];
          }
          initialMarks[student.rollNo] = currentMark;
        });
        setMarksInput(initialMarks);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setEditMode(false);
    setStudents([]);
    setMarksInput({});
    // Auto-select first section of new subject
    if (faculty?.assignments) {
      const sections = faculty.assignments
        .filter(a => a.subject === subject)
        .map(a => a.section)
        .sort();
      setSelectedSection(sections[0] || null);
    }
  };

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    setEditMode(false);
    setStudents([]);
    setMarksInput({});
  };

  const logoutTeacher = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('facultyUser');
    router.push('/');
  };

  const handleMarkChange = (rollNo, val) => {
    setMarksInput(prev => ({ ...prev, [rollNo]: val }));
  };

  const saveMarks = async () => {
    if (!selectedSubject || !selectedSection) return;
    setSaving(true);

    const updates = students.map(s => ({
      rollNo: s.rollNo,
      mark: marksInput[s.rollNo] !== '' ? marksInput[s.rollNo].toString() : 'NA'
    }));

    try {
      const res = await fetch('/api/marks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates, subject: selectedSubject, exam })
      });

      if (res.ok) {
        alert('Marks saved successfully!');
        setEditMode(false);
        fetchStudents();
      } else {
        const err = await res.json();
        alert('Failed to save marks: ' + err.error);
      }
    } catch (error) {
      console.error('Error saving marks:', error);
      alert('An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  if (!faculty) {
    return <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'Arial' }}>Loading...</div>;
  }

  return (
    <>
      <style jsx global>{`
        * { box-sizing: border-box; }
        body {
          font-family: Arial, sans-serif;
          background-color: #e6f7ff;
          margin: 0;
          padding: 0;
        }
        .header {
          background: #4CAF50;
          color: white;
          padding: 1rem 1.5rem;
          text-align: center;
          font-size: 1.5rem;
          position: relative;
        }
        .header-sub {
          font-size: 0.9rem;
          opacity: 0.85;
          margin-top: 2px;
        }
        .logout-btn {
          position: absolute;
          top: 50%;
          right: 1rem;
          transform: translateY(-50%);
          background: #f44336;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
          font-size: 0.95rem;
        }
        .logout-btn:hover { background: #d32f2f; }
        .container {
          padding: 1rem;
          max-width: 1200px;
          margin: auto;
        }

        /* Subject Selector */
        .selector-panel {
          background: white;
          padding: 18px 20px;
          border-radius: 10px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          margin: 16px auto;
          max-width: 960px;
        }
        .selector-panel h3 {
          margin: 0 0 12px 0;
          color: #333;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .subject-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .subject-card {
          padding: 10px 18px;
          border: 2px solid #ddd;
          border-radius: 8px;
          cursor: pointer;
          background: #f9f9f9;
          transition: 0.2s;
          font-size: 0.95rem;
          color: #444;
          font-weight: 500;
        }
        .subject-card:hover { border-color: #4CAF50; background: #f0fff0; color: #2e7d32; }
        .subject-card.active { border-color: #4CAF50; background: #e8f5e8; color: #2e7d32; font-weight: bold; }

        /* Section Tabs */
        .section-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }
        .section-tab {
          padding: 7px 20px;
          border: 2px solid #ddd;
          border-radius: 6px;
          cursor: pointer;
          background: #f5f5f5;
          font-weight: bold;
          font-size: 0.95rem;
          color: #555;
          transition: 0.2s;
        }
        .section-tab:hover { border-color: #007ACC; background: #e3f2fd; color: #007ACC; }
        .section-tab.active { border-color: #007ACC; background: #007ACC; color: white; }

        /* Controls bar */
        .controls {
          background: white;
          padding: 12px 20px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          margin-bottom: 14px;
          max-width: 960px;
          margin-left: auto;
          margin-right: auto;
        }
        .controls-left { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .controls select {
          padding: 7px 14px;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 0.95rem;
        }
        .controls label { font-weight: bold; color: #333; }
        .buttons {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .buttons button {
          padding: 0.6rem 1.2rem;
          background: #007ACC;
          color: white;
          border: none;
          font-size: 0.9rem;
          border-radius: 5px;
          cursor: pointer;
          transition: 0.2s;
        }
        .buttons button:hover { background: #005fa3; }
        .buttons button:disabled { background: #ccc; cursor: not-allowed; }
        .btn-save { background: #4CAF50 !important; }
        .btn-save:hover { background: #388e3c !important; }
        .btn-cancel { background: #ff9800 !important; }
        .btn-cancel:hover { background: #e68a00 !important; }

        /* Student Grid */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1rem;
          margin-top: 10px;
          max-width: 960px;
          margin-left: auto;
          margin-right: auto;
        }
        .student-card {
          background: white;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          text-align: center;
          border-top: 4px solid #4CAF50;
        }
        .student-name {
          font-weight: bold;
          color: #333;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.95rem;
        }
        .student-roll { color: #007ACC; font-size: 0.85em; margin-bottom: 6px; }
        .current-marks {
          font-size: 0.85em;
          color: #666;
          margin: 6px 0;
          background: #f0f8ff;
          padding: 5px;
          border-radius: 4px;
          line-height: 1.6;
        }
        .student-card input[type="number"] {
          margin-top: 0.5rem;
          padding: 0.45rem;
          width: 80%;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          text-align: center;
        }
        .student-card input[type="number"]:disabled {
          background-color: #f5f5f5;
          cursor: not-allowed;
        }
        .status-bar {
          margin-top: 20px;
          padding: 10px 16px;
          background: #e3f2fd;
          border-radius: 8px;
          border: 1px solid #2196f3;
          color: #1976d2;
          text-align: center;
          font-size: 13px;
          max-width: 960px;
          margin-left: auto;
          margin-right: auto;
        }
        .empty-msg {
          margin: 40px 0;
          color: #888;
          text-align: center;
          font-size: 1.1rem;
        }
      `}</style>

      <div className="header">
        Teacher Dashboard
        <div className="header-sub">Welcome, {faculty.name}</div>
        <button className="logout-btn" onClick={logoutTeacher}>Logout</button>
      </div>

      <div className="container">

        {/* Step 1: Subject Selector — unique subjects only */}
        {uniqueSubjects.length > 1 && (
          <div className="selector-panel">
            <h3>📚 Select Subject</h3>
            <div className="subject-cards">
              {uniqueSubjects.map((subject, i) => (
                <div
                  key={i}
                  className={`subject-card ${selectedSubject === subject ? 'active' : ''}`}
                  onClick={() => handleSubjectSelect(subject)}
                >
                  {subject}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Section Tabs + Exam Selector + Action Buttons */}
        {selectedSubject && (
          <div className="controls" style={{ marginTop: '16px' }}>
            <div className="controls-left">
              {/* Section tabs */}
              {sectionsForSubject.length > 1 && (
                <>
                  <label>Section:</label>
                  <div className="section-tabs">
                    {sectionsForSubject.map(sec => (
                      <div
                        key={sec}
                        className={`section-tab ${selectedSection === sec ? 'active' : ''}`}
                        onClick={() => handleSectionSelect(sec)}
                      >
                        {sec}
                      </div>
                    ))}
                  </div>
                </>
              )}
              {sectionsForSubject.length === 1 && (
                <span style={{ color: '#555' }}>Section: <strong>{selectedSection}</strong></span>
              )}

              <span style={{ color: '#ddd', margin: '0 4px' }}>|</span>

              <label htmlFor="exam">Exam:</label>
              <select id="exam" value={exam} onChange={(e) => { setExam(e.target.value); setEditMode(false); }}>
                <option value="Mid 1">Mid 1</option>
                <option value="Mid 2">Mid 2</option>
              </select>
            </div>

            <div className="buttons">
              <button
                className={editMode ? 'btn-cancel' : ''}
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? '❌ Cancel' : '✏️ Edit Marks'}
              </button>
              {editMode && (
                <button className="btn-save" onClick={saveMarks} disabled={saving}>
                  {saving ? '⏳ Saving...' : '✅ Save'}
                </button>
              )}
              <button onClick={fetchStudents} style={{ background: '#607d8b' }}>
                🔄 Refresh
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Student Cards */}
        {loading ? (
          <div className="empty-msg">⏳ Loading students...</div>
        ) : (
          <>
            <div className="grid">
              {students.map((student) => {
                let subjectData = null;
                if (student.subjects) {
                  subjectData = typeof student.subjects.get === 'function'
                    ? student.subjects.get(selectedSubject)
                    : student.subjects[selectedSubject];
                }
                const currentMark = subjectData && subjectData[exam] && subjectData[exam] !== 'NA'
                  ? subjectData[exam] : 'Not entered';
                const avg = subjectData && subjectData['Average'] && subjectData['Average'] !== 'NA'
                  ? subjectData['Average'] : 'NA';

                return (
                  <div className="student-card" key={student.rollNo}>
                    <div className="student-name" title={student.name}>{student.name}</div>
                    <div className="student-roll">{student.rollNo}</div>
                    <div className="current-marks">
                      {exam}: <strong>{currentMark}</strong><br />
                      <span style={{ fontSize: '0.85em', color: '#888' }}>Avg: {avg}</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="25"
                      placeholder={editMode ? '0 – 25' : '—'}
                      disabled={!editMode}
                      value={marksInput[student.rollNo] || ''}
                      onChange={(e) => handleMarkChange(student.rollNo, e.target.value)}
                    />
                  </div>
                );
              })}
            </div>

            {students.length === 0 && selectedSection && (
              <div className="empty-msg">No students found for Section {selectedSection}.</div>
            )}

            {students.length > 0 && (
              <div className="status-bar">
                📅 <strong>Last fetched:</strong> {lastUpdated} &nbsp;|&nbsp;
                <strong>{students.length}</strong> students in Section {selectedSection}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
