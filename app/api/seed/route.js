import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Faculty from '../../../models/Faculty';
import Student from '../../../models/Student';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Seed Faculty
    const facultyPath = path.join(process.cwd(), 'faculty_data.json');
    let facultySeeded = false;
    if (fs.existsSync(facultyPath)) {
      const facultyData = JSON.parse(fs.readFileSync(facultyPath, 'utf8'));
      const facultyMap = new Map();
      for (const section in facultyData.sections) {
        const subjects = facultyData.sections[section].subjects;
        for (const sub of subjects) {
          const email = sub.email;
          if (!facultyMap.has(email)) {
            facultyMap.set(email, {
              name: sub.faculty,
              email: email,
              password: sub.password,
              assignments: []
            });
          }
          facultyMap.get(email).assignments.push({
            subject: sub.name,
            section: section
          });
        }
      }
      const facultyList = Array.from(facultyMap.values());
      await Faculty.deleteMany({});
      await Faculty.insertMany(facultyList);
      facultySeeded = true;
    }

    // Seed Students
    const studentMarksPath = path.join(process.cwd(), 'student_marks.json');
    const studentDetailsPath = path.join(process.cwd(), 'students.json');
    let studentsSeeded = false;
    
    if (fs.existsSync(studentMarksPath) || fs.existsSync(studentDetailsPath)) {
      const marksData = fs.existsSync(studentMarksPath) ? JSON.parse(fs.readFileSync(studentMarksPath, 'utf8')) : [];
      const detailsData = fs.existsSync(studentDetailsPath) ? JSON.parse(fs.readFileSync(studentDetailsPath, 'utf8')) : [];
      
      const studentMap = new Map();

      // Load details
      detailsData.forEach(d => {
        studentMap.set(d.roll_no, {
          rollNo: d.roll_no,
          name: d.name,
          gender: d.gender,
          email: d.email,
          password: d.password,
          section: d.section,
          subjects: {}
        });
      });

      // Load marks
      marksData.forEach(m => {
        const roll = m["Roll No"];
        if (studentMap.has(roll)) {
          studentMap.get(roll).subjects = m["Subjects"] || {};
        } else {
          studentMap.set(roll, {
            rollNo: roll,
            subjects: m["Subjects"] || {}
          });
        }
      });

      const studentList = Array.from(studentMap.values());
      await Student.deleteMany({});
      await Student.insertMany(studentList);
      studentsSeeded = true;
    }

    return NextResponse.json({ 
      message: 'Database seeding completed',
      facultySeeded,
      studentsSeeded
    }, { status: 200 });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: 'Failed to seed database', details: error.message }, { status: 500 });
  }
}
