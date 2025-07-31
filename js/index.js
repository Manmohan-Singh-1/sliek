
// <!-- === Bootstrap JS === -->
src = "https://code.jquery.com/jquery-3.5.1.slim.min.js"
src = "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
integrity = "sha384-zDa+6Xb6Q6k6Q6k6Q6k6Q6k6Q6k6Q6k6Q6k6Q6k6Q6k6Q6k6Q6k6Q6k6Q6k6Q6k6Q"
crossorigin = "anonymous"
src = "https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/js/bootstrap.bundle.min.js"

// <!-- === JS for Mega Menu Toggle on Mobile === -->

document.querySelectorAll('.header_item').forEach(item => {
    item.addEventListener('click', function (e) {
        if (window.innerWidth <= 992) {
            e.preventDefault();
            this.classList.toggle('active');
        }
    });
});
const searchBtn = document.getElementById('searchBtn');
const searchBar = document.getElementById('searchBar');
const rightIcons = document.getElementById('right-icons');

searchBtn.addEventListener('click', function () {
    if (window.innerWidth > 768) {
        // Desktop only: toggle input
        searchBar.classList.toggle('active');
        if (searchBar.classList.contains('active')) {
            searchBar.focus();
        } else {
            searchBar.value = '';
        }
    }
    // Mobile: do nothing — or open modal if you want
});
document.addEventListener('click', function (e) {
    if (!searchBtn.contains(e.target) && !searchBar.contains(e.target)) {
        searchActive = false;
        searchBar.classList.remove('active');
        rightIcons.classList.remove('mobile-search-active');
        searchBar.value = '';
    }
});

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
let mobileMenuActive = false;

mobileMenuBtn.addEventListener('click', function () {
    mobileMenuActive = !mobileMenuActive;
    if (mobileMenuActive) {
        mobileMenu.classList.add('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-times text-lg"></i>';
    } else {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-lg"></i>';
    }
});

const mobileNavLinks = mobileMenu.querySelectorAll('a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', function () {
        mobileMenuActive = false;
        mobileMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-lg"></i>';
    });
});

// ==FOR Header section==
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.nav-dot');
const totalSlides = slides.length;
let autoSlideInterval;

// Initialize slider
function initSlider() {
    showSlide(0);
    startAutoSlide();
}

// Show specific slide
function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');

    currentSlideIndex = index;
}

// Go to next slide
function nextSlide() {
    const nextIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(nextIndex);
}

// Go to previous slide
function prevSlide() {
    const prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    showSlide(prevIndex);
}

// Change slide by direction
function changeSlide(direction) {
    stopAutoSlide();
    if (direction === 1) {
        nextSlide();
    } else {
        prevSlide();
    }
    startAutoSlide();
}

// Go to specific slide
function currentSlide(index) {
    stopAutoSlide();
    showSlide(index - 1);
    startAutoSlide();
}

// Start auto slide
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000); // 5 seconds
}

// Stop auto slide
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Pause auto slide on hover
const heroSection = document.querySelector('.hero-section');
heroSection.addEventListener('mouseenter', stopAutoSlide);
heroSection.addEventListener('mouseleave', startAutoSlide);

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

heroSection.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
});

heroSection.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            changeSlide(1);
        } else {
            // Swipe right - previous slide
            changeSlide(-1);
        }
    }
}

// Keyboard navigation
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initSlider);

// Handle visibility change (pause when tab is not active)
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        stopAutoSlide();
    } else {
        startAutoSlide();
    }
});
// for product section----------
const container = document.getElementById('productContainer');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');

scrollLeftBtn.addEventListener('click', () => {
    container.scrollBy({
        left: -300,
        behavior: 'smooth'
    });
});

scrollRightBtn.addEventListener('click', () => {
    container.scrollBy({
        left: 300,
        behavior: 'smooth'
    });
});

// Auto-hide navigation buttons based on scroll position
function updateNavButtons() {
    const isAtStart = container.scrollLeft <= 0;
    const isAtEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth;

    scrollLeftBtn.style.opacity = isAtStart ? '0.5' : '1';
    scrollRightBtn.style.opacity = isAtEnd ? '0.5' : '1';
}

