// DOM Elements
const featuredNews = document.querySelector('.featured-news');
const newsGrid = document.querySelector('.news-grid');
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const searchBar = document.querySelector('.search-bar');
const dropdownLinks = document.querySelectorAll('.nav-links > ul > li');

// Sample News Data (In a real application, this would come from an API)
const newsData = [
    {
        id: 1,
        title: 'Latest Technology Trends 2024',
        description: 'Discover the most impactful technology trends that will shape the future.',
        image: 'images/tech-trends.jpg',
        category: 'Technology'
    },
    {
        id: 2,
        title: 'Gaming Industry Updates',
        description: 'Latest updates from the gaming industry and upcoming releases.',
        image: 'images/gaming.jpg',
        category: 'Gaming'
    },
    {
        id: 3,
        title: 'Artificial Intelligence Breakthroughs',
        description: 'Recent developments in AI and machine learning.',
        image: 'images/ai.jpg',
        category: 'AI'
    }
    // Add more news items as needed
];

// Create News Card
function createNewsCard(news) {
    return `
        <article class="news-card fade-in">
            <img src="${news.image}" alt="${news.title}">
            <div class="news-card-content">
                <span class="category">${news.category}</span>
                <h3>${news.title}</h3>
                <p>${news.description}</p>
                <a href="#" class="read-more">Read More</a>
            </div>
        </article>
    `;
}

// Populate Featured News
function populateFeaturedNews() {
    featuredNews.innerHTML = newsData
        .slice(0, 3)
        .map(news => createNewsCard(news))
        .join('');
}

// Populate News Grid
function populateNewsGrid() {
    newsGrid.innerHTML = newsData
        .map(news => createNewsCard(news))
        .join('');
}

// Search Functionality
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredNews = newsData.filter(news =>
        news.title.toLowerCase().includes(searchTerm) ||
        news.description.toLowerCase().includes(searchTerm) ||
        news.category.toLowerCase().includes(searchTerm)
    );
    
    newsGrid.innerHTML = filteredNews
        .map(news => createNewsCard(news))
        .join('');
}

// Event Listeners
searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Mobile Menu Toggle
const mobileMenuButton = document.createElement('button');
mobileMenuButton.classList.add('mobile-menu-button');
mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('.navbar').insertBefore(mobileMenuButton, document.querySelector('.nav-links'));

mobileMenuButton.addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
});

// Infinite Scroll Implementation
let isLoading = false;
let page = 1;

function loadMoreNews() {
    if (isLoading) return;
    
    isLoading = true;
    // Simulate API call with setTimeout
    setTimeout(() => {
        const newItems = newsData.map(news => ({
            ...news,
            id: news.id + page * newsData.length
        }));
        
        newsGrid.innerHTML += newItems
            .map(news => createNewsCard(news))
            .join('');
            
        isLoading = false;
        page++;
    }, 1000);
}

// Intersection Observer for Infinite Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !isLoading) {
            loadMoreNews();
        }
    });
}, { threshold: 0.1 });

// Observe the last news card
const observerTarget = document.createElement('div');
observerTarget.className = 'observer-target';
newsGrid.appendChild(observerTarget);
observer.observe(observerTarget);

// Slider functionality
class Slider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelector('.slider-dots');
        this.currentSlide = 0;
        this.slideCount = this.slides.length;
        this.autoPlayInterval = null;
        
        // Create dots
        this.createDots();
        
        // Add event listeners
        document.querySelector('.prev-slide').addEventListener('click', () => this.prevSlide());
        document.querySelector('.next-slide').addEventListener('click', () => this.nextSlide());
        
        // Start autoplay
        this.startAutoPlay();
        
        // Pause autoplay on hover
        document.querySelector('.slider-container').addEventListener('mouseenter', () => this.stopAutoPlay());
        document.querySelector('.slider-container').addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    createDots() {
        for (let i = 0; i < this.slideCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dots.appendChild(dot);
        }
    }
    
    updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = index;
        if (this.currentSlide >= this.slideCount) this.currentSlide = 0;
        if (this.currentSlide < 0) this.currentSlide = this.slideCount - 1;
        this.slides[this.currentSlide].classList.add('active');
        this.updateDots();
    }
    
    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    }
    
    prevSlide() {
        this.goToSlide(this.currentSlide - 1);
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    }
    
    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

// Mobile Menu Functions
function initializeMobileMenu() {
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        searchBar.classList.remove('active');
    });

    // Handle dropdowns on mobile
    dropdownLinks.forEach(link => {
        const dropdown = link.querySelector('.dropdown');
        if (dropdown) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdownLinks.forEach(otherLink => {
                        const otherDropdown = otherLink.querySelector('.dropdown');
                        if (otherLink !== link && otherDropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                }
            });
        }
    });

    // Close mobile menu and search on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            searchBar.classList.remove('active');
            dropdownLinks.forEach(link => {
                const dropdown = link.querySelector('.dropdown');
                if (dropdown) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            searchBar.classList.remove('active');
            dropdownLinks.forEach(link => {
                const dropdown = link.querySelector('.dropdown');
                if (dropdown) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });
}

// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Slider();
    populateFeaturedNews();
    populateNewsGrid();
    initializeMobileMenu();
    lazyLoadImages();
});

// Lazy Loading Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced search
const debouncedSearch = debounce(handleSearch, 300);
searchInput.addEventListener('input', debouncedSearch);

// Error Handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // You could implement error reporting to a service here
});

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Dropdown Menu Interaction
const navItems = document.querySelectorAll('.nav-links > ul > li');
navItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const dropdown = item.querySelector('.dropdown');
    if (dropdown) {
      dropdown.style.display = 'block';
    }
  });
  item.addEventListener('mouseleave', () => {
    const dropdown = item.querySelector('.dropdown');
    if (dropdown) {
      dropdown.style.display = 'none';
    }
  });
});

// Toggle search bar on mobile
searchToggle.addEventListener('click', () => {
    searchBar.classList.toggle('active');
    navLinks.classList.remove('active');
});

// Handle dropdowns on mobile
dropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdown = link.querySelector('.dropdown');
            dropdown.classList.toggle('active');
            
            // Close other dropdowns
            dropdownLinks.forEach(otherLink => {
                if (otherLink !== link) {
                    otherLink.querySelector('.dropdown').classList.remove('active');
                }
            });
        }
    });
});

// Close mobile menu and search on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        searchBar.classList.remove('active');
        dropdownLinks.forEach(link => {
            link.querySelector('.dropdown').classList.remove('active');
        });
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
        searchBar.classList.remove('active');
        dropdownLinks.forEach(link => {
            link.querySelector('.dropdown').classList.remove('active');
        });
    }
}); 