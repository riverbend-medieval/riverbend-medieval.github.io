/**
 * Event photo albums — Google Photos (website.riverbendmedieval@gmail.com)
 *
 * Paste share URLs (Anyone with the link) into each album's `url` field.
 * See PHOTO-ALBUMS-ADMIN.md for the upload / share workflow.
 */
window.PHOTO_ALBUMS = [
    {
        id: 'abbey2026',
        title: 'Abbey Medieval Festival 2026',
        description: 'Company of the Badger encampment at Abbey Medieval Festival.',
        cover: 'images/events/abbey2026/cover.jpg',
        url: 'https://photos.app.goo.gl/Fc2zVH2D3BFD5hkP7',
        year: 2026,
        category: 'events'
    },
    {
        id: 'fraser-pop2026',
        title: 'Fraser Pop 2026',
        description: 'Riverbend Medieval Society at Fraser Pop.',
        cover: 'images/events/fraser-pop2026/cover.jpg',
        url: 'https://photos.app.goo.gl/ieEL5jeTTznZQrS99',
        year: 2026,
        category: 'events'
    },
    {
        id: 'aldershot2026',
        title: 'Aldershot High Medieval 2026',
        description: 'Members-only High Medieval hosted weekend.',
        cover: 'images/events/aldershot2026/cover.jpg',
        url: 'https://photos.app.goo.gl/YsFqeAsf4hz5Fumm9',
        year: 2026,
        category: 'events'
    },
    {
        id: 'abbey2025',
        title: 'Abbey Medieval Festival 2025',
        description: 'Encampment, crafts, and demonstrations at Abbey 2025.',
        cover: 'images/events/abbey2025/cover.jpg',
        url: 'https://photos.app.goo.gl/9R5XY1bXhQnmX9oi7',
        year: 2025,
        category: 'events'
    },
    {
        id: 'fraser-pop2025',
        title: 'Fraser Pop 2025',
        description: 'Public demonstrations and combat displays at Fraser Pop.',
        cover: 'images/events/fraser-pop2025/cover.jpg',
        url: 'https://photos.app.goo.gl/7HkHBuzvXBctEArn6',
        year: 2025,
        category: 'events'
    },
    {
        id: 'aldershot-workshop2025',
        title: 'Aldershot Workshop 2025',
        description: 'Skills workshops and member training weekend.',
        cover: 'images/events/aldershot-workshop2025/cover.jpg',
        url: 'https://photos.app.goo.gl/Nn9EU1jBWW5sN4D88',
        year: 2025,
        category: 'events'
    },
    {
        id: 'makers-fair2025',
        title: "Gympie Rotary Heritage Maker's Fair 2025",
        description: 'Public heritage fair appearance.',
        cover: 'images/events/makers-fair2025/cover.jpg',
        url: 'https://photos.app.goo.gl/ddAG6fG1Vu7tvY5n8',
        year: 2025,
        category: 'events'
    },
    {
        id: 'yule2025',
        title: 'Aldershot Yule 2025',
        description: 'End-of-year celebration and combat.',
        cover: 'images/events/yule2025/cover.jpg',
        url: 'https://photos.app.goo.gl/HHkzuBNs51Q7YMSj7',
        year: 2025,
        category: 'events'
    }
];

window.getPhotoAlbum = function getPhotoAlbum(id) {
    return (window.PHOTO_ALBUMS || []).find(function (album) {
        return album.id === id;
    }) || null;
};

window.getPhotoAlbumUrl = function getPhotoAlbumUrl(id) {
    var album = window.getPhotoAlbum(id);
    return album && album.url ? album.url : '';
};

function albumLinkMarkup(album) {
    if (album.url) {
        return (
            '<p class="album-photos-cta">' +
            '<a class="btn btn-outline" href="' + album.url + '" target="_blank" rel="noopener noreferrer">' +
            'View photos on Google Photos →' +
            '</a></p>'
        );
    }
    return '<p class="album-photos-soon">Photo album coming soon on Google Photos.</p>';
}

window.renderAlbumLinks = function renderAlbumLinks(root) {
    var scope = root || document;
    scope.querySelectorAll('[data-album-id]').forEach(function (el) {
        // Album tiles on the gallery page are rendered separately
        if (el.id === 'photo-albums-grid' || el.closest('#photo-albums-grid')) {
            return;
        }
        var album = window.getPhotoAlbum(el.getAttribute('data-album-id'));
        if (!album) {
            return;
        }
        var titleEl = el.querySelector('h4');
        var titleHtml = titleEl ? titleEl.outerHTML : '';
        el.innerHTML = titleHtml + albumLinkMarkup(album);
    });
};

window.renderPhotoGalleryAlbums = function renderPhotoGalleryAlbums(container) {
    if (!container) return;
    var albums = (window.PHOTO_ALBUMS || []).slice().sort(function (a, b) {
        return b.year - a.year || a.title.localeCompare(b.title);
    });

    container.innerHTML = albums.map(function (album) {
        var openLabel = album.url ? 'Open album →' : 'Album coming soon';
        var hrefAttr = album.url
            ? 'href="' + album.url + '" target="_blank" rel="noopener noreferrer"'
            : 'href="#" aria-disabled="true" tabindex="-1"';
        var disabledClass = album.url ? '' : ' album-card--soon';
        return (
            '<article class="gallery-item album-card' + disabledClass + '" data-category="events">' +
            '<a class="album-card__link" ' + hrefAttr + '>' +
            '<div class="gallery-image">' +
            '<img src="' + album.cover + '" alt="' + album.title + '" loading="lazy">' +
            '<div class="gallery-overlay">' +
            '<div class="gallery-info">' +
            '<h3>' + album.title + '</h3>' +
            '<p>' + (album.description || '') + '</p>' +
            '<span class="album-card__cta">' + openLabel + '</span>' +
            '</div></div></div></a></article>'
        );
    }).join('');
};

document.addEventListener('DOMContentLoaded', function () {
    window.renderAlbumLinks(document);
    var galleryRoot = document.getElementById('photo-albums-grid');
    if (galleryRoot) {
        window.renderPhotoGalleryAlbums(galleryRoot);
    }
});
