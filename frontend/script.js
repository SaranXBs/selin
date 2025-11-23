// SELIN VENTURES Frontend JavaScript
// This file handles dynamic job loading from the backend API

const API_BASE_URL = 'http://localhost:5000/api';

// Fetch jobs from backend API
async function loadJobs() {
    const jobsContainer = document.getElementById('jobs-container');
    
    try {
        const response = await fetch(`${API_BASE_URL}/jobs`);
        const jobs = await response.json();
        
        // Clear existing content
        jobsContainer.innerHTML = '';
        
        // Render each job as a card
        jobs.forEach(job => {
            const jobCard = createJobCard(job);
            jobsContainer.appendChild(jobCard);
        });
    } catch (error) {
        console.error('Error loading jobs:', error);
        jobsContainer.innerHTML = '<p>Error loading job openings. Please try again later.</p>';
    }
}

// Create a job card element
function createJobCard(job) {
    const card = document.createElement('div');
    card.className = 'job-card';
    
    card.innerHTML = `
        <h4>${job.title}</h4>
        <p>${job.skills}</p>
        <div class="job-footer">
            <span>${job.seats} AVAILABLE</span>
            <a href="#" class="apply-link">APPLY</a>
        </div>
    `;
    
    return card;
}

// Button event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadJobs();
    
    // APPLY NOW button
    const applyBtn = document.querySelector('.apply-btn');
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            alert('Redirecting to application form...');
            // window.location.href = '/apply';
        });
    }
    
    // INITIATE APPLICATION button
    const ctaBtn = document.querySelector('.cta-button');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            alert('Redirecting to application form...');
            // window.location.href = '/apply';
        });
    }
});

// Handle apply link clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('apply-link')) {
        e.preventDefault();
        alert('Thank you for your interest! Please fill out the application form.');
        // window.location.href = '/apply';
    }
});
