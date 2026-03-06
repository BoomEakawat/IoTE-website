const allAchievements = [
    { 
    id: 1, 
    title: "Chuo University and KMITL IoTE Research Presentation 2026", 
    images: [
        "/images/hall-of-fame/1.1.jpg",
        "/images/hall-of-fame/1.2.jpg",
    ],
    desc: "การนำเสนอผลงานวิจัยและการแลกเปลี่ยนทางวิชาการระหว่างนักศึกษา Chuo University และ สจล.",
    fullDesc: `📣✨ เมื่อวันที่ 9 ก.พ. ที่ผ่านมา นักศึกษาจาก Chuo University จำนวน 17 คน และนักศึกษาภาควิชาวิศวกรรมไอโอทีและสารสนเทศ คณะวิศวกรรมศาสตร์ สจล. จำนวน 17 คน ได้ร่วมกันนำเสนอหัวข้องานวิจัยของตนเอง รวมทั้งแลกเปลี่ยนมุมมองและแนวคิดทางวิชาการร่วมกันอย่างเข้มข้นและสร้างสรรค์ 🤝📚

    🎤 โดยได้รับเกียรติจาก
    👨‍🏫 Prof. Dr. Jun Lio (Chuo University)
    👩‍🏫 ผศ.ดร.เกล็ดดาว สัตย์เจริญ (ภาควิชาวิศวกรรมไอโอทีและสารสนเทศ คณะวิศวกรรมศาสตร์ สจล.)
    เป็นผู้ดำเนินรายการและให้ข้อเสนอแนะทางวิชาการอย่างใกล้ชิด ✅🧠

    บรรยากาศเต็มไปด้วยพลังการเรียนรู้และความร่วมมือ 💡🙌 นักศึกษาได้แลกเปลี่ยนมุมมองทางวิจัยร่วมกันอย่างน่าสนใจ และต่อยอดแนวคิดเพื่อพัฒนางานวิจัยให้มีคุณภาพยิ่งขึ้น 🚀✨

    ขอขอบคุณทุกท่านที่ร่วมสร้างพื้นที่แลกเปลี่ยนทางวิชาการที่มีคุณค่า และเป็นกำลังใจให้นักศึกษาพัฒนางานวิจัยต่อไปอย่างต่อเนื่อง 💪🌟`,
        date: "09/02/2026" 
    },

    { 
    id: 2, 
    title: "รางวัลรองชนะเลิศอันดับที่ 1 และ Popular Vote รายการ Hackathon ปราบซื้อเสียง", 
    images: [
        "/images/hall-of-fame/2.1.jpg",
        "/images/hall-of-fame/2.2.jpg",
    ],
    desc: "ขอแสดงความยินดีกับทีม DemocraSee นักศึกษาภาควิชาวิศวกรรมไอโอทีและสารสนเทศ สจล. ในการแข่งขันของ กกต.",
    fullDesc: `🎉✨ ขอแสดงความยินดีกับนักศึกษา ภาควิชาวิศวกรรมไอโอทีและสารสนเทศ คณะวิศวกรรมศาสตร์ สจล. ที่เข้าร่วมการแข่งขัน “Hackathon ปราบซื้อเสียง” ของ กกต. ณ มหาวิทยาลัยธรรมศาสตร์ ศูนย์รังสิต และสามารถคว้ารางวัลมาได้สำเร็จ 🏆

🥈 รางวัลรองชนะเลิศอันดับที่ 1
🗳️ รางวัล Popular Vote

👥 สมาชิกทีม DemocraSee:
• นายวีระภัทร แสงอรุณ
• นายพรเกียรติ รอบคอบ
• นายณัฐพัชร์ เจียรยุทธศักดิ์
• นายพันวินทร์ ชุติกาญจนโรจน์
• นายโกเมศ ประกอบผล

💡 การแข่งขันมุ่งเน้นการนำเสนอ “ไอเดีย วิธีการ และนวัตกรรม” เพื่อร่วมแก้ไขปัญหาการซื้อเสียง สำหรับประชาชนและ กกต. อย่างสร้างสรรค์และเป็นรูปธรรม 🧠🚀

ขอชื่นชมความตั้งใจและศักยภาพของนักศึกษาทุกคนที่ร่วมกันสร้างผลงานยอดเยี่ยม ขอเป็นกำลังใจให้พัฒนาต่อและคว้าความสำเร็จในเวทีต่อไป 💪🌟`,
    date: "06/03/2026" 
    },
];

const itemsPerPage = 12;
let currentPage = 1;

const grid = document.getElementById("fameGrid");
const pagination = document.getElementById("pagination");
const modalOverlay = document.getElementById("modalOverlay");
const modalBody = document.getElementById("modalBody");

// เริ่มต้นการทำงาน
renderGrid(currentPage);
renderPagination();

fetch('/components/navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading navbar:', error));

fetch('/components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading navbar:', error));

