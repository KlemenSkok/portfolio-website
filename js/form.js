
// posiljanje in validacija forme

function showForm() {
    document.getElementById("form-container").setAttribute('class', 'open');
    document.getElementById("form-container").removeAttribute('class', 'hidden');
    document.getElementById('blurable').setAttribute('class', 'blur');
    console.log("show form");
    
}
window.showForm = showForm; // the funciton is global now

function closeForm() {
    document.getElementById("form-container").removeAttribute('class', 'open');
    document.getElementById("form-container").setAttribute('class', 'hidden');
    document.getElementById('blurable').removeAttribute('class', 'blur');
    console.log("close form");
}

document.getElementById('close-form').addEventListener('click', closeForm);


