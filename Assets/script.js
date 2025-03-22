<script>
// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Create subtle atomic interactions
window.addEventListener('mousemove', (e) => {
    const electrons = document.querySelectorAll('.electron');
    const protons = document.querySelectorAll('.proton');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    // Add subtle electron speed change based on cursor position
    electrons.forEach(electron => {
        const currentDuration = parseFloat(electron.style.animationDuration) || 10;
        const newDuration = currentDuration + (x - 0.5) * 2;
        electron.style.animationDuration = `${Math.max(5, Math.min(20, newDuration))}s`;
    });
    
    // Add subtle glow effect to protons when cursor is nearby
    protons.forEach(proton => {
        const protonRect = proton.getBoundingClientRect();
        const centerX = protonRect.left + protonRect.width / 2;
        const centerY = protonRect.top + protonRect.height / 2;
        
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
        const maxDistance = 300;
        
        if (distance < maxDistance) {
            const intensity = 1 - (distance / maxDistance);
            proton.style.boxShadow = `0 0 ${15 + intensity * 15}px rgba(255, 126, 95, ${0.4 + intensity * 0.4})`;
        }
    });
});

// Carousel functionality
const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const carouselItems = document.querySelectorAll('.carousel-item');

let currentIndex = 0;
const itemsPerView = window.innerWidth < 480 ? 1 : window.innerWidth < 768 ? 2 : window.innerWidth < 992 ? 3 : 4;
const totalItems = carouselItems.length;

function updateCarousel() {
    const itemWidth = carouselItems[0].offsetWidth + 32; // Adding the gap
    carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

nextBtn.addEventListener('click', () => {
    if (currentIndex < totalItems - itemsPerView) {
        currentIndex++;
        updateCarousel();
    } else {
        // Loop back to start
        currentIndex = 0;
        updateCarousel();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    } else {
        // Loop to end
        currentIndex = totalItems - itemsPerView;
        updateCarousel();
    }
});

// Update carousel on window resize
window.addEventListener('resize', () => {
    // Recalculate itemsPerView
    const newItemsPerView = window.innerWidth < 480 ? 1 : window.innerWidth < 768 ? 2 : window.innerWidth < 992 ? 3 : 4;
    
    // Adjust currentIndex if needed
    if (currentIndex > totalItems - newItemsPerView) {
        currentIndex = Math.max(0, totalItems - newItemsPerView);
    }
    
    // Update carousel
    updateCarousel();
});

// Initialize carousel
updateCarousel();
</script>