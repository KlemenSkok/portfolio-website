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

    if(sw.firstElementChild.innerHTML == 'dark_mode') { // set light mode
        sw.firstElementChild.innerHTML = 'light_mode';
        sw.style.color = '#d9773b';
        document.getElementById('color-mode').href = 'css/light.css';
        localStorage.setItem('color_mode', 'light'); // save to local storage

        // icons
        document.getElementById('contact-github').src = 'assets/icons/github-mark.svg';
        document.getElementById('contact-discord').src = 'assets/icons/discord-mark-blue.svg';
    }
    else {                                              // set dark mode
        sw.firstElementChild.innerHTML = 'dark_mode';
        sw.style.color = 'yellow';
        document.getElementById('color-mode').href = 'css/dark.css';
        localStorage.setItem('color_mode', 'dark'); // save to local storage
        
        // icons
        document.getElementById('contact-github').src = 'assets/icons/github-mark-white.svg';
        document.getElementById('contact-discord').src = 'assets/icons/discord-mark-white.svg';
    }
}


window.addEventListener('load', () => {
    readProjectsData();
    readSkillsData();
    enableSmoothScroll();
    
    // hide preloader
    document.getElementById('preloader').style.display = 'none';
    // show navbar and color switcher
    document.getElementById('navbar').style.display = 'flex';
    document.getElementById('color-switcher').style.display = 'flex';
    document.getElementById('color-switcher').addEventListener('click', toggleColorMode);

    // set color mode
    let mode = localStorage.getItem('color_mode');
    if(mode == null) {
        localStorage.setItem('color_mode', 'light');
        console.log('default color mode set: light mode');
    }
    else if(mode == 'dark') {
        toggleColorMode();
        console.log('light mode set to dark mode');
    }

});


