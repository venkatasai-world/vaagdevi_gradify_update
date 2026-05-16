import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Student from '../../../../models/Student';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await connectToDatabase();

    const student = await Student.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') }, 
      password: { $regex: new RegExp(`^${password}$`, 'i') } 
    });

    if (!student) {
      return NextResponse.json({ error: 'Invalid Email or Password' }, { status: 401 });
    }

    return NextResponse.json({ 
      message: 'Login successful',
      token: 'session',
      student: {
        rollNo: student.rollNo,
        name: student.name,
        email: student.email,
        section: student.section,
        gender: student.gender,
        subjects: student.subjects,
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Student login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
