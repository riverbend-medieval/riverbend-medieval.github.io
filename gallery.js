// Riverbend Medieval Society Photo Gallery
class MedievalGallery {
    constructor() {
        this.currentImageIndex = 0;
        this.images = [];
        this.filteredImages = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadImages();
    }

    setupEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleFilter(e.target.closest('.filter-btn').dataset.filter);
            });
        });

        // Gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openLightbox(index);
            });
        });

        // Lightbox controls
        const lightbox = document.getElementById('lightbox');
        const closeBtn = document.querySelector('.close-lightbox');
        const prevBtn = document.querySelector('.lightbox-nav.prev');
        const nextBtn = document.querySelector('.lightbox-nav.next');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeLightbox());
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousImage());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextImage());
        }

        // Close lightbox on background click
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    this.closeLightbox();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('lightbox').style.display === 'block') {
                switch(e.key) {
                    case 'Escape':
                        this.closeLightbox();
                        break;
                    case 'ArrowLeft':
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });
    }

    loadImages() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        this.images = Array.from(galleryItems);
        this.filteredImages = [...this.images];
    }

    handleFilter(filter) {
        // Update active filter button
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        event.target.closest('.filter-btn').classList.add('active');

        // Filter images
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-in';
            } else {
                item.style.display = 'none';
            }
        });

        // Update filtered images array
        this.filteredImages = Array.from(galleryItems).filter(item => 
            filter === 'all' || item.dataset.category === filter
        );
    }

    openLightbox(index) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');

        this.currentImageIndex = index;
        const currentImage = this.filteredImages[index];
        const img = currentImage.querySelector('img');
        const info = currentImage.querySelector('.gallery-info');

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        
        if (info) {
            const title = info.querySelector('h3').textContent;
            const description = info.querySelector('p').textContent;
            lightboxCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
        }

        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Add fade-in animation
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.style.opacity = '0';
        
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    previousImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.filteredImages.length) % this.filteredImages.length;
        this.updateLightboxImage();
    }

    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.filteredImages.length;
        this.updateLightboxImage();
    }

    updateLightboxImage() {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        
        const currentImage = this.filteredImages[this.currentImageIndex];
        const img = currentImage.querySelector('img');
        const info = currentImage.querySelector('.gallery-info');

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        
        if (info) {
            const title = info.querySelector('h3').textContent;
            const description = info.querySelector('p').textContent;
            lightboxCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
        }
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MedievalGallery();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
    
    .gallery-item {
        animation: fadeIn 0.5s ease-in;
    }
`;
document.head.appendChild(style);
