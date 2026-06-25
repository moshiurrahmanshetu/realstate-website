/**
 * Aurelia Luxury Real Estate HTML Template
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Preloader Loading Animation
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
      }, 600);
    });
  }

  // 2. Sticky Header
  const header = document.querySelector('.main-header');
  if (header) {
    const handleScroll = function () {
      if (window.scrollY > 100) {
        header.classList.add('is-sticky');
      } else {
        header.classList.remove('is-sticky');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on startup
  }

  // 3. Scroll to Top Button
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. Mobile Offcanvas Navigation Dropdowns (Accordion Behavior)
  const dropdownToggleLinks = document.querySelectorAll('.mobile-nav-menu .has-dropdown > a');
  dropdownToggleLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const parent = this.parentElement;
      const submenu = parent.querySelector('.submenu');
      
      if (submenu) {
        // Toggle active status
        const isVisible = window.getComputedStyle(submenu).display !== 'none';
        
        // Hide all sibling submenus for clean accordion behaviour
        const siblings = parent.parentElement.querySelectorAll('.has-dropdown');
        siblings.forEach(function (sibling) {
          if (sibling !== parent) {
            const siblingSub = sibling.querySelector('.submenu');
            const siblingIcon = sibling.querySelector('.dropdown-icon');
            if (siblingSub) siblingSub.style.display = 'none';
            if (siblingIcon) siblingIcon.className = 'dropdown-icon fa-solid fa-chevron-down';
          }
        });

        // Toggle current submenu
        const icon = this.querySelector('.dropdown-icon');
        if (isVisible) {
          submenu.style.display = 'none';
          if (icon) icon.className = 'dropdown-icon fa-solid fa-chevron-down';
        } else {
          submenu.style.display = 'block';
          if (icon) icon.className = 'dropdown-icon fa-solid fa-chevron-up';
        }
      }
    });
  });

  // 5. Global Form Animations & Custom Toast Alerts on Submit
  const luxuryForms = document.querySelectorAll('form');
  luxuryForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      
      if (submitBtn) {
        // Show stylish loading state inside button
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Processing...';
      }

      // Simulate API call and show beautiful customized luxury response notification
      setTimeout(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }

        // Create elegant Toast Notification dynamically
        showLuxuryToast('Success', 'Your request has been sent securely. Our luxury concierge will contact you shortly.');
        form.reset();
      }, 1500);
    });
  });

  // Function to display premium custom luxury toasts
  function showLuxuryToast(title, message) {
    // Check if toast container exists, if not create one
    let toastContainer = document.querySelector('.luxury-toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'luxury-toast-container';
      toastContainer.style.position = 'fixed';
      toastContainer.style.bottom = '30px';
      toastContainer.style.left = '30px';
      toastContainer.style.zIndex = '99999';
      toastContainer.style.display = 'flex';
      toastContainer.style.flexDirection = 'column';
      toastContainer.style.gap = '15px';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'luxury-toast';
    toast.style.backgroundColor = '#111111';
    toast.style.borderLeft = '4px solid #C89B3C';
    toast.style.padding = '20px';
    toast.style.color = '#ffffff';
    toast.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
    toast.style.minWidth = '300px';
    toast.style.maxWidth = '400px';
    toast.style.transform = 'translateX(-120%)';
    toast.style.transition = 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    toast.style.fontFamily = "'Inter', sans-serif";

    toast.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <h6 style="color: #C89B3C; font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 600; margin: 0; letter-spacing: 1px;">${title}</h6>
        <button class="toast-close-btn" style="background: none; border: none; color: #ffffff; cursor: pointer; font-size: 16px;">&times;</button>
      </div>
      <p style="font-size: 13px; color: #aaaaaa; margin: 0; line-height: 1.5;">${message}</p>
    `;

    toastContainer.appendChild(toast);

    // Trigger slide in animation
    setTimeout(function () {
      toast.style.transform = 'translateX(0)';
    }, 100);

    // Close button handler
    const closeBtn = toast.querySelector('.toast-close-btn');
    closeBtn.addEventListener('click', function () {
      dismissToast(toast);
    });

    // Auto dismiss after 5 seconds
    setTimeout(function () {
      dismissToast(toast);
    }, 5000);
  }

  function dismissToast(toast) {
    toast.style.transform = 'translateX(-120%)';
    toast.style.opacity = '0';
    setTimeout(function () {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 500);
  }
});
