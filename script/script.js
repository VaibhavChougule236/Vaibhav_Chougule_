const root = document.documentElement;
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const themeToggle = document.getElementById("themeToggle");

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
});

new Typed("#typed-backend", {
    strings: ["Java", "Spring Boot", "REST APIs", "Security"],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
});

new Typed("#typed-frontend", {
    strings: ["HTML", "CSS", "JavaScript", "UI Systems"],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
});

new Typed("#typed-db", {
    strings: ["MySQL", "PostgreSQL", "JPA", "Hibernate"],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
});

new Typed("#typed-devops", {
    strings: ["Docker", "CI/CD", "Cloud Ready"],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
});


let latestScrollY = 0;
let ticking = false;

function updateAurora() {
    const scrollRatio = Math.min(latestScrollY / window.innerHeight, 1);

    document.body.style.setProperty("--g1y", `${10 + scrollRatio * 6}%`);
    document.body.style.setProperty("--g2y", `${20 + scrollRatio * 4}%`);
    document.body.style.setProperty("--g3y", `${90 - scrollRatio * 6}%`);

    ticking = false;
}

window.addEventListener("scroll", () => {
    latestScrollY = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(updateAurora);
        ticking = true;
    }
});


const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

const observer = new IntersectionObserver(
    entries => {
        let mostVisibleSection = null;
        let maxRatio = 0;

        entries.forEach(entry => {
            if (entry.intersectionRatio > maxRatio) {
                maxRatio = entry.intersectionRatio;
                mostVisibleSection = entry.target;
            }
        });

        if (mostVisibleSection) {
            navLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href").slice(1) === mostVisibleSection.id
                );
            });
        }
    },
    {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-80px 0px -40% 0px"
    }
);

sections.forEach(section => observer.observe(section));



const navLinksMobile = document.querySelectorAll(".nav a");

navLinksMobile.forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});



const revealSections = document.querySelectorAll("section");

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.2 }
);

revealSections.forEach(sec => {
    sec.classList.add("section-reveal");
    revealObserver.observe(sec);
});


/* ================= OPEN SOURCE IMAGE CAROUSEL ================= */

const carouselImages = document.querySelectorAll(".carousel-image");
const popup = document.getElementById("imagePopup");
const popupImg = document.getElementById("popupImage");
const popupClose = document.getElementById("popupClose");

let carouselInterval;

/* ================= OPEN POPUP ================= */

carouselImages.forEach(img => {
    img.addEventListener("click", (e) => {
        const clickedSrc = e.currentTarget.getAttribute("src");

        // Stop carousel while popup is open
        clearInterval(carouselInterval);

        popup.classList.add("active");
        popupImg.src = clickedSrc;
        popupImg.alt = "Expanded view";
    });
});

/* ================= CLOSE POPUP ================= */

function closePopup() {
    popup.classList.remove("active");
    popupImg.src = "";

    // Resume carousel
    startCarousel();
}

popupClose.addEventListener("click", closePopup);

popup.addEventListener("click", e => {
    if (e.target === popup) closePopup();
});

document.addEventListener("keydown", e => {
    if (e.key === "Escape") closePopup();
});


let currentImage = 0;

function showNextImage() {
    carouselImages[currentImage].classList.remove("active");
    currentImage = (currentImage + 1) % carouselImages.length;
    carouselImages[currentImage].classList.add("active");
}

function startCarousel() {
    carouselInterval = setInterval(showNextImage, 2500);
}

startCarousel();
/* ================= END OPEN SOURCE IMAGE CAROUSEL ================= */


/* ================= CERTIFICATE POPUP ================= */

const certButtons = document.querySelectorAll(".view-cert-btn");
const certPopup = document.getElementById("certificatePopup");
const certPopupImg = document.getElementById("certPopupImg");
const certPopupTitle = document.getElementById("certPopupTitle");
const certPopupOrg = document.getElementById("certPopupOrg");
const certPopupDesc = document.getElementById("certPopupDesc");
const certPopupClose = document.getElementById("certPopupClose");

certButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".certificate-card");
        const img = card.querySelector(".cert-img");

        certPopupImg.src = img.currentSrc || img.src;
        certPopupImg.alt = img.alt;

        certPopupTitle.textContent = card.querySelector("h3").textContent;
        certPopupOrg.textContent = card.querySelector(".certificate-org").textContent;
        certPopupDesc.textContent = btn.dataset.desc;

        certPopup.classList.add("active");
    });
});

function closeCertPopup() {
    certPopup.classList.remove("active");
    certPopupImg.src = "";
}

certPopupClose.addEventListener("click", closeCertPopup);

certPopup.addEventListener("click", e => {
    if (e.target === certPopup) closeCertPopup();
});

document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeCertPopup();
});


/* ================= LEADERSHIP IMAGE CAROUSELS ================= */

document.querySelectorAll(".leadership-surface").forEach(surface => {
    const images = surface.querySelectorAll(".lead-image");
    let index = 0;

    setInterval(() => {
        images[index].classList.remove("active");
        index = (index + 1) % images.length;
        images[index].classList.add("active");
    }, 3000);
});

/* ================= BLOG CAROUSELS (ISOLATED) ================= */

document.querySelectorAll(".blog-card").forEach(card => {
    const images = card.querySelectorAll(".blog-image");
    let index = 0;

    if (images.length <= 1) return;

    setInterval(() => {
        images[index].classList.remove("active");
        index = (index + 1) % images.length;
        images[index].classList.add("active");
    }, 3000);
});

/* ================= READ MORE ================= */

document.querySelectorAll(".blog-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".blog-card");
        card.classList.toggle("expanded");

        btn.textContent = card.classList.contains("expanded")
            ? "Show less"
            : "Read more";
    });
});


document.getElementById("year").textContent = new Date().getFullYear();


document.querySelectorAll('.view-cert-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('certPopupTitle').textContent = btn.dataset.title;
        document.getElementById('certPopupOrg').textContent = btn.dataset.org;
        document.getElementById('certPopupDate').textContent = btn.dataset.date;
        document.getElementById('certPopupDesc').textContent = btn.dataset.desc;
        document.getElementById('certPopupImg').src = btn.dataset.img;
        document.getElementById('certPopupUrl').href = btn.dataset.url;

        document.getElementById('certificatePopup').classList.add('active');
    });
});

document.getElementById('certPopupClose').addEventListener('click', () => {
    document.getElementById('certificatePopup').classList.remove('active');
});

// EMAILJS

(function () {
    emailjs.init("Gs0ZXQu9DDewzeiHv"); // 🔑 replace with your EmailJS public key
})();

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector("button");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    emailjs.sendForm(
        "service_rus3ke9",
        "template_hnivty7",
        this
    ).then(
        () => {
            alert("✅ Message sent successfully!");
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
        },
        (error) => {
            alert("❌ Failed to send message. Please try again.");
            console.error("EmailJS Error:", error);
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
        }
    );
});


document.body.classList.add("theme-transition");

setTimeout(() => {
    document.body.classList.remove("theme-transition");
}, 500);
