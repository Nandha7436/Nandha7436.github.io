import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  author: String,
  labels: [String],
});

export default mongoose.model('Project', projectSchema);