container.addEventListener('scroll', updateNavButtons);
updateNavButtons(); // Initial check

//for add to cart button
let cart = {};
let cartCount = 0;
let cartTotal = 0;

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    initializeCart();
});



//for ingredient section-------------------
// Scroll progress

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in').forEach(el => {
    if (el instanceof Element) {
        observer.observe(el);
    }
});

// Animate stat counters
function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(start);
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-number').forEach(counter => {
                animateCounter(counter, parseInt(counter.getAttribute('data-target')));
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Floating parallax
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.floating-leaf').forEach((el, i) => {
        const speed = 0.5 + i * 0.1;
        el.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Fade-in on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// for image or product gallery section----------------------

document.addEventListener('DOMContentLoaded', function () {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const galleryContainer = document.getElementById('gallery-container');
    let loadCount = 0;

    // Additional gallery items to load
    const additionalItems = [
        {
            title: 'Outdoor Gear',
            gradient: 'from-blue-500 to-indigo-600',
            height: 'h-48',
            image: 'images/charcoal.jpg'
        },
        {
            title: 'Tech Gadgets',
            gradient: 'from-blue-500 to-indigo-600',
            height: 'h-64',
            image: 'images/coffee.jpg'
        },
        {
            title: 'Art Supplies',
            gradient: 'from-orange-400 to-red-500',
            height: 'h-56',
            image: 'images/soap.jpg'
        },
        {
            title: 'Pet Accessories',
            gradient: 'from-pink-400 to-purple-500',
            height: 'h-40',
            image: 'images/label.jpg'
        },
        {
            title: 'Travel Essentials',
            gradient: 'from-pink-400 to-purple-500',
            height: 'h-72',
            image: 'images/beehive_bliss.jpg'
        },
        {
            title: 'Book Collection',
            gradient: 'from-amber-400 to-orange-500',
            height: 'h-44',
            image: 'images/coffee.jpg'
        },
        {
            title: 'Music Instruments',
            gradient: 'from-violet-400 to-purple-600',
            height: 'h-60',
            image: 'images/orange.jpg'
        },
        {
            title: 'Garden Tools',
            gradient: 'from-lime-400 to-green-500',
            height: 'h-52',
            image: 'images/label.jpg'
        }
    ];


    // Stat observer safer
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Make sure new fade-ins are observed:
    loadMoreBtn.addEventListener('click', function () {
        const itemsToLoad = additionalItems.slice(loadCount * 4, (loadCount + 1) * 4);

        if (itemsToLoad.length === 0) {
            loadMoreBtn.textContent = 'Stay tuned for more!';
            loadMoreBtn.disabled = true;
            loadMoreBtn.classList.add('opacity-50', 'cursor-not-allowed');
            return;
        }

        itemsToLoad.forEach((item, index) => {
            setTimeout(() => {
                const itemHTML = `
        <div class="masonry-item fade-in">
          <div class="gallery-item bg-white rounded-lg overflow-hidden shadow-md">
            <div class="relative overflow-hidden w-full ${item.height} bg-gradient-to-br ${item.gradient}">
              <img src="${item.image}" alt="${item.title}" class="absolute top-0 left-0 w-full h-full object-cover" />
            </div>
          </div>
        </div>
      `;
                galleryContainer.insertAdjacentHTML('beforeend', itemHTML);

                // Observe new fade-in
                const newItem = galleryContainer.lastElementChild;
                if (newItem) observer.observe(newItem);
            }, index * 150);
        });

        loadCount++;

        if (loadCount * 4 >= additionalItems.length) {
            setTimeout(() => {
                loadMoreBtn.textContent = 'Stay tuned for more!';
                loadMoreBtn.disabled = true;
                loadMoreBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }, itemsToLoad.length * 150);
        }
    });
    // Add click handlers for gallery items
    document.addEventListener('click', function (e) {
        if (e.target.closest('.gallery-item')) {
            const item = e.target.closest('.gallery-item');
            // Fix: gallery items do not have a span with title, get alt attribute of img instead
            const img = item.querySelector('img');
            const title = img ? img.alt || 'Unknown Product' : 'Unknown Product';

            // Simple modal-like alert for demo purposes
            alert(`You clicked on: ${title}\n\nIn a real application, this would open a detailed product view.`);
        }
    });
});
// for reviews section---------------------------------------------
// Sample reviews data with more variety
const sampleReviews = [
    {
        name: "Sarah Johnson",
        rating: 5,
        text: "Absolutely amazing product! The quality exceeded my expectations and the customer service was outstanding. I've already recommended it to all my friends!",
        date: new Date('2024-01-15T10:30:00'),
        images: []
    },
    {
        name: "Mike Chen",
        rating: 5,
        text: "Best purchase I've made this year! Fast shipping, great packaging, and the product works perfectly. Will definitely buy again!",
        date: new Date('2024-01-14T15:45:00'),
        images: []
    },
    {
        name: "Emily Rodriguez",
        rating: 4,
        text: "Really good quality and exactly as described. The only minor issue was the delivery took a day longer than expected, but overall very satisfied!",
        date: new Date('2024-01-13T09:20:00'),
        images: []
    },
    {
        name: "David Wilson",
        rating: 5,
        text: "Fantastic product! Exactly what I was looking for. The build quality is excellent and it arrived quickly.",
        date: new Date('2024-01-12T14:15:00'),
        images: []
    },
    {
        name: "Lisa Thompson",
        rating: 4,
        text: "Very happy with this purchase. Good value for money and works as advertised. Would recommend to others.",
        date: new Date('2024-01-11T11:30:00'),
        images: []
    },
    {
        name: "James Miller",
        rating: 5,
        text: "Outstanding quality and service! This exceeded all my expectations. The attention to detail is remarkable.",
        date: new Date('2024-01-10T16:45:00'),
        images: []
    },
    {
        name: "Anna Garcia",
        rating: 4,
        text: "Great product overall. Easy to use and well-made. The packaging was also very professional.",
        date: new Date('2024-01-09T13:20:00'),
        images: []
    },
    {
        name: "Robert Brown",
        rating: 5,
        text: "Perfect! This is exactly what I needed. Great quality, fast delivery, and excellent customer support.",
        date: new Date('2024-01-08T10:10:00'),
        images: []
    },
    {
        name: "Maria Lopez",
        rating: 4,
        text: "Very satisfied with this purchase. Good quality product and reasonable price. Will buy again.",
        date: new Date('2024-01-07T15:30:00'),
        images: []
    },
    {
        name: "Kevin Davis",
        rating: 5,
        text: "Exceptional product! The quality is top-notch and it works perfectly. Highly recommended!",
        date: new Date('2024-01-06T12:45:00'),
        images: []
    }
];

