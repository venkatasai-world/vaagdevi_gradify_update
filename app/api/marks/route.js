import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Student from '../../../models/Student';

export async function POST(req) {
  try {
    const { updates, subject, exam } = await req.json();

    if (!updates || !subject || !exam) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectToDatabase();

    const bulkOps = updates.map(update => {
      const { rollNo, mark } = update;
      // We use dot notation to update the specific subject's specific exam mark
      const updateKey = `subjects.${subject}.${exam}`;
      
      return {
        updateOne: {
          filter: { rollNo },
          update: { 
            $set: { [updateKey]: mark } 
          }
        }
      };
    });

    await Student.bulkWrite(bulkOps);

    // Also we might want to update the "Average" if we're saving marks.
    // To do this properly, we'll fetch them, calculate average, and save back.
    // But bulkWrite is faster. Let's do a follow-up bulkWrite for averages.
    const studentsToUpdate = await Student.find({ rollNo: { $in: updates.map(u => u.rollNo) } });
    
    const avgOps = studentsToUpdate.map(student => {
      const subjData = student.subjects.get(subject);
      if (subjData) {
        const mid1 = subjData['Mid 1'];
        const mid2 = subjData['Mid 2'];
        let avg = 'NA';
        if (mid1 !== 'NA' && mid2 !== 'NA') {
          avg = Math.round((Number(mid1) + Number(mid2)) / 2).toString();
        } else if (mid1 !== 'NA') {
          avg = mid1; // Temporary average
        } else if (mid2 !== 'NA') {
          avg = mid2; // Temporary average
        }
        
        return {
          updateOne: {
            filter: { rollNo: student.rollNo },
            update: { 
              $set: { [`subjects.${subject}.Average`]: avg } 
            }
          }
        };
      }
      return null;
    }).filter(op => op !== null);

    if (avgOps.length > 0) {
      await Student.bulkWrite(avgOps);
    }

    return NextResponse.json({ message: 'Marks saved successfully' }, { status: 200 });

  } catch (error) {
    console.error('Save marks error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
