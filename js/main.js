/* =========================================================
   TVR VISUALS
   MAIN.JS
========================================================= */


/* =========================================================
   PORTFOLIO DATA
========================================================= */

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

        ]

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
            },

            {
                type: "image",
                src: "assets/images/Lamborghini Temerario.JPG",
                title: "Lamborghini Temerario"
            }

        ]

    }

};


/* =========================================================
   ELEMENTEN
========================================================= */

const serviceCards =
    document.querySelectorAll(".service-card");

const portfolioModal =
    document.getElementById("portfolioModal");

const portfolioGrid =
    document.getElementById("portfolioGrid");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalEyebrow =
    document.getElementById("modalEyebrow");

const modalClose =
    document.querySelector(".modal-close");

const modalOverlay =
    document.querySelector(".modal-overlay");


/* =========================================================
   SERVICE KAARTEN
========================================================= */

serviceCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const service =
                card.dataset.service;

            openPortfolio(service);

        }
    );

});


/* =========================================================
   PORTFOLIO OPENEN
========================================================= */

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


    /*
    Oude kwaliteitsmelding verwijderen.
    */

    const oldQualityNote =
        document.querySelector(
            ".quality-note"
        );

    if (oldQualityNote) {
        oldQualityNote.remove();
    }


    /*
    Nieuwe kwaliteitsmelding,
    alleen wanneer aanwezig.
    */

    if (data.qualityNote) {

        const qualityNote =
            document.createElement("p");

        qualityNote.className =
            "quality-note";

        qualityNote.textContent =
            data.qualityNote;


        modalDescription.insertAdjacentElement(
            "afterend",
            qualityNote
        );

    }


    portfolioGrid.innerHTML =
        "";


    data.items.forEach(item => {

        const project =
            document.createElement("div");

        project.className =
            "portfolio-item";


        /* ==============================
           VIDEO
        ============================== */

        if (item.type === "video") {

            const video =
                document.createElement("video");

            video.controls = true;

            video.playsInline = true;

            video.preload =
                "metadata";


            const source =
                document.createElement("source");

            source.src =
                item.src;

            source.type =
                "video/mp4";


            video.appendChild(source);


            const title =
                document.createElement("h3");

            title.className =
                "portfolio-title";

            title.textContent =
                item.title;


            project.appendChild(video);

            project.appendChild(title);

        }


        /* ==============================
           FOTO
        ============================== */

        if (item.type === "image") {

            const image =
                document.createElement("img");

            image.className =
                "portfolio-image";

            image.src =
                item.src;

            image.alt =
                item.title;

            image.loading =
                "lazy";


            image.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    openImageLightbox(
                        item.src,
                        item.title
                    );

                }
            );


            project.appendChild(image);

        }


        portfolioGrid.appendChild(
            project
        );

    });


    portfolioModal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   PORTFOLIO SLUITEN
========================================================= */

function closePortfolio() {

    portfolioModal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


modalClose.addEventListener(
    "click",
    closePortfolio
);


modalOverlay.addEventListener(
    "click",
    closePortfolio
);


/* =========================================================
   FOTO LIGHTBOX
========================================================= */

function openImageLightbox(
    imageSource,
    imageAlt
) {

    const lightbox =
        document.createElement("div");

    lightbox.className =
        "image-lightbox";


    lightbox.innerHTML = `

        <div class="image-lightbox-content">

            <button
                class="image-lightbox-close"
                aria-label="Sluiten"
            >
                ×
            </button>

            <img
                src="${imageSource}"
                alt="${imageAlt}"
            >

        </div>

    `;


    document.body.appendChild(
        lightbox
    );


    requestAnimationFrame(() => {

        lightbox.classList.add(
            "active"
        );

    });


    const closeButton =
        lightbox.querySelector(
            ".image-lightbox-close"
        );


    function closeLightbox() {

        lightbox.classList.remove(
            "active"
        );


        setTimeout(() => {

            lightbox.remove();

        }, 350);

    }


    closeButton.addEventListener(
        "click",
        closeLightbox
    );


    lightbox.addEventListener(
        "click",
        event => {

            if (event.target === lightbox) {

                closeLightbox();

            }

        }
    );

}


/* =========================================================
   TVR AAN HET WERK
========================================================= */

const aboutWorkImage =
    document.getElementById(
        "aboutWorkImage"
    );


if (aboutWorkImage) {

    aboutWorkImage.addEventListener(
        "click",
        () => {

            openImageLightbox(
                aboutWorkImage.src,
                aboutWorkImage.alt
            );

        }
    );

}


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }


        const imageLightbox =
            document.querySelector(
                ".image-lightbox"
            );


        if (imageLightbox) {

            imageLightbox.remove();

            return;

        }


        if (
            portfolioModal.classList.contains(
                "active"
            )
        ) {

            closePortfolio();

        }

    }
);


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const id =
                link.getAttribute(
                    "href"
                );


            if (
                !id ||
                id === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(id);


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }
    );

});


/* =========================================================
   SUBTIELE 3D LOGO MUISBEWEGING

   ALLEEN het grote 3D-logo.
   NIET de kaarten.
========================================================= */

const tvrObject =
    document.querySelector(
        ".tvr-3d-object"
    );


if (
    tvrObject &&
    window.matchMedia(
        "(min-width: 901px)"
    ).matches
) {

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            targetX =
                (
                    event.clientX /
                    window.innerWidth
                    -
                    0.5
                )
                *
                2;

            targetY =
                (
                    event.clientY /
                    window.innerHeight
                    -
                    0.5
                )
                *
                2;

        }
    );


    function animateLogo() {

        currentX +=
            (
                targetX -
                currentX
            )
            *
            0.025;

        currentY +=
            (
                targetY -
                currentY
            )
            *
            0.025;


        const rotateY =
            currentX * 5;

        const rotateX =
            currentY * -4;


        tvrObject.style.transform = `

            rotateX(${rotateX}deg)

            rotateY(${rotateY}deg)

        `;


        requestAnimationFrame(
            animateLogo
        );

    }


    animateLogo();

}


console.log(
    "TVR Visuals website geladen."
);