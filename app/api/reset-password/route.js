import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Student from '../../../models/Student';

export async function POST(req) {
  try {
    const { token, email, newPassword } = await req.json();

    if (!token || !email || !newPassword) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectToDatabase();

    const student = await Student.findOne({ 
      email, 
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() } // Ensure token hasn't expired
    });

    if (!student) {
      return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 });
    }

    // Update the password and clear the reset token
    student.password = newPassword;
    student.resetToken = undefined;
    student.resetTokenExpiry = undefined;
    
    await student.save();

    return NextResponse.json({ message: 'Password reset successfully' }, { status: 200 });

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
