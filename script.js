/**
 * James Bradley B. Penero - Portfolio Controller
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. THEME TOGGLE (DARK / LIGHT)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem('jb-portfolio-theme') || 'dark';
  setTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('jb-portfolio-theme', theme);

    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
    }
  }

  /* --------------------------------------------------------------------------
     2. MOBILE NAVIGATION DRAWER
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'var(--bg-surface)';
        navLinks.style.padding = '1.5rem';
        navLinks.style.borderBottom = '1px solid var(--border-color)';
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. SKILLS FILTERING
     -------------------------------------------------------------------------- */
  const skillBtns = document.querySelectorAll('[data-skill-filter]');
  const skillCards = document.querySelectorAll('.minimal-skill-card');

  skillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-skill-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     4. PROJECTS FILTERING
     -------------------------------------------------------------------------- */
  const projectBtns = document.querySelectorAll('[data-project-filter]');
  const projectCards = document.querySelectorAll('.minimal-project-card');

  projectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-project-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-project-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     5. PROJECT MODAL CONTROLLER
     -------------------------------------------------------------------------- */
  const modalData = {
    commongrind: {
      title: 'Common Grind Café',
      summary: 'A specialty coffee & food web application built for Common Grind Café located in Imus, Cavite. Provides an interactive menu, local business schema optimization, and responsive design.',
      highlights: [
        'Interactive food, frappes, burgers, wings, and coffee menu navigation.',
        'Structured Schema.org local business metadata for search optimization.',
        'Deployed live on Vercel with clean responsive layouts.'
      ],
      github: 'https://github.com/Reezeyee/Common-Grind',
      demo: 'https://common-grind.vercel.app/'
    },
    clove: {
      title: 'Clove Coffee Shop',
      summary: 'A multiroaster specialty coffee bar web application located on Rue Chappe in Montmartre, Paris. Founded by Ella Fatima McElroy and Florent Marcault.',
      highlights: [
        'Built with Vite, React, and Google Fonts (Fraunces & Work Sans).',
        'Minimalist Parisian coffee house aesthetic and bean origin listings.',
        'Optimized for fast rendering and mobile touch interactions.'
      ],
      github: 'https://github.com/Reezeyee/Clove',
      demo: 'https://clove-coffee.vercel.app/'
    },
    manchester: {
      title: 'Manchester Barbershop',
      summary: 'A traditional barbering web application for Manchester Barbershop in East Manchester, PA. Serving classic cuts, hot towel shaves, and beard trims since 2015.',
      highlights: [
        'Built with Vite, React, and custom responsive CSS grid layout.',
        'Mobile navigation menu toggle and interactive service menu tabs.',
        'Deployed live on Vercel with custom single-page rewrites.'
      ],
      github: 'https://github.com/Reezeyee/Manchester-Barbershop',
      demo: 'https://manchester-barbershop.vercel.app/'
    },
    oltime: {
      title: "Ol' Time Barber Shop",
      summary: "A classic barber shop web application built for Ol' Time Barber Shop in Woodstock, GA. Features traditional cuts, straight razor shaves, and family shop vibes.",
      highlights: [
        'Built with Vite, React, and Google Web Fonts (Bevan & Vollkorn).',
        'Embedded interactive Google Maps section for local direction navigation.',
        'Responsive service cards and mobile-friendly touch interface.'
      ],
      github: 'https://github.com/Reezeyee/Ol-Time-Barbershop',
      demo: 'https://ol-time-barbershop.vercel.app/'
    },
    shakebops: {
      title: 'Shake & Bops Botanical Cafe',
      summary: 'A cozy botanical coffee shop web application in Leesburg, Virginia serving specialty coffee, handcrafted teas, local pastries, and houseplant sanctuary UI aesthetics.',
      highlights: [
        'Built with Vite, React, and Tailwind CSS.',
        'Artistic plant sanctuary theme with custom botanical iconography.',
        'Fast single-page navigation and responsive mobile interface.'
      ],
      github: 'https://github.com/Reezeyee',
      demo: 'https://coffee-shop-black-mu.vercel.app/'
    },
    quizphotobooth: {
      title: 'Interactive Quiz & Photobooth',
      summary: 'An interactive personalized web application featuring customized quiz questions and a digital photobooth experience with live photo capture.',
      highlights: [
        'Built with React and Canvas API for interactive image processing.',
        'Instant quiz score calculation and photo frame generation.',
        'Seamless deployment on Vercel.'
      ],
      github: 'https://github.com/Reezeyee',
      demo: 'https://quiz-and-photobooth.vercel.app/'
    }
  };

  const modalOverlay = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project-id');
      const data = modalData[id];
      if (data) {
        modalContent.innerHTML = `
          <h3 style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 700; margin-bottom: 0.8rem;">${data.title}</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">${data.summary}</p>
          <h4 style="font-size: 0.95rem; font-weight: 600; margin-bottom: 0.6rem;">Key Features & Architecture</h4>
          <ul style="padding-left: 1.2rem; color: var(--text-muted); font-size: 0.9rem; margin-bottom: 2rem;">
            ${data.highlights.map(h => `<li style="margin-bottom: 0.4rem;">${h}</li>`).join('')}
          </ul>
          <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
            <a href="${data.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Live Vercel App
            </a>
            <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
              <i class="fa-brands fa-github"></i> GitHub Profile
            </a>
          </div>
        `;
        modalOverlay.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  /* --------------------------------------------------------------------------
     6. CONTACT FORM & FOOTER
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      alert(`Thank you, ${name}! Your message has been sent to jamespenero0134@gmail.com.`);
      contactForm.reset();
    });
  }

  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

});
