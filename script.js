"use strict";


/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.classList.add("hidden");
        }, 800);
    }

});


/* =========================
   CUSTOM CURSOR
========================= */

const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let cursorX = mouseX;
let cursorY = mouseY;

document.addEventListener("mousemove", event => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    if (cursorDot) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    }

});


function animateCursor() {

    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    if (cursor) {
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
    }

    requestAnimationFrame(animateCursor);
}

animateCursor();


/* =========================
   CURSOR INTERACTION
========================= */

document.querySelectorAll("a, button, .ocean-card, .hobby-card").forEach(element => {

    element.addEventListener("mouseenter", () => {

        if (!cursor) return;

        cursor.style.width = "45px";
        cursor.style.height = "45px";
        cursor.style.borderColor = "rgba(98,234,255,.9)";

    });

    element.addEventListener("mouseleave", () => {

        if (!cursor) return;

        cursor.style.width = "28px";
        cursor.style.height = "28px";
        cursor.style.borderColor = "rgba(98,234,255,.55)";

    });

});


/* =========================
   MOUSE LIGHT
========================= */

document.addEventListener("mousemove", event => {

    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;

    document.documentElement.style.setProperty(
        "--mouse-x",
        `${x}%`
    );

    document.documentElement.style.setProperty(
        "--mouse-y",
        `${y}%`
    );

});


/* =========================
   3D CARD TILT
========================= */

document.querySelectorAll(".tilt-card").forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left -
            rect.width / 2;

        const y =
            event.clientY -
            rect.top -
            rect.height / 2;

        const rotateX =
            -(y / rect.height) * 5;

        const rotateY =
            (x / rect.width) * 5;

        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-4px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(800px) rotateX(0) rotateY(0)";

    });

});


/* =========================
   THEME SWITCH
========================= */

const themeButton =
    document.getElementById("themeButton");

const savedTheme =
    localStorage.getItem("myOceanTheme");

if (savedTheme === "surface") {
    document.body.classList.add("surface-mode");
}


if (themeButton) {

    themeButton.addEventListener("click", () => {

        document.body.classList.toggle("surface-mode");

        const isSurface =
            document.body.classList.contains("surface-mode");

        localStorage.setItem(
            "myOceanTheme",
            isSurface ? "surface" : "abyss"
        );

    });

}


/* =========================
   DEPTH TELEMETRY
========================= */

const depthValue =
    document.getElementById("depthValue");

const statusValue =
    document.getElementById("statusValue");

function updateDepth() {

    if (!depthValue) return;

    const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

    if (maxScroll <= 0) {

        depthValue.textContent = "0000M";

        if (statusValue) {
            statusValue.textContent = "EXPLORING";
        }

        return;
    }

    const progress =
        Math.min(
            Math.max(window.scrollY / maxScroll, 0),
            1
        );

    const depth =
        Math.round(progress * 4500);

    depthValue.textContent =
        `${String(depth).padStart(4, "0")}M`;

    if (statusValue) {

        if (depth < 1000) {
            statusValue.textContent = "SURFACE";
        } else if (depth < 2500) {
            statusValue.textContent = "DESCENDING";
        } else if (depth < 4000) {
            statusValue.textContent = "ABYSS";
        } else {
            statusValue.textContent = "DEEP ABYSS";
        }

    }

}

window.addEventListener(
    "scroll",
    updateDepth,
    { passive: true }
);

window.addEventListener(
    "resize",
    updateDepth
);

updateDepth();


/* =========================
   REVEAL ON SCROLL
========================= */

const revealElements =
    document.querySelectorAll(
        ".ocean-card, .hobby-card, .stat-card, .timeline-item, .profile-section, .contact-console"
    );

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity .7s ease, transform .7s ease";

    revealObserver.observe(element);

});


/* =========================
   CLICK RIPPLE
========================= */

document.addEventListener("click", event => {

    const ripple =
        document.createElement("div");

    ripple.style.position = "fixed";
    ripple.style.left = `${event.clientX}px`;
    ripple.style.top = `${event.clientY}px`;

    ripple.style.width = "10px";
    ripple.style.height = "10px";

    ripple.style.border =
        "1px solid rgba(98,234,255,.7)";

    ripple.style.borderRadius = "50%";

    ripple.style.pointerEvents = "none";
    ripple.style.zIndex = "998";

    ripple.style.transform =
        "translate(-50%, -50%)";

    document.body.appendChild(ripple);

    ripple.animate(
        [
            {
                width: "10px",
                height: "10px",
                opacity: 0.8
            },
            {
                width: "180px",
                height: "180px",
                opacity: 0
            }
        ],
        {
            duration: 800,
            easing: "cubic-bezier(.2,.7,.2,1)"
        }
    ).onfinish = () => {
        ripple.remove();
    };

});


/* =========================
   OCEAN EASTER EGG
========================= */

let typed = "";

document.addEventListener("keydown", event => {

    typed += event.key.toLowerCase();

    if (typed.length > 20) {
        typed = typed.slice(-20);
    }

    if (typed.includes("ocean")) {

        document.body.classList.add("ocean-pulse");

        setTimeout(() => {
            document.body.classList.remove(
                "ocean-pulse"
            );
        }, 1200);

        typed = "";

    }

});


/* =========================
   PAGE TRANSITION
========================= */

document.querySelectorAll("a").forEach(link => {

    const href = link.getAttribute("href");

    if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("http")
    ) {
        return;
    }

    link.addEventListener("click", event => {

        event.preventDefault();

        document.body.classList.add(
            "page-leaving"
        );

        setTimeout(() => {
            window.location.href = href;
        }, 180);

    });

});
