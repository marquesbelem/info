let allProjects = [];
let allFilters = [];
let allEvents = [];
let allEventFilters = [];

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

async function loadEvents() {
    try {
        const response = await fetch('./data/events.json');
        allEvents = await response.json();
        renderEvents(allEvents);
    } catch (error) {
        console.error('Erro ao carregar eventos:', error);
        document.getElementById('events-container').innerHTML = '<p class="text-danger">Erro ao carregar a lista de participações.</p>';
    }
}

async function loadEventFilters() {
    try {
        const response = await fetch('./data/filters-events.json');
        allEventFilters = await response.json();
        renderEventFilters();
        setupEventFilterButtons();
    } catch (error) {
        console.error('Erro ao carregar filtros de eventos:', error);
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
            <div class="card h-100">
                ${project.image ? `<img src="${project.image}" class="card-img-top" alt="${project.title}">` : ''}
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                    <div class="mt-auto">
                        <div class="mb-3">
                            ${project.tags.map(tag => `<span class="badge">${tag}</span>`).join('')}
                        </div>
                        ${project.steam 
                            ? `<a href="${project.steam}" target="_blank" class="details-link">Mais informações <i class="fas fa-external-link-alt"></i></a>` 
                            : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderFilterButtons() {
    const filterContainer = document.querySelector('.filters-container');
    
    filterContainer.innerHTML = allFilters.map((filter, index) => {
        const isActive = index === 0 ? 'active' : '';
        
        return `<button type="button" class="filter-btn ${isActive}" data-category="${filter.name}">${filter.name}</button>`;
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

function renderEvents(events) {
    const container = document.getElementById('events-container');

    if (events.length === 0) {
        container.innerHTML = '<p class="text-secondary text-center">Nenhuma participação encontrada.</p>';
        return;
    }

    container.innerHTML = events.map(event => `
        <div class="col-12 col-lg-6">
            <div class="event-item">
                <span class="event-date">${event.date}</span>
                <h3 class="event-title">${event.title}</h3>
                <span class="event-role">${event.role}</span>
                <p class="event-description">${event.description}</p>
                ${event.link ? `
                    <a href="${event.link}" target="_blank" class="details-link">
                        Ver mais detalhes <i class="fas fa-external-link-alt"></i>
                    </a>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function renderEventFilters() {
    const filterContainer = document.querySelector('.event-filters');
    
    filterContainer.innerHTML = allEventFilters.map((filter, index) => {
        const isActive = index === 0 ? 'active' : '';
        return `<button type="button" class="event-filter-btn ${isActive}" data-category="${filter.name}">${filter.name}</button>`;
    }).join('');
}

function setupEventFilterButtons() {
    const filterButtons = document.querySelectorAll('.event-filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedCategory = button.getAttribute('data-category');
            const filtered = selectedCategory === 'Todos' 
                ? allEvents 
                : allEvents.filter(event => event.category === selectedCategory);

            renderEvents(filtered);
        });
    });
}

window.addEventListener('load', () => {
    loadProjects();
    loadFilters();
    loadEvents();
    loadEventFilters();
    
    // Inicializar tooltips do Bootstrap
    setTimeout(() => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }, 100);
});