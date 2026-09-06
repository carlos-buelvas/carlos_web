/**
 * Hoja de vida de Carlos (arquitectura multipágina)
 * Lógica compartida: tema claro/oscuro, menú móvil, validación del formulario y utilidades.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initContactForm();
});

/* ==========================================================================
  Gestión del tema claro y oscuro con persistencia
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIconSun = document.getElementById('theme-icon-sun');
  const themeIconMoon = document.getElementById('theme-icon-moon');

  // Comprueba la preferencia guardada o la configuración del sistema.
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add('dark');
    updateThemeIcons(true);
  } else {
    document.body.classList.remove('dark');
    updateThemeIcons(false);
  }

  // Cambia el tema al pulsar el botón correspondiente.
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcons(isDark);
    });
  }

  function updateThemeIcons(isDark) {
    if (themeIconSun && themeIconMoon) {
      if (isDark) {
        themeIconSun.style.display = 'block';
        themeIconMoon.style.display = 'none';
      } else {
        themeIconSun.style.display = 'none';
        themeIconMoon.style.display = 'block';
      }
    }
  }
}

// Expone una función global para cambiar el tema desde otros elementos.
window.cambiarTema = function() {
  const isDark = document.body.classList.toggle('dark');
  try {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  } catch(e) {}
};

/* ==========================================================================
  Navegación móvil mediante menú desplegable
   ========================================================================== */
function initNavigation() {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Cierra el menú cuando se hace clic fuera de él.
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* ==========================================================================
  Validación y envío del formulario de contacto
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nombreInput = document.getElementById('nombre');
  const emailInput = document.getElementById('email');
  const mensajeInput = document.getElementById('mensaje');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Valida el nombre.
    if (!nombreInput.value.trim()) {
      showError(nombreInput, 'Por favor ingresa tu nombre completo.');
      isValid = false;
    } else {
      clearError(nombreInput);
    }

    // Valida el correo electrónico.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showError(emailInput, 'Por favor ingresa tu correo electrónico.');
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, 'Por favor ingresa un correo electrónico válido.');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Valida el mensaje.
    if (!mensajeInput.value.trim()) {
      showError(mensajeInput, 'Por favor escribe un mensaje o motivo de contacto.');
      isValid = false;
    } else if (mensajeInput.value.trim().length < 10) {
      showError(mensajeInput, 'El mensaje debe tener al menos 10 caracteres.');
      isValid = false;
    } else {
      clearError(mensajeInput);
    }

    if (isValid) {
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Enviando...';

      setTimeout(() => {
        showToast('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1000);
    }
  });

  function showError(input, message) {
    const group = input.closest('.form-group');
    let feedback = group.querySelector('.form-feedback');
    if (!feedback) {
      feedback = document.createElement('span');
      feedback.className = 'form-feedback error';
      group.appendChild(feedback);
    }
    feedback.textContent = message;
    feedback.className = 'form-feedback error';
    input.style.borderColor = 'var(--error)';
  }

  function clearError(input) {
    const group = input.closest('.form-group');
    const feedback = group.querySelector('.form-feedback');
    if (feedback) {
      feedback.textContent = '';
      feedback.className = 'form-feedback';
    }
    input.style.borderColor = '';
  }
}

/* ==========================================================================
  Notificación emergente
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--success);">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   Fallback para Imagen de Perfil
   ========================================================================== */
window.handleImageError = function(img) {
  img.style.display = 'none';
  const placeholder = document.getElementById('avatar-placeholder');
  if (placeholder) {
    placeholder.style.display = 'flex';
  }
};
