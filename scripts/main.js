let allProjects = [];
let allFilters = [];

async function loadProjects() {
    try {
        const response = await fetch('./data/projects.json');
        allProjects = await response.json();
        renderProjects(allProjects);
    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
        document.getElementById('project-container').innerHTML = '<p class="text-danger">Erro ao carregar a lista de projetos.</p>';
    }
}

async function loadFilters() {
    try {
        const response = await fetch('./data/filters.json');
        allFilters = await response.json();
        renderFilterButtons();
        setupFilterButtons();
    } catch (error) {
        console.error('Erro ao carregar filtros:', error);
    }
}

function renderProjects(projects) {
    const container = document.getElementById('project-container');

    if (projects.length === 0) {
        container.innerHTML = '<p class="text-secondary text-center">Nenhum projeto encontrado.</p>';
        return;
    }

    container.innerHTML = projects.map(project => `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card h-100 bg-card-custom border-secondary shadow-sm">
                <img src="${project.image}" class="card-img-top" alt="${project.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-info">${project.title}</h5>
                    <p class="card-text text-secondary small">${project.description}</p>
                    <div class="mt-auto">
                        <div class="mb-3">
                            ${project.tags.map(tag => `<span class="badge bg-dark border border-info text-info me-1">${tag}</span>`).join('')}
                        </div>
                        ${project.steam 
                            ? `<a href="${project.steam}" target="_blank" class="btn btn-sm btn-outline-light w-100">Mais informações</a>` 
                            : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderFilterButtons() {
    const filterContainer = document.querySelector('.btn-group');
    
    filterContainer.innerHTML = allFilters.map((filter, index) => {
        const isActive = index === 0 ? 'active' : '';
        
        return `<button type="button" class="btn btn-outline-info filter-btn ${isActive}" data-category="${filter.name}">${filter.name}</button>`;
    }).join('');
}

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe 'active' de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe 'active' ao botão clicado
            button.classList.add('active');

            // Obter categoria selecionada
            const selectedCategory = button.getAttribute('data-category');

            // Filtrar projetos usando Array.filter()
            const filtered = selectedCategory === 'Todos' 
                ? allProjects 
                : allProjects.filter(project => project.category === selectedCategory);

            // Renderizar projetos filtrados
            renderProjects(filtered);
        });
    });
}

window.addEventListener('load', () => {
    loadProjects();
    loadFilters();
    
    // Inicializar tooltips do Bootstrap
    setTimeout(() => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }, 100);
});