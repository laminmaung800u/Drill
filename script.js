/* ============================================================
   BUSSY 67!
   CINEMATIC SCROLLTELLING ENGINE

   Libraries:
   - GSAP
   - ScrollTrigger
   - Lenis

   ============================================================ */


/* ============================================================
   REGISTER GSAP
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);


/* ============================================================
   LENIS — SMOOTH KINETIC SCROLLING
   ============================================================ */

const lenis = new Lenis({

    duration: 1.25,

    smoothWheel: true,

    smoothTouch: false,

    wheelMultiplier: 0.9,

    touchMultiplier: 1

});


/*
    Keep Lenis and GSAP synchronized.
*/

lenis.on(
    "scroll",
    ScrollTrigger.update
);


gsap.ticker.add(
    (time) => {

        lenis.raf(time * 1000);

    }
);


gsap.ticker.lagSmoothing(0);


/* ============================================================
   DOM REFERENCES
   ============================================================ */

const backgroundA =
    document.getElementById("backgroundA");

const backgroundB =
    document.getElementById("backgroundB");

const sceneCounter =
    document.getElementById("sceneCounter");

const audioControl =
    document.getElementById("audioControl");

const audioStatus =
    document.getElementById("audioStatus");

const audioBars =
    document.getElementById("audioBars");

const infoModal =
    document.getElementById("infoModal");

const modalBackdrop =
    document.querySelector(".modal-backdrop");

const modalPanel =
    document.querySelector(".modal-panel");

const modalClose =
    document.getElementById("modalClose");


/* ============================================================
   BACKGROUND ASSETS
   ============================================================

   IMPORTANT:

   THIS IS ONE OF THE MAIN PLACES YOU WILL EDIT.

   Put your images inside:

       /images/

   Then change the filenames below.

   Example:

       moon: "images/moon-surface.jpg"

   ============================================================ */

const BACKGROUNDS = {

    bus:
        "images/bus.jpg",

    space:
        "images/space.jpg",

    moon:
        "images/moon-surface.jpg",

    mars:
        "images/mars-surface.jpg"

};


/* ============================================================
   ARTIFACT DATA
   ============================================================

   THIS IS THE OTHER MAIN PLACE YOU WILL EDIT.

   Each artifact contains all information displayed
   by the "READ ABOUT ME" portal.

   When NASA releases the official resources you want
   to use for the 2026 challenge, you can insert them
   into the nasaResources array.

   ============================================================ */

