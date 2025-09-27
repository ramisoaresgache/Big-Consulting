// Elementos del DOM
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactForm');
const navLogo = document.getElementById('navLogo');
const footerLogo = document.getElementById('footerLogo');

// Variables para el carrusel
let currentSlide = 0;
let itemsPerView = 3;
let totalSlides = 0;
let isTransitioning = false;

// Variables para drag/touch
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationId = 0;

// Estado del tema
let isDarkMode = false;

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar EmailJS con las credenciales reales
    if (typeof emailjs !== 'undefined') {
        emailjs.init("rp5CyjxoKh61p6_Gl");
        window.EMAILJS_CONFIGURED = true;
        console.log('EmailJS inicializado correctamente');
    }
    
    // Verificar si hay tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        enableDarkMode();
    }
    
    // Configurar scroll suave para los enlaces de navegación
    setupSmoothScroll();
    
    // Configurar animaciones al hacer scroll
    setupScrollAnimations();
    
    // Configurar el formulario de contacto
    setupContactForm();
    
    // Configurar el carrusel de servicios
    // setupServicesCarousel(); // Comentado: ahora usamos grid layout en lugar de carousel
    setupClientsCarousel();
    setupTechnologiesCarousel();
});

// Función para alternar entre modo claro y oscuro
function toggleTheme() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
}

// Activar modo oscuro
function enableDarkMode() {
    document.body.classList.add('dark-mode');
    themeIcon.className = 'fas fa-sun';
    localStorage.setItem('theme', 'dark');
    isDarkMode = true;
    
    // Cambiar logos a amarillo para modo oscuro
    if (navLogo) navLogo.src = 'logo_amarillo.png';
    if (footerLogo) footerLogo.src = 'logo_amarillo.png';
}

// Activar modo claro
function enableLightMode() {
    document.body.classList.remove('dark-mode');
    themeIcon.className = 'fas fa-moon';
    localStorage.setItem('theme', 'light');
    isDarkMode = false;
    
    // Cambiar logos a violeta para modo claro
    if (navLogo) navLogo.src = 'logo_violeta_subacento.png';
    if (footerLogo) footerLogo.src = 'logo_violeta_subacento.png';
}

// Alternar menú móvil
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animar las líneas del hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Configurar scroll suave
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Ajuste por la altura del navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
}

// Configurar animaciones al hacer scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos que queremos animar
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .about-text, .about-image');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Configurar formulario de contacto
function setupContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Validación en tiempo real
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

// Esta función se reemplazó arriba con la nueva implementación

// Validar todo el formulario
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Validar nombre
    if (!name.value.trim()) {
        showFieldError(name, 'El nombre es requerido');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showFieldError(name, 'El nombre debe tener al menos 2 caracteres');
        isValid = false;
    }
    
    // Validar email
    if (!email.value.trim()) {
        showFieldError(email, 'El email es requerido');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showFieldError(email, 'Ingresa un email válido');
        isValid = false;
    }
    
    // Validar asunto
    if (!subject.value.trim()) {
        showFieldError(subject, 'El asunto es requerido');
        isValid = false;
    }
    
    // Validar mensaje
    if (!message.value.trim()) {
        showFieldError(message, 'El mensaje es requerido');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showFieldError(message, 'El mensaje debe tener al menos 10 caracteres');
        isValid = false;
    }
    
    return isValid;
}

// Validar campo individual
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    switch (field.type) {
        case 'email':
            if (value && !isValidEmail(value)) {
                showFieldError(field, 'Ingresa un email válido');
            }
            break;
        case 'text':
            if (field.required && !value) {
                showFieldError(field, `${field.previousElementSibling.textContent} es requerido`);
            }
            break;
        case 'textarea':
            if (field.required && !value) {
                showFieldError(field, 'El mensaje es requerido');
            } else if (value && value.length < 10) {
                showFieldError(field, 'El mensaje debe tener al menos 10 caracteres');
            }
            break;
    }
}

// Limpiar error del campo
function clearFieldError(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    field.style.borderColor = '#e0e0e0';
}

// Mostrar error en un campo
function showFieldError(field, message) {
    // Limpiar error anterior
    clearFieldError({ target: field });
    
    // Crear elemento de error
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.9rem';
    errorElement.style.marginTop = '5px';
    errorElement.style.display = 'block';
    
    // Insertar después del campo
    field.parentNode.appendChild(errorElement);
    
    // Cambiar borde del campo
    field.style.borderColor = '#e74c3c';
}

