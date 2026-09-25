/*
============================================================
BUSSY 67! — SCROLLTELLING ENGINE
------------------------------------------------------------
This JavaScript is intentionally organized so a beginner can
find the major systems quickly.

1. DATA
2. DOM ELEMENTS
3. AUDIO MANAGER
4. LENIS INITIALIZATION
5. SCENE MANAGEMENT
6. CHARACTER ANIMATIONS
7. INFORMATION MODAL
8. SCROLLTRIGGER
9. BUTTON EVENTS
10. RESPONSIVE BEHAVIOR
============================================================
*/

"use strict";

/* ============================================================
   1. DATA

   CHANGE THIS SECTION FIRST.

   Every object uses the same structure, which lets one reusable
   modal and one reusable scene system power all object scenes.

   NASA facts are intentionally placeholders until you replace
   them with verified sources.
   ============================================================ */

const objects = {
  eagle: {
    name: "Apollo 11 Eagle Descent Stage",
    subtitle: "THE MOON • APOLLO 11",
    intro: "The cartoon character represents the Apollo 11 Eagle descent stage, a historic piece of hardware left on the lunar surface.",

    // ========================================================
    // CHANGE CHARACTER IMAGE HERE
    // Replace this local path with your own artwork.
    // Example: assets/images/eagle-cartoon.png
    // ========================================================
    characterImage: "assets/images/eagle-cartoon.png",

    // ========================================================
    // CHANGE REAL NASA IMAGE HERE
    // Replace this with a verified local NASA image or URL.
    // Do NOT invent a NASA URL.
    // ========================================================
    realImage: "assets/images/eagle-real.jpg",

    // ========================================================
    // CHANGE NARRATION HERE
    // Replace this with your recorded narration file.
    // ========================================================
    audio: "assets/audio/eagle-narration.mp3",

    mission: "Apollo 11",
    landingYear: "1969",
    purpose: "Powered lunar landing, surface operations base, and launch platform for the Ascent Stage",
    location: "Mare Tranquillitatis (Sea of Tranquility), Moon",
    latitude: "0° 41′ 15″ N (≈ 0.674° N)",
    longitude: "23° 26′ E (≈ 23.473° E)",
    mass: "≈ 22,667 kg",
    instruments: "TV camera on MESA; EASEP (Passive Seismic Experiment Package + Laser Ranging Retro-Reflector); Solar Wind Collector",
    science: "First human lunar landing and EVA; deployment of seismic, laser-ranging, and solar-wind experiments; collection of 21.55 kg of lunar samples.",
    contribution: "Proved crewed land-and-return architecture; enabled first lunar seismic and laser-ranging data; provided solar-wind samples and a permanent surface base (the Descent Stage) at Tranquility Base.",

    // ========================================================
    // ADD NASA RESOURCE URL HERE
    // Use only verified official resources.
    // ========================================================
    resources: ["https://www.nasa.gov/missions/apollo/apollo-11/apollo-11-mission-overview/"]
  },

  lrv: {
    name: "Apollo Lunar Roving Vehicle",
    subtitle: "THE MOON • LUNAR ROVER",
    intro: "The cartoon character represents the Apollo Lunar Roving Vehicle, remembered here through the science and exploration story you provide.",

    // CHANGE CHARACTER IMAGE HERE
    characterImage: "assets/images/lrv-cartoon.png",

    // CHANGE REAL NASA IMAGE HERE
    realImage: "assets/images/lrv-real.jpg",

    // CHANGE NARRATION HERE
    audio: "assets/audio/lrv-narration.mp3",

    mission: "[NASA DATA TO BE ADDED]",
    landingYear: "[NASA DATA TO BE ADDED]",
    purpose: "[NASA DATA TO BE ADDED]",
    location: "[NASA DATA TO BE ADDED]",
    latitude: "[NASA DATA TO BE ADDED]",
    longitude: "[NASA DATA TO BE ADDED]",
    mass: "[NASA DATA TO BE ADDED]",
    instruments: "[NASA DATA TO BE ADDED]",
    science: "[NASA DATA TO BE ADDED — VERIFY WITH NASA SOURCES]",
    contribution: "[NASA DATA TO BE ADDED — VERIFY WITH NASA SOURCES]",

    // ADD NASA RESOURCE URL HERE
    resources: ["[2026 NASA RESOURCE — INSERT WHEN AVAILABLE]"]
  },

  alsep: {
    name: "ALSEP Science Stations",
    subtitle: "THE MOON • APOLLO LUNAR SURFACE EXPERIMENTS",
    intro: "The cartoon character represents the Apollo Lunar Surface Experiments Package / ALSEP science stations deployed on the Moon.",

    // CHANGE CHARACTER IMAGE HERE
    characterImage: "assets/images/alsep-cartoon.png",

    // CHANGE REAL NASA IMAGE HERE
    realImage: "assets/images/alsep-real.jpg",

    // CHANGE NARRATION HERE
    audio: "assets/audio/alsep-narration.mp3",

    mission: "[NASA DATA TO BE ADDED]",
    landingYear: "[NASA DATA TO BE ADDED]",
    purpose: "[NASA DATA TO BE ADDED]",
    location: "[NASA DATA TO BE ADDED]",
    latitude: "[NASA DATA TO BE ADDED]",
    longitude: "[NASA DATA TO BE ADDED]",
    mass: "[NASA DATA TO BE ADDED]",
    instruments: "[NASA DATA TO BE ADDED]",
    science: "[NASA DATA TO BE ADDED — VERIFY WITH NASA SOURCES]",
    contribution: "[NASA DATA TO BE ADDED — VERIFY WITH NASA SOURCES]",

    // ADD NASA RESOURCE URL HERE
    resources: ["[2026 NASA RESOURCE — INSERT WHEN AVAILABLE]"]
  },

  opportunity: {
    name: "Opportunity Rover",
    subtitle: "MARS • MARS EXPLORATION ROVER",
    intro: "The cartoon character represents NASA's Opportunity rover, remembered here as a curious explorer on another world.",

    // CHANGE CHARACTER IMAGE HERE
    characterImage: "assets/images/opportunity-cartoon.png",

    // CHANGE REAL NASA IMAGE HERE
    realImage: "assets/images/opportunity-real.jpg",

    // CHANGE NARRATION HERE
    audio: "assets/audio/opportunity-narration.mp3",

    mission: "[NASA DATA TO BE ADDED]",
    landingYear: "[NASA DATA TO BE ADDED]",
    purpose: "[NASA DATA TO BE ADDED]",
    location: "[NASA DATA TO BE ADDED]",
    latitude: "[NASA DATA TO BE ADDED]",
    longitude: "[NASA DATA TO BE ADDED]",
    mass: "[NASA DATA TO BE ADDED]",
    instruments: "[NASA DATA TO BE ADDED]",
    science: "[NASA DATA TO BE ADDED — VERIFY WITH NASA SOURCES]",
    contribution: "[NASA DATA TO BE ADDED — VERIFY WITH NASA SOURCES]",

    // ADD NASA RESOURCE URL HERE
    resources: ["[2026 NASA RESOURCE — INSERT WHEN AVAILABLE]"]
  },

  spirit: {
    name: "Spirit Rover",
    subtitle: "MARS • MARS EXPLORATION ROVER",
    intro: "The cartoon character represents NASA's Spirit rover, presented as a determined explorer whose scientific story you can reveal.",

    // CHANGE CHARACTER IMAGE HERE
    characterImage: "assets/images/spirit-cartoon.png",

    // CHANGE REAL NASA IMAGE HERE
    realImage: "assets/images/spirit-real.jpg",

    // CHANGE NARRATION HERE
    audio: "assets/audio/spirit-narration.mp3",

    mission: "[NASA DATA TO BE ADDED]",
    landingYear: "[NASA DATA TO BE ADDED]",
    purpose: "[NASA DATA TO BE ADDED]",
    location: "[NASA DATA TO BE ADDED]",
    latitude: "[NASA DATA TO BE ADDED]",
    longitude: "[NASA DATA TO BE ADDED]",
    mass: "[NASA DATA TO BE ADDED]",
    instruments: "[NASA DATA TO BE ADDED]",
    science: "[NASA DATA TO BE ADDED — VERIFY WITH NASA SOURCES]",
    contribution: "[NASA DATA TO BE ADDED — VERIFY WITH NASA SOURCES]",

    // ADD NASA RESOURCE URL HERE
    resources: ["[2026 NASA RESOURCE — INSERT WHEN AVAILABLE]"]
  },

  insight: {
    name: "InSight Robotic Arm",
    subtitle: "MARS • NASA INSIGHT LANDER",
    intro: "The cartoon character represents the InSight lander / robotic arm story, focused on the scientific work performed on Mars.",

    // CHANGE CHARACTER IMAGE HERE
    characterImage: "assets/images/insight-cartoon.png",

    // CHANGE REAL NASA IMAGE HERE
    realImage: "assets/images/insight-real.jpg",

    // CHANGE NARRATION HERE
    audio: "assets/audio/insight-narration.mp3",

    mission: "[NASA DATA TO BE ADDED]",
    landingYear: "[NASA DATA TO BE ADDED]",
    purpose: "[NASA DATA TO BE ADDED]",
    location: "[NASA DATA TO BE ADDED]",
    latitude: "[NASA DATA TO BE ADDED]",
    longitude: "[NASA DATA TO BE ADDED]",
    mass: "[NASA DATA TO BE ADDED]",
    instruments: "[NASA DATA TO BE ADDED]",
    science: "[NASA DATA TO BE ADDED — VERIFY WITH NASA SOURCES]",
    contribution: "[NASA DATA TO BE ADDED — VERIFY WITH NASA SOURCES]",

    // ADD NASA RESOURCE URL HERE
    resources: ["[2026 NASA RESOURCE — INSERT WHEN AVAILABLE]"]
  }
};


