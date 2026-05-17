let allProjects = [];
let allFilters = [];
let allEvents = [];
let allEventFilters = [];
let allCoreSkills = [];
let allExperience = [];

async function loadProjects() {
    try {
        const response = await fetch('./data/projects.json');
        allProjects = await response.json();
        
        // Ordena para que os projetos COM imagem apareçam primeiro
        allProjects.sort((a, b) => (b.image ? 1 : 0) - (a.image ? 1 : 0));
        
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

async function loadCoreSkills() {
    try {
        const response = await fetch('./data/core-skills.json');
        allCoreSkills = await response.json();
        renderCoreSkills(allCoreSkills);
    } catch (error) {
        console.error('Erro ao carregar habilidades de destaque:', error);
    }
}

async function loadExperience() {
    try {
        const response = await fetch('./data/experience.json');
        allExperience = await response.json();
        renderExperience(allExperience);
    } catch (error) {
        console.error('Erro ao carregar linha do tempo:', error);
    }
}

function renderExperience(experienceList) {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    container.innerHTML = experienceList.map((item, index) => {
        const position = index % 2 === 0 ? 'left' : 'right';
        return `
            <div class="timeline-item ${position}">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <span class="timeline-date">${item.date}</span>
                    <h3 class="timeline-company">${item.company}</h3>
                    <span class="timeline-role">${item.role}</span>
                </div>
            </div>
        `;
    }).join('');
}

function renderCoreSkills(skills) {
    const container = document.getElementById('core-skills-container');
    if (!container) return;

    container.innerHTML = skills.map(skill => `
        <div class="col-12 col-md-6 col-lg-3">
            <div class="core-skill-card h-100" data-skill-id="${skill.id}">
                <div class="core-skill-icon">
                    <i class="${skill.icon}"></i>
                </div>
                <h3 class="core-skill-title">${skill.title}</h3>
                <span class="core-skill-subtitle">${skill.subtitle}</span>
                <p class="core-skill-short">${skill.shortDescription}</p>
                <div class="core-skill-action mt-auto">
                    <span>Saber mais <i class="fas fa-arrow-right ms-2"></i></span>
                </div>
            </div>
        </div>
    `).join('');

    // Adiciona evento de clique para abrir o Modal
    document.querySelectorAll('.core-skill-card').forEach(card => {
        card.addEventListener('click', () => {
            const skillId = card.getAttribute('data-skill-id');
            const skill = allCoreSkills.find(s => s.id === skillId);
            if (skill) {
                document.getElementById('skillModalIcon').className = skill.icon + ' me-3 fs-3';
                document.getElementById('skillModalTitle').textContent = skill.title;
                document.getElementById('skillModalSubtitle').textContent = skill.subtitle;
                document.getElementById('skillModalBody').innerHTML = skill.fullDescription;
                
                const modal = new bootstrap.Modal(document.getElementById('skillModal'));
                modal.show();
            }
        });
    });
}

async function loadEvents() {
    try {
        const response = await fetch('./data/events.json');
        allEvents = await response.json();
        
        // Ordena para que as participações COM imagem apareçam primeiro
        allEvents.sort((a, b) => (b.image ? 1 : 0) - (a.image ? 1 : 0));
        
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
                ${project.image 
                    ? `<img src="${project.image}" class="card-img-top" alt="${project.title}">` 
                    : `<div class="card-img-top default-img d-flex align-items-center justify-content-center">
                           <i class="fas fa-laptop-code fa-3x" style="color: rgba(255,255,255,0.05);"></i>
                       </div>`
                }
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                    <div class="mt-auto">
                        <div class="mb-3">
                            ${project.tags.map(tag => `<span class="badge">${tag}</span>`).join('')}
                        </div>
                        ${project.link 
                            ? `<a href="${project.link}" target="_blank" class="details-link">Mais informações <i class="fas fa-external-link-alt"></i></a>` 
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
    const mobileDropdown = document.getElementById('mobile-projects-filters');
    
    filterContainer.innerHTML = allFilters.map((filter, index) => {
        const isActive = index === 0 ? 'active' : '';
        return `<button type="button" class="filter-btn ${isActive}" data-category="${filter.name}">${filter.name}</button>`;
    }).join('');

    if (mobileDropdown) {
        mobileDropdown.innerHTML = allFilters.map((filter, index) => {
            const isActive = index === 0 ? 'active text-info' : '';
            return `<li><a class="dropdown-item mobile-filter-btn ${isActive}" href="javascript:void(0)" data-category="${filter.name}">${filter.name}</a></li>`;
        }).join('');
    }
}

function setupFilterButtons() {
    const desktopButtons = document.querySelectorAll('.filter-btn');
    const mobileButtons = document.querySelectorAll('.mobile-filter-btn');
    const allBtns = [...desktopButtons, ...mobileButtons];

    allBtns.forEach(button => {
        button.addEventListener('click', () => {
            const selectedCategory = button.getAttribute('data-category');
            
            // Atualizar active state nos botões desktop
            desktopButtons.forEach(btn => {
                if(btn.getAttribute('data-category') === selectedCategory) btn.classList.add('active');
                else btn.classList.remove('active');
            });

            // Atualizar active state nos botões mobile
            mobileButtons.forEach(btn => {
                if(btn.getAttribute('data-category') === selectedCategory) btn.classList.add('active', 'text-info');
                else btn.classList.remove('active', 'text-info');
            });

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
        <div class="col-12 col-md-6 col-lg-4">
            <div class="event-item">
                ${event.image ? `
                    <div style="overflow: hidden;">
                        <img src="${event.image}" class="event-img" alt="${event.title}">
                    </div>
                ` : `
                    <div class="event-img default-img d-flex align-items-center justify-content-center" style="overflow: hidden;">
                        <i class="fas fa-calendar-alt fa-3x" style="color: rgba(255,255,255,0.05);"></i>
                    </div>
                `}
                <div class="event-content">
                    <span class="event-date">${event.date}</span>
                    <h3 class="event-title">${event.title}</h3>
                    <span class="event-role">${event.role}</span>
                    <p class="event-description">${event.description}</p>
                    ${event.link ? `
                        <div class="mt-auto pt-3">
                            <a href="${event.link}" target="_blank" class="details-link">
                                Ver mais detalhes <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function renderEventFilters() {
    const filterContainer = document.querySelector('.event-filters');
    const mobileDropdown = document.getElementById('mobile-events-filters');
    
    filterContainer.innerHTML = allEventFilters.map((filter, index) => {
        const isActive = index === 0 ? 'active' : '';
        return `<button type="button" class="event-filter-btn ${isActive}" data-category="${filter.name}">${filter.name}</button>`;
    }).join('');

    if (mobileDropdown) {
        mobileDropdown.innerHTML = allEventFilters.map((filter, index) => {
            const isActive = index === 0 ? 'active text-info' : '';
            return `<li><a class="dropdown-item mobile-event-filter-btn ${isActive}" href="javascript:void(0)" data-category="${filter.name}">${filter.name}</a></li>`;
        }).join('');
    }
}

function setupEventFilterButtons() {
    const desktopButtons = document.querySelectorAll('.event-filter-btn');
    const mobileButtons = document.querySelectorAll('.mobile-event-filter-btn');
    const allBtns = [...desktopButtons, ...mobileButtons];

    allBtns.forEach(button => {
        button.addEventListener('click', () => {
            const selectedCategory = button.getAttribute('data-category');
            
            desktopButtons.forEach(btn => {
                if(btn.getAttribute('data-category') === selectedCategory) btn.classList.add('active');
                else btn.classList.remove('active');
            });

            mobileButtons.forEach(btn => {
                if(btn.getAttribute('data-category') === selectedCategory) btn.classList.add('active', 'text-info');
                else btn.classList.remove('active', 'text-info');
            });

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
    loadCoreSkills();
    loadExperience();
    
    // Inicializar tooltips do Bootstrap
    setTimeout(() => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }, 100);

    // Smart Navbar e Correção de Scroll Mobile
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Adiciona background sólido quando rolar um pouco para baixo
        if (currentScrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // Esconde a barra ao rolar para baixo, mostra ao rolar para cima
        // Mas só ativa a ocultação se tiver rolado bastante e estiver em mobile
        if (window.innerWidth < 992) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Rolando para baixo
                navbar.classList.add('navbar-hidden');
            } else {
                // Rolando para cima
                navbar.classList.remove('navbar-hidden');
            }
        } else {
            navbar.classList.remove('navbar-hidden'); // Garante que fica visível no desktop
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
});