
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
        });  
    }
}