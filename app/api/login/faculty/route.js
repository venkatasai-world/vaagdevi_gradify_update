import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Faculty from '../../../../models/Faculty';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await connectToDatabase();

    const faculty = await Faculty.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') }, 
      password: { $regex: new RegExp(`^${password}$`, 'i') } 
    });

    if (!faculty) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    return NextResponse.json({ 
      message: 'Login successful',
      token: 'session',
      faculty: {
        name: faculty.name,
        email: faculty.email,
        assignments: faculty.assignments || []
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Faculty login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
