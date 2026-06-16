let allProjects = [];
let allFilters = [];
let allEvents = [];
let allEventFilters = [];
let allCoreSkills = [];
let allExperience = [];
let currentLang = 'pt';
let translations = {};

async function loadProjects() {
    try {
        const response = await fetch(`./data/${currentLang}/projects.json`);
        allProjects = await response.json();
        
        // Ordena para que os projetos COM imagem apareçam primeiro
        allProjects.sort((a, b) => (b.image ? 1 : 0) - (a.image ? 1 : 0));
        
        renderProjects(allProjects);
    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
        const errMsg = currentLang === 'pt' ? 'Erro ao carregar a lista de projetos.' : 'Error loading projects list.';
        document.getElementById('project-container').innerHTML = `<p class="text-danger">${errMsg}</p>`;
    }
}

async function loadFilters() {
    try {
        const response = await fetch(`./data/${currentLang}/filters.json`);
        allFilters = await response.json();
        renderFilterButtons();
        setupFilterButtons();
    } catch (error) {
        console.error('Erro ao carregar filtros:', error);
    }
}

async function loadCoreSkills() {
    try {
        const response = await fetch(`./data/${currentLang}/core-skills.json`);
        allCoreSkills = await response.json();
        renderCoreSkills(allCoreSkills);
    } catch (error) {
        console.error('Erro ao carregar habilidades de destaque:', error);
    }
}

async function loadExperience() {
    try {
        const response = await fetch(`./data/${currentLang}/experience.json`);
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

    const learnMoreText = translations.skills && translations.skills.learn_more ? translations.skills.learn_more : 'Saber mais';

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
                    <span>${learnMoreText} <i class="fas fa-arrow-right ms-2"></i></span>
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
        const response = await fetch(`./data/${currentLang}/events.json`);
        allEvents = await response.json();
        
        // Ordena para que as participações COM imagem apareçam primeiro
        allEvents.sort((a, b) => (b.image ? 1 : 0) - (a.image ? 1 : 0));
        
        renderEvents(allEvents);
    } catch (error) {
        console.error('Erro ao carregar eventos:', error);
        const errMsg = currentLang === 'pt' ? 'Erro ao carregar a lista de participações.' : 'Error loading events list.';
        document.getElementById('events-container').innerHTML = `<p class="text-danger">${errMsg}</p>`;
    }
}

async function loadEventFilters() {
    try {
        const response = await fetch(`./data/${currentLang}/filters-events.json`);
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
        const emptyMsg = translations.projects && translations.projects.empty ? translations.projects.empty : 'Nenhum projeto encontrado.';
        container.innerHTML = `<p class="text-secondary text-center">${emptyMsg}</p>`;
        return;
    }

    const moreInfoText = translations.projects && translations.projects.more_info ? translations.projects.more_info : 'Mais informações';

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
                            ? `<a href="${project.link}" target="_blank" class="details-link">${moreInfoText} <i class="fas fa-external-link-alt"></i></a>` 
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
            const allLabel = currentLang === 'pt' ? 'Todos' : 'All';
            const filtered = selectedCategory === allLabel 
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
        const emptyMsg = translations.events && translations.events.empty ? translations.events.empty : 'Nenhuma participação encontrada.';
        container.innerHTML = `<p class="text-secondary text-center">${emptyMsg}</p>`;
        return;
    }

    const moreDetailsText = translations.events && translations.events.more_details ? translations.events.more_details : 'Ver mais detalhes';

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
                                ${moreDetailsText} <i class="fas fa-external-link-alt"></i>
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

            const allLabel = currentLang === 'pt' ? 'Todos' : 'All';
            const filtered = selectedCategory === allLabel 
                ? allEvents 
                : allEvents.filter(event => event.category === selectedCategory);

            renderEvents(filtered);
        });
    });
}

async function initLanguage() {
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang && (savedLang === 'pt' || savedLang === 'en')) {
        currentLang = savedLang;
    } else {
        const browserLang = (navigator.language || navigator.userLanguage || 'pt').toLowerCase();
        currentLang = browserLang.startsWith('pt') ? 'pt' : 'en';
        localStorage.setItem('preferredLang', currentLang);
    }
    await loadTranslations();
    setupLanguageSelector();
}

async function loadTranslations() {
    try {
        const response = await fetch(`./data/${currentLang}/translation.json`);
        translations = await response.json();
        translatePage();
        updateLanguageSelectorUI();
    } catch (error) {
        console.error('Erro ao carregar traduções:', error);
    }
}

function getTranslationValue(key, translationsObj) {
    return key.split('.').reduce((obj, i) => (obj ? obj[i] : null), translationsObj);
}

function translatePage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = getTranslationValue(key, translations);
        if (val) {
            el.innerHTML = val;
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const val = getTranslationValue(key, translations);
        if (val) {
            el.placeholder = val;
        }
    });
}

function updateLanguageSelectorUI() {
    const langDropdownBtn = document.getElementById('langDropdown');
    if (langDropdownBtn) {
        langDropdownBtn.innerHTML = `<i class="fas fa-globe me-1"></i> ${currentLang.toUpperCase()}`;
    }

    document.querySelectorAll('.lang-option').forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function setupLanguageSelector() {
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const selectedLang = btn.getAttribute('data-lang');
            if (selectedLang !== currentLang) {
                currentLang = selectedLang;
                localStorage.setItem('preferredLang', currentLang);
                
                await loadTranslations();
                
                loadProjects();
                loadFilters();
                loadEvents();
                loadEventFilters();
                loadCoreSkills();
                loadExperience();
            }
        });
    });
}

window.addEventListener('load', async () => {
    await initLanguage();
    
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