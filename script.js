/* ===========================================================
   TOTAL GAMING ESPORTS HUB - script.js
   Clean, bug-free, no duplicate declarations
=========================================================== */

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// --- HERO ENTRANCE ----------------------------------------
gsap.from(".hero-eyebrow", { duration: 1, y: 30, opacity: 0, ease: "power3.out", delay: 0.2 });
gsap.from(".glitch",       { duration: 1.4, y: 80, opacity: 0, ease: "power4.out", delay: 0.4 });
gsap.from(".hero-sub",     { duration: 1,   y: 30, opacity: 0, ease: "power3.out", delay: 0.8 });
gsap.from(".hero-cta-group", { duration: 1, y: 30, opacity: 0, ease: "power3.out", delay: 1.0 });

// --- NAVBAR SCROLL SHRINK ---------------------------------
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
}

// --- NAVBAR AUTH STATE ------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('nav-login-btn');
    const userAvatar = document.getElementById('nav-user-avatar');

    if (loginBtn && userAvatar) {
        if (localStorage.getItem('tg_logged_in') === 'true') {
            loginBtn.style.display = 'none';
            userAvatar.style.display = 'flex';
        } else {
            loginBtn.style.display = 'inline-block';
            userAvatar.style.display = 'none';
        }

        // Logout logic on avatar click
        userAvatar.addEventListener('click', () => {
            if(confirm("Are you sure you want to log out?")) {
                localStorage.removeItem('tg_logged_in');
                window.location.reload();
            }
        });
    }
});

// --- MOBILE HAMBURGER MENU --------------------------------
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Close menu on nav link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

// --- SMOOTH SCROLL FOR ANCHOR LINKS -----------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// --- CUSTOM CURSOR ----------------------------------------
const cursor = document.querySelector('#tg-cursor');
if (cursor) {
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });

    window.addEventListener('mousemove', e => {
        xTo(e.clientX);
        yTo(e.clientY);
    });

    // Hide custom cursor when mouse leaves the document window
    document.addEventListener('mouseleave', () => {
        gsap.to(cursor, { opacity: 0, duration: 0.2 });
    });

    // Show custom cursor when mouse enters the document window
    document.addEventListener('mouseenter', () => {
        gsap.to(cursor, { opacity: 1, duration: 0.2 });
    });
}

// --- HERO PARALLAX ----------------------------------------
window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 18;
    const y = (e.clientY / window.innerHeight - 0.5) * 18;
    gsap.to('.hero-content', { x, y, duration: 1.2, ease: "power2.out" });
});

// --- JERSEY DISPLAY SPOTLIGHT -----------------------------
const jerseyDisplay = document.querySelector('.jersey-display');
const spotlight     = document.querySelector('.spotlight');

if (jerseyDisplay && spotlight) {
    jerseyDisplay.addEventListener('mousemove', (e) => {
        const rect = jerseyDisplay.getBoundingClientRect();
        const xPct = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
        const yPct = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
        spotlight.style.background = `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(255,184,0,0.12) 0%, transparent 60%)`;
    });

    jerseyDisplay.addEventListener('mouseleave', () => {
        spotlight.style.background = 'radial-gradient(circle at 50% 50%, rgba(255,184,0,0.08) 0%, transparent 65%)';
    });
}

// --- SUPPORT TERMINAL typeMsg -----------------------------
function typeMsg(msg) {
    const output = document.getElementById('t-output');
    if (!output) return;
    output.innerHTML = '';
    let i = 0;
    const timer = setInterval(() => {
        if (i < msg.length) {
            output.innerHTML += msg.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, 45);
}

// Expose globally so onclick attributes work
window.typeMsg = typeMsg;

// --- ABOUT US - ANIMATED STAT COUNTERS --------------------
function animateCounters() {
    document.querySelectorAll('.about-stat-num').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = target > 100 ? 2000 : 1500;
        const startTime = performance.now();

        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
        }
        requestAnimationFrame(step);
    });
}

// Trigger counters on scroll into view
ScrollTrigger.create({
    trigger: '.about-sec',
    start: 'top 75%',
    once: true,
    onEnter: animateCounters,
});

// About section scroll reveal animations
gsap.from('.about-stats', {
    scrollTrigger: {
        trigger: '.about-sec',
        start: 'top 80%',
    },
    x: -50,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out"
});

gsap.from('.about-story', {
    scrollTrigger: {
        trigger: '.about-sec',
        start: 'top 80%',
    },
    x: 50,
    opacity: 0,
    duration: 0.9,
    delay: 0.2,
    ease: "power3.out"
});

gsap.from('.about-value-card', {
    scrollTrigger: {
        trigger: '.about-values-grid',
        start: 'top 85%',
    },
    y: 40,
    opacity: 0,
    stagger: 0.12,
    duration: 0.7,
    ease: "power2.out"
});


// --- JERSEY DISPLAY 3D FLOAT (player cards now use CSS flip) --
document.querySelectorAll('.jersey-display').forEach(container => {
    container.addEventListener('mousemove', (e) => {
        const img = container.querySelector('img');
        if (!img) return;
        const rect  = container.getBoundingClientRect();
        const moveX = (e.clientX - rect.left - rect.width  / 2) / 18;
        const moveY = (e.clientY - rect.top  - rect.height / 2) / 18;
        gsap.to(img, { x: moveX, y: moveY, duration: 0.4, ease: "power2.out" });
    });

    container.addEventListener('mouseleave', () => {
        const img = container.querySelector('img');
        if (img) gsap.to(img, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
    });
});

// --- VIDEO CARD MAGNETIC PLAY BTN -------------------------
document.querySelectorAll('.v-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const btn = card.querySelector('.play-btn');
        if (!btn) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width  / 2) * 0.08;
        const y = (e.clientY - rect.top  - rect.height / 2) * 0.08;
        gsap.to(btn, { x, y, duration: 0.25 });
    });

    card.addEventListener('mouseleave', () => {
        const btn = card.querySelector('.play-btn');
        if (btn) gsap.to(btn, { x: 0, y: 0, duration: 0.3 });
    });
});

// --- SCROLL-TRIGGERED ANIMATIONS --------------------------

// Roster player cards - scroll reveal (flip handled by CSS hover)
gsap.utils.toArray('.p-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        clearProps: "all"
    });
});

// Standings table rows
gsap.from('.standings-table tr', {
    scrollTrigger: {
        trigger: '.standings-table',
        start: 'top 80%',
    },
    opacity: 0,
    x: -25,
    duration: 0.5,
    stagger: 0.08,
    ease: "power2.out"
});

// Schedule cards
gsap.from('.s-card', {
    scrollTrigger: {
        trigger: '.schedule-sec',
        start: 'top 80%',
    },
    x: 80,
    opacity: 0,
    stagger: 0.15,
    duration: 0.7,
    ease: "power2.out"
});

// Timeline items
gsap.from('.t-item', {
    scrollTrigger: {
        trigger: '.timeline',
        start: 'top 80%',
    },
    opacity: 0,
    x: -30,
    stagger: 0.2,
    duration: 0.7,
    ease: "power2.out"
});

// Shop section
gsap.from('.shop-container', {
    scrollTrigger: {
        trigger: '.shop-sec',
        start: 'top 80%',
    },
    y: 40,
    opacity: 0,
    duration: 0.9,
    ease: "power3.out"
});

// --- SCHEDULE REMINDER BUTTON -----------------------------
document.querySelectorAll('.s-remind').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.textContent = '✓ ALARM SET';
        btn.style.borderColor = '#27c93f';
        btn.style.color       = '#27c93f';
        gsap.to(btn, { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1 });
    });
});
