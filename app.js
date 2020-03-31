"use strict"

chooseTime();
clickTimerControls();

function clickTimerControls() {
    let play = document.querySelector(".controls__play");
    let pause = document.querySelector(".controls__pause");
    let replay = document.querySelector(".controls__replay");
    let time = document.querySelector(".timer__time");
    let video = document.querySelector(".page__video");
    let track = document.querySelector(".timer__track");
    let trackOutlineCircle = document.querySelector(".timer__moving-outline circle");
    let idTime = 0;

    let trackOutlineLength = trackOutlineCircle.getTotalLength();
    trackOutlineCircle.style.strokeDasharray = trackOutlineLength;
    trackOutlineCircle.style.strokeDashoffset = trackOutlineLength;

    play.addEventListener("click", () => {
        if (time.hidden) {
            alert("Please, choose time!");
            return;
        }

        hiddenDisplayControls();
        video.play();
        track.play();

        idTime = setInterval(() => {
            if (time.leftSeconds == 0) {
                endTime();
                return;
            }

            trackOutlineCircle.style.strokeDashoffset = trackOutlineLength * (1 - ((time.seconds - time.leftSeconds) / time.seconds));
            time.leftSeconds--;
            time.innerText = (time.leftSeconds % 60 >= 10) ? `${Math.floor(time.leftSeconds / 60)}:${time.leftSeconds % 60}` : 
            `${Math.floor(time.leftSeconds / 60)}:0${time.leftSeconds % 60}`;
        }, 1000);
    });

    pause.addEventListener("click", () => {
        hiddenDisplayControls();
        video.pause();
        track.pause();
        clearInterval(idTime);
    });

    replay.addEventListener("click", () => {
        endTime();
        play.hidden = false;
        pause.hidden = true;
    });

    function hiddenDisplayControls() {
        play.hidden = !play.hidden;
        pause.hidden = !pause.hidden;
    }

    function endTime() {
        pause.click();
        trackOutlineCircle.style.strokeDashoffset = trackOutlineLength;
        time.leftSeconds = time.seconds;
        time.innerText = `${time.seconds / 60}:00`;
    }
}

function chooseTime() {
    let switchTime = document.querySelector(".switch-time");
    let time = document.querySelector(".timer__time");
    let trackOutlineCircle = document.querySelector(".timer__moving-outline circle");
    let replay = document.querySelector(".controls__replay");
    let prevSeconds = 0;

    switchTime.addEventListener("click", event => {
        let seconds = event.target.dataset.seconds;

        if (!seconds) {
            return;
        }

        if (prevSeconds != seconds) {
            replay.click();
            prevSeconds = seconds;
        }

        time.seconds = seconds;
        time.leftSeconds = seconds;

        time.innerText = `${time.seconds / 60}:00`;
        time.hidden = false;
    });
}