/* ============================================================
   AUDIO PATHS

   CHANGE YOUR AUDIO FILES HERE.
   These files are not preloaded all at once.
   ============================================================ */

const audioPaths = {
  // ADD YOUR AUDIO HERE
  busEngine: "assets/audio/bus-engine.mp3",
  // ADD YOUR AUDIO HERE
  marsAmbient: "assets/audio/mars-ambience.mp3",

  // ADD YOUR AUDIO HERE
  returnHome: "assets/audio/return-home.mp3",

  // ADD YOUR AUDIO HERE
  finalNarration: "assets/audio/final-narration.mp3"
};


/* ============================================================
   2. DOM ELEMENTS
   ============================================================ */

const elements = {
  body: document.body,
  story: document.getElementById("story"),
  startButton: document.getElementById("startButton"),

  progressBar: document.getElementById("progressBar"),
  currentChapter: document.getElementById("currentChapter"),
  currentLocation: document.getElementById("currentLocation"),

  infoModal: document.getElementById("infoModal"),
  modalPanel: document.querySelector(".modal-panel"),
  modalClose: document.getElementById("modalClose"),
  modalBackdrop: document.querySelector("[data-close-modal]"),

  modalImage: document.getElementById("modalImage"),
  modalImageFallback: document.getElementById("modalImageFallback"),
  modalSubtitle: document.getElementById("modalSubtitle"),
  modalTitle: document.getElementById("modalTitle"),
  modalIntro: document.getElementById("modalIntro"),
  modalFacts: document.getElementById("modalFacts"),
  modalScience: document.getElementById("modalScience"),
  modalContribution: document.getElementById("modalContribution"),
  modalResources: document.getElementById("modalResources"),

  assetNotice: document.getElementById("assetNotice")
};