let allReviews = [...sampleReviews];
let displayedReviews = 0;
const reviewsPerLoad = 2; // Show only 2 reviews at a time
let selectedRating = 0;
let selectedImages = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    loadMoreReviews();
    setupEventListeners();
});

function setupEventListeners() {
    // Star rating functionality
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', function () {
            selectedRating = parseInt(this.dataset.rating);
            updateStarDisplay();
        });

        star.addEventListener('mouseover', function () {
            const rating = parseInt(this.dataset.rating);
            highlightStars(rating);
        });
    });

    document.getElementById('starRating').addEventListener('mouseleave', function () {
        updateStarDisplay();
    });

    // Image upload functionality
    document.getElementById('reviewImages').addEventListener('change', function (e) {
        handleImageUpload(e.target.files);
    });

    // Form submission
    document.getElementById('reviewForm').addEventListener('submit', function (e) {
        e.preventDefault();
        submitReview();
    });

    // Load more button
    document.getElementById('loadMoreBt').addEventListener('click', loadMoreReviews);
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function updateStarDisplay() {
    highlightStars(selectedRating);
}

function handleImageUpload(files) {
    const preview = document.getElementById('imagePreview');
    preview.innerHTML = '';
    selectedImages = [];

    Array.from(files).slice(0, 3).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'image-preview border-2 border-gray-200';
                preview.appendChild(img);
                selectedImages.push(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
}

function submitReview() {
    const name = document.getElementById('customerName').value;
    const text = document.getElementById('reviewText').value;

    if (!name || !text || selectedRating === 0) {
        alert('Please fill in all required fields and select a rating!');
        return;
    }

    const newReview = {
        name: name,
        rating: selectedRating,
        text: text,
        date: new Date(),
        images: [...selectedImages]
    };

    // Add to beginning of reviews array
    allReviews.unshift(newReview);

    // Reset form
    document.getElementById('reviewForm').reset();
    selectedRating = 0;
    selectedImages = [];
    updateStarDisplay();
    document.getElementById('imagePreview').innerHTML = '';

    // Refresh display
    displayedReviews = 0;
    document.getElementById('reviewsContainer').innerHTML = '';
    loadMoreReviews();

    // Show success message
    showSuccessMessage();
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    message.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Review submitted successfully!';
    document.body.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 3000);
}

