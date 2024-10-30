import { sliderSettings } from './data.js';

const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const previewImage = overlay.querySelector('.img-upload__preview').querySelector('img');
const sliderContainer = overlay.querySelector('.img-upload__effect-level');
const sliderElement = overlay.querySelector('.effect-level__slider');
const effectValue = overlay.querySelector('.effect-level__value');
const filtersList = overlay.querySelectorAll('.effects__radio');

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
};

const updateSlider = () => {
  filtersList.forEach((element) => {
    sliderContainer.classList.add('hidden');
    element.addEventListener('change', (evt) => {
      const effect = evt.target.value;

      if (evt.target.checked) {
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: sliderSettings[effect].min,
            max: sliderSettings[effect].max,
          },
          start: sliderSettings[effect].start,
          step: sliderSettings[effect].step,
        });
        sliderElement.noUiSlider.on('update', () => {
          effectValue.value = sliderElement.noUiSlider.get();
          previewImage.style.filter = `${sliderSettings[effect].effect}(${effectValue.value}${sliderSettings[effect].unit})`;
        });
      }
      if (effect !== 'none') {
        sliderContainer.classList.remove('hidden');
      } else {
        previewImage.style.filter = `${sliderSettings[effect].effect}`;
        sliderContainer.classList.add('hidden');
      }
    });
  });
};

const filterReset = () => {
  sliderElement.noUiSlider.destroy();
  previewImage.style.filter = 'unset';
};

export { createSlider, updateSlider, filterReset };