/* ============================================================
   GLOBAL STATE
   ============================================================ */

let isAudioUnlocked = false;
let isModalOpen = false;
let activeSceneNumber = 1;
let activeObjectKey = null;

let lastFocusedElement = null;
let audioRequestId = 0;


/* ============================================================
   3. AUDIO MANAGER

   Only one narration is allowed at a time.

   Browsers generally require a real user interaction before
   audio can start. The START button calls unlock() first.
   ============================================================ */

const AudioManager = {
  narration: null,
  ambient: null,
  ambientType: null,
  engine: null,
  currentNarrationPath: null,

  createAudio(path, loop = false) {
    if (!path) return null;

    const audio = new Audio();
    audio.preload = "none";
    audio.loop = loop;
    audio.playsInline = true;
    audio.src = path;

    audio.addEventListener("error", () => {
      showAssetNotice(`Audio file could not be loaded: ${path}`);
    }, { once: true });

    return audio;
  },

  unlock() {
    if (isAudioUnlocked) return;

    isAudioUnlocked = true;

    /*
      We do NOT play narration here.
      The unlock happens because this function is called from
      the user's button click.
    */
  },

  stopAudioInstance(audio, reset = true) {
    if (!audio) return;

    audio.pause();

    if (reset) {
      try {
        audio.currentTime = 0;
      } catch (error) {
        // Some browsers may reject currentTime before metadata loads.
      }
    }
  },

  async playNarration(path) {
    if (!isAudioUnlocked || !path) return;

    /*
      Every new narration gets a new request ID. If the visitor
      scrolls quickly, an older play() promise cannot accidentally
      bring an outdated narration back to life.
    */
    const requestId = ++audioRequestId;

    this.stopNarration();

    this.currentNarrationPath = path;
    this.narration = this.createAudio(path, false);

    if (!this.narration) return;

    const narrationAudio = this.narration;
    narrationAudio.volume = 1;

    try {
      await narrationAudio.play();

      if (requestId !== audioRequestId || narrationAudio !== this.narration) {
        this.stopAudioInstance(narrationAudio, true);
      }
    } catch (error) {
      /*
        Missing files and browser playback restrictions are both
        handled gracefully. Clearing the reference is important so
        a later scene can retry instead of getting stuck.
      */
      if (narrationAudio === this.narration) {
        this.narration = null;
        this.currentNarrationPath = null;
      }

      showAssetNotice("Narration could not start. Check the audio file path.");
    }
  },

  stopNarration() {
    this.stopAudioInstance(this.narration, true);
    this.narration = null;
    this.currentNarrationPath = null;
  },

  async playAmbient(type, path, volume = 0.08) {
    if (!isAudioUnlocked || !path) return;

    if (this.ambientType === type && this.ambient && !this.ambient.paused) return;

    this.stopAmbient();

    this.ambientType = type;
    this.ambient = this.createAudio(path, true);

    if (!this.ambient) return;

    const ambientAudio = this.ambient;
    ambientAudio.volume = volume;

    try {
      await ambientAudio.play();
    } catch (error) {
      if (ambientAudio === this.ambient) {
        this.ambient = null;
        this.ambientType = null;
      }
      showAssetNotice("Ambient audio could not start. Check the audio file path.");
    }
  },

  stopAmbient() {
    this.stopAudioInstance(this.ambient, true);
    this.ambient = null;
    this.ambientType = null;
  },

  async playEngine() {
    if (!isAudioUnlocked || !audioPaths.busEngine) return;

    /* Do not restart the same engine loop every time a ScrollTrigger
       callback fires near a scene boundary. */
    if (this.engine && !this.engine.paused) return;

    this.stopAudioInstance(this.engine, true);
    this.engine = this.createAudio(audioPaths.busEngine, true);

    if (!this.engine) return;

    const engineAudio = this.engine;
    engineAudio.volume = 0.17;

    try {
      await engineAudio.play();
    } catch (error) {
      if (engineAudio === this.engine) {
        this.engine = null;
      }
      showAssetNotice("Bus engine audio could not start. Check the audio file path.");
    }
  },

  stopEngine() {
    this.stopAudioInstance(this.engine, true);
    this.engine = null;
  },

  stopAll() {
    this.stopNarration();
    this.stopAmbient();
    this.stopEngine();
  }
};