// ฟังก์ชันแสดงการ์ด
function renderGrid(page) {
    grid.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    allAchievements.slice(start, end).forEach(item => {
        const card = document.createElement("div");
        card.className = "fame-card";
        card.innerHTML = `
            <div class="fame-img-box">
                <img src="${item.img}" alt="${item.title}">
            </div>
            <div class="fame-info">
                <h3 class="fame-title">${item.title}</h3>
                <div class="fame-description">${item.desc}</div>
                <div class="fame-footer">🕒 ${item.date}</div>
            </div>
        `;
        card.onclick = () => openModal(item);
        grid.appendChild(card);
    });
}

/*
// ฟังก์ชันเปิด Modal
function openModal(item) {
    modalBody.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <div class="modal-text">
            <h2>${item.title}</h2>
            <p>${item.fullDesc}</p>
        </div>
    `;
    modalOverlay.style.display = "flex";
    document.body.style.overflow = "hidden"; // ปิดการ scroll หน้าหลัก
}

// ฟังก์ชันปิด Modal
function closeModal() {
    modalOverlay.style.display = "none";
    document.body.style.overflow = "auto"; // คืนค่า scroll หน้าหลัก
}
*/

// ปิดเมื่อคลิกที่พื้นหลัง (Overlay)
modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
};

// ฟังก์ชันสร้างปุ่มเปลี่ยนหน้า
function renderPagination() {
    const totalPages = Math.ceil(allAchievements.length / itemsPerPage);
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("span");
        btn.className = `page-item ${i === currentPage ? 'active' : ''}`;
        btn.innerText = i;
        btn.onclick = () => {
            currentPage = i;
            renderGrid(i);
            renderPagination(); // อัปเดตสถานะปุ่ม active
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        pagination.appendChild(btn);
    }
}



// hall-of-fame.js

function openModal(item) {
    const modalOverlay = document.getElementById("modalOverlay");
    const modalBody = document.getElementById("modalBody");
    
    modalBody.innerHTML = `
        <img src="${item.img}" alt="${item.title}" style="width:100%; display:block;">
        <div class="modal-text" style="padding: 30px;">
            <h2 style="color: var(--primary-orange); margin-top:0;">${item.title}</h2>
            <p>${item.fullDesc}</p>
        </div>
    `;
    
    modalOverlay.style.display = "flex"; // Triggers the centering
    document.body.style.overflow = "hidden"; // Stop background scroll
}
// Existing closeModal function for reference
function closeModal() {
    modalOverlay.style.display = "none";
    document.body.style.overflow = "auto";
}


// Add event listener for the close button
document.getElementById("closeBtn").onclick = function() {
    document.getElementById("modalOverlay").style.display = "none";
    document.body.style.overflow = "auto";
};

// At the bottom of your file
const closeBtn = document.getElementById("closeBtn");

closeBtn.onclick = function() {
    closeModal(); // Calls your existing function to hide the modal
};

let currentImgIndex = 0;
let currentImages = [];

function openModal(item) {
    // Check if the item has an array of images; if not, wrap the single img in an array
    currentImages = Array.isArray(item.images) ? item.images : [item.img];
    currentImgIndex = 0;

    showSlide();

    document.getElementById("modalOverlay").style.display = "flex";
    document.body.style.overflow = "hidden";
}

function showSlide() {
    const modalBody = document.getElementById("modalBody");
    const item = allAchievements.find(a => 
        (a.images && a.images.includes(currentImages[0])) || a.img === currentImages[0]
    );

    // ตรวจสอบว่าโครงสร้าง HTML สะอาด ไม่มี inline style มาล็อคความสูง
    modalBody.innerHTML = `
        <div class="modal-image-wrapper">
            <img src="${currentImages[currentImgIndex]}" alt="${item.title}">
        </div>
        <div class="modal-text">
            <h2>${item.title}</h2>
            <p>${item.fullDesc}</p>
        </div>
    `;

    const navButtons = document.querySelectorAll('.slide-nav');
    navButtons.forEach(btn => btn.style.display = currentImages.length > 1 ? 'block' : 'none');
}
// Button Events
document.getElementById("nextSlide").onclick = (e) => {
    e.stopPropagation();
    currentImgIndex = (currentImgIndex + 1) % currentImages.length;
    showSlide();
};

document.getElementById("prevSlide").onclick = (e) => {
    e.stopPropagation();
    currentImgIndex = (currentImgIndex - 1 + currentImages.length) % currentImages.length;
    showSlide();
};

// ฟังก์ชันแสดงการ์ด (Grid)
function renderGrid(page) {
    grid.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    allAchievements.slice(start, end).forEach(item => {
        const card = document.createElement("div");
        card.className = "fame-card";

        // --- แก้ไขตรงนี้ ---
        // เช็คว่าถ้ามี images array ให้ใช้รูปแรก (index 0) ถ้าไม่มีให้ลองใช้ item.img เดิม
        const displayImg = (item.images && item.images.length > 0) ? item.images[0] : item.img;
        
        card.innerHTML = `
            <div class="fame-img-box">
                <img src="${displayImg}" alt="${item.title}">
            </div>
            <div class="fame-info">
                <h3 class="fame-title">${item.title}</h3>
                <div class="fame-description">${item.desc}</div>
                <div class="fame-footer">🕒 ${item.date}</div>
            </div>
        `;
        card.onclick = () => openModal(item);
        grid.appendChild(card);
    });
}

