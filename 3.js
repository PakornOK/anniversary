
// ===================================
// PAKORN ❤️ NATNICHA ANNIVERSARY
// ===================================

// ตั้งค่าข้อมูลของเรา
const ANNIVERSARY_DATE = new Date(2026, 10, 6, 0, 0, 0);

// รหัสผ่านวันครบรอบ
const PASSWORD = "06/07/67";

// ใส่ URL เพลง MP3 ของเราในเครื่องหมายคำพูด
// ตัวอย่าง: "https://example.com/love-song.mp3"
const MUSIC_URL = "";

// ===================================
// ระบบล็อกรหัสผ่าน
// ===================================

const lockScreen = document.getElementById("lockScreen");
const mainContent = document.getElementById("mainContent");
const passwordInput = document.getElementById("passwordInput");
const unlockButton = document.getElementById("unlockButton");
const errorMessage = document.getElementById("errorMessage");

function unlockWebsite() {
    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword === PASSWORD) {
        lockScreen.classList.add("hidden");
        mainContent.classList.remove("hidden");

        errorMessage.textContent = "";

        // เริ่มสร้างหัวใจเมื่อเข้าสู่เว็บไซต์
        startFloatingHearts();

        // อัปเดตตัวนับเวลา
        updateCounter();
    } else {
        errorMessage.textContent =
            "รหัสยังไม่ถูกต้อง ลองใส่วันพิเศษของเราอีกครั้งนะ 💗";

        passwordInput.value = "";
        passwordInput.focus();
    }
}

unlockButton.addEventListener("click", unlockWebsite);

passwordInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        unlockWebsite();
    }
});

// ===================================
// ระบบตัวนับวันครบรอบ
// ===================================

function updateCounter() {
    const now = new Date();
    const difference = ANNIVERSARY_DATE.getTime() - now.getTime();

    let days, hours, minutes, seconds;

    if (difference > 0) {
        // ก่อนวันครบรอบ: นับถอยหลัง
        const totalSeconds = Math.floor(difference / 1000);

        days = Math.floor(totalSeconds / 86400);
        hours = Math.floor((totalSeconds % 86400) / 3600);
        minutes = Math.floor((totalSeconds % 3600) / 60);
        seconds = totalSeconds % 60;

        document.getElementById("counterTitle").textContent =
            "นับถอยหลังสู่วันครบรอบของเรา 💗";

        document.getElementById("counterMessage").textContent =
            "อีกไม่นานก็ถึงวันพิเศษของเราแล้ว!";
    } else {
        // ถึงวันครบรอบแล้ว: นับเวลาที่ผ่านไป
        const elapsed = Math.abs(difference);
        const totalSeconds = Math.floor(elapsed / 1000);

        days = Math.floor(totalSeconds / 86400);
        hours = Math.floor((totalSeconds % 86400) / 3600);
        minutes = Math.floor((totalSeconds % 3600) / 60);
        seconds = totalSeconds % 60;

        document.getElementById("counterTitle").textContent =
            "เราได้ใช้เวลาร่วมกันมาแล้ว 💕";

        document.getElementById("counterMessage").textContent =
            "ขอให้มีวันครบรอบของเราไปอีกหลาย ๆ ปีนะ";
    }

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

// อัปเดตทุก 1 วินาที
setInterval(updateCounter, 1000);

// ===================================
// ปุ่มเริ่มเซอร์ไพรส์
// ===================================

document.getElementById("surpriseButton").addEventListener("click", function() {
    document.getElementById("counter").scrollIntoView({
        behavior: "smooth"
    });

    // พยายามเล่นเพลงเมื่อผู้ใช้กดปุ่ม
    playMusic();
});

// ===================================
// ระบบเพลง
// ===================================

const loveSong = document.getElementById("loveSong");
const musicButton = document.getElementById("musicButton");

if (MUSIC_URL) {
    loveSong.src = MUSIC_URL;
}

async function playMusic() {
    if (!MUSIC_URL) {
        alert("อย่าลืมใส่ลิงก์เพลง MP3 ในตัวแปร MUSIC_URL นะ 💗");
        return;
    }

    try {
        await loveSong.play();
        musicButton.textContent = "🎵 ปิดเพลง";
    } catch (error) {
        musicButton.textContent = "🎵 เปิดเพลง";
        alert("ไม่สามารถเล่นเพลงได้ กรุณาตรวจสอบลิงก์เพลงนะ");
    }
}

musicButton.addEventListener("click", async function() {
    if (!MUSIC_URL) {
        alert("ใส่ลิงก์เพลง MP3 ในตัวแปร MUSIC_URL ก่อนนะ 💗");
        return;
    }

    if (loveSong.paused) {
        await playMusic();
    } else {
        loveSong.pause();
        musicButton.textContent = "🎵 เปิดเพลง";
    }
});

// ===================================
// ระบบเปิดจดหมายรัก
// ===================================

const envelope = document.getElementById("envelope");
const loveMessage = document.getElementById("loveMessage");
const clickHint = document.getElementById("clickHint");

let letterOpened = false;

envelope.addEventListener("click", function() {
    if (letterOpened) return;

    letterOpened = true;

    envelope.classList.add("open");

    clickHint.textContent =
        "จดหมายพิเศษสำหรับ Natnicha 💗";

    // สร้างหัวใจตอนเปิดจดหมาย
    createHeartBurst(25);

    setTimeout(function() {
        loveMessage.classList.add("show");

        clickHint.textContent =
            "Pakorn รัก Natnicha นะ ♡";

        loveMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 900);
});

// ===================================
// ระบบหัวใจลอย
// ===================================

const heartsContainer = document.getElementById("heartsContainer");

const heartList = [
    "💗", "💕", "💖", "💘", "❤️", "🌸", "💞"
];

function createHeart() {
    if (mainContent.classList.contains("hidden")) return;

    const heart = document.createElement("div");

    heart.className = "floating-heart";

    heart.textContent =
        heartList[Math.floor(Math.random() * heartList.length)];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize =
        (15 + Math.random() * 25) + "px";

    const duration = 4 + Math.random() * 5;

    heart.style.animationDuration = duration + "s";

    heartsContainer.appendChild(heart);

    setTimeout(function() {
        heart.remove();
    }, duration * 1000);
}

// สร้างหัวใจจำนวนมากตอนเปิดจดหมาย
function createHeartBurst(amount) {
    for (let i = 0; i < amount; i++) {
        setTimeout(createHeart, i * 100);
    }
}

// เริ่มสร้างหัวใจเป็นระยะ
let heartInterval = null;

function startFloatingHearts() {
    if (heartInterval) return;

    heartInterval = setInterval(createHeart, 700);
}

console.log("Pakorn ❤️ Natnicha Anniversary Website Loaded!");