/* ============================================================
   4. LENIS INITIALIZATION

   We connect Lenis to GSAP's ticker so ScrollTrigger and smooth
   scrolling stay synchronized.
   ============================================================ */

let lenis = null;

function initializeLenis() {
  if (!window.Lenis) {
    console.warn("Lenis did not load. Native scrolling will continue.");
    return;
  }

  lenis = new Lenis({
    autoRaf: false,
    duration: 1.15,
    smoothWheel: true,
    syncTouch: false
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  lenis.on("scroll", ScrollTrigger.update);
}


/* ============================================================
   5. SCENE MANAGEMENT
   ============================================================ */

const sceneList = Array.from(document.querySelectorAll(".story-scene"));

function scrollToScene(sceneElement) {
  if (!sceneElement) return;

  if (lenis) {
    lenis.scrollTo(sceneElement, {
      offset: 0,
      duration: 1.45
    });
  } else {
    sceneElement.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


function updateChapterIndicator(sceneElement) {
  if (!sceneElement) return;

  const sceneNumber = sceneElement.dataset.scene || "1";
  const location = sceneElement.dataset.location || "EARTH";

  activeSceneNumber = Number(sceneNumber);
  elements.currentChapter.textContent = sceneNumber.padStart(2, "0");
  elements.currentLocation.textContent = location;
}


function getObjectKeyFromScene(sceneElement) {
  return sceneElement?.dataset?.objectKey || null;
}


function handleSceneEnter(sceneElement) {
  if (!sceneElement) return;

  updateChapterIndicator(sceneElement);

  const objectKey = getObjectKeyFromScene(sceneElement);
  activeObjectKey = objectKey;

  const sceneId = sceneElement.id;

  /*
    Audio is controlled by the chapter itself.

    Chapter 2, 6, 10:
      - Bus engine only.

    Chapters 3, 4, 5:
      - Object narration only.
      - NO moon ambience.

    Chapters 7, 8, 9:
      - Object narration + quiet Mars ambience.

    Chapter 11:
      - Final narration only.
  */

  // Stop audio layers from the previous chapter before starting
  // the audio appropriate for the new chapter.
  AudioManager.stopNarration();
  AudioManager.stopAmbient();
  AudioManager.stopEngine();

  if (objectKey) {
    const objectData = objects[objectKey];

    if (objectData) {
      AudioManager.playNarration(objectData.audio);
    }

    const isMars = sceneId === "scene-07" ||
                   sceneId === "scene-08" ||
                   sceneId === "scene-09";

    if (isMars) {
      AudioManager.playAmbient("mars", audioPaths.marsAmbient, 0.08);
    }

    return;
  }

  // Bus engine plays ONLY on Chapters 2, 6, and 10.
  if (
    sceneId === "scene-02" ||
    sceneId === "scene-06" ||
    sceneId === "scene-10"
  ) {
    AudioManager.playEngine();
    activeObjectKey = null;
    return;
  }

  if (sceneId === "scene-11") {
    activeObjectKey = null;

    if (isAudioUnlocked && audioPaths.finalNarration) {
      AudioManager.playNarration(audioPaths.finalNarration);
    }
  }
}

function handleSceneLeave(sceneElement) {
  if (!sceneElement) return;

  /*
    The active scene normally takes over the audio. We only need
    to explicitly clean up when an object scene is left and the
    visitor moves into a non-object scene.
  */
  if (getObjectKeyFromScene(sceneElement) && !isModalOpen) {
    const nextScene = sceneElement.nextElementSibling;

    if (nextScene && !nextScene.dataset.objectKey) {
      AudioManager.stopNarration();
    }
  }
}


/* ============================================================
   6. CHARACTER ANIMATIONS
   ============================================================ */

function createCharacterEntrance(sceneElement) {
  const character = sceneElement.querySelector(".character-wrap");
  const copyItems = sceneElement.querySelectorAll(".object-copy > *");

  if (!character) return;

  const entranceTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out"
    }
  });

  entranceTimeline.fromTo(
    character,
    {
      autoAlpha: 0,
      y: 70,
      scale: 0.92
    },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 1.05
    }
  );

  entranceTimeline.fromTo(
    copyItems,
    {
      autoAlpha: 0,
      y: 26
    },
    {
      autoAlpha: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.55
    },
    "-=0.65"
  );

  /*
    Floating character motion.
    It is a small continuous loop rather than a large animation.
  */
  const intensity = Number(character.dataset.float || 1);

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.to(character, {
      y: `-=${8 * intensity}`,
      duration: 2.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });
  }
}


