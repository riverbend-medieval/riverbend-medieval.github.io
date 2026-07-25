// Riverbend Medieval Society - Standalone Navigation Component
// Consistent, simplified primary navigation across all pages

function getSiteRootPrefix() {
    // Prefer deriving the site root from navigation.js location so this works
    // for root pages, /personas/, /archive/personas/, and file:// previews.
    const scripts = document.getElementsByTagName('script');
    let scriptSrc = '';
    for (let i = scripts.length - 1; i >= 0; i--) {
        const src = scripts[i].src || '';
        if (src.includes('navigation.js')) {
            scriptSrc = src;
            break;
        }
    }

    if (scriptSrc) {
        const scriptUrl = new URL(scriptSrc, window.location.href);
        const pageUrl = new URL(window.location.href);

        let pageDir = pageUrl.pathname;
        if (!pageDir.endsWith('/')) {
            pageDir = pageDir.substring(0, pageDir.lastIndexOf('/') + 1);
        }

        let rootDir = scriptUrl.pathname;
        rootDir = rootDir.substring(0, rootDir.lastIndexOf('/') + 1);

        const pageParts = pageDir.split('/').filter(Boolean);
        const rootParts = rootDir.split('/').filter(Boolean);

        let shared = 0;
        while (
            shared < pageParts.length &&
            shared < rootParts.length &&
            pageParts[shared] === rootParts[shared]
        ) {
            shared += 1;
        }

        const upCount = pageParts.length - shared;
        const downParts = rootParts.slice(shared);
        return `${'../'.repeat(upCount)}${downParts.length ? `${downParts.join('/')}/` : ''}`;
    }

    const path = window.location.pathname;
    const dir = path.endsWith('/') ? path : path.substring(0, path.lastIndexOf('/') + 1);
    const depth = dir.split('/').filter(Boolean).length;
    return depth === 0 ? '' : `${'../'.repeat(depth)}`;
}

function createNavigation() {
    const base = getSiteRootPrefix();
    // Primary destinations first (Events, Activities, Personas, Join).
    // Secondary destinations live under one Explore menu for a shorter path.
    return `
        <a class="skip-link" href="#main-content">Skip to content</a>
        <header>
            <nav class="site-nav" aria-label="Primary">
                <a class="logo" href="${base}index.html">
                    <img src="${base}images/riverbend.jpg" alt="Riverbend Medieval Society">
                </a>
                <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu">
                    <span class="material-icons" aria-hidden="true">menu</span>
                </button>
                <ul id="primary-nav" class="nav-links">
                    <li><a href="${base}index.html">Home</a></li>
                    <li><a href="${base}events.html">Events</a></li>
                    <li><a href="${base}activities.html">Activities</a></li>
                    <li><a href="${base}personas.html">Personas</a></li>
                    <li><a class="nav-cta" href="${base}getting-started.html">Join</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" aria-haspopup="true" aria-expanded="false">Explore <span class="material-icons" aria-hidden="true">expand_more</span></a>
                        <ul class="dropdown-menu" role="menu">
                            <li role="none"><a role="menuitem" href="${base}getting-started.html">Getting Started</a></li>
                            <li role="none"><a role="menuitem" href="${base}early-medieval.html">Early Medieval</a></li>
                            <li role="none"><a role="menuitem" href="${base}high-medieval.html">High Medieval</a></li>
                            <li role="none"><a role="menuitem" href="${base}late-medieval.html">Late Medieval</a></li>
                            <li role="none"><a role="menuitem" href="${base}photo-gallery.html">Gallery</a></li>
                            <li role="none"><a role="menuitem" href="${base}equipment-guides.html">Equipment</a></li>
                            <li role="none"><a role="menuitem" href="${base}queensland-medieval-groups.html">Groups</a></li>
                            <li role="none"><a role="menuitem" href="${base}version-log.html">Version Log</a></li>
                        </ul>
                    </li>
                </ul>
                <form class="search-container" role="search" aria-label="Site" action="${base}index.html" method="get" onsubmit="return false;">
                    <label class="visually-hidden" for="search-input">Search the site</label>
                    <input type="search" placeholder="Search" id="search-input" name="q" autocomplete="off">
                    <button type="submit" id="search-button">Search</button>
                </form>
            </nav>
        </header>
    `;
}

