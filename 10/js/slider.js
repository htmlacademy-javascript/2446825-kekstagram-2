import { getNumber } from './functions.js';
import { sliderSetting } from './data.js';

const STEP = 25;

const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const scaleUpButton = overlay.querySelector('.scale__control--bigger');
const scaleDownButton = overlay.querySelector('.scale__control--smaller');
const scaleValue = overlay.querySelector('.scale__control--value');
const previewImage = overlay.querySelector('.img-upload__preview').querySelector('img');
const sliderContainer = overlay.querySelector('.img-upload__effect-level');
const sliderElement = overlay.querySelector('.effect-level__slider');
const effectValue = overlay.querySelector('.effect-level__value');
const filterList = overlay.querySelectorAll('.effects__radio');
let valueNumber = getNumber(scaleValue.value);

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

filterList.forEach((element) => {
  sliderContainer.classList.add('hidden');
  element.addEventListener('change', (evt) => {
    const effect = evt.target.value;

    if (evt.target.checked) {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: sliderSetting[effect].min,
          max: sliderSetting[effect].max,
        },
        start: sliderSetting[effect].start,
        step: sliderSetting[effect].step,
      });
      sliderElement.noUiSlider.on('update', () => {
        effectValue.value = sliderElement.noUiSlider.get();
        previewImage.style.filter = `${sliderSetting[effect].effect}(${effectValue.value}${sliderSetting[effect].unit})`;
      });
    }
    if (effect !== 'none') {
      sliderContainer.classList.remove('hidden');
    } else {
      previewImage.style.filter = `${sliderSetting[effect].effect}`;
      sliderContainer.classList.add('hidden');
    }
  });
});

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