const ARTIFACTS = {


    /* ========================================================
       APOLLO 11 EAGLE
       ======================================================== */

    eagle: {

        name:
            "Apollo 11 Eagle Descent Stage",

        subtitle:
            "The descent stage of the Lunar Module that carried astronauts to Tranquility Base.",

        year:
            "1969",

        mission:
            "Apollo 11",

        purpose:
            "Lunar landing and astronaut transport",

        mass:
            "Add verified NASA value",

        latitude:
            "Add verified NASA value",

        longitude:
            "Add verified NASA value",

        science:
            "The descent stage formed part of the Lunar Module's landing system. Its engines provided the controlled descent necessary to bring the astronauts safely to the lunar surface.",

        contribution:
            "Apollo 11 demonstrated that humans could travel to another world, land there, perform scientific and engineering tasks, and return safely to Earth.",

        nasaResources: [

            /*
                ADD OFFICIAL NASA LINKS HERE.

                Example:

                {
                    title: "NASA Apollo 11 Mission Page",
                    url: "https://www.nasa.gov/..."
                }
            */

        ]

    },


    /* ========================================================
       LUNAR ROVING VEHICLE
       ======================================================== */

    lunarRover: {

        name:
            "Apollo Lunar Roving Vehicle",

        subtitle:
            "A battery-powered vehicle that expanded the distance astronauts could explore on the Moon.",

        year:
            "1971",

        mission:
            "Apollo 15 / Apollo 16 / Apollo 17",

        purpose:
            "Crewed lunar surface transportation",

        mass:
            "Add verified NASA value",

        latitude:
            "Depends on the specific mission",

        longitude:
            "Depends on the specific mission",

        science:
            "The Lunar Roving Vehicle allowed astronauts to travel much farther from their landing site, collect geological samples and investigate a larger region of the lunar surface.",

        contribution:
            "The rover fundamentally expanded the geographic scale of human exploration on another world.",

        nasaResources: []

    },


    /* ========================================================
       ALSEP
       ======================================================== */

    alsep: {

        name:
            "Apollo Lunar Surface Experiment Packages",

        subtitle:
            "Scientific instruments deployed on the Moon to continue experiments after astronauts departed.",

        year:
            "1969–1972",

        mission:
            "Apollo lunar surface science missions",

        purpose:
            "Long-term lunar scientific measurements",

        mass:
            "Varied by mission",

        latitude:
            "Varied by deployment site",

        longitude:
            "Varied by deployment site",

        science:
            "ALSEP instruments investigated properties of the lunar environment, including seismic activity, heat flow, magnetic conditions and other physical characteristics.",

        contribution:
            "The instruments transformed the Moon from a place humans briefly visited into a scientific laboratory that continued collecting data after astronauts had gone home.",

        nasaResources: []

    },


    /* ========================================================
       OPPORTUNITY
       ======================================================== */

    opportunity: {

        name:
            "Opportunity Rover",

        subtitle:
            "The Mars Exploration Rover that dramatically outlived its original mission plan.",

        year:
            "2004",

        mission:
            "Mars Exploration Rover-B",

        purpose:
            "Mars geological exploration",

        mass:
            "Add verified NASA value",

        latitude:
            "Add verified final location",

        longitude:
            "Add verified final location",

        science:
            "Opportunity investigated Martian rocks and soils and searched for geological evidence about the ancient history of water on Mars.",

        contribution:
            "Its extraordinarily long operational lifetime and scientific discoveries transformed our understanding of Mars and demonstrated the possibilities of long-duration robotic exploration.",

        nasaResources: []

    },


    /* ========================================================
       SPIRIT
       ======================================================== */

    spirit: {

        name:
            "Spirit Rover",

        subtitle:
            "A Mars rover that explored ancient volcanic and geological environments.",

        year:
            "2004",

        mission:
            "Mars Exploration Rover-A",

        purpose:
            "Mars geological exploration",

        mass:
            "Add verified NASA value",

        latitude:
            "Add verified final location",

        longitude:
            "Add verified final location",

        science:
            "Spirit studied Martian rocks and soil and found geological evidence that helped scientists reconstruct aspects of Mars' ancient environment.",

        contribution:
            "Spirit helped establish that Mars had experienced environments very different from the cold, dry surface visible today.",

        nasaResources: []

    },


    /* ========================================================
       INSIGHT
       ======================================================== */

    insight: {

        name:
            "InSight Robotic Arm",

        subtitle:
            "A robotic system used to position instruments and interact with the Martian surface.",

        year:
            "2018",

        mission:
            "Mars InSight",

        purpose:
            "Deploying and supporting scientific instruments",

        mass:
            "Add verified NASA value",

        latitude:
            "Add verified NASA value",

        longitude:
            "Add verified NASA value",

        science:
            "The arm helped place and support instruments designed to investigate the interior structure and geological activity of Mars.",

        contribution:
            "InSight expanded planetary science beyond simply photographing the surface by investigating the internal processes of another rocky planet.",

        nasaResources: []

    }

};


/* ============================================================
   AUDIO SYSTEM
   ============================================================ */

const AUDIO = {

    busEngine:
        document.getElementById("busEngineAudio"),

    eagle:
        document.getElementById("eagleAudio"),

    lunarRover:
        document.getElementById("lunarRoverAudio"),

    alsep:
        document.getElementById("alsepAudio"),

    opportunity:
        document.getElementById("opportunityAudio"),

    spirit:
        document.getElementById("spiritAudio"),

    insight:
        document.getElementById("insightAudio"),

    ending:
        document.getElementById("endingAudio")

};


