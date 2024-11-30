
window.addEventListener('load', () => {
    document.getElementById('preloader').style.display = 'none';
    document.getElementById('navbar').style.display = 'flex';
})

// ne dela
document.querySelectorAll('nav-icon').forEach(icon => {
    icon.addEventListener('mouseover', () => {
        //let parent = icon.parentElement;
        //let icon_text = parent.querySelector('.icon-text');
        let icon_text = icon.nextElementSibling;
        icon_text.style.display = 'block';
        console.log('called');
    });
});