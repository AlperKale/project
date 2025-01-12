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
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
        category: 'Yapay Zeka',
        date: '2024-03-15'
    },
    {
        id: 2,
        title: 'Apple Vision Pro İnceleme',
        description: 'Apple\'ın yeni karma gerçeklik gözlüğünü detaylı olarak inceledik.',
        image: 'https://images.unsplash.com/photo-1707227155746-407e1f03abe6',
        category: 'İnceleme',
        date: '2024-03-14'
    },
    {
        id: 3,
        title: 'Elektrikli Araçlar İçin Yeni Batarya Teknolojisi',
        description: '5 dakikada şarj olan yeni nesil bataryalar yolda.',
        image: 'https://images.unsplash.com/photo-1706001151051-55e44f5be6f7',
        category: 'Teknoloji',
        date: '2024-03-13'
    },
    {
        id: 4,
        title: 'Samsung Galaxy S24 Ultra İnceleme',
        description: 'Samsung\'un yeni amiral gemisi yapay zeka özellikleriyle öne çıkıyor.',
        image: 'https://images.unsplash.com/photo-1706594060680-ea68a084c98c',
        category: 'İnceleme',
        date: '2024-03-12'
    },
    {
        id: 5,
        title: 'Nvidia\'nın Yeni Süper GPU\'su',
        description: 'RTX 5090, oyun ve yapay zeka performansında çığır açıyor.',
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7',
        category: 'Donanım',
        date: '2024-03-11'
    }
];

// Video Content Data
const videoData = [
    {
        id: 1,
        title: 'Apple Vision Pro Detaylı İnceleme',
        thumbnail: 'https://images.unsplash.com/photo-1707227155746-407e1f03abe6',
        duration: '12:45',
        views: '125K',
        category: 'İnceleme'
    },
    {
        id: 2,
        title: 'RTX 5090 Oyun Performansı Testi',
        thumbnail: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7',
        duration: '15:20',
        views: '89K',
        category: 'Donanım'
    },
    {
        id: 3,
        title: 'Elektrikli Araç Teknolojileri',
        thumbnail: 'https://images.unsplash.com/photo-1706001151051-55e44f5be6f7',
        duration: '08:30',
        views: '45K',
        category: 'Teknoloji'
    }
];

// Review Content Data
const reviewData = [
    {
        id: 1,
        title: 'iPhone 15 Pro Max',
        score: 9.2,
        pros: ['Kamera performansı', 'İşlemci gücü', 'Batarya ömrü'],
        cons: ['Yüksek fiyat', 'Şarj hızı'],
        image: 'https://images.unsplash.com/photo-1706594060680-ea68a084c98c'
    },
    {
        id: 2,
        title: 'Samsung Galaxy S24 Ultra',
        score: 9.0,
        pros: ['S-Pen özellikleri', 'Ekran kalitesi', 'AI özellikleri'],
        cons: ['Fiyat/performans', 'Şarj adaptörü yok'],
        image: 'https://images.unsplash.com/photo-1706594060680-ea68a084c98c'
    },
    {
        id: 3,
        title: 'MacBook Pro M3',
        score: 9.5,
        pros: ['Performans', 'Batarya ömrü', 'Ekran kalitesi'],
        cons: ['Yüksek fiyat', 'Port çeşitliliği'],
        image: 'https://images.unsplash.com/photo-1706001151051-55e44f5be6f7'
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

// Create Video Card
function createVideoCard(video) {
    return `
        <article class="video-card fade-in">
            <div class="video-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
                <span class="duration">${video.duration}</span>
                <button class="play-btn"><i class="fas fa-play"></i></button>
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <div class="video-meta">
                    <span class="views"><i class="fas fa-eye"></i> ${video.views}</span>
                    <span class="category">${video.category}</span>
                </div>
            </div>
        </article>
    `;
}

// Create Review Card
function createReviewCard(review) {
    return `
        <article class="review-card fade-in">
            <div class="review-image">
                <img src="${review.image}" alt="${review.title}" loading="lazy">
                <div class="review-score">${review.score}</div>
            </div>
            <div class="review-content">
                <h3>${review.title}</h3>
                <div class="review-details">
                    <div class="pros">
                        <h4>Artılar</h4>
                        <ul>
                            ${review.pros.map(pro => `<li>${pro}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="cons">
                        <h4>Eksiler</h4>
                        <ul>
                            ${review.cons.map(con => `<li>${con}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </article>
    `;
}

// Populate Video Grid
function populateVideoGrid() {
    const videoGrid = document.querySelector('.video-grid');
    if (videoGrid) {
        videoGrid.innerHTML = videoData.map(video => createVideoCard(video)).join('');
    }
}

// Populate Review Section
function populateReviews() {
    const scrollContent = document.querySelector('.reviews .scroll-content');
    if (scrollContent) {
        scrollContent.innerHTML = reviewData.map(review => createReviewCard(review)).join('');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTrendingSlider();
    initHorizontalScroll();
    populatePopularNews();
    populateVideoGrid();
    populateReviews();
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