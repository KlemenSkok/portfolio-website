import { Projects, Skills } from  './classes.js';


async function readProjectsData() {
    const projects = new Projects();
    try {
        await projects.load('https://raw.githubusercontent.com/KlemenSkok/portfolio-website/main/data/projects.json');

        projects.generate();
        projects.setEventListeners();
    }
    catch(err) {
        console.log('Error loading projects data: ', err);
    }
}

async function readSkillsData() {
    const skills = new Skills();
    try {
        await skills.load('https://raw.githubusercontent.com/KlemenSkok/portfolio-website/main/data/skills.json')
        
        // ti dve metodi pocakata prvo
        skills.classify();
        skills.generate();
    }
    catch(err) {
        console.log('Error loading skills data: ', err);
    }
}

function enableSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth', // Smooth scroll
                    block: 'start'      // Align to the top
                });
            }
        });
    });
}

function toggleColorMode() {
    const sw = document.getElementById('color-switcher');

    if(sw.firstElementChild.innerHTML == 'dark_mode') {
        sw.firstElementChild.innerHTML = 'light_mode';
        sw.style.color = '#d9773b';
        document.getElementById('color-mode').href = 'css/light.css';
    }
    else {
        sw.firstElementChild.innerHTML = 'dark_mode';
        sw.style.color = 'yellow';
        document.getElementById('color-mode').href = 'css/dark.css';
    }
}


window.addEventListener('load', () => {
    readProjectsData();
    readSkillsData();
    enableSmoothScroll();
    document.getElementById('preloader').style.display = 'none';
    document.getElementById('navbar').style.display = 'flex';
    document.getElementById('color-switcher').addEventListener('click', toggleColorMode);
});