function createTravelAnimation(sceneElement) {
  const bus = sceneElement.querySelector("[data-travel-bus]");
  const title = sceneElement.querySelector(".scene-title");
  const copy = sceneElement.querySelector(".scene-copy");
  const status = sceneElement.querySelector(".travel-status");
  const earth = sceneElement.querySelector(".earth-orb, .home-earth-orb");
  const mars = sceneElement.querySelector(".mars-orb");

  if (bus) {
    const isReturn = sceneElement.dataset.scene === "10";

    gsap.fromTo(
      bus,
      {
        xPercent: isReturn ? 90 : -85,
        y: 35,
        scale: isReturn ? 0.8 : 0.64,
        autoAlpha: 0
      },
      {
        xPercent: isReturn ? -40 : 35,
        y: -30,
        scale: 1,
        autoAlpha: 1,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sceneElement,
          start: "top 85%",
          end: "bottom 15%",
          scrub: 1.1
        }
      }
    );
  }

  if (title) {
    gsap.fromTo(
      title,
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sceneElement,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }

  if (copy) {
    gsap.fromTo(
      copy,
      { autoAlpha: 0, y: 22 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        delay: 0.12,
        scrollTrigger: {
          trigger: sceneElement,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }

  if (status) {
    gsap.fromTo(
      status,
      { autoAlpha: 0, y: 15 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        delay: 0.25,
        scrollTrigger: {
          trigger: sceneElement,
          start: "top 65%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }

  /*
    Parallax on the destination planet makes the trip feel
    physically deeper without requiring a 3D engine.
  */
  if (earth) {
    gsap.to(earth, {
      y: -50,
      x: -25,
      scrollTrigger: {
        trigger: sceneElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2
      }
    });
  }

  if (mars) {
    gsap.to(mars, {
      y: -60,
      x: -20,
      scale: 1.07,
      scrollTrigger: {
        trigger: sceneElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2
      }
    });
  }
}


/* ============================================================
   7. INFORMATION MODAL
   ============================================================ */

function renderModalFacts(data) {
  const factItems = [
    ["Mission", data.mission],
    ["Landing / Deployment Year", data.landingYear],
    ["Purpose", data.purpose],
    ["Location", data.location],
    ["Latitude", data.latitude],
    ["Longitude", data.longitude],
    ["Mass", data.mass],
    ["Instruments", data.instruments]
  ];

  elements.modalFacts.innerHTML = factItems
    .map(([label, value]) => {
      return `
        <div class="fact-item">
          <div class="fact-label">${escapeHtml(label)}</div>
          <div class="fact-value">${escapeHtml(value)}</div>
        </div>
      `;
    })
    .join("");
}


function renderResources(resources) {
  if (!Array.isArray(resources) || resources.length === 0) {
    elements.modalResources.innerHTML = `<div class="resource-placeholder">[NASA RESOURCES TO BE ADDED]</div>`;
    return;
  }

  elements.modalResources.innerHTML = resources
    .map((resource) => {
      const isUrl = /^https?:\/\//i.test(resource);

      if (isUrl) {
        return `
          <a
            class="resource-link"
            href="${escapeAttribute(resource)}"
            target="_blank"
            rel="noopener noreferrer">
            ${escapeHtml(resource)}
          </a>
        `;
      }

      return `<div class="resource-placeholder">${escapeHtml(resource)}</div>`;
    })
    .join("");
}


function openInfoModal(objectKey, triggerElement) {
  const data = objects[objectKey];

  if (!data) return;

  lastFocusedElement = triggerElement || document.activeElement;
  activeObjectKey = objectKey;
  isModalOpen = true;

  elements.modalSubtitle.textContent = data.subtitle;
  elements.modalTitle.textContent = data.name;
  elements.modalIntro.textContent = data.intro;

  /*
    CHANGE REAL NASA IMAGE HERE:
    The image source is taken from the DATA section above.
  */
  elements.modalImage.src = data.realImage;
  elements.modalImage.alt = `Real NASA photograph of ${data.name}`;

  elements.modalImageFallback.textContent = "NASA IMAGE PLACEHOLDER";
  elements.modalImageFallback.style.display = "none";
  elements.modalImage.style.display = "block";

  renderModalFacts(data);

  elements.modalScience.textContent = data.science;
  elements.modalContribution.textContent = data.contribution;
  renderResources(data.resources);

  elements.infoModal.setAttribute("aria-hidden", "false");
  elements.body.classList.add("modal-open");

  gsap.killTweensOf(elements.infoModal);
  gsap.killTweensOf(elements.modalPanel);

  gsap.set(elements.infoModal, {
    visibility: "visible"
  });

  gsap.timeline()
    .to(elements.infoModal, {
      autoAlpha: 1,
      duration: 0.45,
      ease: "power2.out"
    })
    .fromTo(
      elements.modalPanel,
      {
        y: 26,
        scale: 0.97
      },
      {
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: "power3.out"
      },
      "-=0.28"
    );

  requestAnimationFrame(() => elements.modalClose.focus());

  if (lenis) {
    lenis.stop();
  }
}


function closeInfoModal() {
  if (!isModalOpen) return;

  isModalOpen = false;

  gsap.timeline({
    onComplete: () => {
      elements.infoModal.setAttribute("aria-hidden", "true");
      elements.body.classList.remove("modal-open");

      if (lenis) {
        lenis.start();
      }

      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }

      lastFocusedElement = null;
    }
  })
    .to(elements.modalPanel, {
      y: 15,
      scale: 0.985,
      duration: 0.25,
      ease: "power2.in"
    })
    .to(elements.infoModal, {
      autoAlpha: 0,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(elements.infoModal, { visibility: "hidden" });
      }
    }, "-=0.16");
}


function setupModalImageFallback() {
  elements.modalImage.addEventListener("error", () => {
    elements.modalImage.style.display = "none";
    elements.modalImageFallback.style.display = "grid";
  });
}


function keepFocusInsideModal(event) {
  if (!isModalOpen || event.key !== "Tab") return;

  const focusable = Array.from(
    elements.infoModal.querySelectorAll(
      'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute("disabled"));

  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}


function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function escapeAttribute(value) {
  return String(value).replaceAll('"', "&quot;");
}


/* ============================================================
   8. SCROLLTRIGGER
   ============================================================ */

function initializeScrollTrigger() {
  gsap.registerPlugin(ScrollTrigger);

  /*
    Scene entrance detection.
    This is intentionally a reusable system:
    no duplicated ScrollTrigger code for individual characters.
  */
  sceneList.forEach((sceneElement) => {
    ScrollTrigger.create({
      trigger: sceneElement,
      start: "top 62%",
      end: "bottom 38%",

      onEnter: () => {
        handleSceneEnter(sceneElement);
      },

      onEnterBack: () => {
        handleSceneEnter(sceneElement);
      },

      onLeave: () => {
        handleSceneLeave(sceneElement);
      },

      onLeaveBack: () => {
        handleSceneLeave(sceneElement);
      }
    });

    /*
      Background parallax.
    */
    const background = sceneElement.querySelector(".background-base");

    if (background) {
      gsap.fromTo(
        background,
        { scale: 1.06, y: 0 },
        {
          scale: 1.14,
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: sceneElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        }
      );
    }

    /*
      Stars move at a different speed for subtle depth.
    */
    sceneElement.querySelectorAll(".stars-a, .stars-b").forEach((starLayer, index) => {
      gsap.to(starLayer, {
        y: index === 0 ? -42 : -70,
        x: index === 0 ? 18 : -15,
        ease: "none",
        scrollTrigger: {
          trigger: sceneElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.1
        }
      });
    });

    /*
      Object scenes get a reusable character entrance.
    */
    if (sceneElement.classList.contains("object-scene")) {
      createCharacterEntrance(sceneElement);
    }

    /*
      Travel scenes get a reusable travel animation.
    */
    if (sceneElement.classList.contains("scene-space")) {
      createTravelAnimation(sceneElement);
    }
  });

  /*
    Progress bar for the whole story.
  */
  ScrollTrigger.create({
    trigger: elements.story,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      gsap.set(elements.progressBar, {
        scaleX: self.progress
      });
    }
  });

  ScrollTrigger.refresh();
}


/* ============================================================
   9. BUTTON EVENTS
   ============================================================ */

function setupButtonEvents() {
  /*
    START BUTTON:
    1. Unlock audio.
    2. Scroll to Chapter 2.
    3. Chapter 2's scene-enter handler starts the bus engine.
  */
  elements.startButton.addEventListener("click", () => {
    AudioManager.unlock();

    const sceneTwo = document.getElementById("scene-02");
    scrollToScene(sceneTwo);
  });


  /*
    READ ABOUT ME:
    The data attribute tells the reusable modal which object
    to display.
  */
  document.querySelectorAll("[data-open-object]").forEach((button) => {
    button.addEventListener("click", () => {
      const objectKey = button.dataset.openObject;
      openInfoModal(objectKey, button);
    });
  });


  /*
    Modal close button.
  */
  elements.modalClose.addEventListener("click", closeInfoModal);

  /*
    Clicking the dark backdrop closes the modal.
  */
  elements.modalBackdrop.addEventListener("click", closeInfoModal);

  /*
    Escape closes the modal.
  */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isModalOpen) {
      closeInfoModal();
      return;
    }

    keepFocusInsideModal(event);
  });
}


/* ============================================================
   10. RESPONSIVE BEHAVIOR + ASSET FALLBACKS
   ============================================================ */

function setupPageVisibilityAudio() {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      AudioManager.narration?.pause();
      AudioManager.ambient?.pause();
      AudioManager.engine?.pause();
      return;
    }

    if (!isAudioUnlocked) return;

    const isEngineChapter =
      activeSceneNumber === 2 ||
      activeSceneNumber === 6 ||
      activeSceneNumber === 10;

    const isMarsChapter =
      activeSceneNumber === 7 ||
      activeSceneNumber === 8 ||
      activeSceneNumber === 9;

    if (isEngineChapter && AudioManager.engine && AudioManager.engine.paused) {
      AudioManager.engine.play().catch(() => {});
    }

    if (isMarsChapter && AudioManager.ambient && AudioManager.ambient.paused) {
      AudioManager.ambient.play().catch(() => {});
    }

    /* Narration resumes only for the currently active object or
       final narration scene. */
    if (
      AudioManager.narration &&
      AudioManager.narration.paused &&
      (activeObjectKey || activeSceneNumber === 11)
    ) {
      AudioManager.narration.play().catch(() => {});
    }
  });
}