function loadMoreReviews() {
    const container = document.getElementById('reviewsContainer');
    const reviewsToShow = allReviews.slice(displayedReviews, displayedReviews + reviewsPerLoad);

    reviewsToShow.forEach(review => {
        const reviewElement = createReviewElement(review);
        container.appendChild(reviewElement);
    });

    displayedReviews += reviewsToShow.length;

    // Hide load more button if all reviews are displayed
    const loadMoreBt = document.getElementById('loadMoreBt');
    if (displayedReviews >= allReviews.length) {
        loadMoreBt.style.display = 'none';
    } else {
        loadMoreBt.style.display = 'block';
    }
}

function createReviewElement(review) {
    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'review-card bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100';

    const starsHtml = Array.from({ length: 5 }, (_, i) =>
        `<i class="fas fa-star ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}"></i>`
    ).join('');

    const imagesHtml = review.images.length > 0 ?
        `<div class="flex space-x-2 mt-4">
                    ${review.images.map(img => `<img src="${img}" class="image-preview border border-gray-200">`).join('')}
                </div>` : '';

    const timeAgo = getTimeAgo(review.date);

    reviewDiv.innerHTML = `
                <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        ${review.name.charAt(0).toUpperCase()}
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between mb-2">
                            <div>
                                <h4 class="font-semibold text-gray-800">${review.name}</h4>
                                <div class="flex items-center space-x-2">
                                    <div class="flex space-x-1">${starsHtml}</div>
                                    <span class="text-sm text-gray-500">${review.rating}/5</span>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-sm text-gray-500">${timeAgo}</div>
                                <div class="text-xs text-gray-400">${review.date.toLocaleDateString()}</div>
                            </div>
                        </div>
                        <p class="text-gray-700 leading-relaxed">${review.text}</p>
                        ${imagesHtml}
                        <div class="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                            <button class="hover:text-blue-500 transition-colors">
                                <i class="fas fa-thumbs-up mr-1"></i>Helpful
                            </button>
                            <button class="hover:text-blue-500 transition-colors">
                                <i class="fas fa-reply mr-1"></i>Reply
                            </button>
                        </div>
                    </div>
                </div>
            `;

    return reviewDiv;
}

function getTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
}
(function () { function c() { var b = a.contentDocument || a.contentWindow.document; if (b) { var d = b.createElement('script'); d.innerHTML = "window.__CF$cv$params={r:'95e07fc996697e53',t:'MTc1MjMyMjg3NC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);"; b.getElementsByTagName('head')[0].appendChild(d) } } if (document.body) { var a = document.createElement('iframe'); a.height = 1; a.width = 1; a.style.position = 'absolute'; a.style.top = 0; a.style.left = 0; a.style.border = 'none'; a.style.visibility = 'hidden'; document.body.appendChild(a); if ('loading' !== document.readyState) c(); else if (window.addEventListener) document.addEventListener('DOMContentLoaded', c); else { var e = document.onreadystatechange || function () { }; document.onreadystatechange = function (b) { e(b); 'loading' !== document.readyState && (document.onreadystatechange = e, c()) } } } })();

