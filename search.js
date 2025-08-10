// Riverbend Medieval Society Search Functionality
class MedievalSearch {
    constructor() {
        this.searchData = [];
        this.searchInput = document.getElementById('search-input');
        this.searchButton = document.getElementById('search-button');
        this.searchResults = null;
        this.init();
    }

    init() {
        this.loadSearchData();
        this.setupEventListeners();
        this.createResultsContainer();
    }

    loadSearchData() {
        // Comprehensive search data for medieval content
        this.searchData = [
            // Personas
            { type: 'persona', title: 'Roger Grenewood', url: 'personas/roger-greenwood.html', keywords: 'archer, yeoman, ventenar, agincourt, longbow', period: 'Late Medieval' },
            { type: 'persona', title: 'Lady Cristine Grenewood', url: 'personas/lady-cristine.html', keywords: 'noblewoman, wife, medieval lady', period: 'Late Medieval' },
            { type: 'persona', title: 'Sir Godwin Black', url: 'personas/godwin.html', keywords: 'knight, bachelor, agincourt, chivalry', period: 'Late Medieval' },
            { type: 'persona', title: 'Lady Edith Black', url: 'personas/edith.html', keywords: 'lady, household, medieval woman', period: 'Late Medieval' },
            { type: 'persona', title: 'Stephanus Attebregge', url: 'personas/stephanus.html', keywords: 'man-at-arms, veteran, ale brewer', period: 'Late Medieval' },
            { type: 'persona', title: 'Robert Fastolf', url: 'personas/robert-fastolf.html', keywords: 'man-at-arms, sea-rover, soldier', period: 'Late Medieval' },
            { type: 'persona', title: 'Jóhanna "Jóka" Olafsdottir', url: 'personas/joka.html', keywords: 'princess, norway, exile, danelaw', period: 'Early Medieval' },
            { type: 'persona', title: 'Merchant Lady Sue', url: 'personas/merchant-lady-sue.html', keywords: 'merchant, businesswoman, trade', period: 'High Medieval' },
            { type: 'persona', title: 'Brother Ruadrí de Pacy', url: 'personas/brother-ruadri-de-pacy.html', keywords: 'hospitaller, sergeant, soldier brother, margat', period: 'High Medieval' },
            { type: 'persona', title: 'Brother Konrad Christiansen', url: 'personas/brother-konrad-christiansen.html', keywords: 'hospitaller, infirmarian, latin, healer', period: 'High Medieval' },
            { type: 'persona', title: 'James Leslie', url: 'personas/james-leslie.html', keywords: 'man-at-arms, scottish, warrior', period: 'Late Medieval' },
            { type: 'persona', title: 'Sergeant Douglas', url: 'personas/sergeant-douglas.html', keywords: 'sergeant, military, trainer', period: 'Late Medieval' },
            { type: 'persona', title: 'Bowyer', url: 'personas/bowyer.html', keywords: 'bow maker, archer, craftsman', period: 'Late Medieval' },
            { type: 'persona', title: 'Olivine du Pont', url: 'personas/olivine-du-pont.html', keywords: 'french, noblewoman, adventurer', period: 'Late Medieval' },
            { type: 'persona', title: 'Pierre du Pont', url: 'personas/pierre-du-pont.html', keywords: 'french, noble, companion', period: 'Late Medieval' },
            { type: 'persona', title: 'Sir Michael', url: 'personas/sir-michael.html', keywords: 'knight, order of the stag and thistle', period: 'Late Medieval' },
            { type: 'persona', title: 'Dagmar Davidsdottir', url: 'personas/dagmar-davidsdottir.html', keywords: 'viking, weaver, craftswoman, birka', period: 'Early Medieval' },
            { type: 'persona', title: 'Estrid Huntersdottir', url: 'personas/estrid-huntersdottir.html', keywords: 'tavern keeper, craftswoman, businesswoman', period: 'Early Medieval' },
            { type: 'persona', title: 'Gudrun', url: 'personas/gudrun.html', keywords: 'leather, fur, crafter, trader', period: 'Early Medieval' },
            { type: 'persona', title: 'Sven', url: 'personas/sven.html', keywords: 'viking, warrior, explorer', period: 'Early Medieval' },
            { type: 'persona', title: 'Orm', url: 'personas/orm.html', keywords: 'viking, merchant, adventurer', period: 'Early Medieval' },
            { type: 'persona', title: 'Traeloch the Dark', url: 'personas/traeloch-the-dark.html', keywords: 'viking, hunter, dark', period: 'Early Medieval' },
            { type: 'persona', title: 'Rowdy', url: 'personas/rowdy.html', keywords: 'warrior, adventurer, high medieval', period: 'High Medieval' },
            { type: 'persona', title: 'The Woodsman', url: 'personas/the-woodsman.html', keywords: 'woodsman, hunter, forest', period: 'High Medieval' },

            // Pages
            { type: 'page', title: 'Early Medieval Period', url: 'early-medieval.html', keywords: 'viking, anglo-saxon, sevenoaks, 800-1100', period: 'Early Medieval' },
            { type: 'page', title: 'High Medieval Period', url: 'high-medieval.html', keywords: 'knights, crusades, hospitallers, 1100-1300', period: 'High Medieval' },
            { type: 'page', title: 'Late Medieval Period', url: 'late-medieval.html', keywords: 'hundred years war, plate armor, longbows, 1350-1450', period: 'Late Medieval' },
            { type: 'page', title: 'Late Medieval Armour', url: 'late-medieval-armour.html', keywords: 'plate armor, harness, protection, 14th century', period: 'Late Medieval' },
            { type: 'page', title: 'Late Medieval Fashion', url: 'late-medieval-fashion.html', keywords: 'clothing, fashion, houppelande, cotehardie', period: 'Late Medieval' },
            { type: 'page', title: 'Late Medieval Fighting', url: 'late-medieval-fighting.html', keywords: 'combat, weapons, fighting arts, martial', period: 'Late Medieval' },
            { type: 'page', title: 'Late Medieval Timeline', url: 'late-medieval-timeline.html', keywords: 'timeline, history, events, 1350-1450', period: 'Late Medieval' },
            { type: 'page', title: 'Brewing Medieval Ale', url: 'brewing-medieval-ale.html', keywords: 'brewing, ale, beer, medieval drinks', period: 'Medieval' },
            { type: 'page', title: 'Getting Started Guide', url: 'getting-started.html', keywords: 'beginner, join, equipment, new member', period: 'All' },
            { type: 'page', title: 'Queensland Medieval Groups', url: 'queensland-medieval-groups.html', keywords: 'groups, queensland, australia, re-enactment', period: 'Modern' },
            { type: 'page', title: 'Society Policies', url: 'policies.html', keywords: 'policies, rules, constitution, bylaws', period: 'Modern' },
            { type: 'page', title: 'Recent Events', url: 'recent-events.html', keywords: 'events, activities, demonstrations, shows', period: 'Modern' },
            { type: 'page', title: 'Events', url: 'events.html', keywords: 'events, past events, upcoming events, history, previous activities', period: 'Modern' },

            // Equipment & Skills
            { type: 'equipment', title: 'Longbow', keywords: 'archery, bow, weapon, english', period: 'Late Medieval' },
            { type: 'equipment', title: 'Plate Armor', keywords: 'armor, protection, harness, steel', period: 'Late Medieval' },
            { type: 'equipment', title: 'Chainmail', keywords: 'armor, mail, protection, rings', period: 'Early Medieval' },
            { type: 'equipment', title: 'Sword', keywords: 'weapon, blade, combat, knightly', period: 'Medieval' },
            { type: 'equipment', title: 'Shield', keywords: 'protection, defense, round, heater', period: 'Medieval' },
            { type: 'equipment', title: 'Tunic', keywords: 'clothing, garment, wool, linen', period: 'Medieval' },
            { type: 'equipment', title: 'Houppelande', keywords: 'clothing, fashion, gown, late medieval', period: 'Late Medieval' },
            { type: 'equipment', title: 'Cotehardie', keywords: 'clothing, fashion, fitted, late medieval', period: 'Late Medieval' },

            // Activities
            { type: 'activity', title: 'Combat Demonstration', keywords: 'fighting, combat, display, martial', period: 'Medieval' },
            { type: 'activity', title: 'Archery', keywords: 'bow, arrow, target, shooting', period: 'Medieval' },
            { type: 'activity', title: 'Craft Demonstration', keywords: 'crafts, skills, traditional, making', period: 'Medieval' },
            { type: 'activity', title: 'Medieval Cooking', keywords: 'food, cooking, recipes, feast', period: 'Medieval' },
            { type: 'activity', title: 'Medieval Music', keywords: 'music, instruments, songs, entertainment', period: 'Medieval' },
            { type: 'activity', title: 'Medieval Dance', keywords: 'dance, entertainment, social, courtly', period: 'Medieval' }
        ];
    }