let audioEnabled = true;

let audioUnlocked = false;

let currentStoryAudio = null;


/* ============================================================
   AUDIO VOLUME SETTINGS
   ============================================================ */

AUDIO.busEngine.volume = 0.35;

AUDIO.eagle.volume = 1.0;

AUDIO.lunarRover.volume = 1.0;

AUDIO.alsep.volume = 1.0;

AUDIO.opportunity.volume = 1.0;

AUDIO.spirit.volume = 1.0;

AUDIO.insight.volume = 1.0;

AUDIO.ending.volume = 1.0;


/* ============================================================
   UNLOCK AUDIO
   ============================================================

   Browsers generally prevent websites from automatically
   playing sound before the visitor interacts.

   The first click unlocks the audio system.
   ============================================================ */

function unlockAudio() {

    audioUnlocked = true;

}


/* ============================================================
   STOP STORY AUDIO
   ============================================================ */

function stopStoryAudio() {

    Object.values(AUDIO).forEach(
        (audio) => {

            if (!audio) {
                return;
            }

            if (audio === AUDIO.busEngine) {
                return;
            }

            audio.pause();

            audio.currentTime = 0;

        }
    );

    currentStoryAudio = null;

}


/* ============================================================
   START BUS ENGINE
   ============================================================ */

function startBusEngine() {

    if (!audioEnabled) {
        return;
    }

    if (!audioUnlocked) {
        return;
    }

    const audio =
        AUDIO.busEngine;

    audio.play().catch(
        () => {}
    );

}


/* ============================================================
   STOP BUS ENGINE
   ============================================================ */

function stopBusEngine() {

    const audio =
        AUDIO.busEngine;

    audio.pause();

    audio.currentTime = 0;

}


/* ============================================================
   PLAY ARTIFACT STORY
   ============================================================ */

function playArtifactStory(
    artifactName
) {

    if (!audioEnabled) {
        return;
    }

    unlockAudio();

    const audio =
        AUDIO[artifactName];

    if (!audio) {
        return;
    }


    /*
        If the same audio is already playing,
        don't restart it.
    */

    if (
        currentStoryAudio === audio &&
        !audio.paused
    ) {
        return;
    }


    stopStoryAudio();

    currentStoryAudio = audio;

    audio.currentTime = 0;

    audio.play().catch(
        () => {

            console.log(
                "Narration is waiting for browser audio permission."
            );

        }
    );

}


/* ============================================================
   PLAY ENDING AUDIO
   ============================================================ */

function playEndingAudio() {

    if (!audioEnabled) {
        return;
    }

    unlockAudio();

    stopStoryAudio();

    currentStoryAudio =
        AUDIO.ending;

    AUDIO.ending.currentTime = 0;

    AUDIO.ending.play().catch(
        () => {}
    );

}


/* ============================================================
   GLOBAL AUDIO BUTTON
   ============================================================ */

audioControl.addEventListener(
    "click",
    () => {

        unlockAudio();

        audioEnabled =
            !audioEnabled;


        if (audioEnabled) {

            audioStatus.textContent =
                "SOUND ON";

            audioControl.classList.remove(
                "muted"
            );


            /*
                Resume the currently relevant audio.
            */

            const activeScene =
                getActiveScene();

            if (
                activeScene &&
                activeScene.dataset.type === "journey"
            ) {

                if (
                    activeScene.dataset.scene === "2"
                ) {
                    startBusEngine();
                }

            }


            if (currentStoryAudio) {

                currentStoryAudio
                    .play()
                    .catch(() => {});

            }

        } else {

            audioStatus.textContent =
                "SOUND OFF";

            audioControl.classList.add(
                "muted"
            );

            stopBusEngine();

            stopStoryAudio();

            AUDIO.ending.pause();

        }

    }
);


/* ============================================================
   FIRST USER INTERACTION
   ============================================================ */

document.addEventListener(
    "pointerdown",
    () => {

        unlockAudio();

    },
    {
        once: true
    }
);


