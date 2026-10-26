const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let milestones = [
  { id: 1, name: 'Project Planning', status: 'Completed' },
  { id: 2, name: 'Development', status: 'In Progress' }
];

// GET: Retrieve all milestones
app.get('/api/milestones', (req, res) => {
  res.json(milestones);
});

// POST: Add a new milestone
app.post('/api/milestones', (req, res) => {
  const newMilestone = {
    id: Date.now(),
    ...req.body
  };

  milestones.push(newMilestone);
  res.status(201).json(newMilestone);
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});

