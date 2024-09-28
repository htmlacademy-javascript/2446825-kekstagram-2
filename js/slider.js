import { getNumber } from './functions.js';
import { sliderSetting } from './data.js';

const STEP = 25;

const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const scaleUpButton = overlay.querySelector('.scale__control--bigger');
const scaleDownButton = overlay.querySelector('.scale__control--smaller');
const scaleValue = overlay.querySelector('.scale__control--value');
const img = overlay.querySelector('.img-upload__preview').querySelector('img');
const sliderElement = overlay.querySelector('.effect-level__slider');
const effectValue = overlay.querySelector('.effect-level__value');
const chrome = overlay.querySelector('#effect-chrome');
const radio = overlay.querySelectorAll('.effects__radio');
console.log(chrome.value);

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

radio.forEach((element) => {
  element.addEventListener('change', (evt) => {
    const target = evt.target;
    const tar = target.value;
    if (target.checked) {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: sliderSetting[tar].min,
          max: sliderSetting[tar].max,
        },
        start: sliderSetting[tar].start,
        step: sliderSetting[tar].step,
      });
      sliderElement.noUiSlider.on('update', () => {
        effectValue.value = sliderElement.noUiSlider.get();
        if (sliderSetting[tar].effect === 'none') {
          img.style.filter = `${sliderSetting[tar].effect}`;
        } else if (sliderSetting[tar].value === '%') {
          img.style.filter = `${sliderSetting[tar].effect}(${effectValue.value}%)`;
        } else if (sliderSetting[tar].value === 'px') {
          img.style.filter = `${sliderSetting[tar].effect}(${effectValue.value}px)`;
        } else {
          img.style.filter = `${sliderSetting[tar].effect}(${effectValue.value})`;
        }
      });
    }
  });
});

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
