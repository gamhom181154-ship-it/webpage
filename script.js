/* =========================================================
   MY OCEAN // ABYSSAL INTERFACE
   JAVASCRIPT CONTROL SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       LOADER
    ====================================================== */

    const loader =
        document.getElementById("loader");

    if (loader) {

        setTimeout(() => {

            loader.classList.add("loaded");

        }, 1250);

    }


    /* =====================================================
       CUSTOM CURSOR
    ====================================================== */

    const cursorCore =
        document.querySelector(".cursor-core");

    const cursorRing =
        document.querySelector(".cursor-ring");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;


    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        if (cursorCore) {

            cursorCore.style.transform =
                `translate3d(${mouseX}px, ${mouseY}px, 0)`;

        }

    });


    function animateCursor() {

        ringX +=
            (mouseX - ringX) * 0.14;

        ringY +=
            (mouseY - ringY) * 0.14;

        if (cursorRing) {

            cursorRing.style.transform =
                `translate3d(${ringX}px, ${ringY}px, 0)`;

        }

        requestAnimationFrame(animateCursor);

    }

    animateCursor();


    /* =====================================================
       CURSOR HOVER
    ====================================================== */

    const interactiveElements =
        document.querySelectorAll(
            "a, button, .tilt-card, .hobby-card"
        );


    interactiveElements.forEach((element) => {

        element.addEventListener(
            "mouseenter",
            () => {

                document.body.classList.add(
                    "cursor-hover"
                );

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                document.body.classList.remove(
                    "cursor-hover"
                );

            }
        );

    });


    /* =====================================================
       WATER CLICK RIPPLE
    ====================================================== */

    document.addEventListener("click", (event) => {

        const ripple =
            document.createElement("div");

        ripple.className =
            "water-ripple";

        ripple.style.left =
            `${event.clientX}px`;

        ripple.style.top =
            `${event.clientY}px`;

        document.body.appendChild(ripple);


        setTimeout(() => {

            ripple.remove();

        }, 850);

    });


    /* =====================================================
       MARINE PARTICLES
    ====================================================== */

    const particleContainer =
        document.getElementById(
            "marineParticles"
        );


    if (particleContainer) {

        const particleCount =
            window.innerWidth < 700
                ? 45
                : 100;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            const particle =
                document.createElement("span");

            particle.className =
                "marine-particle";


            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.top =
                `${Math.random() * 110}%`;

            particle.style.setProperty(
                "--drift",
                `${(Math.random() - .5) * 100}px`
            );

            particle.style.animationDuration =
                `${8 + Math.random() * 15}s`;

            particle.style.animationDelay =
                `${-Math.random() * 15}s`;

            particle.style.opacity =
                `${.15 + Math.random() * .55}`;

            particleContainer.appendChild(
                particle
            );

        }

    }


    /* =====================================================
       BUBBLES
    ====================================================== */

    const bubbleContainer =
        document.getElementById(
            "bubbleField"
        );


    if (bubbleContainer) {

        const bubbleCount =
            window.innerWidth < 700
                ? 15
                : 35;


        for (
            let i = 0;
            i < bubbleCount;
            i++
        ) {

            const bubble =
                document.createElement("span");

            bubble.className =
                "bubble";


            bubble.style.left =
                `${Math.random() * 100}%`;

            bubble.style.setProperty(
                "--size",
                `${2 + Math.random() * 8}px`
            );

            bubble.style.setProperty(
                "--duration",
                `${8 + Math.random() * 14}s`
            );

            bubble.style.setProperty(
                "--sway",
                `${(Math.random() - .5) * 100}px`
            );

            bubble.style.animationDelay =
                `${-Math.random() * 15}s`;

            bubbleContainer.appendChild(
                bubble
            );

        }

    }


    /* =====================================================
       BIOLUMINESCENCE
    ====================================================== */

    const bioContainer =
        document.getElementById(
            "bioluminescence"
        );


    if (bioContainer) {

        const bioCount =
            window.innerWidth < 700
                ? 12
                : 28;


        for (
            let i = 0;
            i < bioCount;
            i++
        ) {

            const dot =
                document.createElement("span");

            dot.className =
                "bio-dot";


            dot.style.left =
                `${Math.random() * 100}%`;

            dot.style.top =
                `${30 + Math.random() * 65}%`;

            dot.style.setProperty(
                "--size",
                `${1 + Math.random() * 4}px`
            );

            dot.style.setProperty(
                "--duration",
                `${1.5 + Math.random() * 3}s`
            );

            dot.style.animationDelay =
                `${-Math.random() * 3}s`;

            bioContainer.appendChild(
                dot
            );

        }

    }


    /* =====================================================
       DISTANT MARINE LIFE
    ====================================================== */

    const marineLife =
        document.getElementById(
            "marineLife"
        );


    if (marineLife) {

        const creatureCount =
            window.innerWidth < 700
                ? 5
                : 12;


        for (
            let i = 0;
            i < creatureCount;
            i++
        ) {

            const creature =
                document.createElement("div");

            creature.className =
                "creature";


            creature.style.left =
                `${-15 - Math.random() * 20}%`;

            creature.style.top =
                `${15 + Math.random() * 65}%`;

            creature.style.setProperty(
                "--y",
                `${Math.random() * 40 - 20}px`
            );

            creature.style.setProperty(
                "--rise",
                `${Math.random() * 120 - 60}px`
            );

            creature.style.setProperty(
                "--duration",
                `${35 + Math.random() * 45}s`
            );

            creature.style.animationDelay =
                `${-Math.random() * 40}s`;

            marineLife.appendChild(
                creature
            );

        }

    }


    /* =====================================================
       SCROLL DEPTH
    ====================================================== */

    const depthValue =
        document.getElementById(
            "depthValue"
        );

    const depthMarker =
        document.querySelector(
            ".depth-marker"
        );

    const pressureValue =
        document.getElementById(
            "pressureValue"
        );

    const temperatureValue =
        document.getElementById(
            "temperatureValue"
        );

    const signalValue =
        document.getElementById(
            "signalValue"
        );


    function updateDepth() {

        const scrollTop =
            window.scrollY;

        const maxScroll =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            maxScroll > 0
                ? Math.min(
                    1,
                    Math.max(
                        0,
                        scrollTop / maxScroll
                    )
                )
                : 0;


        const depth =
            Math.round(
                progress * 4500
            );


        if (depthValue) {

            depthValue.textContent =
                depth.toLocaleString();

        }


        if (depthMarker) {

            depthMarker.style.top =
                `${progress * 163}px`;

        }


        /*
         * Approximate cinematic telemetry.
         */

        const pressure =
            1 + depth * 0.1;


        const temperature =
            Math.max(
                2,
                24 - depth * 0.0048
            );


        const signal =
            Math.max(
                34,
                100 - depth * 0.012
            );


        if (pressureValue) {

            pressureValue.textContent =
                `${pressure.toFixed(1)} ATM`;

        }


        if (temperatureValue) {

            temperatureValue.textContent =
                `${temperature.toFixed(1)}°C`;

        }


        if (signalValue) {

            signalValue.textContent =
                `${Math.round(signal)}%`;

        }


        document.documentElement.style.setProperty(
            "--scroll-depth",
            progress
        );

        document.documentElement.style.setProperty(
            "--scroll-y",
            scrollTop
        );

    }


    updateDepth();


    window.addEventListener(
        "scroll",
        updateDepth,
        { passive: true }
    );


    /* =====================================================
       REVEAL ON SCROLL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                });

            },
            {
                threshold: .12
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =====================================================
       3D TILT
    ====================================================== */

    const tiltCards =
        document.querySelectorAll(
            ".tilt-card"
        );


    tiltCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateY =
                    ((x / rect.width) - .5) * 8;

                const rotateX =
                    ((y / rect.height) - .5) * -8;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-4px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       MAGNETIC BUTTON
    ====================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".btn"
        );


    magneticButtons.forEach((button) => {

        button.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    button.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform =
                    `translate(
                        ${x * .08}px,
                        ${y * .08}px
                    )`;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       MOUSE LIGHT
    ====================================================== */

    document.addEventListener(
        "mousemove",
        (event) => {

            const x =
                event.clientX /
                window.innerWidth *
                100;

            const y =
                event.clientY /
                window.innerHeight *
                100;


            document.documentElement.style.setProperty(
                "--mouse-x",
                `${x}%`
            );

            document.documentElement.style.setProperty(
                "--mouse-y",
                `${y}%`
            );

        }
    );


    /* =====================================================
       THEME / ENVIRONMENT SWITCH
    ====================================================== */

    const themeButton =
        document.getElementById(
            "themeButton"
        );


    const savedTheme =
        localStorage.getItem(
            "myOceanTheme"
        );


    if (
        savedTheme === "surface"
    ) {

        document.body.classList.add(
            "surface-mode"
        );

    }


    function updateThemeUI() {

        if (!themeButton) {
            return;
        }


        const modeText =
            themeButton.querySelector(
                ".mode-text strong"
            );

        const modeIcon =
            themeButton.querySelector(
                ".mode-icon"
            );


        if (
            document.body.classList.contains(
                "surface-mode"
            )
        ) {

            if (modeText) {

                modeText.textContent =
                    "SCI-FI";

            }

            if (modeIcon) {

                modeIcon.textContent =
                    "◉";

            }

        } else {

            if (modeText) {

                modeText.textContent =
                    "DEEP OCEAN";

            }

            if (modeIcon) {

                modeIcon.textContent =
                    "◐";

            }

        }

    }


    updateThemeUI();


    if (themeButton) {

        themeButton.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "surface-mode"
                );


                const isSciFi =
                    document.body.classList.contains(
                        "surface-mode"
                    );


                localStorage.setItem(
                    "myOceanTheme",
                    isSciFi
                        ? "surface"
                        : "deep"
                );


                updateThemeUI();

            }
        );

    }


    /* =====================================================
       COPY CONTACT INFORMATION
    ====================================================== */

    const copyButtons =
        document.querySelectorAll(
            ".copy-button"
        );


    copyButtons.forEach((button) => {

        button.addEventListener(
            "click",
            async () => {

                const text =
                    button.dataset.copy;


                if (!text) {
                    return;
                }


                try {

                    await navigator.clipboard.writeText(
                        text
                    );


                    const oldText =
                        button.textContent;


                    button.textContent =
                        "COPIED";


                    setTimeout(() => {

                        button.textContent =
                            oldText;

                    }, 1200);


                } catch (error) {

                    button.textContent =
                        "ERROR";


                    setTimeout(() => {

                        button.textContent =
                            "COPY";

                    }, 1200);

                }

            }
        );

    });


    /* =====================================================
       KEYBOARD EASTER EGG
    ====================================================== */

    let typedKeys = "";


    document.addEventListener(
        "keydown",
        (event) => {

            typedKeys +=
                event.key.toLowerCase();

            typedKeys =
                typedKeys.slice(-5);


            if (
                typedKeys === "ocean"
            ) {

                document.body.classList.add(
                    "ocean-pulse"
                );


                setTimeout(() => {

                    document.body.classList.remove(
                        "ocean-pulse"
                    );

                }, 1800);

            }

        }
    );


    /* =====================================================
       OCEAN PULSE
    ====================================================== */

    const pulseStyle =
        document.createElement("style");


    pulseStyle.textContent = `

        .ocean-pulse
        .ocean-environment::after {

            content: "";

            position: absolute;

            inset: 0;

            pointer-events: none;

            background:
                radial-gradient(
                    circle,
                    rgba(98,231,255,.22),
                    transparent 55%
                );

            animation:
                oceanPulse 1.8s ease-out;

        }

        @keyframes oceanPulse {

            0% {
                opacity: 0;
                transform: scale(.7);
            }

            35% {
                opacity: 1;
            }

            100% {
                opacity: 0;
                transform: scale(1.3);
            }

        }

    `;


    document.head.appendChild(
        pulseStyle
    );


});
