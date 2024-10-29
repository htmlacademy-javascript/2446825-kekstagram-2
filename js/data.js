//*Настройки слайдера фильтров

const sliderSettings = {
  none: {
    effect: 'unset',
    unit: '',
    min: 0,
    max: 0,
    step: 0,
    start: 0
  },

  chrome: {
    effect: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },

  sepia: {
    effect: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },

  marvin: {
    effect: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    start: 100
  },

  phobos: {
    effect: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3
  },

  heat: {
    effect: 'brightness',
    unit: '',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3
  }
};

export { sliderSettings };
