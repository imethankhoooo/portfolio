/**
 * Mobile Bottom Navigation Handler
 * Manages active states, animations, and interactions
 */

(function () {
    'use strict';

    // Get current page name from URL - handle both /page and page.html formats
    const currentPath = window.location.pathname;
    let pageName = currentPath.split('/').pop() || 'index.html';

    // Remove .html extension if present for matching
    pageName = pageName.replace('.html', '');

    // Handle empty path (root)
    if (pageName === '' || pageName === 'index') {
        pageName = 'index';
    }

    // Map page names to nav indices (without .html)
    const pageMap = {
        'index': 0,
        '': 0,
        'projects': 1,
        'about': 2,
        'contact': 3
    };

    const activeIndex = pageMap[pageName] ?? 0;

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        const navItems = document.querySelectorAll('.mobile-bottom-nav .nav-item');
        const indicator = document.querySelector('.mobile-bottom-nav .nav-indicator');
        const navContainer = document.querySelector('.mobile-bottom-nav .nav-container');

        if (!navItems.length || !indicator || !navContainer) return;

        // Remove any existing active classes and set the correct one
        navItems.forEach((item, index) => {
            item.classList.remove('active');
            if (index === activeIndex) {
                item.classList.add('active');
            }
        });

        // Position indicator
        function positionIndicator() {
            const activeItem = navItems[activeIndex];
            if (activeItem) {
                const rect = activeItem.getBoundingClientRect();
                const containerRect = navContainer.getBoundingClientRect();
                // Calculate center of active item relative to container
                const offsetX = rect.left - containerRect.left + rect.width / 2;
                indicator.style.transform = `translateX(${offsetX}px) translateX(-50%)`;
            }
        }

        // Initial position
        setTimeout(positionIndicator, 100);
        window.addEventListener('resize', positionIndicator);

        // Add ripple effect on click
        navItems.forEach(item => {
            item.addEventListener('click', function (e) {
                // Create ripple
                const ripple = document.createElement('span');
                ripple.classList.add('nav-ripple');
                this.appendChild(ripple);

                // Position ripple
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';

                // Add press animation
                this.classList.add('pressed');
                setTimeout(() => {
                    this.classList.remove('pressed');
                }, 150);

                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add touch feedback
        navItems.forEach(item => {
            item.addEventListener('touchstart', function () {
                this.classList.add('touch-active');
            }, { passive: true });

            item.addEventListener('touchend', function () {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 100);
            }, { passive: true });

            item.addEventListener('touchcancel', function () {
                this.classList.remove('touch-active');
            }, { passive: true });
        });
    });
})();