// Mostrar mensaje de éxito
function showSuccessMessage() {
    // Crear elemento de éxito
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.innerHTML = `
        <div style="
            background-color: #27ae60;
            color: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
            font-weight: 600;
        ">
            <i class="fas fa-check-circle" style="margin-right: 10px;"></i>
            ¡Mensaje enviado exitosamente! Te contactaremos pronto.
        </div>
    `;
    
    // Insertar antes del formulario
    contactForm.parentNode.insertBefore(successElement, contactForm);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        successElement.remove();
    }, 5000);
    
    // Scroll al mensaje
    successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Mostrar mensaje informativo
function showInfoMessage(message) {
    // Crear elemento informativo
    const infoElement = document.createElement('div');
    infoElement.className = 'info-message';
    infoElement.innerHTML = `
        <div style="
            background-color: #3498db;
            color: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
            font-weight: 600;
        ">
            <i class="fas fa-info-circle" style="margin-right: 10px;"></i>
            ${message}
        </div>
    `;
    
    // Insertar antes del formulario
    contactForm.parentNode.insertBefore(infoElement, contactForm);
    
    // Remover después de 8 segundos
    setTimeout(() => {
        infoElement.remove();
    }, 8000);
    
    // Scroll al mensaje
    infoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Validar formato de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Efecto parallax para el hero
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image img');
        
        if (heroImage) {
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Contador animado para estadísticas (si se agregan)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Cambiar navbar al hacer scroll
function setupNavbarScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 50) {
            navbar.style.background = isDarkMode ? 
                'rgba(13, 0, 48, 0.95)' : 
                'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = isDarkMode ? 
                'var(--dark-bg-primary)' : 
                'var(--white)';
            navbar.style.backdropFilter = 'none';
        }
    });
}

// Event Listeners
themeToggle.addEventListener('click', toggleTheme);
hamburger.addEventListener('click', toggleMobileMenu);

// Cerrar menú móvil al hacer click en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// Cerrar menú móvil al hacer click fuera de él
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
        toggleMobileMenu();
    }
});

// Configurar funcionalidades adicionales
document.addEventListener('DOMContentLoaded', () => {
    setupParallax();
    setupNavbarScroll();
});

// Función para mostrar/ocultar elementos al hacer scroll
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Agregar clase fade-in a elementos que queremos animar
window.addEventListener('scroll', fadeInOnScroll);

