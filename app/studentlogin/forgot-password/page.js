'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('A password reset link has been sent to your email.');
      } else {
        setMessage(data.error || 'Failed to send reset link.');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

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
          <h3>Forgot Password</h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
            Enter your college email to receive a password reset link.
          </p>
          <form onSubmit={handleForgotPassword}>
            <label htmlFor="email">E-mail</label><br />
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your college mail ID" 
              required 
            /><br />

            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            
            {message && <div className="message">{message}</div>}

            <div style={{ marginTop: '15px', fontSize: '14px' }}>
              <a href="/studentlogin" style={{ color: '#0070f3', textDecoration: 'none' }}>&larr; Back to Login</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
