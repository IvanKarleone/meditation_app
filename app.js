"use strict"

chooseTime();

function chooseTime() {
    let switchTime = document.querySelector(".switch-time");
    let time = document.querySelector(".timer__time");

    switchTime.addEventListener("click", event => {
        if (!event.target.dataset.seconds) {
            return;
        }

        let seconds = event.target.dataset.seconds;

        time.innerText = `${seconds / 60}-00`;
        time.classList.add("timer__time_displayed");
    });
}