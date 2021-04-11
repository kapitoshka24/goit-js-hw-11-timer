class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;

    this.init();
  }

  init() {
    const time = this.getTimeComponents(0);
    this.updateTimer(time);
  }

  countDown() {
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate.getTime() - currentTime;

      if (deltaTime < 0) {
        alert(
          `This date: {
                ${this.targetDate.getFullYear()}:
                ${this.targetDate.getMonth() + 1}:
                ${this.targetDate.getDate()}}
            has already passed. Try to enter another one.`
        );
        return;
      }

      const time = this.getTimeComponents(deltaTime);
      this.updateTimer(time);
    }, 1000);
  }

  updateTimer(time) {
    const timerRef = document.querySelector(this.selector);
    const valuesRef = timerRef.getElementsByClassName("value");

    [...valuesRef].map((elem) => {
      Object.entries(time).map((item) => {
        if (item[0] === elem.dataset.value) elem.innerText = item[1];
      });
    });
  }

  getTimeComponents(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24)).toString();
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(num) {
    return String(num).padStart(2, "0");
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Apr 31, 2021"),
});

timer.countDown();
