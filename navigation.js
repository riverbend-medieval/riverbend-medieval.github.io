// Riverbend Medieval Society - Standalone Navigation Component
// This script ensures consistent navigation across all pages

function createNavigation() {
    const navigationHTML = `
        <header>
            <nav>
                <div class="logo">
                    <img src="images/riverbend.jpg" alt="Riverbend Medieval Society Logo">
                </div>
                <button class="menu-toggle" type="button" aria-expanded="false" aria-label="Toggle navigation menu">
                    <span class="material-icons">menu</span>
                </button>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="personas.html">Personas</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle">Periods <span class="material-icons">expand_more</span></a>
                        <ul class="dropdown-menu">
                            <li><a href="early-medieval.html">Early Medieval</a></li>
                            <li><a href="high-medieval.html">High Medieval</a></li>
                            <li><a href="late-medieval.html">Late Medieval</a></li>
                        </ul>
                    </li>
                    <li><a href="events.html">Events</a></li>
                    <li><a href="activities.html">Activities</a></li>
                    <li><a href="photo-gallery.html">Gallery</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle">More <span class="material-icons">expand_more</span></a>
                        <ul class="dropdown-menu">
                            <li><a href="getting-started.html">Getting Started</a></li>
                            <li><a href="equipment-guides.html">Equipment</a></li>
                            <li><a href="queensland-medieval-groups.html">Groups</a></li>
                            <li><a href="version-log.html">Version Log</a></li>
                        </ul>
                    </li>
                    <li><a href="index.html#join">Join</a></li>
                </ul>
                                       <div class="search-container">
                           <input type="search" placeholder="Search site" id="search-input">
                           <button type="submit" id="search-button">Search</button>
                       </div>
            </nav>
        </header>
    `;
    
    return navigationHTML;
}

function insertNavigation() {
    // Check if navigation already exists
    const existingHeader = document.querySelector('header');
    if (existingHeader) {
        // Replace existing header with consistent navigation
        existingHeader.outerHTML = createNavigation();
    } else {
        // Insert navigation at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', createNavigation());
    }
}

function setupMobileNavigation() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    const toggleButton = document.querySelector('.menu-toggle');

    if (!nav || !navLinks || !toggleButton) {
        return;
    }

    const closeMenu = () => {
        navLinks.classList.remove('is-open');
        nav.classList.remove('mobile-nav-open');
        toggleButton.setAttribute('aria-expanded', 'false');
        const icon = toggleButton.querySelector('.material-icons');
        if (icon) icon.textContent = 'menu';
    };

    const openMenu = () => {
        navLinks.classList.add('is-open');
        nav.classList.add('mobile-nav-open');
        toggleButton.setAttribute('aria-expanded', 'true');
        const icon = toggleButton.querySelector('.material-icons');
        if (icon) icon.textContent = 'close';
    };

    toggleButton.addEventListener('click', () => {
        if (navLinks.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    document.querySelectorAll('.dropdown-toggle').forEach((toggle) => {
        toggle.addEventListener('click', (event) => {
            if (window.innerWidth > 900) {
                return;
            }
            event.preventDefault();
            const dropdown = toggle.closest('.dropdown');
            if (!dropdown) {
                return;
            }
            dropdown.classList.toggle('open');
        });
    });

    navLinks.querySelectorAll('a:not(.dropdown-toggle)').forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                closeMenu();
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            closeMenu();
            document.querySelectorAll('.dropdown.open').forEach((item) => item.classList.remove('open'));
        }
    });
}

// Insert navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    insertNavigation();
    setupMobileNavigation();
    
    // Re-initialize search functionality if it exists
    if (typeof MedievalSearch !== 'undefined') {
        new MedievalSearch();
    }
});

// Also insert navigation immediately if DOM is already loaded
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
} else {
    // DOM is already loaded, insert navigation immediately
    insertNavigation();
    setupMobileNavigation();
}
