/* =====================================
   ELEMENTS
===================================== */

const startBtn = document.getElementById("startBtn");

const bgMusic = document.getElementById("bgMusic");

const startScene = document.getElementById("startScene");
const birthScene = document.getElementById("birthScene");
const nameScene = document.getElementById("nameScene");
const ageScene = document.getElementById("ageScene");
const countdownScene = document.getElementById("countdownScene");
const finalScene = document.getElementById("finalScene");

const introScreen = document.getElementById("introScreen");
const mainWebsite = document.getElementById("mainWebsite");

const ageNumber = document.getElementById("ageNumber");
const countdownNumber = document.getElementById("countdownNumber");



/* =====================================
   CALCULATE AGE AUTOMATICALLY
===================================== */

function calculateAge() {

    const birthDate = new Date(2005, 8, 18);

    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference =
        today.getMonth() - birthDate.getMonth();

    const dayDifference =
        today.getDate() - birthDate.getDate();


    if (
        monthDifference < 0 ||
        (monthDifference === 0 && dayDifference < 0)
    ) {
        age--;
    }


    return age;
}



/* =====================================
   CHANGE SCENES
===================================== */

function showScene(scene) {

    const scenes =
        document.querySelectorAll(".scene");


    scenes.forEach((item) => {

        item.classList.remove("active");

    });


    setTimeout(() => {

        scene.classList.add("active");

    }, 300);

}



/* =====================================
   START EXPERIENCE
===================================== */

startBtn.addEventListener("click", () => {

    /* Start music from the user's first interaction. */
    bgMusic.volume = 0.65;
    bgMusic.play().catch(() => {});

    /* Scene 1 → Birth Date */

    startScene.classList.remove("active");


    setTimeout(() => {

        countdownScene.classList.add("active");
        startCountdown();

    }, 600);



    /* Birth Date → Name */

    /* Name → Age */

    /* Age → Countdown */

});



/* =====================================
   CINEMATIC COUNTDOWN
===================================== */

function startCountdown() {

    let count = 5;


    countdownNumber.textContent = count;


    const countdown = setInterval(() => {

        count--;


        if (count > 0) {

            countdownNumber.textContent = count;


            /* Restart animation */

            countdownNumber.classList.remove("count-pop");

            void countdownNumber.offsetWidth;

            countdownNumber.classList.add("count-pop");

        }


        else {

            clearInterval(countdown);


            showScene(finalScene);


            /* Final transition */

            setTimeout(() => {

                introScreen.classList.add("intro-hide");


                mainWebsite.classList.remove("hidden");


                /* Remove intro completely */

                setTimeout(() => {

                    introScreen.style.display = "none";

                }, 1500);


            }, 3500);

        }


    }, 1000);

}


/* =====================================
   MEMORY MOVIE
===================================== */

const surpriseBtn = document.getElementById("surpriseBtn");
const candleMoment = document.getElementById("candleMoment");
const candleButton = document.getElementById("candleButton");
const photoCard = document.getElementById("photoCard");
const rotatingPhoto = document.getElementById("rotatingPhoto");
const memoryImages = Array.from({ length: 5 }, (_, index) =>
    document.getElementById(`memoryImage${index + 1}`)
);
const memoryMovie = document.getElementById("memoryMovie");
const memoryText = document.getElementById("memoryText");
const memoryContent = document.getElementById("memoryContent");
const movieEnding = document.getElementById("movieEnding");

const memories = [
    { photo: "images/memory-1.jpg", text: "Kota gave us more than just classes and memories... it gave me some really beautiful moments with you. 💗" },
    { photo: "images/memory-2.jpg", text: "All those little conversations, random plans, and time spent together somehow became some of my favorite memories. ✨" },
    { photo: "images/memory-3.jpg", text: "I may not say it often, but I genuinely value every moment we've shared. Some friendships just quietly become special. 💗" },
    { photo: "images/memory-4.jpg", text: "And then there are the moments that make me wonder... how did I survive being friends with you? 😭😂" },
    { photo: "images/memory-5.jpg", text: "Happy Birthday, Sneha! 💗 May this year bring you countless reasons to smile, beautiful memories, and everything you've been wishing for. Stay the same wonderful person you are." }
];

const PHOTO_DURATION = 7000;
const ROTATION_DURATION = 1600;
const CAROUSEL_STEP = 72;
let currentPhoto = 0;
let movieTimer = null;
let rotationTimer = null;
let isRotating = false;

function showPhoto(index) {
    const memory = memories[index];
    memoryImages.forEach((image, imageIndex) => {
        setImageWithFallback(image, memories[imageIndex].photo);
        image.alt = `Birthday memory ${imageIndex + 1}`;
    });
    memoryText.textContent = memory.text;
    memoryText.classList.remove("text-change");
    void memoryText.offsetWidth;
    memoryText.classList.add("text-change");
}

function startMemoryMovie() {
    memoryMovie.classList.add("active");
    memoryMovie.setAttribute("aria-hidden", "false");
    currentPhoto = 0;
    isRotating = false;
    rotatingPhoto.style.transition = "";
    rotatingPhoto.style.transform = "rotateY(0deg)";
    showPhoto(currentPhoto);
    startPhotoTimer();
}

function startPhotoTimer() {
    clearTimeout(movieTimer);
    movieTimer = setTimeout(() => {
        rotateToNext();
    }, PHOTO_DURATION);
}

function rotateToNext() {
    if (isRotating) return;
    const nextIndex = currentPhoto + 1;
    if (nextIndex >= memories.length) {
        finishMemoryMovie();
        return;
    }
    isRotating = true;
    rotatingPhoto.style.transform = `rotateY(-${nextIndex * CAROUSEL_STEP}deg)`;
    rotationTimer = setTimeout(() => {
        finishRotation(nextIndex);
    }, ROTATION_DURATION);
}

function finishRotation(nextIndex) {
    memoryText.textContent = memories[nextIndex].text;
    currentPhoto = nextIndex;
    showPhoto(currentPhoto);
    isRotating = false;
    startPhotoTimer();
}

function setImageWithFallback(image, source) {
    image.onerror = () => image.classList.add("missing-photo");
    image.onload = () => image.classList.remove("missing-photo");
    image.src = source;
}

function finishMemoryMovie() {
    clearTimeout(movieTimer);
    clearTimeout(rotationTimer);
    isRotating = false;
    movieEnding.classList.add("active");
    movieEnding.setAttribute("aria-hidden", "false");
}

surpriseBtn.addEventListener("click", () => {
    candleMoment.classList.add("active");
    candleMoment.setAttribute("aria-hidden", "false");
    candleButton.focus();
});

candleButton.addEventListener("click", () => {
    if (candleButton.classList.contains("blown-out")) return;

    candleButton.classList.add("blown-out");
    candleButton.setAttribute("aria-label", "Candle blown out");
    candleMoment.classList.add("candle-fading");

    setTimeout(() => {
        candleMoment.classList.remove("active", "candle-fading");
        candleMoment.setAttribute("aria-hidden", "true");
        movieEnding.classList.remove("active");
        movieEnding.setAttribute("aria-hidden", "true");
        startMemoryMovie();
    }, 900);
});


