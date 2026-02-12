document.addEventListener('DOMContentLoaded', () => {
    // 1. Select all necessary elements
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const header = document.getElementById('main-header');

    // 2. Toggle Mobile Menu (Open/Close)
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', (event) => {
            // Stop the click from bubbling up to the window (prevents immediate closing)
            event.stopPropagation(); 
            
            // Toggle 'active' class to animate icon and slide menu
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // 3. Close Menu when clicking any Mobile Link
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // 4. Close Menu when clicking outside (on the darkened page area)
    window.addEventListener('click', (event) => {
        // If menu is open and the click is NOT on the menu or hamburger
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(event.target) && 
            !hamburger.contains(event.target)) {
            
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    // 5. Sticky Header Scroll Effect
    // window.addEventListener('scroll', () => {
    //     if (window.scrollY > 50) {
    //         header.classList.add('scrolled');
    //     } else {
    //         header.classList.remove('scrolled');
    //     }
    // });
});