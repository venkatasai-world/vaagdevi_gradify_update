import Link from 'next/link';

export default function SubjectDetails({ params }) {
  // Decode the parameters to handle spaces and special characters
  const sem = decodeURIComponent(params.sem);
  const subject = decodeURIComponent(params.subject);

  return (
    <div className="p-4 sm:p-8 md:p-10 max-w-3xl mx-auto font-sans min-h-screen">
      <h2 className="border-b-2 border-blue-600 pb-2 md:pb-3 text-xl md:text-2xl font-bold text-gray-800">
        Subject Details
      </h2>
      <div className="mt-5 bg-white p-5 sm:p-6 rounded-lg shadow-sm border border-gray-200">
        <p className="mb-2 text-gray-700"><strong className="text-gray-900">Semester:</strong> {sem}</p>
        <p className="mb-6 text-gray-700"><strong className="text-gray-900">Subject Name:</strong> {subject}</p>
        
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Mid Semester Marks</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[300px]">
            <thead>
              <tr>
                <th className="border border-gray-300 p-3 bg-gray-50 text-left font-semibold text-gray-700">Exam</th>
                <th className="border border-gray-300 p-3 bg-gray-50 text-left font-semibold text-gray-700">Max Marks</th>
                <th className="border border-gray-300 p-3 bg-gray-50 text-left font-semibold text-gray-700">Obtained</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 text-gray-800">Mid 1</td>
                <td className="border border-gray-300 p-3 text-gray-800">25</td>
                <td className="border border-gray-300 p-3 text-gray-500 italic">Not updated</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 text-gray-800">Mid 2</td>
                <td className="border border-gray-300 p-3 text-gray-800">25</td>
                <td className="border border-gray-300 p-3 text-gray-500 italic">Not updated</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-6 sm:mt-8">
        <Link href={`/semester/${encodeURIComponent(sem)}`} className="text-blue-600 hover:text-blue-800 transition-colors font-medium">
          &larr; Back to Subjects
        </Link>
      </div>
    </div>
  );
}
