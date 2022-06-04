// STOPWATCH
// declaring variables
// reference from https://www.youtube.com/watch?v=TdJRtsYLuaU
let seconds = 0;
let minutes = 0;
let hours = 0;

let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

let timestatus = "Stopped";
let interval = '';

// function that calculates the time in seconds, minutes and hours
function StartWatch() {
    
    seconds ++;

    if(seconds/60 === 1)
    {
        seconds = 0;
        minutes ++;

        if(minutes/60 === 1)
        {
            minutes = 0;
            hours++;
        }
    }

    if(seconds < 10)
    {
        displaySeconds = "0" + seconds.toString();
    }
    else{
        displaySeconds = seconds;
    }

    if(minutes < 10)
    {
        displayMinutes = "0" + minutes.toString();
    }
    else{
        displayMinutes = minutes;
    }


    if(seconds < 10)
    {
        displayHours = "0" + hours.toString();
    }
    else{
        displayHours = hours;
    }


    document.getElementById('screenStop').innerHTML = displayHours + ":" + displayMinutes + "." + displaySeconds;
    
}

// when user clicks start button, the button changes to 'stop' and vice-versa.
function startStopwatch() {
    if(timestatus == 'Stopped')
    {
        interval = window.setInterval(StartWatch,1000);
        document.getElementById("stopwatchStart").innerHTML = "Stop";
        timestatus = "Started";
    }
    else if(timestatus == 'Started')
    {
        window.clearInterval(interval);
        document.getElementById("stopwatchStart").innerHTML = 'Start';
        timestatus = 'Stopped';
    }

}

// function to reset the stopwatch back to 00:00.00
function resetStopwatch() {
    seconds = 0;
    hours = 0;
    minutes = 0;
    window.clearInterval(interval);
    document.getElementById('screenStop').innerHTML = '00:00.00';
    document.getElementById("stopwatchStart").innerHTML = "Start";
}

