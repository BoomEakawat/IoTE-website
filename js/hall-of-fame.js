const allAchievements = [
    { id: 1, title: "CARC 2025: การแข่งขันสร้างและควบคุมหุ่นยนต์อัตโนมัติ", desc: "รองชนะเลิศอันดับที่ 1 และ 2 และรางวัลชมเชย", fullDesc: "vvc11111111", date: "20/06/2025", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500" },
    { id: 2, title: "TESA Top Gun Rally 2024", desc: "รางวัลชนะเลิศระดับประเทศ", fullDesc: "vvc", date: "16/05/2025", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500" },
    { id: 3, title: "IOT Super Natural Rubber Hackathon 2024", desc: "รางวัลชมเชยการพัฒนาเทคโนโลยี", fullDesc: "vvc", date: "05/02/2025", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500" },
    { id: 4, title: "The 2nd ASEAN Cyber Shield Hacking Contest", desc: "รองชนะเลิศอันดับที่ 3 ระดับภูมิภาคเอเชียตะวันออกเฉียงใต้", fullDesc: "vvc", date: "22/12/2024", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500" },
    { id: 5, title: "World Robot Olympiad 2019 (WRO 2019)", desc: "อันดับที่ 8 ของโลก ระดับอุดมศึกษา", fullDesc: "vvc", date: "01/05/2022", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500" },
    { id: 6, title: "TurtleBOT3 Thailand Championship 2019", desc: "รางวัลชนะเลิศ และ รองชนะเลิศอันดับที่ 1", fullDesc: "vvc", date: "03/11/2019", img: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=500" },
    { id: 7, title: "Smart City Solution Challenge 2023", desc: "รางวัลนวัตกรรมดีเด่นด้านการจัดการเมืองอัจฉริยะ", fullDesc: "vvc", date: "15/09/2023", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500" },
    { id: 8, title: "Embedded System Design Contest 2022", desc: "รางวัลเหรียญทองระดับอุดมศึกษา", fullDesc: "vvc", date: "10/08/2022", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500" },
    { id: 9, title: "National Software Contest (NSC) 2024", desc: "รางวัลที่ 1 สาขาโปรแกรมเพื่อความบันเทิง", fullDesc: "vvc", date: "12/03/2024", img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500" },
    { id: 10, title: "AI For All Hackathon 2023", desc: "รางวัล Best Innovation Award", fullDesc: "vvc", date: "25/11/2023", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500" },
    { id: 11, title: "RoboCup Asia-Pacific 2022", desc: "รองชนะเลิศอันดับ 1 สาขา @Home Education", fullDesc: "vvc", date: "18/06/2022", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500" },
    { id: 12, title: "Startup Thailand League 2024", desc: "รางวัลชนะเลิศระดับภูมิภาค", fullDesc: "vvc", date: "05/04/2024", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500" },
    { id: 13, title: "Hackathon IoT KMITL 2023", desc: "รางวัลชนะเลิศการออกแบบเซนเซอร์", fullDesc: "vvc", date: "14/01/2023", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?w=500" },
    { id: 14, title: "Robot Soccer Championship 2022", desc: "รองชนะเลิศอันดับที่ 2", fullDesc: "vvc", date: "20/11/2022", img: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?w=500" },
    { id: 15, title: "Deep Tech Innovation 2021", desc: "รางวัลชมเชยด้านการแพทย์", fullDesc: "vvc", date: "12/10/2021", img: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500" },
    { id: 16, title: "KMITL Engineering Expo 2026", desc: "รางวัลชนะเลิศนวัตกรรม IoT เพื่อสิ่งแวดล้อมระดับอุดมศึกษา", fullDesc: "vvc", date: "02/03/2026", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500" }
];

const itemsPerPage = 12;
let currentPage = 1;

const grid = document.getElementById("fameGrid");
const pagination = document.getElementById("pagination");
const modalOverlay = document.getElementById("modalOverlay");
const modalBody = document.getElementById("modalBody");

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