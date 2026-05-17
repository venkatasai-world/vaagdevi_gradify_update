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
          margin: 20px auto 10px;
          padding: 0 16px;
        }

        img.logo {
          height: 120px;
          width: 100%;
          max-width: 450px;
        }

        .about-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          margin: 30px auto;
          padding: 40px;
          width: min(100%, 1000px);
          background-color: #e1f5e9;
          border: 2px solid #4CAF50;
          border-radius: 20px;
        }

        .about-section img {
          width: 350px;
          max-width: 100%;
          height: auto;
          border-radius: 10px;
        }

        .about-text {
          flex: 1;
          text-align: left;
        }

        .about-text h3 {
          font-size: 36px;
          margin-bottom: 16px;
        }

        .about-text p {
          font-size: 20px;
          line-height: 1.6;
          margin: 0;
        }

        .login_button {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 30px;
          padding: 0 16px;
        }

        @media (max-width: 768px) {
          .about-section {
            flex-direction: column;
            text-align: center;
            padding: 20px;
            gap: 24px;
          }

          .about-section img {
            width: 250px;
            margin: 0 auto;
          }

          .about-text {
            text-align: center;
          }

          .about-text h3 {
            font-size: 28px;
          }

          .about-text p {
            font-size: 18px;
          }

          button {
            width: 100%;
            max-width: 300px;
          }
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
