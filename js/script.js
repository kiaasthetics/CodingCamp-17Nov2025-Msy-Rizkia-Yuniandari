function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
            bsCollapse.hide();
        }
    }
}


function updateName() {
    const nameInput = document.getElementById('name-input');
    const visitorName = document.getElementById('visitor-name');
    
    if (nameInput.value.trim() !== '') {
        visitorName.textContent = nameInput.value.trim();

        localStorage.setItem('visitorName', nameInput.value.trim());

        nameInput.value = '';

        alert('Welcome, ' + visitorName.textContent + '!');
    } else {
        alert('Please enter your name!');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const savedName = localStorage.getItem('visitorName');
    if (savedName) {
        document.getElementById('visitor-name').textContent = savedName;
    }
});

document.getElementById('name-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        updateName();
    }
});


document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = this;
    const name = document.getElementById('form-name');
    const email = document.getElementById('form-email');
    const phone = document.getElementById('form-phone');
    const subject = document.getElementById('form-subject');
    const message = document.getElementById('form-message');
    
    form.classList.remove('was-validated');
    
    let isValid = true;
    
    if (name.value.trim() === '') {
        name.classList.add('is-invalid');
        isValid = false;
    } else {
        name.classList.remove('is-invalid');
        name.classList.add('is-valid');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    } else {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
    }

    if (subject.value === '') {
        subject.classList.add('is-invalid');
        isValid = false;
    } else {
        subject.classList.remove('is-invalid');
        subject.classList.add('is-valid');
    }
    
    if (message.value.trim() === '') {
        message.classList.add('is-invalid');
        isValid = false;
    } else {
        message.classList.remove('is-invalid');
        message.classList.add('is-valid');
    }

    if (isValid) {
        document.getElementById('result-name').textContent = name.value;
        document.getElementById('result-email').textContent = email.value;
        document.getElementById('result-phone').textContent = phone.value || '-';
        document.getElementById('result-subject').textContent = subject.value;
        document.getElementById('result-message').textContent = message.value;
        
        document.getElementById('result-box').classList.remove('d-none');
        
        document.getElementById('result-box').scrollIntoView({ behavior: 'smooth' });
    }
});

const formInputs = document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && this.value.trim() === '') {
            this.classList.add('is-invalid');
            this.classList.remove('is-valid');
        } else if (this.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(this.value)) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        } else if (this.value.trim() !== '') {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
        }
    });
});