function setupResponsiveBehavior() {
  /*
    ScrollTrigger already reacts to viewport changes.
    This refresh keeps the scene boundaries correct after a
    device rotation or resize.
  */
  let resizeTimer = null;

  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);

    resizeTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
  });
}


/*
  ============================================================
  IMAGE FALLBACK
  ------------------------------------------------------------
  Every placeholder image can fail without breaking the page.
  Instead, the surrounding .character-fallback is revealed.
  ============================================================
*/

function showImageFallback(imageElement) {
  if (!imageElement) return;

  imageElement.style.display = "none";

  const fallback = imageElement.parentElement?.querySelector(".character-fallback");

  if (fallback) {
    fallback.style.display = "grid";
  }

  if (imageElement.closest(".modal-image-wrap")) {
    const modalFallback = document.getElementById("modalImageFallback");

    if (modalFallback) {
      modalFallback.style.display = "grid";
    }
  }

  showAssetNotice(`Image placeholder missing: ${imageElement.getAttribute("src") || "unknown image"}`);
}


/*
  Small temporary notice for missing developer placeholders.
*/
function showAssetNotice(message) {
  if (!elements.assetNotice) return;

  elements.assetNotice.textContent = message;

  gsap.killTweensOf(elements.assetNotice);

  gsap.timeline()
    .set(elements.assetNotice, {
      autoAlpha: 1,
      y: 0
    })
    .to(elements.assetNotice, {
      autoAlpha: 0,
      y: 10,
      delay: 2.2,
      duration: 0.35,
      ease: "power2.in"
    });
}


