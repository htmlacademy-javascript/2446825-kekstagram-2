import { getNumber } from './util.js';

const STEP = 25;

const overlay = document.querySelector('.img-upload__overlay');
const previewImage = overlay.querySelector('.img-upload__preview').querySelector('img');
const scaleUpButton = overlay.querySelector('.scale__control--bigger');
const scaleDownButton = overlay.querySelector('.scale__control--smaller');
const scaleValue = overlay.querySelector('.scale__control--value');

let valueNumber = getNumber(scaleValue.value);

scaleDownButton.addEventListener('click', () => {
  if (valueNumber > 25) {
    valueNumber -= STEP;
  }
  scaleValue.value = `${valueNumber}%`;
  previewImage.style.transform = `scale(${ valueNumber / 100})`;
});

scaleUpButton.addEventListener('click', () => {
  if (valueNumber < 100) {
    valueNumber += STEP;
  }
  scaleValue.value = `${ valueNumber }%`;
  previewImage.style.transform = `scale(${ valueNumber / 100})`;
});
