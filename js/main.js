// js/main.js - Funcionalidades principales

document.addEventListener('DOMContentLoaded', function() {
    // 1. Menú móvil
    const btnMenuMovil = document.querySelector('.btn-menu-movil');
    const navegacion = document.querySelector('.navegacion');
    
    if (btnMenuMovil) {
        btnMenuMovil.addEventListener('click', function() {
            navegacion.classList.toggle('activo');
            this.classList.toggle('activo');
        });
    }
    
    // 2. Botón volver arriba
    const btnArriba = document.querySelector('.btn-arriba');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            btnArriba.classList.add('visible');
        } else {
            btnArriba.classList.remove('visible');
        }
    });
    
    if (btnArriba) {
        btnArriba.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 3. Navegación smooth
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Solo para enlaces internos (no # solo)
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Cerrar menú móvil si está abierto
                    if (navegacion.classList.contains('activo')) {
                        navegacion.classList.remove('activo');
                        btnMenuMovil.classList.remove('activo');
                    }
                    
                    // Scroll suave
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 4. Versículo del día (rotación)
    const versiculosDelDia = [
        {
            texto: "En el principio crió Dios los cielos y la tierra.",
            referencia: "Génesis 1:1"
        },
        {
            texto: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
            referencia: "Juan 3:16"
        },
        {
            texto: "Jehová es mi pastor; nada me faltará.",
            referencia: "Salmos 23:1"
        },
        {
            texto: "Todo lo puedo en Cristo que me fortalece.",
            referencia: "Filipenses 4:13"
        }
    ];
    
    function actualizarVersiculoDelDia() {
        const hoy = new Date();
        const indice = hoy.getDate() % versiculosDelDia.length;
        const versiculo = versiculosDelDia[indice];
        
        const elementoTexto = document.querySelector('.texto-verso');
        const elementoReferencia = document.querySelector('.referencia-verso');
        const btnCompartir = document.querySelector('.btn-compartir');
        
        if (elementoTexto && elementoReferencia) {
            elementoTexto.textContent = `"${versiculo.texto}"`;
            elementoReferencia.textContent = versiculo.referencia;
            
            if (btnCompartir) {
                btnCompartir.setAttribute('data-verso', versiculo.referencia);
            }
        }
    }
    
    // Inicializar versículo del día
    actualizarVersiculoDelDia();
    
    // 5. Compartir versículo
    const btnCompartir = document.querySelector('.btn-compartir');
    if (btnCompartir) {
        btnCompartir.addEventListener('click', function() {
            const verso = this.getAttribute('data-verso');
            const texto = document.querySelector('.texto-verso').textContent;
            const mensaje = `${texto} - ${verso}`;
            
            if (navigator.share) {
                // API de Web Share (dispositivos móviles)
                navigator.share({
                    title: 'Versículo del Día - Biblia Reina Valera 1562-1606',
                    text: mensaje,
                    url: window.location.href
                });
            } else {
                // Fallback para desktop
                const textArea = document.createElement('textarea');
                textArea.value = mensaje;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                // Feedback visual
                const originalText = this.textContent;
                this.textContent = '¡Copiado!';
                this.style.backgroundColor = 'var(--color-verde-biblia)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '';
                }, 2000);
            }
        });
    }
    
    // 6. Buscar versículo
    const inputBuscar = document.getElementById('buscar-verso');
    const btnBuscar = document.getElementById('btn-buscar');
    
    if (inputBuscar && btnBuscar) {
        btnBuscar.addEventListener('click', buscarVersiculo);
        inputBuscar.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                buscarVersiculo();
            }
        });
    }
    
    function buscarVersiculo() {
        const query = inputBuscar.value.trim();
        if (query) {
            // En un proyecto real, aquí iría la lógica de búsqueda
            alert(`Buscando: "${query}"\n\nEn una versión completa, esto buscaría en todos los versículos de la Biblia.`);
            
            // Para desarrollo, redirigir a una página de búsqueda
            // window.location.href = `buscar.html?q=${encodeURIComponent(query)}`;
        }
    }
    
    // 7. Efectos visuales para elementos antiguos
    const elementosAntiguos = document.querySelectorAll('.elemento-antiguo');
    elementosAntiguos.forEach(elemento => {
        elemento.style.animationDelay = `${Math.random() * 0.5}s`;
    });
    
    // 8. Detectar preferencia de color oscuro
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (prefersDarkScheme.matches) {
        document.body.classList.add('modo-oscuro');
    }
    
    // 9. Inicializar tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const texto = this.getAttribute('data-tooltip');
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip';
            tooltipElement.textContent = texto;
            document.body.appendChild(tooltipElement);
            
            const rect = this.getBoundingClientRect();
            tooltipElement.style.left = `${rect.left + rect.width / 2}px`;
            tooltipElement.style.top = `${rect.top - 10}px`;
            tooltipElement.style.transform = 'translateX(-50%)';
            
            this._tooltipElement = tooltipElement;
        });
        
        tooltip.addEventListener('mouseleave', function() {
            if (this._tooltipElement) {
                document.body.removeChild(this._tooltipElement);
                this._tooltipElement = null;
            }
        });
    });
    
    // 10. Actualizar año en el footer
    const añoActual = new Date().getFullYear();
    const elementosAño = document.querySelectorAll('[data-año-actual]');
    elementosAño.forEach(elemento => {
        elemento.textContent = añoActual;
    });
});
