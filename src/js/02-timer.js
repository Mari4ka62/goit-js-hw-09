import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
 

const buttonStart = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

buttonStart.disabled = true;

let selectedDate = null;
let intervalId = null;
let currentDate = null;
let formatDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate.getTime() < new Date().getTime()) {
        return Notify.failure('Please choose a date in the future', {
        position: 'center',
      });
        // alert('Please choose a date in the future');
    } else {
        buttonStart.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

buttonStart.addEventListener('click', onButtonStartClick);

function onButtonStartClick() {
  intervalId = setInterval(startInterval, 1000);
}

function startInterval() {
    currentDate = selectedDate.getTime() - new Date().getTime();
    
    formatDate = convertMs(currentDate);

    recordDate(formatDate);

      if (currentDate <= 0) {
      clearInterval(intervalId);
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
    }
}

function recordDate(value) {
    daysEl.textContent = addZero(value.days);
    hoursEl.textContent = addZero(value.hours);
    minutesEl.textContent = addZero(value.minutes);
    secondsEl.textContent = addZero(value.seconds);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addZero(value) {
  return value.toString().padStart(2, 0);
}