import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Student from '../../../models/Student';
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const { email } = await req.json();
    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await connectToDatabase();

    const student = await Student.findOne({ email });

    if (!student) {
      return NextResponse.json({ error: 'Student not found with this email' }, { status: 404 });
    }

    const resetToken = uuidv4();
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    student.resetToken = resetToken;
    student.resetTokenExpiry = resetTokenExpiry;
    await student.save();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const resetLink = `${baseUrl}/studentlogin/reset-password?token=${resetToken}&email=${email}`;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Academics <onboarding@resend.dev>', // You should use a verified domain if you have one, or onboarding@resend.dev for testing with your own email
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Password Reset</h2>
          <p>Hi ${student.name},</p>
          <p>You recently requested to reset your password for your student account.</p>
          <p>Click the link below to reset it. This link is valid for 1 hour.</p>
          <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin: 15px 0;">Reset Password</a>
          <p>If you didn't request a password reset, please ignore this email.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Password reset link sent to your email' }, { status: 200 });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
