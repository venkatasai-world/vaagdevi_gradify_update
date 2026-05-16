'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <style jsx global>{`
        body {
          background-color: rgb(240, 248, 255);
          font-weight: bold;
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }

        .center-img {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        img.logo {
          height: 120px;
          width: 100%;
          max-width: 1200px;
        }

        .about-section {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 40px auto;
          padding: 20px;
          width: 90%;
          max-width: 1000px;
          background-color: #e1f5e9;
          border: 2px solid #4CAF50;
          border-radius: 10px;
        }

        .about-section img {
          width: 250px;
          height: auto;
          margin-right: 30px;
          border-radius: 10px;
        }

        .about-text {
          text-align: left;
        }

        .login_button {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 30px;
        }

        button {
          padding: 10px 25px;
          font-size: 16px;
          border: none;
          border-radius: 5px;
          background-color: #4CAF50;
          color: white;
          cursor: pointer;
          transition: background-color 0.3s ease;
          width: 200px;
          margin-bottom: 15px;
        }

        button:hover {
          background-color: #45a049;
        }
      `}</style>
      
      <div className="center-img">
        {/* Next.js public directory uses / for root, mapping to images folder */}
        <img src="/images/vaagdevilogo.png" alt="Vaagdevi College Logo" className="logo" />
      </div>

      <div className="about-section">
        <img src="/images/front1.png" alt="Students and Teachers" />
        <div className="about-text">
          <h3>About This Website</h3>
          <p>
            This website is designed for Vaagdevi College of Engineering.<br/>
            Students can log in to view their Mid-1 and Mid-2 marks easily.<br/>
            Faculty can log in to upload marks and manage student records.<br/>
            Students can also send messages to teachers for any doubts or clarification.
          </p>
        </div>
      </div>

      <div className="login_button">
        <button onClick={() => router.push('/studentlogin')}>Student Login</button>
        <button onClick={() => router.push('/teacherlogin')}>Faculty Login</button>
      </div>
    </>
  );
}
