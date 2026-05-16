'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await fetch('/api/login/student', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          document.cookie = `token=${data.token}; path=/;`;
          localStorage.setItem('studentUser', JSON.stringify(data.student));
          router.push('/studentdashboard'); // Update to go to studentdashboard
        } else {
          alert(data.error || 'Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login.');
      }
    } else {
      alert('Please enter both email and password');
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
          width: 700px;
          max-width: 90%;
        }

        .image-box {
          flex: 1;
          background-color: #f0f8ff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .image-box img {
          max-width: 100%;
          height: auto;
          border-radius: 10px;
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
      `}</style>
      
      <div className="container">
        {/* Image on the left */}
        <div className="image-box">
          <img src="/images/student_login.png" alt="Student Login Illustration" />
        </div>

        {/* Login form on the right */}
        <div className="loginpage">
          <h3>Student Login</h3>
          <form onSubmit={handleStudentLogin}>
            <label htmlFor="email">E-mail</label><br />
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your college mail ID" 
              required 
            /><br /><br />

            <label htmlFor="password">Password</label><br />
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your roll number as password" 
              required 
            /><br /><br />

            <button type="submit">Login</button>
            <div style={{ marginTop: '15px', fontSize: '14px' }}>
              <a href="/studentlogin/forgot-password" style={{ color: '#4CAF50', textDecoration: 'none' }}>Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
