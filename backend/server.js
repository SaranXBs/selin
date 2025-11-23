// SELIN VENTURES Backend Server
// Node.js/Express API for managing job openings

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// In-memory database of jobs
const jobs = [
    {
        id: 1,
        title: 'AI/ML ENGINEER',
        skills: 'PYTHON, LLMS, RAG, PYTORCH',
        seats: '2 SEATS'
    },
    {
        id: 2,
        title: 'BACKEND ARCHITECT',
        skills: 'NODE.JS, FIREBASE, CLOUD FUNCTIONS',
        seats: '2 SEATS'
    },
    {
        id: 3,
        title: 'FRONTEND / MOBILE',
        skills: 'REACT, FLUTTER, TAILWIND, MOTION',
        seats: '2 SEATS'
    },
    {
        id: 4,
        title: 'OCR & VISION SPECIALIST',
        skills: 'OPENCV, TESSERACT, DOCUMENT AI',
        seats: '1 SEAT'
    },
    {
        id: 5,
        title: 'PRODUCT DESIGNER',
        skills: 'FIGMA, UX FLOWS, PROTOTYPING',
        seats: '1 SEAT'
    },
    {
        id: 6,
        title: 'OPERATIONS LEAD',
        skills: 'AGILE, TEAM MANAGEMENT, EXECUTION',
        seats: '1 SEAT'
    }
];

// API Routes

// Get all jobs
app.get('/api/jobs', (req, res) => {
    res.json(jobs);
});

// Get job by ID
app.get('/api/jobs/:id', (req, res) => {
    const job = jobs.find(j => j.id === parseInt(req.params.id));
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
});

// Create new job (admin only)
app.post('/api/jobs', (req, res) => {
    const newJob = {
        id: jobs.length + 1,
        title: req.body.title,
        skills: req.body.skills,
        seats: req.body.seats
    };
    jobs.push(newJob);
    res.status(201).json(newJob);
});

// Update job
app.put('/api/jobs/:id', (req, res) => {
    const job = jobs.find(j => j.id === parseInt(req.params.id));
    if (!job) return res.status(404).json({ message: 'Job not found' });
    
    if (req.body.title) job.title = req.body.title;
    if (req.body.skills) job.skills = req.body.skills;
    if (req.body.seats) job.seats = req.body.seats;
    
    res.json(job);
});

// Delete job
app.delete('/api/jobs/:id', (req, res) => {
    const jobIndex = jobs.findIndex(j => j.id === parseInt(req.params.id));
    if (jobIndex === -1) return res.status(404).json({ message: 'Job not found' });
    
    const deletedJob = jobs.splice(jobIndex, 1);
    res.json(deletedJob);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start server
app.listen(PORT, () => {
    console.log(`SELIN VENTURES Backend Server running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
});

module.exports = app;
