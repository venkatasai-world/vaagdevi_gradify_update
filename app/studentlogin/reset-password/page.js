'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (newPassword !== confirmPassword) {
      setMessage("Passwords don't match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, email, newPassword })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset successfully. Redirecting to login...');
        setTimeout(() => {
          router.push('/studentlogin');
        }, 2000);
      } else {
        setMessage(data.error || 'Failed to reset password.');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Invalid password reset link.</div>;
  }

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background-color: #e6f7ff;
          font-family: Arial, sans-serif;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .container {
          display: flex;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          width: 400px;
          max-width: 90%;
        }

        .loginpage {
          flex: 1;
          padding: 40px;
          box-sizing: border-box;
          text-align: center;
        }

        .loginpage input {
          width: 100%;
          padding: 10px;
          margin-top: 8px;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-sizing: border-box;
        }

        .loginpage button {
          margin-top: 15px;
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          width: 100%;
        }

        .loginpage button:hover {
          background-color: #45a049;
        }

        .message {
          margin-top: 15px;
          font-size: 14px;
          color: #333;
        }
      `}</style>
      
      <div className="container">
        <div className="loginpage">
          <h3>Reset Password</h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
            Enter your new password below for {email}.
          </p>
          <form onSubmit={handleResetPassword}>
            <label htmlFor="newPassword" style={{ textAlign: 'left', display: 'block' }}>New Password</label>
            <input 
              type="password" 
              id="newPassword" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required 
            /><br /><br />

            <label htmlFor="confirmPassword" style={{ textAlign: 'left', display: 'block' }}>Confirm New Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            /><br />

            <button type="submit" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
            
            {message && <div className="message">{message}</div>}
          </form>
        </div>
      </div>
    </>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
