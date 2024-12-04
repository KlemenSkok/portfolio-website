
// vsem karticam doda event listenerje, da se expandajo ko jih kliknes
function setProjectCards() {
    // returns HTMLcollection, not array
    const projectHeaders = document.getElementsByClassName('project-card-header');

    //console.log(projectHeaders.length);
    Array.from(projectHeaders).forEach(header => {
        header.addEventListener('click', () => {
            const body = header.nextElementSibling;
            body.classList.toggle('open');
            let arrow = header.querySelector('.drop-arrow').querySelector('.arrow-up-down').innerHTML;
            if(arrow === 'keyboard_arrow_down') {
                header.querySelector('.drop-arrow').querySelector('.arrow-up-down').innerHTML = 'keyboard_arrow_up';
            } else {
                header.querySelector('.drop-arrow').querySelector('.arrow-up-down').innerHTML = 'keyboard_arrow_down';
            }
        });
    });
}

function fillProjects(data) {

    const projects = data.projects;
    //console.log(projects);

    const root = document.getElementById('projects-ul');
    projects.forEach(p => {
        const li = document.createElement('li');
        let descr = "";
        p.description.forEach(d => {
            descr += `<p>${d}</p>`;
        });

        li.innerHTML = `
            <div class="project-card">
                <div class="project-card-header">
                    <div class="project-title"><h1>${p.name}</h1></div>
                    <div class="drop-arrow">
                        <span class="material-symbols-outlined arrow-up-down">keyboard_arrow_down</span>
                    </div>
                </div>
                <div class="project-card-body">
                    <div class="project-description">${descr}</div>
                    <div class="project-footer">
                        <div class="project-status"><b>Status:</b> <span>${p.status}.</span></div>
                        <div class="project-link"><a href="${p.link}"><i>${p.link_text}</i></a></div>
                    </div>
                    <div class="project-img"><img src="${p.image}" alt="${p.image_alt}" width="60%"/></div>
                </div>
            </div>
        `;
        root.appendChild(li);
    });
    
    setProjectCards();
}

function fillSkills(data) {
    const skills = data.skills;

    const root = document.getElementById('skills-container');

    skills.forEach(s => {
        const div = document.createElement('div');
        div.setAttribute('class', 'skill-box');
        div.innerHTML = `${s.name}`;
        root.appendChild(div);
    });
}

function readProjectsData() {
    fetch('https://raw.githubusercontent.com/KlemenSkok/portfolio-website/main/data/projects.json')
    .then(response =>  {
        if(!response.ok) {
            throw new Error('Failed to open projects.json');
        }
        //console.log(response.json());
        return response.json();
    })
    .then(data => { // data gets output of response.json()
        fillProjects(data);
    })
    .catch(err => {
        console.log('Error loading projects data: ', err);
    });
}

function readSkillsData() {
    fetch('https://raw.githubusercontent.com/KlemenSkok/portfolio-website/main/data/skills.json')
    .then(response => {
        if(!response.ok) {
            throw new Error('Failed to open skills.json');
        }
        return response.json();
    })
    .then(data => {
        fillSkills(data);
    })
    .catch(err =>{
        console.log('Error loading skills data: ', err);
    });
}


window.addEventListener('load', () => {
    readProjectsData();
    readSkillsData();
    document.getElementById('preloader').style.display = 'none';
    document.getElementById('navbar').style.display = 'flex';
});


