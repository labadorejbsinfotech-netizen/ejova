/* =========================================================
   EJOVA - MAIN JAVASCRIPT
   Where Ideas Become Experience.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. SMOOTH SCROLLING
       ===================================================== */

    const navigationLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    navigationLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       2. HEADER SCROLL EFFECT
       ===================================================== */

    const header = document.querySelector(".site-header");

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    updateHeader();

    window.addEventListener("scroll", updateHeader);


    /* =====================================================
       3. SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".service-card, .feature-item, .about-card, .stat-item, .contact-item"
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       4. ACTIVE NAVIGATION LINK
       ===================================================== */

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach((link) => {

            link.classList.remove("active");

            const linkTarget = link.getAttribute("href");

            if (linkTarget === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    }

    updateActiveNavigation();

    window.addEventListener("scroll", updateActiveNavigation);


    /* =====================================================
       5. HERO CARD 3D EFFECT
       ===================================================== */

    const heroCard = document.querySelector(".hero-card");

    if (heroCard) {

        heroCard.addEventListener("mousemove", (event) => {

            const rect = heroCard.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -5;

            const rotateY =
                ((x - centerX) / centerX) * 5;

            heroCard.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        });


        heroCard.addEventListener("mouseleave", () => {

            heroCard.style.transform =
                "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";

        });

    }


    /* =====================================================
       6. SERVICE CARD HOVER
       ===================================================== */

    const serviceCards = document.querySelectorAll(
        ".service-card"
    );

    serviceCards.forEach((card) => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("hovered");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("hovered");
        });

    });


    /* =====================================================
       7. BUTTON RIPPLE EFFECT
       ===================================================== */

    const buttons = document.querySelectorAll(
        ".primary-button, .secondary-button, .nav-button"
    );

    buttons.forEach((button) => {

        button.addEventListener("click", (event) => {

            const ripple = document.createElement("span");

            ripple.classList.add("button-ripple");

            const rect = button.getBoundingClientRect();

            const size = Math.max(
                rect.width,
                rect.height
            );

            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;

            ripple.style.left =
                `${event.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${event.clientY - rect.top - size / 2}px`;

            button.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });


    /* =====================================================
       8. EMAIL LINK
       ===================================================== */

    const emailLinks = document.querySelectorAll(
        'a[href^="mailto:"]'
    );

    emailLinks.forEach((link) => {

        link.addEventListener("click", () => {

            console.log(
                "Thank you for contacting EJOVA!"
            );

        });

    });


    /* =====================================================
       9. CURRENT YEAR
       ===================================================== */

    const footerYear = document.querySelector(
        ".footer-bottom p"
    );

    if (footerYear) {

        const currentYear = new Date().getFullYear();

        footerYear.textContent =
            `© ${currentYear} EJOVA. All rights reserved.`;

    }


    /* =====================================================
       10. EJOVA CONSOLE MESSAGE
       ===================================================== */

    console.log(
        "%c EJOVA ",
        "background: #c9a96e; color: #101827; font-size: 20px; font-weight: bold; padding: 8px 15px;"
    );

    console.log(
        "Where Ideas Become Experience."
    );

});