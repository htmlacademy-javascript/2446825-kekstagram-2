import { getNumber } from './functions.js';

const STEP = 25;

const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const scaleUpButton = overlay.querySelector('.scale__control--bigger');
const scaleDownButton = overlay.querySelector('.scale__control--smaller');
const scaleValue = overlay.querySelector('.scale__control--value');
const img = overlay.querySelector('.img-upload__preview').querySelector('img');

let value = getNumber(scaleValue.value);

scaleDownButton.addEventListener('click', () => {
  if (value > 25) {
    value -= STEP;
  }
  scaleValue.value = `${value}%`;
  img.style.transform = `scale(${ value / 100})`;
});

scaleUpButton.addEventListener('click', () => {
  if (value < 100) {
    value += STEP;
  }
  scaleValue.value = `${value}%`;
  img.style.transform = `scale(${ value / 100})`;
});