// Botón para volver arriba
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--text-secondary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(54, 24, 138, 0.3);
    `;
    
    document.body.appendChild(backToTop);
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Funcionalidad del botón
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'scale(1.1)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'scale(1)';
    });
}

// Crear botón back to top cuando se carga la página
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// Lazy loading para imágenes
function setupLazyLoading() {
    const images = document.querySelectorAll('img[src*="placeholder"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Aquí podrías cambiar a imágenes reales
                img.style.transition = 'opacity 0.3s ease';
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Configurar lazy loading
document.addEventListener('DOMContentLoaded', setupLazyLoading);

// FUNCIONES DEL CARRUSEL DE SERVICIOS
function setupServicesCarousel() {
    const track = document.getElementById('servicesTrack');
    const container = document.querySelector('.carousel-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    if (!track) return;
    
    const cards = track.querySelectorAll('.service-card');
    totalSlides = cards.length;
    
    // Configurar items por vista según el tamaño de pantalla
    updateItemsPerView();
    
    // Crear indicadores
    createIndicators(indicatorsContainer);
    
    // Event listeners para botones
    if (prevBtn) prevBtn.addEventListener('click', previousSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Event listeners para drag/touch
    setupDragEvents(container, track);
    
    // Auto-play
    startAutoPlay();
    
    // Responsive
    window.addEventListener('resize', () => {
        updateItemsPerView();
        updateCarousel();
    });
    
    // Inicial
    updateCarousel();
}

function setupDragEvents(container, track) {
    if (!container || !track) return;
    
    // Mouse events
    container.addEventListener('mousedown', dragStart);
    container.addEventListener('mousemove', dragMove);
    container.addEventListener('mouseup', dragEnd);
    container.addEventListener('mouseleave', dragEnd);
    
    // Touch events
    container.addEventListener('touchstart', dragStart);
    container.addEventListener('touchmove', dragMove);
    container.addEventListener('touchend', dragEnd);
    
    // Prevent context menu on long press
    container.addEventListener('contextmenu', e => e.preventDefault());
}

function dragStart(e) {
    if (isTransitioning) return;
    
    isDragging = true;
    startPos = getPositionX(e);
    
    const track = document.getElementById('servicesTrack');
    if (track) {
        track.style.transition = 'none';
        const transform = window.getComputedStyle(track).transform;
        if (transform !== 'none') {
            const matrix = new WebKitCSSMatrix(transform);
            currentTranslate = matrix.m41;
        }
        prevTranslate = currentTranslate;
    }
    
    cancelAnimationFrame(animationId);
}

function dragMove(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    const currentPosition = getPositionX(e);
    const diff = currentPosition - startPos;
    currentTranslate = prevTranslate + diff;
    
    setSliderPosition();
}

function dragEnd() {
    if (!isDragging) return;
    
    isDragging = false;
    cancelAnimationFrame(animationId);
    
    const track = document.getElementById('servicesTrack');
    if (!track) return;
    
    const containerWidth = track.parentElement.offsetWidth;
    const threshold = containerWidth * 0.15; // 15% threshold
    const diff = currentTranslate - prevTranslate;
    
    // Determinar dirección del slide basado en el threshold
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            previousSlide();
        } else {
            nextSlide();
        }
    } else {
        // Volver a la posición original
        updateCarousel();
    }
}

function getPositionX(e) {
    return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
}

function setSliderPosition() {
    const track = document.getElementById('servicesTrack');
    if (track) {
        track.style.transform = `translateX(${currentTranslate}px)`;
        animationId = requestAnimationFrame(setSliderPosition);
    }
}

function updateItemsPerView() {
    const width = window.innerWidth;
    if (width <= 600) {
        itemsPerView = 1;
    } else if (width <= 900) {
        itemsPerView = 2;
    } else {
        itemsPerView = 3;
    }
}

function createIndicators(container) {
    if (!container) return;
    
    container.innerHTML = '';
    const totalPages = Math.ceil(totalSlides / itemsPerView);
    
    for (let i = 0; i < totalPages; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        container.appendChild(indicator);
    }
}

function updateCarousel() {
    const track = document.getElementById('servicesTrack');
    if (!track) return;
    
    isTransitioning = true;
    
    // Calcular el ancho exacto de cada grupo de tarjetas
    const container = track.parentElement;
    const containerWidth = container.offsetWidth;
    const cardWidth = (containerWidth - ((itemsPerView - 1) * 30)) / itemsPerView; // 30px es el gap
    
    // Actualizar el ancho de las tarjetas para que sean exactas
    const cards = track.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.style.width = `${cardWidth}px`;
    });
    
    // Calcular el offset para mostrar exactamente itemsPerView tarjetas
    const offset = currentSlide * (containerWidth + 30); // +30 para el gap entre grupos
    
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${offset}px)`;
    
    currentTranslate = -offset;
    prevTranslate = currentTranslate;
    
    // Actualizar indicadores
    updateIndicators();
    
    // Actualizar botones
    updateNavigationButtons();
    
    // Reset transition flag
    setTimeout(() => {
        isTransitioning = false;
    }, 500);
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    const activeIndex = Math.floor(currentSlide);
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === activeIndex);
    });
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const maxSlide = Math.ceil(totalSlides / itemsPerView) - 1;
    
    if (prevBtn) prevBtn.disabled = currentSlide <= 0;
    if (nextBtn) nextBtn.disabled = currentSlide >= maxSlide;
}

function previousSlide() {
    const maxSlide = Math.ceil(totalSlides / itemsPerView) - 1;
    if (currentSlide > 0 && !isTransitioning) {
        currentSlide--;
        updateCarousel();
    } else if (currentSlide === 0 && !isTransitioning) {
        // Permitir navegación circular
        currentSlide = maxSlide;
        updateCarousel();
    }
}

function nextSlide() {
    const maxSlide = Math.ceil(totalSlides / itemsPerView) - 1;
    if (currentSlide < maxSlide && !isTransitioning) {
        currentSlide++;
        updateCarousel();
    } else if (currentSlide === maxSlide && !isTransitioning) {
        // Permitir navegación circular
        currentSlide = 0;
        updateCarousel();
    }
}

