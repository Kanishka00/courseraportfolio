const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const yearSpan = document.getElementById('year');

navLinks[0]?.classList.add('active');

// Keep the footer year current without manual updates.
yearSpan.textContent = new Date().getFullYear();

// Toggle between light and dark themes and keep the button label in sync.
themeToggle.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark-theme');
    themeToggle.textContent = isDark ? 'Switch to Light' : 'Switch to Dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
});

// Highlight the navigation link for the section currently in view.
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (!activeLink) {
                return;
            }

            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                activeLink.classList.add('active');
            }
        });
    },
    {
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0.1
    }
);

sections.forEach(section => observer.observe(section));

// Provide immediate feedback when the contact form is submitted.
contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name');

    formStatus.textContent = `Thanks ${name}, your message is on its way!`;

    setTimeout(() => {
        formStatus.textContent = '';
        contactForm.reset();
    }, 4000);
});
