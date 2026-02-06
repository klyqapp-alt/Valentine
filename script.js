// ===== Rose Day Website - JavaScript =====

// Love quotes for rotation
const loveQuotes = [
    "In a garden full of flowers, I'd still pick you.",
    "You are my today and all of my tomorrows.",
    "Every love story is beautiful, but ours is my favorite.",
    "I fell in love with the way you touched me without using your hands.",
    "You are the reason I believe in love.",
    "Together is my favorite place to be.",
    "You had me at hello, you have me at forever.",
    "My heart is, and always will be, yours.",
    "I love you more than yesterday but less than tomorrow.",
    "You're the first and last thing on my mind each day."
];

// Rose types for the garden
const roseEmojis = ['🌹', '🌷', '🌸', '💐', '🏵️', '💮'];

let roseCount = 0;
let quoteIndex = 0;

// ===== Create Floating Petals =====
function createPetals() {
    const petalsContainer = document.getElementById('petals');
    const colors = ['#e63946', '#f4a5b2', '#c1121f', '#ff69b4', '#ff1493'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.left = Math.random() * 100 + '%';
            petal.style.background = colors[Math.floor(Math.random() * colors.length)];
            petal.style.width = (15 + Math.random() * 15) + 'px';
            petal.style.height = petal.style.width;
            petal.style.animationDuration = (5 + Math.random() * 5) + 's';
            petal.style.animationDelay = Math.random() * 2 + 's';
            
            petalsContainer.appendChild(petal);
            
            // Remove petal after animation
            setTimeout(() => {
                petal.remove();
            }, 12000);
        }, i * 500);
    }
}

// Continuously create petals
setInterval(createPetals, 10000);
createPetals();

// ===== Create Floating Hearts =====
function createFloatingHearts() {
    const heartsContainer = document.getElementById('hearts');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💘', '💝'];
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (15 + Math.random() * 20) + 'px';
            heart.style.animationDuration = (4 + Math.random() * 4) + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';
            
            heartsContainer.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 10000);
        }, i * 800);
    }
}

setInterval(createFloatingHearts, 8000);
createFloatingHearts();

// ===== Interactive Rose Garden =====
const gardenArea = document.getElementById('gardenArea');
const roseCountElement = document.getElementById('roseCount');
const gardenHint = document.querySelector('.garden-hint');

gardenArea.addEventListener('click', (e) => {
    const rect = gardenArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Plant a rose
    const rose = document.createElement('div');
    rose.className = 'planted-rose';
    rose.textContent = roseEmojis[Math.floor(Math.random() * roseEmojis.length)];
    rose.style.left = x + 'px';
    rose.style.top = y + 'px';
    rose.style.fontSize = (1.5 + Math.random() * 1.5) + 'rem';
    
    gardenArea.appendChild(rose);
    
    // Update counter
    roseCount++;
    roseCountElement.textContent = roseCount;
    
    // Hide hint after first click
    if (roseCount === 1) {
        gardenHint.style.opacity = '0';
    }
    
    // Add click event to planted rose for a little animation
    rose.addEventListener('click', (e) => {
        e.stopPropagation();
        createMiniHearts(e.clientX, e.clientY);
    });
});

// Create mini hearts burst on rose click
function createMiniHearts(x, y) {
    const hearts = ['❤️', '💕', '💖'];
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.fontSize = '1.5rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '10001';
        heart.style.transform = 'translate(-50%, -50%)';
        
        const angle = (Math.PI * 2 * i) / 5;
        const distance = 80;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        document.body.appendChild(heart);
        
        heart.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
            { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1)`, opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        });
        
        setTimeout(() => heart.remove(), 600);
    }
}

// ===== Rotate Love Quotes =====
const quoteElement = document.getElementById('quote');

function rotateQuotes() {
    quoteElement.classList.remove('active');
    
    setTimeout(() => {
        quoteIndex = (quoteIndex + 1) % loveQuotes.length;
        quoteElement.textContent = `"${loveQuotes[quoteIndex]}"`;
        quoteElement.classList.add('active');
    }, 500);
}

setInterval(rotateQuotes, 5000);

// ===== Love Button & Modal =====
const loveBtn = document.getElementById('loveBtn');
const loveModal = document.getElementById('loveModal');
const closeModal = document.getElementById('closeModal');
const explosionHearts = document.getElementById('explosionHearts');

loveBtn.addEventListener('click', () => {
    loveModal.classList.add('active');
    createExplosion();
    createMassiveHearts();
});

closeModal.addEventListener('click', () => {
    loveModal.classList.remove('active');
});

// Close modal on outside click
loveModal.addEventListener('click', (e) => {
    if (e.target === loveModal) {
        loveModal.classList.remove('active');
    }
});

function createExplosion() {
    explosionHearts.innerHTML = '';
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💘', '💝', '🌹'];
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'explosion-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        const angle = (Math.PI * 2 * i) / 30;
        const distance = 150 + Math.random() * 150;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');
        heart.style.animationDelay = (i * 0.03) + 's';
        
        explosionHearts.appendChild(heart);
    }
}

function createMassiveHearts() {
    const hearts = ['❤️', '💕', '💖', '🌹'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.fontSize = (1 + Math.random() * 2) + 'rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '10002';
            
            document.body.appendChild(heart);
            
            heart.animate([
                { transform: 'translateY(0) scale(0)', opacity: 1 },
                { transform: `translateY(-${window.innerHeight + 100}px) scale(1)`, opacity: 0 }
            ], {
                duration: 3000 + Math.random() * 2000,
                easing: 'ease-out'
            });
            
            setTimeout(() => heart.remove(), 5000);
        }, i * 100);
    }
}

// ===== Smooth Scroll for Cards =====
const roseCards = document.querySelectorAll('.rose-card');

roseCards.forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = 'translateY(-10px) scale(1.05) rotate(2deg)';
        setTimeout(() => {
            card.style.transform = '';
        }, 300);
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
});

// Reset hero section (it should be visible immediately)
document.getElementById('hero').style.opacity = '1';
document.getElementById('hero').style.transform = 'none';

// ===== Easter Egg: Konami Code =====
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateRainbow();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateRainbow() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Create tons of roses
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const rose = document.createElement('div');
            rose.textContent = '🌹';
            rose.style.position = 'fixed';
            rose.style.left = Math.random() * 100 + '%';
            rose.style.top = '-50px';
            rose.style.fontSize = (2 + Math.random() * 3) + 'rem';
            rose.style.pointerEvents = 'none';
            rose.style.zIndex = '10003';
            
            document.body.appendChild(rose);
            
            rose.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`, opacity: 0.5 }
            ], {
                duration: 3000 + Math.random() * 2000,
                easing: 'ease-in'
            });
            
            setTimeout(() => rose.remove(), 5000);
        }, i * 50);
    }
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 10000);
}

// ===== Touch Device Support =====
if ('ontouchstart' in window) {
    gardenArea.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = gardenArea.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        const rose = document.createElement('div');
        rose.className = 'planted-rose';
        rose.textContent = roseEmojis[Math.floor(Math.random() * roseEmojis.length)];
        rose.style.left = x + 'px';
        rose.style.top = y + 'px';
        rose.style.fontSize = (1.5 + Math.random() * 1.5) + 'rem';
        
        gardenArea.appendChild(rose);
        roseCount++;
        roseCountElement.textContent = roseCount;
        
        if (roseCount === 1) {
            gardenHint.style.opacity = '0';
        }
    });
}

console.log('🌹 Happy Rose Day! Made with love ❤️');
