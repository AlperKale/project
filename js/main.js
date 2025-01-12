// DOM Elements
const featuredNews = document.querySelector('.featured-news');
const newsGrid = document.querySelector('.news-grid');
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const searchBar = document.querySelector('.search-bar');
const dropdownLinks = document.querySelectorAll('.nav-links > ul > li');
const trendingSlider = document.querySelector('.trending-news-slider');
const scrollContents = document.querySelectorAll('.scroll-content');
const popularList = document.querySelector('.popular-list');
const agendaItems = document.querySelector('.agenda-items');
const specialGrid = document.querySelector('.special-grid');

// Sample News Data
const newsData = [
    {
        id: 1,
        title: 'GPT-5 Duyuruldu: Yapay Zekanın Yeni Çağı',
        description: 'OpenAI\'ın yeni dil modeli, insan benzeri anlama ve üretim yetenekleriyle dikkat çekiyor.',
        image: 'images/ai-news.jpg',
        category: 'Yapay Zeka',
        date: '2024-03-15'
    },
    {
        id: 2,
        title: 'Apple Vision Pro İnceleme',
        description: 'Apple\'ın yeni karma gerçeklik gözlüğünü detaylı olarak inceledik.',
        image: 'images/vision-pro.jpg',
        category: 'İnceleme',
        date: '2024-03-14'
    },
    {
        id: 3,
        title: 'Elektrikli Araçlar İçin Yeni Batarya Teknolojisi',
        description: '5 dakikada şarj olan yeni nesil bataryalar yolda.',
        image: 'images/ev-battery.jpg',
        category: 'Teknoloji',
        date: '2024-03-13'
    }
];

// Trending News Data
const trendingNews = [
    'Samsung Galaxy S25 Ultra sızdırıldı',
    'Intel 14. nesil işlemciler tanıtıldı',
    'Tesla\'dan yeni kompakt model',
    'PlayStation 6 ne zaman çıkacak?'
];

// Create News Card
function createNewsCard(news, isLarge = false) {
    return `
        <article class="news-card ${isLarge ? 'large' : ''} fade-in">
            <div class="card-image">
                <img src="${news.image}" alt="${news.title}" loading="lazy">
                <span class="category">${news.category}</span>
            </div>
            <div class="card-content">
                <div class="card-meta">
                    <span class="date">${formatDate(news.date)}</span>
                    <span class="read-time">5 dk okuma</span>
                </div>
                <h3>${news.title}</h3>
                <p>${news.description}</p>
                <a href="#" class="read-more">Devamını Oku <i class="fas fa-arrow-right"></i></a>
            </div>
        </article>
    `;
}

// Format Date
function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
}

// Initialize Trending News Slider
function initTrendingSlider() {
    let currentIndex = 0;
    const trendingContent = trendingNews.map(news => `<div class="trending-item">${news}</div>`).join('');
    trendingSlider.innerHTML = trendingContent;
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % trendingNews.length;
        trendingSlider.style.transform = `translateY(-${currentIndex * 100}%)`;
    }, 3000);
}

// Initialize Horizontal Scroll
function initHorizontalScroll() {
    scrollContents.forEach(content => {
        const scrollContainer = content.parentElement;
        const prevBtn = scrollContainer.querySelector('.prev');
        const nextBtn = scrollContainer.querySelector('.next');
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                content.scrollBy({ left: -300, behavior: 'smooth' });
            });
            
            nextBtn.addEventListener('click', () => {
                content.scrollBy({ left: 300, behavior: 'smooth' });
            });
        }
    });
}

// Populate Popular News
function populatePopularNews() {
    const popularNews = newsData.slice(0, 5).map(news => `
        <div class="popular-item">
            <span class="number">${news.id}</span>
            <div class="popular-content">
                <span class="category">${news.category}</span>
                <h4>${news.title}</h4>
            </div>
        </div>
    `).join('');
    
    popularList.innerHTML = popularNews;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTrendingSlider();
    initHorizontalScroll();
    populatePopularNews();
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