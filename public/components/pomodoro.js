
// POMODORO
const el = document.querySelector(".pomodoroTimer");
// const bell = document.querySelector("audio");

const minTime = document.querySelector(".mins");
const secTime = document.querySelector(".secs");

const startBtn = document.getElementById("pomodoroStart");
const sessionText = document.querySelector(".session");

// local storage
localStorage.setItem("btn", "focus");

// declaring variables
let initial, totalsecs, perc, paused, mins, secs;

// to start button for click event
startBtn.addEventListener("click", () => {

    // get btn from local storage
    let btn = localStorage.getItem("btn");

    // will be converted into integer with "+"
    if (btn === "focus") {
        mins = +localStorage.getItem("focusTime")  || 25;
    }
    else {
        mins = +localStorage.getItem("breakTime")  || 5;
    }


    // converting mins to secs
    secs = mins * 60;
    totalsecs = mins * 60;
    setTimeout(decremenT(), 60);
    startBtn.style.transform = "scale(0)";
    paused = false;

});

function decremenT() {
    minTime.textContent = Math.floor(secs / 60);
    // returns as 2 digit format eg. 01,02...09
    secTime.textContent = secs % 60 > 9 ? secs % 60 : `0${secs % 60}`;

    if (circle.classList.contains("almostDone")) {
        circle.classList.remove("almostDone");
    }

    if (secs > 0) {
        // calculate percentage
        // will be a whole number between 0 and 100
        perc = Math.ceil(((totalsecs - secs) / totalsecs) * 100);
        setProgress(perc);

        secs--;
        initial = window.setTimeout("decremenT()",1000);

        // if it is less than 10 seconds colour will become darker
        if (secs < 10) {
            circle.classList.add("almostDone");
        }
    }
    else {
        mins = 0;
        secs = 0;
        // bell.play();
        let btn = localStorage.getItem("btn");

        // display break button once focus is done
        if (btn === "focus") {
            startBtn.textContent = "Break"; 
            startBtn.classList.add("break");
            localStorage.setItem("btn", "break");
        }

        // display focus button once break is done
        else {
           startBtn.classList.remove("break");
           startBtn.textContent = "Focus";
           localStorage.setItem("btn","focus");
        }
        
        // start button reappears
        startBtn.style.transform = "scale(1)";
    }
}

// circle that visually shows progress
const circle = document.querySelector(".progress-ring-circle");
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

function setProgress(percent){
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}


// settings
const focusTimeInput = document.getElementById("focusTime");
const breakTimeInput = document.getElementById("breakTime");
const pauseBtn = document.getElementById("pomodoroPause");

focusTimeInput.value = localStorage.getItem("focusTime");
breakTimeInput.value = localStorage.getItem("breakTime");

// get value of user input
//input will be stored even when user refreshes
document.getElementById("setTime").addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("focusTime", focusTimeInput.value);
    localStorage.setItem("breakTime", breakTimeInput.value);
    document.getElementById("userSaves").innerHTML = " * Saved details :)"
    console.log("Saved");
});

// reset back to default time
document.getElementById("pomodoroEnd").addEventListener("click", () => {
    // when user ends pomodoro timer the start button reappears
    startBtn.style.transform = "scale(1)";
    clearTimeout(initial);
    setProgress(0);
    // returns to 00:00
    minTime.textContent = "00";
    secTime.textContent = "00";
})

pauseBtn.addEventListener("click", () => {
    if (paused === undefined) {
        return;
    }
    if (paused) {
        paused = false;
        initial = setTimeout("decremenT()", 60);
        pauseBtn.textContent = "Pause";
        pauseBtn.classList.remove("resume");
    }
    else{
        clearTimeout(initial);
        pauseBtn.textContent = "Resume";
        pauseBtn.classList.add("Resume");
        paused = true;
    }

})