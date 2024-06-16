import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
  labels: [String],
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
});

export default mongoose.model('Issue', issueSchema);
