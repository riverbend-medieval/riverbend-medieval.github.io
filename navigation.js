// Riverbend Medieval Society - Standalone Navigation Component
// This script ensures consistent navigation across all pages

function createNavigation() {
    const navigationHTML = `
        <header>
            <nav>
                <div class="logo">
                    <img src="images/riverbend.jpg" alt="Riverbend Medieval Society Logo">
                </div>
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
                    <li><a href="photo-gallery.html">Gallery</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle">More <span class="material-icons">expand_more</span></a>
                        <ul class="dropdown-menu">
                            <li><a href="getting-started.html">Getting Started</a></li>
                            <li><a href="equipment-guides.html">Equipment</a></li>
                            <li><a href="queensland-medieval-groups.html">Groups</a></li>
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

// Insert navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    insertNavigation();
    
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
}