/* ============================================================
   BACKGROUND SYSTEM
   ============================================================ */

let activeBackgroundLayer =
    backgroundA;

let activeBackgroundName =
    null;


function setBackground(
    backgroundName
) {

    const image =
        BACKGROUNDS[backgroundName];

    if (!image) {
        return;
    }


    /*
        Don't transition if the background
        hasn't changed.
    */

    if (
        activeBackgroundName ===
        backgroundName
    ) {
        return;
    }


    activeBackgroundName =
        backgroundName;


    const incomingLayer =
        activeBackgroundLayer ===
        backgroundA
            ? backgroundB
            : backgroundA;


    incomingLayer.style.backgroundImage =
        `url("${image}")`;


    gsap.set(
        incomingLayer,
        {
            opacity: 0,
            scale: 1.08
        }
    );


    gsap.to(
        activeBackgroundLayer,
        {
            opacity: 0,
            scale: 1.03,
            duration: 1.1,
            ease: "power2.inOut"
        }
    );


    gsap.to(
        incomingLayer,
        {
            opacity: 1,
            scale: 1.03,
            duration: 1.4,
            ease: "power2.out"
        }
    );


    activeBackgroundLayer =
        incomingLayer;

}


/* ============================================================
   GET ACTIVE SCENE
   ============================================================ */

function getActiveScene() {

    const scenes =
        document.querySelectorAll(
            ".scene"
        );

    let closestScene = null;

    let closestDistance =
        Infinity;


    scenes.forEach(
        (scene) => {

            const rect =
                scene.getBoundingClientRect();

            const center =
                window.innerHeight / 2;

            const sceneCenter =
                rect.top +
                rect.height / 2;

            const distance =
                Math.abs(
                    center -
                    sceneCenter
                );


            if (
                distance <
                closestDistance
            ) {

                closestDistance =
                    distance;

                closestScene =
                    scene;

            }

        }
    );


    return closestScene;

}


/* ============================================================
   UPDATE SCENE COUNTER
   ============================================================ */

function updateSceneCounter(
    sceneNumber
) {

    const padded =
        String(sceneNumber)
            .padStart(2, "0");

    sceneCounter.textContent =
        `${padded} / 11`;

}


/* ============================================================
   SCENE AUDIO LOGIC
   ============================================================ */

function handleSceneAudio(
    scene
) {

    const sceneNumber =
        scene.dataset.scene;

    const sceneType =
        scene.dataset.type;


    /*
        PAGE 2:
        BUS ENGINE / JOURNEY TO MOON
    */

    if (
        sceneNumber === "2"
    ) {

        stopStoryAudio();

        startBusEngine();

        return;
    }


    /*
        PAGE 6:
        We are in deep space again,
        so stop the bus engine.
    */

    if (
        sceneNumber === "6"
    ) {

        stopBusEngine();

        stopStoryAudio();

        return;
    }


    /*
        PAGE 10:
        RETURNING HOME
    */

    if (
        sceneNumber === "10"
    ) {

        stopBusEngine();

        stopStoryAudio();

        return;
    }


    /*
        PAGE 11:
        ENDING
    */

    if (
        sceneNumber === "11"
    ) {

        stopBusEngine();

        playEndingAudio();

        return;
    }


    /*
        Artifact pages:
        don't automatically play their narration.

        The user must click
        "LISTEN MY STORY".
    */

    if (
        sceneType === "artifact"
    ) {

        stopBusEngine();

        return;
    }


    /*
        Everything else.
    */

    stopBusEngine();

}


/* ============================================================
   SCENE ENTER ANIMATION
   ============================================================ */

function animateSceneIn(
    scene
) {

    const elements =
        scene.querySelectorAll(
            ".eyebrow, h1, h2, .landing-subtitle, .journey-caption, .journey-route, .artifact-description, .artifact-buttons, .artifact-image, .scroll-hint, .landing-bus"
        );


    gsap.fromTo(
        elements,

        {
            opacity: 0,

            y: 45
        },

        {
            opacity: 1,

            y: 0,

            duration: 1.1,

            stagger: 0.08,

            ease: "power3.out",

            overwrite: true
        }
    );

}