function insertNavigation() {
    const existingHeader = document.querySelector('header');
    const existingSkip = document.querySelector('.skip-link');
    if (existingSkip) {
        existingSkip.remove();
    }

    if (existingHeader) {
        existingHeader.outerHTML = createNavigation();
    } else {
        document.body.insertAdjacentHTML('afterbegin', createNavigation());
    }

    // Ensure a stable main landmark target for skip link / AI parsers
    const main = document.querySelector('main');
    if (main && !main.id) {
        main.id = 'main-content';
    }
    if (main && !main.getAttribute('role')) {
        main.setAttribute('role', 'main');
    }
}

function setupMobileNavigation() {
    const nav = document.querySelector('.site-nav') || document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    const toggleButton = document.querySelector('.menu-toggle');

    if (!nav || !navLinks || !toggleButton) {
        return;
    }

    const closeMenu = () => {
        navLinks.classList.remove('is-open');
        nav.classList.remove('mobile-nav-open');
        toggleButton.setAttribute('aria-expanded', 'false');
        toggleButton.setAttribute('aria-label', 'Open menu');
        const icon = toggleButton.querySelector('.material-icons');
        if (icon) icon.textContent = 'menu';
        document.querySelectorAll('.dropdown.open').forEach((item) => {
            item.classList.remove('open');
            const toggle = item.querySelector('.dropdown-toggle');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
    };

    const openMenu = () => {
        navLinks.classList.add('is-open');
        nav.classList.add('mobile-nav-open');
        toggleButton.setAttribute('aria-expanded', 'true');
        toggleButton.setAttribute('aria-label', 'Close menu');
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
            const willOpen = !dropdown.classList.contains('open');
            document.querySelectorAll('.dropdown.open').forEach((item) => {
                if (item !== dropdown) {
                    item.classList.remove('open');
                    const otherToggle = item.querySelector('.dropdown-toggle');
                    if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
                }
            });
            dropdown.classList.toggle('open', willOpen);
            toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
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
        }
    });
}

function insertMobileJoinBar() {
    if (document.querySelector('.mobile-join-bar')) {
        return;
    }
    const base = getSiteRootPrefix();
    const path = window.location.pathname;
    if (path.includes('getting-started')) {
        return;
    }
    const bar = document.createElement('div');
    bar.className = 'mobile-join-bar';
    bar.innerHTML = `
        <a class="mobile-join-bar__btn" href="${base}getting-started.html">Join Riverbend</a>
        <a class="mobile-join-bar__link" href="${base}events.html">Events</a>
    `;
    document.body.appendChild(bar);
    document.body.classList.add('has-mobile-join-bar');
}

function bootstrapNavigation() {
    if (bootstrapNavigation.done) {
        return;
    }
    bootstrapNavigation.done = true;

    insertNavigation();
    setupMobileNavigation();
    insertMobileJoinBar();

    ensureSearchInitialized();
}

function ensureSearchInitialized() {
    if (window.__rmsSearchInstance) {
        return;
    }

    function startSearch() {
        if (typeof MedievalSearch === 'undefined') {
            return;
        }
        if (!document.getElementById('search-input')) {
            return;
        }
        window.__rmsSearchInstance = new MedievalSearch();
    }

    if (typeof MedievalSearch !== 'undefined') {
        startSearch();
        return;
    }

    // Some pages historically omitted search.js; load it before init.
    const script = document.createElement('script');
    script.src = `${getSiteRootPrefix()}search.js`;
    script.onload = startSearch;
    document.head.appendChild(script);
}

document.addEventListener('DOMContentLoaded', bootstrapNavigation);

if (document.readyState !== 'loading') {
    bootstrapNavigation();
}
