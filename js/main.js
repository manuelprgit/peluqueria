// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Loader
    setTimeout(function() {
        const loader = document.querySelector('.loader');
        loader.classList.add('hidden');
    }, 1500);

    // Navegación responsive
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // Animación de elementos al hacer scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    // Verificar elementos visibles al cargar la página
    checkFade();
    
    // Verificar elementos visibles al hacer scroll
    window.addEventListener('scroll', checkFade);

    // Galería de imágenes
    const gallerySlider = document.querySelector('.gallery-slider');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryPrev = document.querySelector('.gallery-prev');
    const galleryNext = document.querySelector('.gallery-next');
    
    if (gallerySlider && galleryItems.length > 0) {
        let galleryIndex = 0;
        const galleryItemWidth = galleryItems[0].clientWidth;
        
        // Función para actualizar el slider
        function updateGallery() {
            gallerySlider.style.transform = `translateX(-${galleryIndex * 100}%)`;
        }
        
        // Botón siguiente
        if (galleryNext) {
            galleryNext.addEventListener('click', function() {
                galleryIndex = (galleryIndex + 1) % galleryItems.length;
                updateGallery();
            });
        }
        
        // Botón anterior
        if (galleryPrev) {
            galleryPrev.addEventListener('click', function() {
                galleryIndex = (galleryIndex - 1 + galleryItems.length) % galleryItems.length;
                updateGallery();
            });
        }
        
        // Swipe para móviles
        let touchStartX = 0;
        let touchEndX = 0;
        
        gallerySlider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        gallerySlider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swipe izquierda
                galleryIndex = (galleryIndex + 1) % galleryItems.length;
                updateGallery();
            }
            
            if (touchEndX > touchStartX + 50) {
                // Swipe derecha
                galleryIndex = (galleryIndex - 1 + galleryItems.length) % galleryItems.length;
                updateGallery();
            }
        }
    }

    // Testimonios slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    
    if (testimonialSlider && testimonialItems.length > 0) {
        let testimonialIndex = 0;
        
        // Función para actualizar el slider
        function updateTestimonial() {
            testimonialSlider.style.transform = `translateX(-${testimonialIndex * 100}%)`;
        }
        
        // Botón siguiente
        if (testimonialNext) {
            testimonialNext.addEventListener('click', function() {
                testimonialIndex = (testimonialIndex + 1) % testimonialItems.length;
                updateTestimonial();
            });
        }
        
        // Botón anterior
        if (testimonialPrev) {
            testimonialPrev.addEventListener('click', function() {
                testimonialIndex = (testimonialIndex - 1 + testimonialItems.length) % testimonialItems.length;
                updateTestimonial();
            });
        }
        
        // Auto rotación de testimonios
        setInterval(function() {
            testimonialIndex = (testimonialIndex + 1) % testimonialItems.length;
            updateTestimonial();
        }, 8000);
        
        // Swipe para móviles
        let touchStartX = 0;
        let touchEndX = 0;
        
        testimonialSlider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        testimonialSlider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swipe izquierda
                testimonialIndex = (testimonialIndex + 1) % testimonialItems.length;
                updateTestimonial();
            }
            
            if (touchEndX > touchStartX + 50) {
                // Swipe derecha
                testimonialIndex = (testimonialIndex - 1 + testimonialItems.length) % testimonialItems.length;
                updateTestimonial();
            }
        }
    }

    // Reproductor de música
    const audioPlayer = document.querySelector('.audio-player');
    const audioControl = document.querySelector('.audio-control');
    const audioElement = document.getElementById('background-music');
    const audioInfo = document.querySelector('.audio-info');
    
    if (audioControl && audioElement) {
        // Verificar si hay una preferencia guardada
        let isPlaying = localStorage.getItem('music-playing') === 'true';
        
        // Función para actualizar el estado del reproductor
        function updateAudioPlayerState() {
            if (isPlaying) {
                audioElement.volume = 0;
                audioElement.play();
                
                // Aumentar gradualmente el volumen para una transición suave
                let volume = 0;
                const fadeIn = setInterval(() => {
                    if (volume < 0.8) {
                        volume += 0.05;
                        audioElement.volume = volume;
                    } else {
                        audioElement.volume = 0.8;
                        clearInterval(fadeIn);
                    }
                }, 100);
                
                audioControl.innerHTML = '<i class="fas fa-pause"></i>';
                audioPlayer.classList.add('playing');
                audioInfo.textContent = 'Música en reproducción';
            } else {
                // Disminuir gradualmente el volumen antes de pausar
                if (audioElement.volume > 0) {
                    let volume = audioElement.volume;
                    const fadeOut = setInterval(() => {
                        if (volume > 0.05) {
                            volume -= 0.05;
                            audioElement.volume = volume;
                        } else {
                            audioElement.pause();
                            audioElement.volume = 0;
                            clearInterval(fadeOut);
                        }
                    }, 100);
                } else {
                    audioElement.pause();
                }
                
                audioControl.innerHTML = '<i class="fas fa-play"></i>';
                audioPlayer.classList.remove('playing');
                audioInfo.textContent = 'Música de ambiente';
            }
            
            // Guardar preferencia del usuario
            localStorage.setItem('music-playing', isPlaying);
        }
        
        // Inicializar el estado del reproductor
        updateAudioPlayerState();
        
        // Manejar clic en el botón de control
        audioControl.addEventListener('click', function() {
            isPlaying = !isPlaying;
            updateAudioPlayerState();
        });
        
        // Manejar errores de reproducción
        audioElement.addEventListener('error', function() {
            console.error('Error al reproducir el audio');
            audioInfo.textContent = 'Error de reproducción';
            isPlaying = false;
            updateAudioPlayerState();
        });
    }

    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí se implementaría la lógica para enviar el formulario
            // Por ahora, solo mostraremos un mensaje de éxito
            const formMessage = document.querySelector('.form-message');
            formMessage.textContent = 'Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.';
            formMessage.style.display = 'block';
            
            // Limpiar el formulario
            contactForm.reset();
            
            // Ocultar el mensaje después de 5 segundos
            setTimeout(function() {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }
});
