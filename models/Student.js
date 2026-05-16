import mongoose from 'mongoose';

const SubjectMarksSchema = new mongoose.Schema({
  "Mid 1": { type: String, default: "NA" },
  "Mid 2": { type: String, default: "NA" },
  "Average": { type: String, default: "NA" }
}, { _id: false });

const StudentSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, unique: true },
  name: { type: String },
  gender: { type: String },
  email: { type: String, unique: true, sparse: true },
  password: { type: String },
  section: { type: String },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
  subjects: {
    type: Map,
    of: SubjectMarksSchema,
    default: {}
  }
}, { timestamps: true });

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);