/* ============================================================
   INITIALIZATION
   ============================================================ */

function initialize() {
  /*
    GSAP and ScrollTrigger are loaded with defer before this
    script executes, but this guard makes failures easier to
    diagnose if the CDN is unavailable.
  */
  if (!window.gsap || !window.ScrollTrigger) {
    console.error("GSAP or ScrollTrigger did not load.");
    return;
  }

  initializeLenis();
  setupModalImageFallback();
  setupButtonEvents();
  setupResponsiveBehavior();
  setupPageVisibilityAudio();
  initializeScrollTrigger();

  /*
    The first scene is active before the user clicks START.
    No narration is started here because modern browsers may
    block it before user interaction.
  */
  updateChapterIndicator(document.getElementById("scene-01"));

  /*
    Start with subtle landing-page entrance effects.
  */
  const landingItems = document.querySelectorAll("#scene-01 .reveal-item, #scene-01 .hero-title, #scene-01 .hero-subtitle, #scene-01 .primary-button, #scene-01 .landing-note, #scene-01 .landing-bus");

  gsap.fromTo(
    landingItems,
    {
      autoAlpha: 0,
      y: 28
    },
    {
      autoAlpha: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.15
    }
  );

  /*
    Gentle floating motion for the school bus.
  */
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".landing-bus, .final-bus").forEach((bus) => {
      gsap.to(bus, {
        y: -8,
        rotation: 0.6,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });
    });
  }
}


/*
  The script is loaded with defer in index.html. This guard also
  keeps initialization safe if the file is moved or loaded through
  another HTML host where DOMContentLoaded has already fired.
*/
if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", initialize, { once: true });
} else {
  initialize();
}


/*
  ============================================================
  BEGINNER REFERENCE
  ------------------------------------------------------------
  To customize the project, look for these comments:

  ### CHANGE THIS
  ### CHANGE CHARACTER IMAGE HERE
  ### CHANGE REAL NASA IMAGE HERE
  ### CHANGE NARRATION HERE
  ### ADD YOUR AUDIO HERE
  ### ADD NASA RESOURCE URL HERE

  The most important editable data is near the top of this file.
  ============================================================
*/
