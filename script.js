const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
    if (cursor) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    }

    const visual = document.querySelector(".profile-card");

    if (visual && window.innerWidth > 900) {
        const x = (window.innerWidth / 2 - e.clientX) / 45;
        const y = (window.innerHeight / 2 - e.clientY) / 45;

        visual.style.transform =
            `translateY(0) rotateY(${-x}deg) rotateX(${y}deg)`;
    }
});

document.addEventListener("mouseleave", () => {
    const visual = document.querySelector(".profile-card");

    if (visual) {
        visual.style.transform = "";
    }
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.12
    }
);

document
    .querySelectorAll(
        ".section-heading, .about-text, .info-box, .timeline-item, .project-card, .skill-category, .education-card, .contact-content, .contact-links"
    )
    .forEach((element) => {
        element.classList.add("reveal");
        observer.observe(element);
    });

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

const style = document.createElement("style");

style.textContent = `
.reveal {
    opacity: 0;
    transform: translateY(35px);
    transition:
        opacity .8s ease,
        transform .8s ease;
}

.reveal.show {
    opacity: 1;
    transform: translateY(0);
}

.cursor {
    position: fixed;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #b400ff;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 20px rgba(180,0,255,.8);
    transition: width .2s, height .2s;
}

@media (max-width: 900px) {
    .cursor {
        display: none;
    }
}
`;

document.head.appendChild(style);