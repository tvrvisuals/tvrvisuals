/* =========================================
   TVR VISUALS
   Portfolio interactie
========================================= */


/* =========================================
   PORTFOLIO DATA
========================================= */

const portfolioData = {

    videografie: {

        title: "Videografie",

        description:
            "Cinematische video's, automotive producties en andere videoprojecten.",

            qualityNote:
    "Alle producties worden in 4K-kwaliteit geleverd. De video's op deze website zijn gecomprimeerd voor online gebruik.",

        items: [
    {
        type: "video",
        src: "assets/videos/BMW 118i Website.mp4",
        title: "BMW 118i — Cinematic Film"
    },
    {
        type: "video",
        src: "assets/videos/temerario-video-1.mp4",
        title: "Mercedes C450 — Automotive Film"
    },
    {
        type: "video",
        src: "assets/videos/temerario-video-2.mp4",
        title: "BMW F80 M3 — Automotive Film"
    },
    {
        type: "video",
        src: "assets/videos/temerario-video-3.mp4",
        title: "Subaru WRX — Cinematic Film"
    }
],
    },


    fotografie: {

        title: "Fotografie",

        description:
            "Een selectie van automotive, event en lifestyle fotografie.",

        items: [

            {
                type: "image",
                src: "assets/images/BMW F80.JPG",
                title: "BMW F80"
            },

            {
                type: "image",
                src: "assets/images/BMW F87 Rollers.JPG",
                title: "BMW F87"
            },

            {
                type: "image",
                src: "assets/images/Lamborghini Revuelto.JPG",
                title: "Lamborghini Revuelto"
            }, ,
{
    type: "image",
    src: "assets/images/Lamborghini Temerario.JPG",
    title: "Lamborghini Temerario"
}

        ]

    },


    social: {

        title: "Social Media Content",

        description:
            "Korte video's en content gemaakt voor Instagram, TikTok en andere social platforms.",

        items: [

            /*
            Hier kunnen later je verticale video's komen.

            Bijvoorbeeld:

            {
                type: "video",
                src: "assets/videos/social-video-1.mp4",
                title: "Social Media Reel"
            }

            */

        ]

    }

};


/* =========================================
   ELEMENTEN
========================================= */

const serviceCards =
    document.querySelectorAll(".service-card");

const modal =
    document.getElementById("portfolioModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalEyebrow =
    document.getElementById("modalEyebrow");

const portfolioGrid =
    document.getElementById("portfolioGrid");

const closeButton =
    document.querySelector(".modal-close");

const modalOverlay =
    document.querySelector(".modal-overlay");


/* =========================================
   PORTFOLIO OPENEN
========================================= */

serviceCards.forEach(card => {

    card.addEventListener("click", () => {

        const service =
            card.dataset.service;

        openPortfolio(service);

    });

});


/* =========================================
   PORTFOLIO OPBOUWEN
========================================= */

function openPortfolio(service) {

    const data =
        portfolioData[service];

    if (!data) {
        return;
    }


    modalTitle.textContent =
        data.title;

    modalDescription.textContent =
        data.description;

    modalEyebrow.textContent =
        "Portfolio";


    portfolioGrid.innerHTML = "";

    const qualityNote = document.createElement("div");

qualityNote.className = "quality-note";
qualityNote.textContent = data.qualityNote || "";

modalDescription.insertAdjacentElement(
    "afterend",
    qualityNote
);


    /* Geen projecten */

    if (!data.items || data.items.length === 0) {

        portfolioGrid.innerHTML = `

            <div class="portfolio-item">

                <div class="portfolio-placeholder">

                    <strong>
                        Binnenkort meer werk
                    </strong>

                    <span>
                        Nieuwe projecten worden hier toegevoegd.
                    </span>

                </div>

            </div>

        `;

    }


    /* Projecten */

    data.items.forEach(item => {

        const project =
            document.createElement("div");

        project.classList.add(
            "portfolio-item"
        );


        /* VIDEO */

        if (item.type === "video") {

            project.innerHTML = `
    <video
        controls
        playsinline
        preload="metadata"
    >
        <source
            src="${item.src}"
            type="video/mp4"
        >
        Je browser ondersteunt deze video niet.
    </video>

    <h3 class="portfolio-title">${item.title}</h3>
`;

        }


      /* FOTO */

if (item.type === "image") {
    project.innerHTML = `
        <img
            class="portfolio-image"
            src="${item.src}"
            alt="${item.title || "TVR Visuals project"}"
            loading="lazy"
        >
    `;

    const image = project.querySelector(".portfolio-image");

    image.addEventListener("click", () => {

        const lightbox = document.createElement("div");

        lightbox.className = "image-lightbox";

        lightbox.innerHTML = `
            <div class="image-lightbox-content">

                <button class="image-lightbox-close">&times;</button>

                <img
                    src="${item.src}"
                    alt="${item.title || "TVR Visuals project"}"
                >

            </div>
        `;

        document.body.appendChild(lightbox);

        // Voorkom scrollen terwijl de foto geopend is
        document.body.style.overflow = "hidden";

        // Lightbox openen
        requestAnimationFrame(() => {
            lightbox.classList.add("active");
        });

        const closeLightbox = () => {
            lightbox.classList.remove("active");

            setTimeout(() => {
                lightbox.remove();
                document.body.style.overflow = "";
            }, 200);
        };

        // Kruisje
        lightbox
            .querySelector(".image-lightbox-close")
            .addEventListener("click", closeLightbox);

        // Klik naast de foto
        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        // ESC
        const escapeHandler = (event) => {
            if (event.key === "Escape") {
                closeLightbox();
                document.removeEventListener("keydown", escapeHandler);
            }
        };

        document.addEventListener("keydown", escapeHandler);
    });
}


        portfolioGrid.appendChild(project);

    });


    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================================
   MODAL SLUITEN
========================================= */

function closePortfolio() {

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


/* Klik op X */

closeButton.addEventListener(
    "click",
    closePortfolio
);


/* Klik buiten venster */

modalOverlay.addEventListener(
    "click",
    closePortfolio
);


/* ESCAPE */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closePortfolio();

        }

    }
);

