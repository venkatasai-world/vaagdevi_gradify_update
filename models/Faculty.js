import mongoose from 'mongoose';

const FacultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  assignments: [{
    subject: { type: String, required: true },
    section: { type: String, required: true }
  }]
}, { timestamps: true });

export default mongoose.models.Faculty || mongoose.model('Faculty', FacultySchema);
