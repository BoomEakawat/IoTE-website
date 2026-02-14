document.addEventListener('DOMContentLoaded', () => {
    // 1. Unified Component Loader
    const loadComponent = async (id, filePath, callback) => {
        try {
            const response = await fetch(filePath);
            const html = await response.text();
            const container = document.getElementById(id);
            if (container) {
                container.innerHTML = html;
                if (callback) callback(); // Run logic only after HTML exists
            }
        } catch (error) {
            console.error(`Could not load ${filePath}:`, error);
        }
    };

    // 2. Initialize Components
    loadComponent('navbar-placeholder', '/components/navbar.html', () => {
        initMenu();            
        highlightActiveLink(); 
    });
    
    loadComponent('footer-placeholder', '/components/footer.html');
});

// 3. Centralized Menu Logic
function initMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('menuOverlay');

    // Hamburger Toggle
    if (hamburger && mobileMenu && overlay) {
        const toggleMenu = (state) => {
            const action = state ? 'add' : 'remove';
            hamburger.classList[action]('active');
            mobileMenu.classList[action]('active');
            overlay.classList[action]('active');
        };

        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = hamburger.classList.contains('active');
            toggleMenu(!isActive);
        });

        overlay.addEventListener('click', () => toggleMenu(false));
    }

    // --- MULTI-DROPDOWN LOGIC ---
    // Selects all triggers (Academics, Faculty, etc.)
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');

    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Finds the submenu immediately following the trigger in HTML
            const submenu = trigger.nextElementSibling;

            if (submenu && submenu.classList.contains('mobile-submenu')) {
                // Toggle current submenu
                const isOpen = submenu.classList.toggle('open');
                
                // Update trigger style
                trigger.style.color = isOpen ? 'var(--accent-orange)' : 'white';

                // Optional: Close other open submenus for a cleaner look
                document.querySelectorAll('.mobile-submenu').forEach(other => {
                    if (other !== submenu) {
                        other.classList.remove('open');
                        other.previousElementSibling.style.color = 'white';
                    }
                });
            }
        });
    });
}

function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const allLinks = document.querySelectorAll('.nav-link, .mobile-link');

    allLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath === linkPath || (currentPath === '/' && linkPath === '/index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}