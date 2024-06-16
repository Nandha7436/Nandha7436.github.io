import express from 'express';
import Project from '../models/project.js';
import Issue from '../models/issue.js';

const router = express.Router({ mergeParams: true });

// New issue form
router.get('/new', async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  res.render('issues/new', { project });
});

// Create new issue
router.post('/', async (req, res) => {
  const { title, description, author, labels } = req.body;
  const project = await Project.findById(req.params.projectId);
  const labelArray = labels.split(',').map((label) => label.trim());
  const issue = new Issue({ title, description, author, labels: labelArray, project: project._id });
  await issue.save();
  res.redirect(`/projects/${req.params.projectId}`);
});
const issueRoutes = router;
export default issueRoutes;