    setupEventListeners() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }

        if (this.searchButton) {
            this.searchButton.addEventListener('click', () => this.performSearch());
        }

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container') && !e.target.closest('.search-results')) {
                this.hideResults();
            }
        });
    }

    createResultsContainer() {
        // Create results container if it doesn't exist
        if (!document.getElementById('search-results')) {
            const resultsContainer = document.createElement('div');
            resultsContainer.id = 'search-results';
            resultsContainer.className = 'search-results';
            document.body.appendChild(resultsContainer);
        }
        this.searchResults = document.getElementById('search-results');
    }

    handleSearch(query) {
        if (query.length < 2) {
            this.hideResults();
            return;
        }

        const results = this.search(query);
        this.displayResults(results, query);
    }

    performSearch() {
        const query = this.searchInput.value.trim();
        if (query.length < 2) {
            alert('Please enter at least 2 characters to search.');
            return;
        }

        const results = this.search(query);
        this.displayResults(results, query);
    }

    search(query) {
        const searchTerm = query.toLowerCase();
        const results = [];

        this.searchData.forEach(item => {
            const titleMatch = item.title.toLowerCase().includes(searchTerm);
            const keywordMatch = item.keywords.toLowerCase().includes(searchTerm);
            const periodMatch = item.period.toLowerCase().includes(searchTerm);

            if (titleMatch || keywordMatch || periodMatch) {
                const score = this.calculateScore(item, searchTerm);
                results.push({ ...item, score });
            }
        });

        return results.sort((a, b) => b.score - a.score).slice(0, 10);
    }

    calculateScore(item, searchTerm) {
        let score = 0;
        const title = item.title.toLowerCase();
        const keywords = item.keywords.toLowerCase();

        // Exact title match gets highest score
        if (title === searchTerm) score += 100;
        else if (title.includes(searchTerm)) score += 50;

        // Keyword matches
        if (keywords.includes(searchTerm)) score += 30;

        // Period match
        if (item.period.toLowerCase().includes(searchTerm)) score += 20;

        return score;
    }

    displayResults(results, query) {
        if (!this.searchResults) return;

        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="search-result-item no-results">
                    <span class="material-icons">search_off</span>
                    <div>
                        <h4>No results found for "${query}"</h4>
                        <p>Try different keywords or browse our content sections.</p>
                    </div>
                </div>
            `;
        } else {
            const resultsHTML = results.map(result => this.createResultHTML(result)).join('');
            this.searchResults.innerHTML = `
                <div class="search-results-header">
                    <h4>Search Results for "${query}" (${results.length} found)</h4>
                </div>
                ${resultsHTML}
            `;
        }

        this.showResults();
    }

    createResultHTML(result) {
        const icon = this.getIconForType(result.type);
        const periodBadge = result.period !== 'Modern' ? `<span class="period-badge">${result.period}</span>` : '';
        
        return `
            <div class="search-result-item">
                <span class="material-icons result-icon">${icon}</span>
                <div class="result-content">
                    <h4><a href="${result.url}">${result.title}</a></h4>
                    <p class="result-keywords">${result.keywords}</p>
                    ${periodBadge}
                </div>
            </div>
        `;
    }

    getIconForType(type) {
        const icons = {
            'persona': 'person',
            'page': 'article',
            'equipment': 'build',
            'activity': 'sports_martial_arts'
        };
        return icons[type] || 'search';
    }

    showResults() {
        if (this.searchResults) {
            this.searchResults.style.display = 'block';
        }
    }

    hideResults() {
        if (this.searchResults) {
            this.searchResults.style.display = 'none';
        }
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MedievalSearch();
});