/* ============================================================
   INITIAL BACKGROUND
   ============================================================ */

backgroundA.style.backgroundImage =
    `url("${BACKGROUNDS.bus}")`;

activeBackgroundName =
    "bus";


/* ============================================================
   SCROLLTRIGGER — SCENE SYSTEM
   ============================================================ */

const scenes =
    document.querySelectorAll(
        ".scene"
    );


scenes.forEach(
    (scene) => {

        const sceneNumber =
            scene.dataset.scene;

        const background =
            scene.dataset.background;


        ScrollTrigger.create({

            trigger: scene,

            start: "top 55%",

            end: "bottom 45%",


            onEnter: () => {

                updateSceneCounter(
                    sceneNumber
                );

                setBackground(
                    background
                );

                handleSceneAudio(
                    scene
                );

                animateSceneIn(
                    scene
                );

            },


            onEnterBack: () => {

                updateSceneCounter(
                    sceneNumber
                );

                setBackground(
                    background
                );

                handleSceneAudio(
                    scene
                );

                animateSceneIn(
                    scene
                );

            }

        });


        /*
            Cinematic vertical movement.

            The scene content moves slightly as
            the visitor travels through it.
        */

        gsap.to(
            scene.querySelector(
                ".scene-inner"
            ),
            {

                yPercent: -5,

                ease: "none",

                scrollTrigger: {

                    trigger: scene,

                    start: "top bottom",

                    end: "bottom top",

                    scrub: 1.2

                }

            }
        );

    }
);


/* ============================================================
   ARTIFACT IMAGE CINEMATIC MOVEMENT
   ============================================================ */

document
    .querySelectorAll(
        ".artifact-scene"
    )
    .forEach(
        (scene) => {

            const image =
                scene.querySelector(
                    ".artifact-image"
                );

            if (!image) {
                return;
            }


            gsap.fromTo(

                image,

                {
                    opacity: 0,

                    scale: 0.78,

                    x: 80
                },

                {
                    opacity: 1,

                    scale: 1,

                    x: 0,

                    ease: "none",

                    scrollTrigger: {

                        trigger: scene,

                        start: "top 80%",

                        end: "center center",

                        scrub: 1.2

                    }

                }

            );


            /*
                Slight pull-away while leaving
                the scene.
            */

            gsap.to(

                image,

                {

                    scale: 0.88,

                    opacity: 0.15,

                    x: -50,

                    ease: "none",

                    scrollTrigger: {

                        trigger: scene,

                        start: "center center",

                        end: "bottom top",

                        scrub: 1.2

                    }

                }

            );

        }
    );


/* ============================================================
   JOURNEY TITLE PARALLAX
   ============================================================ */

document
    .querySelectorAll(
        ".journey-title"
    )
    .forEach(
        (title) => {

            gsap.fromTo(

                title,

                {
                    scale: 0.88,

                    opacity: 0
                },

                {
                    scale: 1,

                    opacity: 1,

                    ease: "none",

                    scrollTrigger: {

                        trigger:
                            title.closest(
                                ".journey-scene"
                            ),

                        start: "top 80%",

                        end: "center center",

                        scrub: 1

                    }

                }

            );

        }
    );


/* ============================================================
   ARTIFACT BUTTONS
   ============================================================ */

document
    .querySelectorAll(
        "[data-action='listen']"
    )
    .forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    unlockAudio();

                    const artifact =
                        button.dataset.artifact;

                    playArtifactStory(
                        artifact
                    );


                    /*
                        Visual feedback.
                    */

                    button.classList.add(
                        "is-playing"
                    );


                    button
                        .querySelector(
                            "span"
                        )
                        .textContent =
                        "PLAYING MY STORY";


                    setTimeout(
                        () => {

                            if (
                                currentStoryAudio &&
                                currentStoryAudio.paused
                            ) {

                                button.classList.remove(
                                    "is-playing"
                                );

                                button
                                    .querySelector(
                                        "span"
                                    )
                                    .textContent =
                                    "LISTEN MY STORY";

                            }

                        },
                        1000
                    );

                }
            );

        }
    );


