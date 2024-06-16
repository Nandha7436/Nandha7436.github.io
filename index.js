import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';
import projectRoutes from './routes/projects.js';
import issueRoutes from './routes/issues.js';

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bug_tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')));

// Set view engine
app.set('view engine', 'ejs');

// Routes
app.use('/projects', projectRoutes);
app.use('/projects/:projectId/issues', issueRoutes);

// Home Route
app.get('/', (req, res) => {
  res.redirect('/projects');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
