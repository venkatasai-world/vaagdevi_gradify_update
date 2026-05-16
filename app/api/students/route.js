import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Student from '../../../models/Student';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const section = searchParams.get('section');

    if (!section) {
      return NextResponse.json({ error: 'Section is required' }, { status: 400 });
    }

    await connectToDatabase();

    const students = await Student.find({ section }).sort({ rollNo: 1 });

    return NextResponse.json(students, { status: 200 });

  } catch (error) {
    console.error('Fetch students error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