function goToSlide(slideIndex) {
    if (!isTransitioning) {
        currentSlide = slideIndex;
        updateCarousel();
    }
}

function startAutoPlay() {
    setInterval(() => {
        const maxSlide = Math.ceil(totalSlides / itemsPerView) - 1;
        if (currentSlide >= maxSlide) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        updateCarousel();
    }, 4000); // Cambia cada 4 segundos
}

// CONFIGURACIÓN DEL FORMULARIO PARA ENVÍO DE EMAIL
function setupContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Validación en tiempo real
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

// Manejar envío del formulario con EmailJS
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validar todo el formulario
    if (validateForm()) {
        // Enviar email usando EmailJS o mostrar mensaje de éxito simulado
        sendEmail();
    }
}

function sendEmail() {
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        company: formData.get('company') || 'No especificada',
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Mostrar mensaje de carga
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Configurar los parámetros para EmailJS
    const templateParams = {
        to_email: 'ramisoaresgache@hotmail.com',
        from_name: data.name,
        from_email: data.email,
        company: data.company,
        subject: data.subject,
        message: data.message,
        reply_to: data.email
    };
    
    // Enviar email usando EmailJS con tus credenciales reales
    if (typeof emailjs !== 'undefined' && window.EMAILJS_CONFIGURED) {
        emailjs.send('service_vs824qx', 'template_cahiem8', templateParams)
            .then(function(response) {
                console.log('Email enviado exitosamente:', response.status, response.text);
                showSuccessMessage();
                contactForm.reset();
            })
            .catch(function(error) {
                console.error('Error al enviar email:', error);
                showErrorMessage('Error al enviar el mensaje. Por favor, intenta nuevamente.');
            })
            .finally(function() {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    } else {
        console.error('EmailJS no está configurado correctamente');
        showErrorMessage('Error de configuración. Por favor, intenta nuevamente.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// CONFIGURACIÓN DEL CARRUSEL DE CLIENTES
function setupClientsCarousel() {
    const clientsTrack = document.getElementById('clientsTrack');
    if (!clientsTrack) return;

    // El carrusel se maneja completamente con CSS animations
    // Esta función puede expandirse para agregar funcionalidad adicional como:
    // - Pausa al hacer hover en logos específicos
    // - Control de velocidad dinámico
    // - Efectos adicionales

    // Opcional: Pausa la animación cuando se hace hover sobre un logo específico
    const clientLogos = clientsTrack.querySelectorAll('.client-logo');
    
    clientLogos.forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            clientsTrack.style.animationPlayState = 'paused';
        });
        
        logo.addEventListener('mouseleave', () => {
            clientsTrack.style.animationPlayState = 'running';
        });
    });

    // Reinicia la animación si se pierde el foco
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            clientsTrack.style.animationPlayState = 'running';
        }
    });
}

// CONFIGURACIÓN DEL CARRUSEL DE TECNOLOGÍAS
function setupTechnologiesCarousel() {
    const technologiesTrack = document.getElementById('technologiesTrack');
    if (!technologiesTrack) return;

    // El carrusel se maneja completamente con CSS animations
    // Esta función puede expandirse para agregar funcionalidad adicional

    // Pausa la animación cuando se hace hover sobre una tecnología específica
    const techLogos = technologiesTrack.querySelectorAll('.tech-logo');
    
    techLogos.forEach(tech => {
        tech.addEventListener('mouseenter', () => {
            technologiesTrack.style.animationPlayState = 'paused';
        });
        
        tech.addEventListener('mouseleave', () => {
            technologiesTrack.style.animationPlayState = 'running';
        });
    });

    // Reinicia la animación si se pierde el foco
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            technologiesTrack.style.animationPlayState = 'running';
        }
    });

    // Añadir efecto de brillo ocasional a las tecnologías
    setInterval(() => {
        const randomTech = techLogos[Math.floor(Math.random() * (techLogos.length / 2))]; // Solo las originales, no duplicados
        if (randomTech && !randomTech.matches(':hover')) {
            randomTech.style.boxShadow = '0 15px 35px rgba(54, 24, 138, 0.3)';
            randomTech.style.borderColor = 'var(--accent-color)';
            
            setTimeout(() => {
                randomTech.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                randomTech.style.borderColor = 'var(--border-color)';
            }, 2000);
        }
    }, 8000); // Cada 8 segundos
}