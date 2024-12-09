
function getRandomColor() {
    // hsl format: hsl(x, 40%, 85%)
    let x = Math.floor(Math.random() * 360);
    return `hsl(${x}, 50%, 40%)`;
}

function shuffleArray(array) { // da so skilli nakljucno razporejeni
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    return array;
}

// loadanje skillov
export class Skills {
    colors;
    data;

    constructor () {
        this.colors = new Map();
        this.data = [];
    }

    async load (path) {
        await fetch(path) // ! await, da pocaka na fetch
        .then(response => {
            if(!response.ok) {
                throw new Error('Failed to open skills.json');
            }
            return response.json();
        })
        .then(data => {
            this.data = data.skills;
            this.data = shuffleArray(this.data);
            //console.log(this.data);
        })
        .catch(err =>{
            console.log('Error loading skills data: ', err);
        });
    }
    
    classify() { // vrstam skilla dodeli barve
        this.data.forEach(s => {
            // add to map and assign color
            if(!this.colors.has(s.type)) {
                this.colors.set(s.type, getRandomColor());
            }
        });
    }
    
    generate() { // add to html container
        const root = document.getElementById('skills-container');
        this.data.forEach(s => {
            let box = document.createElement('div');
            box.setAttribute('class', 'skill-box');
            box.style.borderColor = this.colors.get(s.type);
            box.innerHTML = `${s.name}`;
            root.appendChild(box);
        });
    }
    // end of class
}
// loadanje projektov
export class Projects {
    data;

    async load(path) {
        await fetch('https://raw.githubusercontent.com/KlemenSkok/portfolio-website/main/data/projects.json')
        .then(response =>  {
            if(!response.ok) {
                throw new Error('Failed to open projects.json');
            }
            //console.log(response.json());
            return response.json();
        })
        .then(data => { // data gets output of response.json()
            this.data = data.projects;
        })
        .catch(err => {
            console.log('Error loading projects data: ', err);
        });
    }

    generate() {
        const root = document.getElementById('projects-ul');
        this.data.forEach(p => {
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
    }

    // vsem project karticam doda event listenerje, da se expandajo ko jih kliknes
    setEventListeners() {
        // returns HTMLcollection, not array!
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
    // end of class
}