/* ============================================================
   STOP LISTEN BUTTON STATE WHEN AUDIO ENDS
   ============================================================ */

Object.entries(
    AUDIO
).forEach(
    ([name, audio]) => {

        if (!audio) {
            return;
        }

        audio.addEventListener(
            "ended",
            () => {

                document
                    .querySelectorAll(
                        `[data-artifact="${name}"]`
                    )
                    .forEach(
                        (button) => {

                            button.classList.remove(
                                "is-playing"
                            );

                            const label =
                                button.querySelector(
                                    "span"
                                );

                            if (label) {

                                label.textContent =
                                    "LISTEN MY STORY";

                            }

                        }
                    );

            }
        );

    }
);


/* ============================================================
   INFORMATION MODAL
   ============================================================ */

function openInfoModal(
    artifactName
) {

    const artifact =
        ARTIFACTS[artifactName];

    if (!artifact) {
        return;
    }


    /*
        Fill in the modal.
    */

    document.getElementById(
        "modalEyebrow"
    ).textContent =
        `NASA / ${artifactName.toUpperCase()}`;


    document.getElementById(
        "modalTitle"
    ).textContent =
        artifact.name;


    document.getElementById(
        "modalSubtitle"
    ).textContent =
        artifact.subtitle;


    document.getElementById(
        "modalYear"
    ).textContent =
        artifact.year;


    document.getElementById(
        "modalMission"
    ).textContent =
        artifact.mission;


    document.getElementById(
        "modalPurpose"
    ).textContent =
        artifact.purpose;


    document.getElementById(
        "modalMass"
    ).textContent =
        artifact.mass;


    document.getElementById(
        "modalLatitude"
    ).textContent =
        artifact.latitude;


    document.getElementById(
        "modalLongitude"
    ).textContent =
        artifact.longitude;


    document.getElementById(
        "modalScience"
    ).textContent =
        artifact.science;


    document.getElementById(
        "modalContribution"
    ).textContent =
        artifact.contribution;


    /*
        NASA resource links.
    */

    const resourceContainer =
        document.getElementById(
            "modalResources"
        );


    resourceContainer.innerHTML = "";


    if (
        artifact.nasaResources.length === 0
    ) {

        const placeholder =
            document.createElement(
                "p"
            );

        placeholder.textContent =
            "NASA resources will be added here when the official project resources are available.";

        placeholder.style.opacity =
            "0.45";

        placeholder.style.fontSize =
            "13px";

        resourceContainer.appendChild(
            placeholder
        );

    } else {

        artifact.nasaResources
            .forEach(
                (resource) => {

                    const link =
                        document.createElement(
                            "a"
                        );

                    link.className =
                        "resource-link";

                    link.href =
                        resource.url;

                    link.target =
                        "_blank";

                    link.rel =
                        "noopener noreferrer";

                    link.textContent =
                        resource.title;

                    resourceContainer
                        .appendChild(
                            link
                        );

                }
            );

    }


    /*
        Open modal.
    */

    infoModal.classList.add(
        "is-open"
    );

    infoModal.setAttribute(
        "aria-hidden",
        "false"
    );


    /*
        Prevent Lenis from scrolling behind
        the modal.
    */

    lenis.stop();


    /*
        Animate backdrop.
    */

    gsap.to(
        modalBackdrop,
        {
            opacity: 1,

            duration: 0.4,

            ease: "power2.out"
        }
    );


    /*
        Animate modal panel.
    */

    gsap.to(
        modalPanel,
        {
            opacity: 1,

            scale: 1,

            y: 0,

            duration: 0.6,

            ease: "power3.out"
        }
    );


    /*
        Animate internal content.
    */

    gsap.fromTo(

        modalPanel.querySelectorAll(
            ".modal-header > *, .data-card, .modal-section"
        ),

        {
            opacity: 0,

            y: 20
        },

        {
            opacity: 1,

            y: 0,

            duration: 0.6,

            stagger: 0.05,

            delay: 0.15,

            ease: "power2.out"
        }

    );


    setTimeout(
        () => {

            modalClose.focus();

        },
        400
    );

}


