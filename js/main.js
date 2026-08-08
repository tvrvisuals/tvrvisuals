/* =========================================================
   TVR VISUALS
   MAIN JAVASCRIPT
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

    card.addEventListener("click", () => {

        const service =
            card.dataset.service;

        openPortfolio(service);

    });

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


    const oldQualityNote =
        document.querySelector(".quality-note");

    if (oldQualityNote) {
        oldQualityNote.remove();
    }


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


    portfolioGrid.innerHTML = "";


    data.items.forEach(item => {

        const project =
            document.createElement("div");

        project.className =
            "portfolio-item";


        /* VIDEO */

        if (item.type === "video") {

            const video =
                document.createElement("video");

            video.controls = true;
            video.playsInline = true;
            video.preload = "metadata";


            const source =
                document.createElement("source");

            source.src = item.src;
            source.type = "video/mp4";


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


        /* FOTO */

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


        portfolioGrid.appendChild(project);

    });


    portfolioModal.classList.add("active");

    document.body.style.overflow =
        "hidden";
}


/* =========================================================
   PORTFOLIO SLUITEN
========================================================= */

function closePortfolio() {

    portfolioModal.classList.remove("active");

    document.body.style.overflow = "";
}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closePortfolio
    );
}


if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        closePortfolio
    );
}


/* =========================================================
   FOTO LIGHTBOX
========================================================= */

function openImageLightbox(
    imageSource,
    imageAlt
) {

    const oldLightbox =
        document.querySelector(".image-lightbox");

    if (oldLightbox) {
        oldLightbox.remove();
    }


    const lightbox =
        document.createElement("div");

    lightbox.className =
        "image-lightbox";


    const content =
        document.createElement("div");

    content.className =
        "image-lightbox-content";


    const closeButton =
        document.createElement("button");

    closeButton.className =
        "image-lightbox-close";

    closeButton.innerHTML =
        "&times;";

    closeButton.setAttribute(
        "aria-label",
        "Sluiten"
    );


    const image =
        document.createElement("img");

    image.src =
        imageSource;

    image.alt =
        imageAlt || "TVR Visuals";


    content.appendChild(closeButton);
    content.appendChild(image);

    lightbox.appendChild(content);

    document.body.appendChild(lightbox);


    requestAnimationFrame(() => {

        lightbox.classList.add("active");

    });


    function closeLightbox() {

        lightbox.classList.remove("active");

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
   TVR AAN HET WERK KLIKBAAR
========================================================= */

const aboutWorkImage =
    document.querySelector(".about-image img");


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
            document.querySelector(".image-lightbox");


        if (imageLightbox) {

            imageLightbox.remove();

            return;
        }


        if (
            portfolioModal &&
            portfolioModal.classList.contains("active")
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
                link.getAttribute("href");


            if (!id || id === "#") {
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
   SERVICE CARD GLOW VOLGT MUIS
   LET OP:
   ALLEEN DE GLOW.
   NIET DE TRANSFORM VAN DE KAART.
========================================================= */

document.querySelectorAll(
    ".service-card"
).forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            card.style.setProperty(
                "--mouse-x",
                `${x}px`
            );

            card.style.setProperty(
                "--mouse-y",
                `${y}px`
            );

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.setProperty(
                "--mouse-x",
                "50%"
            );

            card.style.setProperty(
                "--mouse-y",
                "50%"
            );

        }
    );

});


/* =========================================================
   3D TVR BOL VOLGT MUIS
========================================================= */

const tvrObject =
    document.querySelector(".tvr-3d-object");


if (tvrObject) {

    let targetRotateX = 0;
    let targetRotateY = 0;

    let currentRotateX = 0;
    let currentRotateY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            /*
            Alleen op desktop.
            */

            if (window.innerWidth <= 900) {
                return;
            }


            const mouseX =
                event.clientX / window.innerWidth;

            const mouseY =
                event.clientY / window.innerHeight;


            /*
            Van -1 tot +1
            */

            const normalizedX =
                (mouseX - 0.5) * 2;

            const normalizedY =
                (mouseY - 0.5) * 2;


            /*
            Meer beweging dan vorige versie,
            maar nog steeds subtiel.
            */

            targetRotateY =
                normalizedX * 10;

            targetRotateX =
                normalizedY * -7;

        }
    );


    document.addEventListener(
        "mouseleave",
        () => {

            targetRotateX = 0;
            targetRotateY = 0;

        }
    );


    function animateTvrObject() {

        /*
        Hoe lager dit getal,
        hoe soepeler hij achter je muis aan loopt.
        */

        currentRotateX +=
            (targetRotateX - currentRotateX) * 0.055;

        currentRotateY +=
            (targetRotateY - currentRotateY) * 0.055;


        tvrObject.style.transform = `
            rotateX(${currentRotateX}deg)
            rotateY(${currentRotateY}deg)
        `;


        requestAnimationFrame(
            animateTvrObject
        );
    }


    animateTvrObject();
}


console.log(
    "TVR Visuals website geladen."
);