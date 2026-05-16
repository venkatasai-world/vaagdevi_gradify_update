'use client';
import Link from 'next/link';

export default function Semesters() {
  const semesters = ['I', 'II', 'III', 'IV', 'V', 'VI'];
  return (
    <div className="p-4 sm:p-8 md:p-10 max-w-3xl mx-auto font-sans min-h-screen">
      <h2 className="border-b-2 border-blue-600 pb-2 md:pb-3 text-xl md:text-2xl font-bold text-gray-800">Select Your Semester</h2>
      <div className="mt-5 flex flex-col gap-3 sm:gap-4">
        {semesters.map(sem => (
          <Link key={sem} href={`/semester/${sem}`} className="p-4 sm:p-5 bg-white border border-gray-200 rounded-lg no-underline text-gray-800 text-base sm:text-lg shadow-sm block hover:shadow-md hover:border-blue-400 transition-all">
            Semester {sem} &rarr;
          </Link>
        ))}
      </div>
      <div className="mt-6 sm:mt-8">
         {/* Simple logout mechanism by clearing cookie */}
         <Link href="/login" onClick={() => { document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; }} className="text-red-500 hover:text-red-700 transition-colors font-medium">
           Logout
         </Link>
      </div>
    </div>
  );
}