/* ABOUT FOTO LIGHTBOX */

const aboutImage = document.querySelector(".about-work-image");

if (aboutImage) {
    aboutImage.addEventListener("click", () => {

        const lightbox = document.createElement("div");
        lightbox.className = "image-lightbox";

        lightbox.innerHTML = `
            <div class="image-lightbox-content">
                <button class="image-lightbox-close">&times;</button>
                <img
                    src="${aboutImage.src}"
                    alt="${aboutImage.alt}"
                >
            </div>
        `;

        document.body.appendChild(lightbox);

        requestAnimationFrame(() => {
            lightbox.classList.add("active");
        });

        const closeLightbox = () => {
            lightbox.classList.remove("active");

            setTimeout(() => {
                lightbox.remove();
            }, 200);
        };

        lightbox
            .querySelector(".image-lightbox-close")
            .addEventListener("click", closeLightbox);

        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener("keydown", function escapeHandler(event) {
            if (event.key === "Escape") {
                closeLightbox();
                document.removeEventListener("keydown", escapeHandler);
            }
        });
    });
}

/* =========================================
   SMOOTH SCROLL
========================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        function(event) {

            const target =
                document.querySelector(
                    this.getAttribute("href")
                );

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }
    );

});

/* =================================
   VIDEO LIGHTBOX
================================= */

document.querySelectorAll(".portfolio-item video").forEach(video => {

    video.addEventListener("click", function () {

        const lightbox = document.createElement("div");
        lightbox.className = "video-lightbox";

        lightbox.innerHTML = `
            <div class="video-lightbox-content">
                <button class="video-lightbox-close">&times;</button>

                <video controls autoplay>
                    <source src="${this.querySelector("source").src}" type="video/mp4">
                    Je browser ondersteunt deze video niet.
                </video>
            </div>
        `;

        document.body.appendChild(lightbox);

        const closeButton =
            lightbox.querySelector(".video-lightbox-close");

        closeButton.addEventListener("click", () => {
            lightbox.remove();
        });

        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) {
                lightbox.remove();
            }
        });

        document.addEventListener("keydown", function closeWithEscape(event) {
            if (event.key === "Escape") {
                lightbox.remove();
                document.removeEventListener("keydown", closeWithEscape);
            }
        });

    });

});

console.log(
    "TVR Visuals website geladen."
);
/* =========================================
   TVR VISUALS — 3D LOGO MOUSE MOVEMENT
   ========================================= */

const logoScene = document.querySelector(".logo-3d-scene");

if (logoScene) {

    document.addEventListener("mousemove", (event) => {

        const x = (event.clientX / window.innerWidth) - 0.5;
        const y = (event.clientY / window.innerHeight) - 0.5;

        const rotateY = x * 12;
        const rotateX = y * -12;

        logoScene.style.transform = `
            translateY(-6px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;

    });

    document.addEventListener("mouseleave", () => {

        logoScene.style.transform = `
            translateY(0px)
            rotateX(0deg)
            rotateY(0deg)
        `;

    });

}
/* =====================================================
   TVR VISUALS — 3D MOUSE EFFECT
   ===================================================== */

const tvr3DObject = document.querySelector(".tvr-3d-object");

if (tvr3DObject) {

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    document.addEventListener("mousemove", (event) => {

        // Muispositie omzetten naar -1 t/m 1
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 2;

    });

    function animateTvr3D(time) {

        // Zachte beweging richting de muis
        currentX += (mouseX - currentX) * 0.04;
        currentY += (mouseY - currentY) * 0.04;

        // Automatisch zweven
        const floatY = Math.sin(time * 0.001) * 6;

        // Rotatie
        const rotateY = currentX * 10;
        const rotateX = currentY * -7;

        tvr3DObject.style.transform = `
            translate3d(0, ${floatY}px, 0)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;

        requestAnimationFrame(animateTvr3D);
    }

    requestAnimationFrame(animateTvr3D);
}
/* =========================================
   CINEMATIC PORTFOLIO CARD MOUSE EFFECT
   ========================================= */

document.querySelectorAll(
    ".showcase-card, .service-card, .portfolio-card"
).forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -2.5;
        const rotateY = ((x - centerX) / centerX) * 2.5;

        card.style.transform = `
            perspective(900px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)
            scale(1.015)
        `;

        card.style.setProperty(
            "--mouse-x",
            `${x}px`
        );

        card.style.setProperty(
            "--mouse-y",
            `${y}px`
        );
    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

        card.style.setProperty(
            "--mouse-x",
            "50%"
        );

        card.style.setProperty(
            "--mouse-y",
            "50%"
        );
    });

});
