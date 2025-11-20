document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    fetchRepos();
    initGlitchEffect();
});

// ... (Typewriter and FetchRepos functions remain unchanged) ...

// Advanced Glitch Effect
function initGlitchEffect() {
    const profileContainer = document.querySelector('.profile-container');
    const img = profileContainer.querySelector('img');
    
    if (!profileContainer || !img) return;

    const imgSrc = img.src;
    const height = 150; // Profile image height in px
    
    // Create container for strips
    const glitchContainer = document.createElement('div');
    glitchContainer.className = 'glitch-container';
    glitchContainer.style.width = '100%';
    glitchContainer.style.height = '100%';
    glitchContainer.style.borderRadius = '50%';
    glitchContainer.style.overflow = 'hidden';
    glitchContainer.style.position = 'absolute';
    glitchContainer.style.top = '0';
    glitchContainer.style.left = '0';
    glitchContainer.style.display = 'none'; // Hidden by default, shown on hover
    
    // Generate CSS Keyframes
    const styleSheet = document.createElement('style');
    const keyframes = [5, 6, 7, 8, 9, 10].map(n => {
        const duration = 500; // ms
        const percentage = (duration * 100) / (n * 1000);
        return getKeyFrames(`glitch-${n}`, percentage);
    }).join('\n');
    
    styleSheet.innerHTML = keyframes;
    document.head.appendChild(styleSheet);

    // Generate Strips
    const stripsHtml = getGlitchHTML(height, imgSrc);
    glitchContainer.innerHTML = stripsHtml.join('');
    
    profileContainer.appendChild(glitchContainer);
    
    // Handle Hover
    profileContainer.addEventListener('mouseenter', () => {
        img.style.opacity = '0';
        glitchContainer.style.display = 'block';
    });
    
    profileContainer.addEventListener('mouseleave', () => {
        img.style.opacity = '1';
        glitchContainer.style.display = 'none';
    });
}

function random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function getKeyFrames(name, glitchPercentageDuration) {
    const steps = 3;
    const tick = 0.1;
    const percentageStep = 100 / steps;
    let css = `@keyframes ${name} {\n`;

    // 0%
    css += `  0% { transform: none; filter: hue-rotate(0) drop-shadow(0 0 0 transparent); }\n`;

    // Steps
    for (let i = 1; i < steps; i++) {
        const p = i * percentageStep;
        const color = Math.random() > 0.5 ? "rgba(255,0,0,0.3)" : "rgba(0,0,255,0.3)";
        const shadowX = random(-5, 5);
        const shadowY = random(-5, 5);
        
        // Start of glitch step
        css += `  ${(p + tick).toFixed(2)}% { 
            transform: translateX(var(--glitch-x-${i})); 
            filter: hue-rotate(var(--glitch-hue-${i})) drop-shadow(${shadowX}px ${shadowY}px 0 ${color});
        }\n`;
        
        // End of glitch step
        css += `  ${(p + glitchPercentageDuration - tick).toFixed(2)}% { 
            transform: translateX(var(--glitch-x-${i})); 
            filter: hue-rotate(var(--glitch-hue-${i})) drop-shadow(${shadowX}px ${shadowY}px 0 ${color});
        }\n`;
        
        // Reset
        css += `  ${(p + glitchPercentageDuration).toFixed(2)}% { transform: none; filter: none; }\n`;
    }
    
    css += `  100% { transform: none; filter: none; }\n}`;
    return css;
}

function getGlitchHTML(height, imgSrc) {
    let i = 0;
    const html = [];
    
    while (i < height) {
        const stripHeight = random(5, 20); // px
        const actualHeight = (i + stripHeight > height) ? (height - i) : stripHeight;
        
        const duration = random(5, 10);
        const name = `glitch-${duration}`;
        
        const strip = `<div class="strip" style="
            --glitch-x-1: ${random(-10, 10)}px;
            --glitch-hue-1: ${random(-50, 50)}deg;
            --glitch-x-2: ${random(-10, 10)}px;
            --glitch-hue-2: ${random(-50, 50)}deg;
            background-image: url('${imgSrc}');
            background-position: 0 -${i}px;
            background-size: 150px 150px;
            height: ${actualHeight}px;
            width: 100%;
            animation: ${name} ${duration}s infinite linear alternate;
        "></div>`;
        
        html.push(strip);
        i += actualHeight;
    }
    return html;
}

// Typewriter Effect
function initTypewriter() {
    const text = "Wake up, Neo...\nThe Matrix has you...";
    const element = document.getElementById('typewriter-text');
    if (!element) return;

    let i = 0;
    const speed = 100;

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    // Start after a small delay
    setTimeout(type, 1000);
}

// Fetch GitHub Repos
async function fetchRepos() {
    const username = 'mafhper';
    const container = document.getElementById('repos-grid');
    const pinnedRepos = [
        'fremit',
        'spread',
        'personalnews',
        'win-to-usb-on-ubuntu',
        'firstrun',
        'mafhper.github.io'
    ];
    
    if (!container) return;

    try {
        const repoPromises = pinnedRepos.map(repo => 
            fetch(`https://api.github.com/repos/${username}/${repo}`).then(res => {
                if (!res.ok) return null;
                return res.json();
            })
        );

        const repos = (await Promise.all(repoPromises)).filter(repo => repo !== null);
        
        container.innerHTML = ''; // Clear loading state
        
        if (repos.length === 0) {
            container.innerHTML = '<p class="error">Error: No repositories found.</p>';
            return;
        }

        repos.forEach(repo => {
            const card = createRepoCard(repo);
            container.appendChild(card);
        });
        
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p class="error">Error: Connection to GitHub mainframe failed.</p>';
    }
}

function createRepoCard(repo) {
    const div = document.createElement('div');
    div.className = 'repo-card';
    
    div.innerHTML = `
        <a href="${repo.html_url}" target="_blank" class="repo-name">
            > ${repo.name}
        </a>
        <p class="repo-desc">${repo.description || 'No description available.'}</p>
        <div class="repo-stats">
            <span>★ ${repo.stargazers_count}</span>
            <span>⑂ ${repo.forks_count}</span>
            <span>${repo.language || 'Binary'}</span>
        </div>
    `;
    
    return div;
}
