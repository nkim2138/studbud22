//nothing worked when i imported the other js files here so I just imported those files straight to .html


// switching from stopwatch to pomodoro
const stopwatchButton = document.querySelector(".stopActive");
const pomodoroButton = document.querySelector(".pomoActive");
const switchtimer = document.querySelector(".switchtimer");

function active2(){
    //moves and changes screen to pomodoro
    switchtimer.style.marginLeft="-70%";

    // remove bottom border from stopwatch
    stopwatchButton.style.borderBottom="none";
    pomodoroButton.style.borderBottom="3px solid #EF7E7E";
    pomodoroButton.style.borderRadius="3px";
}

// shows pomodoro timer starting
function active3(){
    switchtimer.style.marginLeft="-407%";
}


// back to stopwatch
function active1(){
    switchtimer.style.marginLeft="0%";
    pomodoroButton.style.borderBottom="none";
    stopwatchButton.style.borderBottom="3px solid #EF7E7E";
    
}


function toggleTimer() {
    document.getElementById("stopwatchPomodoroPopup").classList.toggle("active");
    console.log("Pop");
}