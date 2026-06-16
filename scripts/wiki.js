let allWikiPosts = [];
let allWikiCategories = ['Todos'];
let selectedWikiCategory = 'Todos';
let searchWikiQuery = '';

async function loadWikiPosts() {
    try {
        const response = await fetch('./data/wiki.json');
        allWikiPosts = await response.json();
        
        // Ordena posts por data descrescente (mais recentes primeiro)
        allWikiPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Extrai categorias únicas
        const categories = new Set(allWikiPosts.map(post => post.category));
        categories.forEach(cat => {
            if (cat && !allWikiCategories.includes(cat)) {
                allWikiCategories.push(cat);
            }
        });
        
        renderWikiCategories();
        renderWikiPosts();
    } catch (error) {
        console.error('Erro ao carregar os posts da wiki:', error);
        const container = document.getElementById('wiki-posts-container');
        if (container) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <p class="text-danger fs-5">Erro ao carregar a Camis Wiki.</p>
                    <p class="text-secondary">Verifique se o arquivo data/wiki.json está acessível.</p>
                </div>
            `;
        }
    }
}

function renderWikiCategories() {
    const desktopContainer = document.getElementById('wiki-filters-container');
    const mobileDropdown = document.getElementById('mobile-wiki-filters');
    
    if (desktopContainer) {
        desktopContainer.innerHTML = allWikiCategories.map(category => {
            const isActive = category === selectedWikiCategory ? 'active' : '';
            return `<button type="button" class="wiki-filter-btn ${isActive}" data-category="${category}">${category}</button>`;
        }).join('');
        
        // Add click events to desktop buttons
        desktopContainer.querySelectorAll('.wiki-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                selectedWikiCategory = btn.getAttribute('data-category');
                updateActiveFilters();
                renderWikiPosts();
            });
        });
    }
    
    if (mobileDropdown) {
        mobileDropdown.innerHTML = allWikiCategories.map(category => {
            const isActive = category === selectedWikiCategory ? 'active text-info' : '';
            return `<li><a class="dropdown-item mobile-wiki-filter-btn ${isActive}" href="javascript:void(0)" data-category="${category}">${category}</a></li>`;
        }).join('');
        
        // Add click events to mobile dropdown items
        mobileDropdown.querySelectorAll('.mobile-wiki-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                selectedWikiCategory = btn.getAttribute('data-category');
                updateActiveFilters();
                renderWikiPosts();
            });
        });
    }
}

function updateActiveFilters() {
    // Desktop buttons
    document.querySelectorAll('.wiki-filter-btn').forEach(btn => {
        if (btn.getAttribute('data-category') === selectedWikiCategory) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Mobile buttons
    document.querySelectorAll('.mobile-wiki-filter-btn').forEach(btn => {
        if (btn.getAttribute('data-category') === selectedWikiCategory) {
            btn.classList.add('active', 'text-info');
        } else {
            btn.classList.remove('active', 'text-info');
        }
    });
}

function renderWikiPosts() {
    const container = document.getElementById('wiki-posts-container');
    if (!container) return;
    
    // Filter logic
    let filteredPosts = allWikiPosts;
    
    // 1. Filter by Category
    if (selectedWikiCategory !== 'Todos') {
        filteredPosts = filteredPosts.filter(post => post.category === selectedWikiCategory);
    }
    
    // 2. Filter by Search Query
    if (searchWikiQuery.trim() !== '') {
        const query = searchWikiQuery.toLowerCase().trim();
        filteredPosts = filteredPosts.filter(post => 
            post.title.toLowerCase().includes(query) || 
            post.content.toLowerCase().includes(query) || 
            post.category.toLowerCase().includes(query)
        );
    }
    
    // Render
    if (filteredPosts.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-3x text-secondary mb-3 opacity-50"></i>
                <p class="text-secondary fs-5">Nenhum post encontrado para os termos pesquisados.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredPosts.map(post => {
        return `
            <div class="col-12 col-md-6 mb-4">
                <div class="wiki-card h-100 d-flex flex-column">
                    <div class="wiki-card-header mb-3 d-flex flex-wrap gap-2 align-items-center">
                        <span class="wiki-category-badge">${post.category}</span>
                        ${post.project ? `
                            <a href="index.html#projects" class="wiki-project-badge">
                                <i class="fas fa-folder me-1"></i>${post.project}
                            </a>
                        ` : ''}
                    </div>
                    <h3 class="wiki-card-title mb-3">${post.title}</h3>
                    <p class="wiki-card-content flex-grow-1">${post.content}</p>
                    <div class="wiki-card-footer mt-auto pt-3 border-top-custom">
                        <a href="${post.link}" target="_blank" class="wiki-discuss-link">
                            <i class="fab fa-github me-2"></i>Discutir no repositório <i class="fas fa-external-link-alt ms-1 fs-sm"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Setup search listener
function setupSearch() {
    const searchInput = document.getElementById('wiki-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchWikiQuery = e.target.value;
            renderWikiPosts();
        });
    }
}

// Page initialization
window.addEventListener('load', () => {
    loadWikiPosts();
    setupSearch();
    
    // Navbar behavior matching index.html
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        if (window.innerWidth < 992) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                navbar.classList.add('navbar-hidden');
            } else {
                navbar.classList.remove('navbar-hidden');
            }
        } else {
            navbar.classList.remove('navbar-hidden');
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
});
