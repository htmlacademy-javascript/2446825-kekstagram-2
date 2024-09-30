import { getRandomInteger, getRandomArrayElement } from './util.js';

//* Генерация массива фотографий пользователей

const NAMES = [
  'Александр',
  'Иван',
  'Михаил',
  'Юлия',
  'Мария',
  'Сергей',
  'Олеся',
  'Катя'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Просто я.',
  'Воскресное селфи.',
  'Даже мой кофе хочет кофе.',
  'Утренний бодун.',
  'А вот так я люблю спорт.',
  'Девчонки, налетайте!',
  'Крутая тачка и вечный драйв.',
  'Почти как босс.'
];

const COMMENT_QUANTITY = 30;
const DESCRIPTION_QUANTITY = 25;

const createRandomMessage = (length) => {
  const previousValues = [];
  while (previousValues.length < length) {
    const currentValue = getRandomArrayElement(MESSAGES);
    if (!previousValues.includes(currentValue)) {
      previousValues.push(currentValue);
    }
  }
  return previousValues.join(' ');
};

const createComment = (_, index) => ({
  id: index + 1,
  avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: createRandomMessage(getRandomInteger(1, 2)),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = (_, index) => ({
  id: index + 1,
  url: `photos/${ index + 1 }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, COMMENT_QUANTITY)}, createComment)
});

const createPhotoDescriptionArray = Array.from({length: DESCRIPTION_QUANTITY}, createPhotoDescription);

//*Настройки слайдера фильтров

const sliderSetting = {
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

export { createPhotoDescriptionArray, sliderSetting };
