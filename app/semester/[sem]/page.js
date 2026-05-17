import Link from 'next/link';

export default function SemesterMid({ params }) {
  const { sem } = params;

  // Subjects based on user request mapping to dynamic routing
  const semesterSubjects = {
    'I': [
      "Matrices and Calculus",
      "Applied Physics",
      "Programming for Problem Solving",
      "English for Skill Enhancement",
      "Elements of Computer Science & Engineering",
      "Environmental Science"
    ],
    'II': [
      "Ordinary Differential Equations and Vector Calculus",
      "Engineering Chemistry",
      "Basic Electrical Engineering",
      "Electronic Devices and Circuits"
    ],
    'III': [
      "Mathematical and Statistical Foundations",
      "Data Structures",
      "Computer Organization and Architecture",
      "Software Engineering",
      "Operating Systems",
      "Constitution of India"
    ],
    'IV': [
      "Discrete Mathematics",
      "Automata Theory and Compiler Design",
      "Database Management Systems",
      "Introduction to Artificial Intelligence",
      "Object Oriented Programming through Java"
    ],
    'V': [
      "Design and Analysis of Algorithms",
      "Machine Learning",
      "Computer Networks",
      "Business Economics & Financial Analysis",
      "Web Programming",
      "Intellectual Property Rights",
      "Mobile Computing"
    ],
    'VI': [
      "Knowledge Representation and Reasoning",
      "Natural Language Processing",
      "Data Warehousing and Business Intelligence",
      "Fundamentals of Internet of Things",
      "Ad-Hoc & Sensor Networks",
      "Data Analytics"
    ]
  };

  const subjects = semesterSubjects[sem] || [];

  return (
    <div className="p-4 sm:p-8 md:p-10 max-w-3xl mx-auto font-sans min-h-screen">
      <h2 className="border-b-2 border-blue-600 pb-2 md:pb-3 text-xl md:text-2xl font-bold text-gray-800">
        Semester {sem} - Subjects
      </h2>
      <div className="mt-5 flex flex-col gap-3 sm:gap-4">
        {subjects.map((sub, index) => (
          <Link key={index} href={`/semester/${sem}/${encodeURIComponent(sub)}`} className="p-4 sm:p-5 bg-white border border-gray-200 rounded-lg no-underline text-blue-600 text-base sm:text-lg shadow-sm block hover:shadow-md hover:border-blue-400 transition-all">
            {sub}
          </Link>
        ))}
        {subjects.length === 0 && <p className="text-gray-600">No subjects found for this semester.</p>}
      </div>
      <div className="mt-6 sm:mt-8">
        <Link href="/semester" className="text-gray-500 hover:text-gray-800 transition-colors font-medium">
          &larr; Back to Semesters
        </Link>
      </div>
    </div>
  );
}
