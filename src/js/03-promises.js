import { Notify } from "notiflix";
const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);
 
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
     resolve({position,delay})
  } else {
    reject({position,delay})
  }
    }, delay)
  })
}

function onFormSubmit(e) {
  e.preventDefault();

  let delayValue = form.delay.value;

  for (let i = 0; i < form.amount.value; i++) {
    delayValue += form.step.value;
     createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,);
      });
    
  }
  
}