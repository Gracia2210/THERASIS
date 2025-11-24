// Script para la interactividad del Carrusel

// Aseguramos que el script se ejecute solo cuando el DOM esté completamente cargado
window.onload = function() {
    const container = document.getElementById('carousel-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.getElementById('dots-container');
    
    // Si los elementos no existen (por si se edita el HTML), no intentamos ejecutar el script.
    if (!container || !prevBtn || !nextBtn || !dotsContainer) return;

    const slides = container.children;
    const totalSlides = slides.length;
    let currentIndex = 0;
    let intervalId;

    // Función para actualizar la posición y los estilos del carrusel
    function updateCarousel() {
        // Mover el contenedor horizontalmente usando transform: translateX
        container.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Actualizar los puntos (dots)
        Array.from(dotsContainer.children).forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('bg-primary-leaf'); // Usando el color principal
                dot.classList.remove('bg-gray-300');
            } else {
                dot.classList.remove('bg-primary-leaf');
                dot.classList.add('bg-gray-300');
            }
        });
    }

    // Función para ir a la siguiente diapositiva (circular)
    function goToNext() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
        resetInterval();
    }

    // Función para ir a la diapositiva anterior (circular)
    function goToPrev() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
        resetInterval();
    }

    // Crear los puntos de navegación dinámicamente
    function createDots() {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('w-3', 'h-3', 'rounded-full', 'transition', 'duration-300', 'shadow-md');
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        }
        updateCarousel(); // Inicializar el carrusel y los dots al inicio
    }

    // Configurar el auto-play (intervalo de 5 segundos)
    function startInterval() {
        // Solo iniciar si el carrusel tiene más de una imagen
        if (totalSlides > 1) {
            intervalId = setInterval(goToNext, 5000); // 5000ms = 5 segundos
        }
    }

    // Reiniciar el intervalo después de una interacción manual
    function resetInterval() {
        clearInterval(intervalId);
        startInterval();
    }

    // Event Listeners para las flechas
    prevBtn.addEventListener('click', goToPrev);
    nextBtn.addEventListener('click', goToNext);

    // Inicialización de Dots y Auto-Play
    createDots();
    startInterval();
};