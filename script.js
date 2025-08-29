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
                pointBackgroundColor: '#2d7ff9',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 7,
                pointHoverRadius: 12,
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
                        time: {
                            unit: 'year',
                            tooltipFormat: 'MMM yyyy'
                        },
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
            <div class="ide-container">
                <div class="ide-header">
                    <div class="ide-tab active" data-tab="otto">Otto.java</div>
                    <div class="ide-tab" data-tab="clubgate">ClubGate.java</div>
                    <div class="ide-tab" data-tab="knights">KnightsOfMcGregory.java</div>
                </div>
                <div class="ide-body">
                    <div class="ide-content-pane active" id="otto-content">
                        <div class="code-and-image">
                            <pre><code><span class="line-number">1</span> <span class="comment">/**</span>
<span class="line-number">2</span> <span class="comment"> * Project: Otto - Automated Unit Testing Software</span>
<span class="line-number">3</span> <span class="comment"> * Company: Walmart Global Tech</span>
<span class="line-number">4</span> <span class="comment"> * Role: Software Engineer II Intern</span>
<span class="line-number">5</span> <span class="comment"> * Impact: Generated 150K+ lines of code, saving ~$23-30K.</span>
<span class="line-number">6</span> <span class="comment"> */</span>
<span class="line-number">7</span> 
<span class="line-number">8</span> <span class="keyword">public class</span> <span class="class-name">Otto</span> {
<span class="line-number">9</span>    <span class="comment">// Designed, coded, and implemented Otto from the ground up</span>
<span class="line-number">10</span>   <span class="comment">// over an 11-week software engineering internship,</span>
<span class="line-number">11</span>   <span class="comment">// deepening my skills in automation and applied mathematics.</span>
<span class="line-number">12</span> }</code></pre>
                            <img src="Otto.png" alt="Screenshot of Otto Project" class="project-screenshot">
                        </div>
                    </div>
                    <div class="ide-content-pane" id="clubgate-content">
                         <div class="code-and-image">
                            <pre><code><span class="line-number">1</span> <span class="comment">/**</span>
<span class="line-number">2</span> <span class="comment"> * Project: ClubGate - Colgate Club Discovery App</span>
<span class="line-number">3</span> <span class="comment"> * Award: 🥇 1st Place, GateHacks Hackathon 2024</span>
<span class="line-number">4</span> <span class="comment"> * Language: Java</span>
<span class="line-number">5</span> <span class="comment"> */</span>
<span class="line-number">6</span> 
<span class="line-number">7</span> <span class="keyword">public class</span> <span class="class-name">ClubGate</span> {
<span class="line-number">8</span>    <span class="comment">// My team and I developed a Java app to optimize and</span>
<span class="line-number">9</span>   <span class="comment">// enhance the system for exploring clubs at Colgate,</span>
<span class="line-number">10</span>   <span class="comment">// covering the entire 4000-line codebase from GUI</span>
<span class="line-number">11</span>   <span class="comment">// to backend.</span>
<span class="line-number">12</span> }</code></pre>
                            <img src="ClubGate.png" alt="Screenshot of ClubGate Application" class="project-screenshot">
                        </div>
                    </div>
                    <div class="ide-content-pane" id="knights-content">
                         <div class="code-and-image">
                            <pre><code><span class="line-number">1</span> <span class="comment">/**</span>
<span class="line-number">2</span> <span class="comment"> * Project: The Knights of McGregory</span>
<span class="line-number">3</span> <span class="comment"> * Awards: 🏆 Most Fun, 🏆 Best Visuals (Colgate Game Awards)</span>
<span class="line-number">4</span> <span class="comment"> * Framework: Java</span>
<span class="line-number">5</span> <span class="comment"> */</span>
<span class="line-number">6</span> 
<span class="line-number">7</span> <span class="keyword">public class</span> <span class="class-name">KnightsOfMcGregory</span> {
<span class="line-number">8</span>    <span class="comment">// Spearheaded the enhancement of a game built on a Java</span>
<span class="line-number">9</span>   <span class="comment">// framework from Colgate's CS professors.</span>
<span class="line-number">10</span>   
<span class="line-number">11</span>   <span class="comment">// Implemented gravity, jump physics, a sword attack</span>
<span class="line-number">12</span>   <span class="comment">// system, and three distinct enemy types with unique</span>
<span class="line-number">13</span>   <span class="comment">// behaviors and attack patterns.</span>
<span class="line-number">14</span> 
<span class="line-number">15</span>   <span class="comment">// Designed environmental enhancements, including a</span>
<span class="line-number">16</span>   <span class="comment">// scrolling animated background to simulate movement.</span>
<span class="line-number">17</span> }</code></pre>
                            <img src="KnightsOfMcGregory.jpeg" alt="Screenshot of The Knights of McGregory Game" class="project-screenshot" style="max-width: 40%;">
                        </div>
                    </div>
                </div>
                <div class="ide-footer">
                    <a href="https://github.com/FrankStearns" target="_blank" class="github-link">View Projects on GitHub</a>
                </div>
            </div>
        `;

        // Event Listeners for Tab Switching
        const tabs = contentDisplay.querySelectorAll('.ide-tab');
        const panes = contentDisplay.querySelectorAll('.ide-content-pane');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                panes.forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                const targetPane = document.getElementById(`${tab.dataset.tab}-content`);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }

    function renderPapers() {
        contentDisplay.style.display = 'block';
        contentDisplay.innerHTML = `
            <div class="paper-container" style="margin-bottom: 2rem;">
                <div class="paper-header">
                    <h2>High-Frequency Trading and Exchange Rate Efficiency: Blessing or Burden?</h2>
                    <p class="author-info">Frank Stearns // Department of Economics, Colgate University</p>
                </div>
                <div class="paper-body">
                    <div class="abstract-section">
                        <h4>Abstract</h4>
                        <p>"High-frequency trading (HFT), a method of algorithmic trading involving extremely low latency trades, has become widely prevalent... Its effects on the foreign exchange market are being continually researched."</p>
                    </div>
                    <div class="conclusion-section">
                        <h4>Conclusion</h4>
                        <p>"HFT results in more accurate price discovery, better liquidity, and lower risk... These advantages are preponderate over the potential negative consequences."</p>
                    </div>
                </div>
                <a href="./ECON351 Final Paper.pdf" download class="paper-download-link">Download Full Paper (PDF)</a>
            </div>

            <div class="paper-container">
                <div class="paper-header">
                    <h2>The Impact of Education on Savings Behavior</h2>
                    <p class="author-info">Frank Stearns & Max Cole // Department of Economics, Colgate University</p>
                </div>
                <div class="paper-body">
                    <div class="abstract-section">
                        <h4>Abstract</h4>
                        <p>"Savings rates have fallen in recent decades, leading to financial insecurity and higher debt. This paper examines the impact of education on savings rates to assess if financial education should be incorporated into future curriculums."</p>
                    </div>
                    <div class="conclusion-section">
                        <h4>Conclusion</h4>
                        <p>"After correcting for endogeneity, education shows no significant effect on savings rates. Financial literacy may better explain savings behavior. Policymakers should focus on promoting financial education to improve financial decision-making and savings habits."</p>
                    </div>
                </div>
                <a href="./ECON375 Final Project.pdf" download class="paper-download-link">Download Full Paper (PDF)</a>
            </div>
        `;
    }

    function renderAbout() {
        contentDisplay.style.display = 'block';
        contentDisplay.innerHTML = `
            <div class="about-container">
                <div class="about-header">
                    <h3>Frank Stearns</h3>
                    <p>Quantitative Analyst & Software Engineer</p>
                </div>
                <div class="factoid-grid">
                    <div class="factoid">
                        <span class="fact-icon">🎓</span>
                        <div class="fact-text">
                            <h4>Double Major</h4>
                            <p>Applied Mathematics & Economics at Colgate University.</p>
                        </div>
                    </div>
                    <div class="factoid">
                        <span class="fact-icon">⛷️</span>
                        <div class="fact-text">
                            <h4>Team Captain</h4>
                            <p>Managing logistics and funds for the 150-member Alpine Ski Team.</p>
                        </div>
                    </div>
                    <div class="factoid">
                        <span class="fact-icon">📈</span>
                        <div class="fact-text">
                            <h4>Investor</h4>
                            <p>Achieved a ~40% average annualized return since 2022.</p>
                        </div>
                    </div>
                    <div class="factoid">
                        <span class="fact-icon">🎙️</span>
                        <div class="fact-text">
                            <h4>Radio Host</h4>
                            <p>Host of a weekly music history show on WRCU FM.</p>
                        </div>
                    </div>
                </div>
                <div class="contact-terminal">
                    <div class="terminal-header">
                        <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
                        <span class="terminal-title">contact --execute</span>
                    </div>
                    <div class="terminal-body">
                        <p>$ <span class="typewriter"></span></p>
                    </div>
                </div>
            </div>
        `;
        // Activate the typewriter effect after rendering
        activateTypewriter();
    }

    function activateTypewriter() {
        const target = document.querySelector('.typewriter');
        if (!target) return;
        const text = 'mailto:dstearns@colgate.edu';
        let i = 0;
        target.innerHTML = ''; // Clear previous text
        
        function type() {
            if (i < text.length) {
                target.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 100); // Adjust typing speed here
            } else {
                // Add blinking cursor at the end
                target.innerHTML += '<span class="cursor">|</span>';
            }
        }
        type();
    }

    const renderMap = {
        experience: renderExperience,
        projects: renderProjects,
        papers: renderPapers,
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