import express from 'express';
import Project from '../models/project.js';
import Issue from '../models/issue.js';

const router = express.Router();

// Show all projects
router.get('/', async (req, res) => {
  const projects = await Project.find({});
  res.render('projects/index', { projects });
});

// New project form
router.get('/new', (req, res) => {
  res.render('projects/new');
});

// Create new project
router.post('/', async (req, res) => {
  const { name, description, author } = req.body;
  await Project.create({ name, description, author, labels: [] });
  res.redirect('/projects');
});

// Show project details
router.get('/:id', async (req, res) => {
    const { label, author, search } = req.query;
    const project = await Project.findById(req.params.id);
  
    let issuesQuery = Issue.find({ project: project._id });
  
    if (label) {
      issuesQuery = issuesQuery.where('labels').in(label.split(','));
    }
  
    if (author) {
      issuesQuery = issuesQuery.where('author', author);
    }
  
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      issuesQuery = issuesQuery.or([{ title: searchRegex }, { description: searchRegex }]);
    }
  
    const issues = await issuesQuery.exec();
  
    res.render('projects/show', { project, issues });
  });
  const projectRoutes = router;

export default projectRoutes;
