        document.addEventListener('DOMContentLoaded', function() {
            // Navegación entre secciones
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('.section');
            const sectionTitle = document.getElementById('section-title');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Remover clase active de todos los links
                    navLinks.forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    
                    // Agregar clase active al link clickeado
                    this.classList.add('active');
                    
                    // Ocultar todas las secciones
                    sections.forEach(section => {
                        section.classList.remove('active');
                    });
                    
                    // Mostrar la sección correspondiente
                    const sectionId = this.getAttribute('data-section');
                    document.getElementById(sectionId).classList.add('active');
                    
                    // Actualizar el título de la sección
                    sectionTitle.textContent = this.textContent.trim();
                });
            });
        });
