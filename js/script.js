// WhatsApp Integration
const WHATSAPP_NUMBER = "+923356900672";

function openWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER.replace(/[+\s-]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Navigation (SPA format)
function navigateTo(page) {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(`page-${page}`);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Update nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });
        
        // Close mobile menu if open
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileOverlay = document.querySelector('.mobile-overlay');
        if (mobileMenu && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            mobileOverlay.classList.remove('open');
        }
        
        // Reinitialize animations
        setTimeout(initScrollAnimations, 100);
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    document.querySelector('.mobile-menu').classList.toggle('open');
    document.querySelector('.mobile-overlay').classList.toggle('open');
}

// FAQ Toggle Functionality (If needed on Services page)
function toggleFAQ(element) {
    const answer = element.querySelector('p');
    const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';
    
    document.querySelectorAll('.service-card[onclick*="toggleFAQ"]').forEach(faq => {
        if (faq !== element) {
            faq.querySelector('p').style.maxHeight = '0px';
            faq.querySelector('p').style.marginTop = '0px';
        }
    });
    
    if (isOpen) {
        answer.style.maxHeight = '0px';
        answer.style.marginTop = '0px';
    } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.marginTop = '1rem';
    }
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.remove('visible');
        observer.observe(el);
    });
}

// Initialization on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons(); // Trigger rendering for Lucide SVGs
    initScrollAnimations();
});
