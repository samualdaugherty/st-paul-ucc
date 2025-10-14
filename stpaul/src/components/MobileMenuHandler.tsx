'use client';

import { useEffect } from 'react';

/**
 * Simple mobile menu handler to replace Webflow's navigation JS
 */
export default function MobileMenuHandler() {
  useEffect(() => {
    const menuButton = document.querySelector('.menu-button');
    const navMenu = document.querySelector('.nav-menu-2');
    const navBar = document.querySelector('.nav-bar');
    
    if (menuButton && navMenu) {
      const toggleMenu = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Check if menu is open by checking for the data attribute
        const isOpen = navMenu.hasAttribute('data-nav-menu-open');
        
        if (isOpen) {
          // Close menu
          navMenu.removeAttribute('data-nav-menu-open');
          menuButton.classList.remove('w--open');
          if (navBar) navBar.classList.remove('w--open');
        } else {
          // Open menu
          navMenu.setAttribute('data-nav-menu-open', '');
          menuButton.classList.add('w--open');
          if (navBar) navBar.classList.add('w--open');
        }
      };

      // Use capture phase to ensure we get the event
      menuButton.addEventListener('click', toggleMenu, true);

      // Close menu when clicking on nav links
      const navLinks = navMenu.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.removeAttribute('data-nav-menu-open');
          menuButton.classList.remove('w--open');
          if (navBar) navBar.classList.remove('w--open');
        });
      });

      return () => {
        menuButton.removeEventListener('click', toggleMenu, true);
      };
    }
  }, []);

  return null;
}

