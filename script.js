document.addEventListener('DOMContentLoaded', () => {

  // 1. Header scroll effect
  const header = document.getElementById('header') || document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. Swiper Initialization (rewind mode fixes fade-loop freeze)
  const heroSwiper = new Swiper('.hero-swiper', {
    rewind: true,             // Replaces 'loop: true' to prevent fade freezing
    speed: 1200,              // Fade duration
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    autoplay: {
      delay: 3000,            // Time per slide (3 seconds)
      disableOnInteraction: false,
      pauseOnMouseEnter: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    observer: true,
    observeParents: true,
  });

  // Force autoplay start
  if (heroSwiper.autoplay) {
    heroSwiper.autoplay.start();
  }

  // 3. Scroll fade-in animation
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -20px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
  }
});
