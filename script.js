document.addEventListener('DOMContentLoaded', () => {
    // 1. Function to fetch and insert HTML
    const loadComponent = async (id, filePath, callback) => {
        try {
            const response = await fetch(filePath);
            const html = await response.text();
            document.getElementById(id).innerHTML = html;
            
            // If we have extra logic (like the hamburger), run it now
            if (callback) callback();
        } catch (error) {
            console.error(`Could not load ${filePath}:`, error);
        }
    };

    // 2. Load the Navbar and Footer
    loadComponent('navbar-placeholder', '/components/navbar.html', () => {
        initMenu();            // Your existing menu logic
        highlightActiveLink(); // NEW: Highlight the current page
    });
    loadComponent('footer-placeholder', '/components/footer.html');
});

// 3. Initialize the Hamburger Menu logic AFTER navbar is loaded
function initMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('menuOverlay');

    if (hamburger && mobileMenu && overlay) {
        hamburger.addEventListener('click', (event) => {
            event.stopPropagation();
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
        });

        overlay.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
}

function highlightActiveLink() {
    // Get the current URL path (e.g., /pages/about.html)
    const currentPath = window.location.pathname;
    
    // Select all links in the desktop and mobile menus
    const allLinks = document.querySelectorAll('.nav-link, .mobile-link');
    
    allLinks.forEach(link => {
        // Get the href attribute (e.g., /index.html or /pages/about.html)
        const linkPath = link.getAttribute('href');
    
        // Check if the current URL ends with the link's path
        if (currentPath === linkPath || (currentPath === '/' && linkPath === '/index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}