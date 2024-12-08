
// posiljanje in validacija forme

function showForm() {
    document.getElementById("form-container").setAttribute('class', 'open');
    document.getElementById("form-container").removeAttribute('class', 'hidden');
    document.getElementById('blurable').setAttribute('class', 'blur');
}
window.showForm = showForm; // the funciton is global now

function closeForm() {
    document.getElementById("form-container").removeAttribute('class', 'open');
    document.getElementById("form-container").setAttribute('class', 'hidden');
    document.getElementById('blurable').removeAttribute('class', 'blur');
}

document.getElementById('close-form').addEventListener('click', closeForm);
document.getElementById('close-form-2').addEventListener('click', closeForm);

document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    
    const data = new FormData(event.target);
    const form = {
        from_email: data.get('from_email'),
        subject: data.get('subject'),
        message: data.get('message')
    }
    if (form.from_email === "" || form.subject === "" || form.message === "") {
        alert("Please fill all fields");
        return;
    }

    const mail_regex = /^[a-z0-9]+(\.[a-z0-9]+)*@[a-z0-9]+(\.[a-z0-9]+)+$/i;
    if(!mail_regex.test(form.from_email)) {
        alert("Invalid email address");
        document.getElementById('i_email').setAttribute('class', 'error');
        //document.getElementById('email').focus();
        return;
    }
    document.getElementById('i_email').removeAttribute('class', 'error');

    // preserve height of the form
    const popup_height = document.getElementById('form-obrazec').offsetHeight;
    document.getElementById('form-loader').style.display = 'flex';
    document.getElementById('form-loader').style.height = popup_height + 'px';
    document.getElementById('form-obrazec').style.display = 'none';
    
    const emailjs_service = 'service_fa8zzhj';
    const emailjs_template = 'template_8l8lted';
    
    // poslji email z Email.js
    try {
        await emailjs.sendForm(emailjs_service, emailjs_template, event.target)
        .then(function(response) {
            // show success screen
            document.getElementById('form-sent').style.height = popup_height + 'px';
            document.getElementById('form-loader').style.display = 'none';
            document.getElementById('form-sent').style.display = 'block';
            event.target.reset(); // Reset the form
        }, function(error) {
            alert('Failed to send message. Please try again later.');
            // reset view
            document.getElementById('form-loader').style.display = 'none';
            document.getElementById('form-obrazec').style.display = 'flex';
            });
    }
    catch(err) {
        console.log('Error sending email: ', err);
    }
    

});
