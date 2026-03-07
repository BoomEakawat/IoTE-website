/**
 * ฟังก์ชันสำหรับเริ่มต้นการทำงานของ Slider
 * @param {Array} data - อาร์เรย์ของข้อมูล (allAchievements)
 */
function setupFameSlider(data) {
    const track = document.getElementById('fameTrack');
    const prevBtn = document.getElementById('famePrev');
    const nextBtn = document.getElementById('fameNext');
    const modal = document.getElementById('fameModal');
    const modalBody = document.getElementById('fameModalBody');
    const closeBtn = document.getElementById('closeFameModal');

    if (!track || !data || data.length === 0) return;

    let currentIndex = 0;
    let isAnimating = false;
    let cardsPerView = getCardsPerView();
    let cardWidth = 0;
    let gapWidth = 0;

    // ฟังก์ชันคำนวณจำนวนการ์ดที่แสดงผลปัจจุบัน
    function getCardsPerView() {
        if (window.innerWidth > 1024) return 4;
        if (window.innerWidth > 768) return 2;
        return 1;
    }

    // คำนวณขนาดการ์ดและช่องว่าง
    function calculateSizes() {
        const slider = track.querySelector('.slider-card');
        if (!slider) return false;
        
        const styles = window.getComputedStyle(track);
        const gap = styles.gap || '20px';
        gapWidth = parseInt(gap);
        cardWidth = slider.offsetWidth;
        return true;
    }

    // สร้าง HTML สำหรับการ์ด
    function createCardHTML(item, index) {
        const img = (item.images && item.images.length > 0) ? item.images[0] : (item.img || '');
        return `
            <div class="slider-card" data-index="${index}" onclick="handleCardClick(event, ${item.id})">
                <div class="card-container">
                    <div class="card-img-wrapper">
                        <img src="${img}" alt="${item.title}">
                    </div>
                    <div class="card-text">
                        <h3>${item.title}</h3>
                        <p>เพิ่มเติม →</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Init: Clone ข้อมูลหน้าและหลังเพื่อ infinite loop
    function buildSlider() {
        const clonedStart = data.map((item, idx) => createCardHTML(item, -data.length + idx)).join('');
        const mainContent = data.map((item, idx) => createCardHTML(item, idx)).join('');
        const clonedEnd = data.map((item, idx) => createCardHTML(item, data.length + idx)).join('');

        track.innerHTML = clonedStart + mainContent + clonedEnd;
        
        // ตั้งค่าเริ่มต้นให้เริ่มที่ index 0 ในเนื้อหาจริง (ไม่ใช่ clone)
        currentIndex = 0;
        
        // รอให้ images โหลดก่อน
        const images = track.querySelectorAll('img');
        let loadedCount = 0;
        
        if (images.length === 0) {
            updateSliderPosition(false);
            return;
        }

        images.forEach(img => {
            img.onload = () => {
                loadedCount++;
                if (loadedCount === images.length) {
                    calculateSizes();
                    updateSliderPosition(false);
                }
            };
            // Handle broken images
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === images.length) {
                    calculateSizes();
                    updateSliderPosition(false);
                }
            };
        });
    }

    // อัพเดตตำแหน่ง slider
    function updateSliderPosition(animate = true, targetIndex = null) {
        if (!calculateSizes()) return;

        let index = targetIndex !== null ? targetIndex : currentIndex;
        
        // คำนวณตำแหน่งในพิกเซล
        const offset = -(index * (cardWidth + gapWidth));

        if (animate) {
            // ใช้ cubic-bezier สำหรับ smooth animation
            track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        } else {
            track.style.transition = 'none';
        }

        track.style.transform = `translateX(${offset}px)`;
    }

    // Navigate Next
    function slideNext() {
        if (isAnimating) return;
        isAnimating = true;

        currentIndex++;
        updateSliderPosition(true, currentIndex);

        track.addEventListener('transitionend', handleInfiniteLoop, { once: true });
    }

    // Navigate Previous
    function slidePrev() {
        if (isAnimating) return;
        isAnimating = true;

        currentIndex--;
        updateSliderPosition(true, currentIndex);

        track.addEventListener('transitionend', handleInfiniteLoop, { once: true });
    }

    // Handle infinite loop seamlessly
    function handleInfiniteLoop() {
        // หากถึง end clone ให้jump กลับไปที่ real content
        if (currentIndex >= data.length) {
            currentIndex = 0;
            updateSliderPosition(false, currentIndex);
        }
        // หากถึง start clone ให้ jump ไปที่ end ของ real content
        else if (currentIndex < 0) {
            currentIndex = data.length - 1;
            updateSliderPosition(false, currentIndex);
        }

        isAnimating = false;
    }

    // Popup Logic - สร้างฟังก์ชัน global
    window.handleCardClick = (event, id) => {
        event.stopPropagation();
        openFamePopup(id);
    };

    window.openFamePopup = (id) => {
        const item = data.find(i => i.id === id);
        if (!item) return;

        const img = (item.images && item.images.length > 0) ? item.images[0] : (item.img || '');
        const content = item.fullDesc || item.desc;

        modalBody.innerHTML = `
            <img src="${img}" alt="${item.title}">
            <h2>${item.title}</h2>
            <div>${content}</div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Close modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    // Event Listeners
    if (nextBtn) nextBtn.addEventListener('click', slideNext);
    if (prevBtn) prevBtn.addEventListener('click', slidePrev);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close modal on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        const newCardsPerView = getCardsPerView();
        if (newCardsPerView !== cardsPerView) {
            cardsPerView = newCardsPerView;
        }
        calculateSizes();
        updateSliderPosition(false, currentIndex);
    });

    // Initialize
    buildSlider();
}

// เรียกใช้เมื่อโหลดหน้าเว็บเสร็จ (ตรวจสอบว่ามี allAchievements หรือยัง)
document.addEventListener('DOMContentLoaded', () => {
    // หน่วงเวลาเล็กน้อยเพื่อให้แน่ใจว่าโหลด data.js เสร็จแล้ว
    setTimeout(() => {
        if (typeof allAchievements !== 'undefined') {
            setupFameSlider(allAchievements);
        }
    }, 100);
});