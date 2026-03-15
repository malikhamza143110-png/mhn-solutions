// Initialize Icons
lucide.createIcons();

// --- SPA Navigation Logic ---
function navigate(targetId) {
    // 1. Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // 2. Show target page
    const targetPage = document.getElementById(targetId);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 3. Update desktop active states
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.dataset.target === targetId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 4. Close mobile menu if open
    closeMobileMenu();
}

// --- Mobile Menu Logic ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMobileMenu() {
    mobileMenu.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeMobileMenu() {
    mobileMenu.classList.add('translate-x-full');
    document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', openMobileMenu);
closeMenuBtn.addEventListener('click', closeMobileMenu);

// Bind mobile navigation links
mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.dataset.target;
        navigate(target);
    });
});

// --- WhatsApp Logic ---
const waBtn = document.getElementById('wa-btn');
waBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Replace with your actual WhatsApp number (include country code, no + or spaces)
    const phoneNumber = "1234567890"; 
    const message = encodeURIComponent("Hi, I'm interested in working with Nexus.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
});

// --- Contact Form Logic ---
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate API call/submission
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Sending...';
    lucide.createIcons();

    setTimeout(() => {
        btn.innerHTML = originalText;
        lucide.createIcons();
        contactForm.reset();
        formSuccess.classList.remove('hidden');
        
        // Hide success message after 4 seconds
        setTimeout(() => formSuccess.classList.add('hidden'), 4000);
    }, 1500);
});
