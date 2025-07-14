window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'transform 0.3s';
    } else {
        navbar.style.transform = 'translateY(0)';
        navbar.style.transition = 'transform 0.3s';
    }
});
let currentPosition = 0;
const frameWidth = 210;
const filmTrack = document.getElementById('filmTrack');
const autoScrollSpeed = 0.8;
let animationId;
let isAutoScrolling = true;
let isDragging = false;
let startX = 0;
let startPosition = 0;

// Clone images for seamless loop
function setupInfiniteScroll() {
    const frames = Array.from(filmTrack.children);
    frames.forEach(frame => {
        const clone = frame.cloneNode(true);
        filmTrack.appendChild(clone);
    });
}

// Smooth animation loop
function animate() {
    if (isAutoScrolling && !isDragging) {
        currentPosition -= autoScrollSpeed;
        
        // Reset when we've moved exactly one set of images
        const resetPoint = -(frameWidth * 12); // 12 original frames
        if (currentPosition <= resetPoint) {
            currentPosition = 0;
        }
    }
    
    filmTrack.style.transform = `translateX(${currentPosition}px)`;
    animationId = requestAnimationFrame(animate);
}

// Start animation
function startAnimation() {
    if (!animationId) {
        animate();
    }
}

// Stop animation
function stopAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

// Drag functionality
filmTrack.addEventListener('mousedown', (e) => {
    isDragging = true;
    isAutoScrolling = false;
    startX = e.clientX;
    startPosition = currentPosition;
    filmTrack.classList.add('grabbing');
    e.preventDefault();
});

filmTrack.addEventListener('touchstart', (e) => {
    isDragging = true;
    isAutoScrolling = false;
    startX = e.touches[0].clientX;
    startPosition = currentPosition;
    filmTrack.classList.add('grabbing');
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    currentPosition = startPosition + deltaX;
});

document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - startX;
    currentPosition = startPosition + deltaX;
    e.preventDefault();
});

function endDrag() {
    if (!isDragging) return;
    
    isDragging = false;
    filmTrack.classList.remove('grabbing');
    
    // Normalize position to valid range
    const resetPoint = -(frameWidth * 12);
    while (currentPosition > 0) currentPosition += resetPoint;
    while (currentPosition <= resetPoint) currentPosition -= resetPoint;
    
    // Resume auto-scroll after delay
    setTimeout(() => {
        isAutoScrolling = true;
    }, 2000);
}

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);

// Hover pause
filmTrack.addEventListener('mouseenter', () => {
    isAutoScrolling = false;
});

filmTrack.addEventListener('mouseleave', () => {
    if (!isDragging) {
        setTimeout(() => {
            isAutoScrolling = true;
        }, 500);
    }
});

filmTrack.addEventListener('dragstart', (e) => e.preventDefault());

// Initialize
function init() {
    setupInfiniteScroll();
    startAnimation();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}