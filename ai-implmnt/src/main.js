/* ══════════════════════════════════════
   AI·Implmnt — Main JS
   Nav behavior, mobile menu, scroll
   animations, smooth scrolling
   ══════════════════════════════════════ */

// Import all styles
import './styles/variables.css';
import './styles/base.css';
import './styles/components.css';
import './styles/sections.css';
import './styles/responsive.css';
import './styles/legal.css';

// ── Vercel Speed Insights & Analytics ──
import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from '@vercel/analytics';

injectSpeedInsights();
inject();

// ── Nav scroll state ──
const nav = document.getElementById('nav');

function updateNavScroll() {
    if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 20);
    }
}

window.addEventListener('scroll', updateNavScroll, { passive: true });
updateNavScroll();

// ── Mobile menu ──
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        document.body.style.overflow = isOpen ? 'hidden' : '';

        // Toggle hamburger ↔ close icon
        mobileBtn.innerHTML = isOpen
            ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F0F0D" stroke-width="2"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>`
            : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F0F0D" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
            mobileBtn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F0F0D" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
        });
    });
}

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ── Intersection Observer for scroll-triggered animations ──
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-up elements
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── Year in footer copyright ──
const yearEl = document.getElementById('footerYear');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}
