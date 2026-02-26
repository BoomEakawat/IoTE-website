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

function toggleDropdown() {
    var content = document.getElementById("dropdown-content");
    var arrow = document.getElementById("dropdown-arrow");
    
    // Toggle the display of the content
    if (content.style.display === "block") {
        content.style.display = "none";
        arrow.style.transform = "rotate(135deg)"; // Arrow points down
        arrow.style.marginTop = "0";
    } else {
        content.style.display = "block";
        arrow.style.transform = "rotate(-45deg)"; // Arrow points up
        arrow.style.marginTop = "6px";
    }
}

// Script สำหรับจัดการ Popup
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('fame-modal');
    const closeBtn = document.querySelector('.close-btn');
    const cards = document.querySelectorAll('.fame-card');
    cards.forEach(card => {
        card.onclick = function() {
            const title = this.querySelector('.fame-title').innerText;
            const img = this.querySelector('img').src;
            const date = this.querySelector('.fame-meta').innerText;
            document.getElementById('modal-title').innerText = title;
            document.getElementById('modal-img').src = img;
            document.getElementById('modal-date').innerText = date;
            
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // ปิด scroll หน้าจอหลัก
        }
    });
    closeBtn.onclick = () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    };
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };
});

const data = {
    '2565': {
        gradRate: '90.41%', jobRate: '93.22%', jobYear: '2564',
        satRate: '87%', satYear: '2564', tuition: '25,000 บาท',
        salary: '28,050', compete: '7', courseSat: '80.4'
    },
    '2564': {
        gradRate: '67.74%', jobRate: '100%', jobYear: '2563',
        satRate: '70.33%', satYear: '2563', tuition: '35,000 บาท',
        salary: '34,000', compete: '8.67', courseSat: '78'
    }
};

function updateDashboard(year) {
    const d = data[year];
    d = {
    '2565': {
        gradRate: '98.41%', 
        jobRate: '93.22%', 
        jobYear: '2564', // ข้อมูลจากปีก่อนหน้า
        satRate: '87%', 
        satYear: '2564', 
        tuition: '25,000 บาท',
        salary: '28,050', 
        compete: '7', 
        courseSat: '80.4'
    },
    '2564': {
        // ข้อมูลจากรูปภาพใหม่ที่คุณเพิ่งส่งมา
        gradRate: '67.74%', 
        jobRate: '100%', 
        jobYear: '2563', 
        satRate: '70.33%', 
        satYear: '2563', 
        tuition: '35,000 บาท',
        salary: '34,000', 
        compete: '8.67', 
        courseSat: '78'
    }
};
    
    // อัปเดตตัวเลข
    document.getElementById('grad-rate').innerText = d.gradRate;
    document.getElementById('job-rate').innerText = d.jobRate;
    document.getElementById('sat-rate').innerText = d.satRate;
    document.getElementById('tuition').innerText = d.tuition;
    document.getElementById('salary').innerText = d.salary;
    document.getElementById('compete').innerText = d.compete;
    document.getElementById('course-sat').innerText = d.courseSat;
    
    // อัปเดตกราฟ (ความกว้าง/ความสูง)
    document.getElementById('grad-bar').style.height = d.gradRate;
    document.getElementById('job-bar').style.width = d.jobRate;
    document.getElementById('sat-bar').style.width = d.satRate;

    // เปลี่ยนสถานะปุ่ม Active
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.includes(year)) btn.classList.add('active');
    });
}

