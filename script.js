document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('menuOverlay'); // Select the new overlay

    hamburger.addEventListener('click', (event) => {
        event.stopPropagation(); 
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active'); // Toggle the dimming effect
    });

    // Close menu if user clicks on the dimmed area (the left side)
    overlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
    });

    // Keep your existing mobileLinks listener here...
});