/* ============================================================
   CLOSE INFORMATION MODAL
   ============================================================ */

function closeInfoModal() {

    gsap.to(
        modalPanel,
        {

            opacity: 0,

            scale: 0.96,

            y: 20,

            duration: 0.35,

            ease: "power2.in"

        }
    );


    gsap.to(
        modalBackdrop,
        {

            opacity: 0,

            duration: 0.3,

            onComplete: () => {

                infoModal.classList.remove(
                    "is-open"
                );

                infoModal.setAttribute(
                    "aria-hidden",
                    "true"
                );

                lenis.start();

            }

        }
    );

}


/* ============================================================
   INFORMATION BUTTON EVENTS
   ============================================================ */

document
    .querySelectorAll(
        "[data-action='info']"
    )
    .forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const artifact =
                        button.dataset.artifact;

                    openInfoModal(
                        artifact
                    );

                }
            );

        }
    );


/* ============================================================
   CLOSE BUTTON
   ============================================================ */

modalClose.addEventListener(
    "click",
    closeInfoModal
);


/* ============================================================
   CLICK BACKDROP TO CLOSE
   ============================================================ */

modalBackdrop.addEventListener(
    "click",
    closeInfoModal
);


/* ============================================================
   ESC KEY CLOSE
   ============================================================ */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            infoModal.classList.contains(
                "is-open"
            )
        ) {

            closeInfoModal();

        }

    }
);


/* ============================================================
   START BUTTON
   ============================================================ */

document
    .getElementById(
        "startButton"
    )
    .addEventListener(
        "click",
        () => {

            unlockAudio();


            /*
                Scroll to Scene 02.

                Lenis creates the smooth transition.
            */

            const target =
                document.getElementById(
                    "scene-2"
                );


            lenis.scrollTo(
                target,
                {

                    offset: 0,

                    duration: 2.2,

                    lock: false

                }
            );

        }
    );


/* ============================================================
   REPLAY BUTTON
   ============================================================ */

document
    .getElementById(
        "replayButton"
    )
    .addEventListener(
        "click",
        () => {

            unlockAudio();

            stopBusEngine();

            stopStoryAudio();

            AUDIO.ending.pause();

            AUDIO.ending.currentTime = 0;


            lenis.scrollTo(
                0,
                {
                    duration: 2.5
                }
            );

        }
    );


/* ============================================================
   KEYBOARD ACCESSIBILITY
   ============================================================ */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === " "
        ) {

            /*
                Don't interfere with buttons,
                inputs or modal scrolling.
            */

            const tag =
                document.activeElement.tagName;

            if (
                tag === "BUTTON" ||
                tag === "INPUT" ||
                tag === "TEXTAREA"
            ) {
                return;
            }

            event.preventDefault();

            lenis.scrollTo(
                window.scrollY +
                window.innerHeight,
                {
                    duration: 1.4
                }
            );

        }

    }
);


/* ============================================================
   INITIAL SCENE ANIMATION
   ============================================================ */

window.addEventListener(
    "load",
    () => {

        const landing =
            document.getElementById(
                "scene-1"
            );


        gsap.fromTo(

            landing.querySelectorAll(
                ".eyebrow, .landing-title, .landing-subtitle, .start-button, .landing-bus"
            ),

            {
                opacity: 0,

                y: 35
            },

            {
                opacity: 1,

                y: 0,

                duration: 1.1,

                stagger: 0.12,

                ease: "power3.out"
            }

        );


        ScrollTrigger.refresh();

    }
);


/* ============================================================
   RESIZE
   ============================================================ */

window.addEventListener(
    "resize",
    () => {

        ScrollTrigger.refresh();

    }
);
