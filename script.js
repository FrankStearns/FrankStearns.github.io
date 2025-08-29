document.addEventListener('DOMContentLoaded', function() {
    const sidebarItems = document.querySelectorAll('.expression-item');
    const chartCanvas = document.getElementById('chart-canvas');
    const contentDisplay = document.getElementById('content-display');
    const ctx = chartCanvas.getContext('2d');
    let currentChart = null; // To hold the active chart instance

    // --- DATA FOR VISUALIZATIONS ---
    const data = {
        experience: {
            labels: ['Colgate Start', 'Select Health', 'Walmart', 'Graduation'],
            datasets: [{
                label: 'Career Trajectory',
                data: [10, 30, 75, 100],
                borderColor: '#2d7ff9',
                tension: 0.1,
                fill: false,
            }]
        },
        skills: {
            labels: ['Java/Python', 'Quantitative Methods', 'SQL', 'Data Pipelines', 'AI/LLMs', 'MATLAB'],
            datasets: [{
                label: 'Proficiency',
                data: [90, 95, 85, 80, 75, 90],
                backgroundColor: 'rgba(250, 126, 25, 0.2)',
                borderColor: '#fa7e19',
                pointBackgroundColor: '#fa7e19',
            }]
        }
    };

    // --- RENDER FUNCTIONS ---
    function clearPane() {
        // --- THIS IS THE FIX ---
        // If a chart instance exists, destroy it before creating a new one.
        if (currentChart) {
            currentChart.destroy();
        }
        // -----------------------

        chartCanvas.style.display = 'none';
        contentDisplay.style.display = 'none';
        contentDisplay.innerHTML = '';
    }

    function renderExperience() {
        chartCanvas.style.display = 'block';
        currentChart = new Chart(ctx, {
            type: 'line',
            data: data.experience,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, suggestedMax: 110 } }
            }
        });
    }
    
    function renderSkills() {
        chartCanvas.style.display = 'block';
        currentChart = new Chart(ctx, {
            type: 'radar',
            data: data.skills,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { r: { beginAtZero: true, max: 100, pointLabels: { font: { size: 14 } } } }
            }
        });
    }

    function renderProjects() {
        contentDisplay.style.display = 'block';
        contentDisplay.innerHTML = `
            <div class="project-card">
                <h3>Otto @ Walmart Global Tech</h3>
                <p>Developed Walmart's proprietary automated testing tool using Java and GPT-4.1 LLMs. [cite_start]Generated 150K+ lines of code, saving $23K-$30K in development costs[cite: 12, 13].</p>
            </div>
            <div class="project-card">
                <h3>Actuarial Analysis @ Select Health</h3>
                [cite_start]<p>Applied statistical methods to set ACA rates for 400K+ individuals [cite: 19][cite_start], implementing initiatives that led to a 60% reduction in per-encounter costs[cite: 21].</p>
            </div>
        `;
    }
    
    function renderAbout() {
        contentDisplay.style.display = 'block';
        contentDisplay.innerHTML = `
            <div class="project-card">
                <h3>About & Contact</h3>
                [cite_start]<p>I'm a senior at Colgate University passionate about solving complex problems at the intersection of math, technology, and finance[cite: 5, 6]. [cite_start]Outside of academics, I'm the captain of the Alpine Ski Team and host a weekly music history show on WRCU FM[cite: 35, 40].</p>
                [cite_start]<p><strong>Email:</strong> dstearns@colgate.edu [cite: 2]</p>
            </div>
        `;
    }

    // Mapping from data-section attribute to render function
    const renderMap = {
        experience: renderExperience,
        projects: renderProjects,
        skills: renderSkills,
        about: renderAbout
    };

    // --- EVENT LISTENERS ---
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            
            sidebarItems.forEach(i => i.classList.remove('is-active'));
            item.classList.add('is-active');

            clearPane();
            if (renderMap[section]) {
                renderMap[section]();
            }
        });
    });

    // Plot the first section on initial load
    document.querySelector('.expression-item[data-section="experience"]').click();
});