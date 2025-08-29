document.addEventListener('DOMContentLoaded', function() {
    const sidebarItems = document.querySelectorAll('.expression-item');
    const chartCanvas = document.getElementById('chart-canvas');
    const contentDisplay = document.getElementById('content-display');
    const ctx = chartCanvas.getContext('2d');
    let currentChart = null;

    const data = {
        experience: {
            datasets: [{
                label: 'Career Trajectory',
                data: [
                    { x: '2022-09-01', y: 10, label: 'Colgate Start' },
                    { x: '2024-01-15', y: 20, label: 'Math/Calculus Tutor' },
                    { x: '2024-06-15', y: 30, label: 'Select Health' },
                    { x: '2025-06-15', y: 75, label: 'Walmart' },
                    { x: '2026-05-15', y: 100, label: 'Graduation' }
                ],
                borderColor: '#2d7ff9',
                tension: 0.1,
                fill: false,
                // --- THIS IS THE CHANGE ---
                pointBackgroundColor: '#2d7ff9',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 7,           // Was 6
                pointHoverRadius: 12,     // Was 10
                // -----------------------
                bullets: [
                    [],
                    [ '• Instructed 20 students in complex MATLAB algorithms.', '• Taught calculus, leading to students pursuing math-related degrees.', '• Developed learning strategies to reduce time to learn MATLAB/LaTeX.' ],
                    [ '• Applied statistical methods for ACA rates for 400K+ individuals.', '• Investigated claim rates, reducing per-encounter costs by 60%.', '• Calculated recipients of $1M+ in risk adjustment payments.' ],
                    [ '• Developed "Otto," saving $23K-$30K in development costs.', '• Engineered backend infrastructure with Java and GPT-4.1 LLMs.', '• Maintained a 10K+ TB/day data pipeline with 50ms latency.' ],
                    []
                ]
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

    function clearPane() {
        if (currentChart) { currentChart.destroy(); }
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
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: { size: 16, weight: 'bold' },
                        bodyFont: { size: 12, family: "'Roboto Mono', monospace" },
                        bodySpacing: 5,
                        padding: 15,
                        callbacks: {
                            title: function(context) { return context[0].raw.label; },
                            label: function(context) { return null; },
                            afterBody: function(context) {
                                const dataIndex = context[0].dataIndex;
                                const bullets = context[0].dataset.bullets[dataIndex];
                                if (bullets && bullets.length > 0) {
                                    return [''].concat(bullets);
                                }
                                return [];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'time',
                        time: { unit: 'year', tooltipFormat: 'MMM yyyy' },
                        ticks: { font: { size: 14 } }
                    },
                    y: { beginAtZero: true, suggestedMax: 110 }
                }
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
                <p>Developed Walmart's proprietary automated testing tool using Java and GPT-4.1 LLMs. Generated 150K+ lines of code, saving $23K-$30K in development costs.</p>
            </div>
            <div class="project-card">
                <h3>Actuarial Analysis @ Select Health</h3>
                <p>Applied statistical methods to set ACA rates for 400K+ individuals, implementing initiatives that led to a 60% reduction in per-encounter costs.</p>
            </div>
        `;
    }
    
    function renderAbout() {
        contentDisplay.style.display = 'block';
        contentDisplay.innerHTML = `
            <div class="project-card">
                <h3>About & Contact</h3>
                <p>I'm a senior at Colgate University passionate about solving complex problems at the intersection of math, technology, and finance. Outside of academics, I'm the captain of the Alpine Ski Team and host a weekly music history show on WRCU FM.</p>
                <p><strong>Email:</strong> dstearns@colgate.edu</p>
            </div>
        `;
    }

    const renderMap = {
        experience: renderExperience,
        projects: renderProjects,
        skills: renderSkills,
        about: renderAbout
    };

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

    document.querySelector('.expression-item[data-section="experience"]').click();
});