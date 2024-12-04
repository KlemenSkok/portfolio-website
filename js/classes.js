
function getRandomColor() {
    // hsl format: hsl(x, 40%, 85%)
    let x = Math.floor(Math.random() * 360);
    return `hsl(${x}, 40%, 85%)`;
}

class Skills {
    colors = new Map();
    data;


    constructor (path) {
        fetch(path)
        .then(response => {
            if(!response.ok) {
                throw new Error('Failed to open skills.json');
            }
            return response.json();
        })
        .then(data => {
            this.data = data;
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
    generate() {
        // add to html container
    }
}