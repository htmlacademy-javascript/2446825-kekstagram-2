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

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomId = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const createPhotoId = createRandomId(1, 25);
const createUrlId = createRandomId(1, 25);
const createCommentId = createRandomId(1, 10000);
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = () => ({
  id: createCommentId(),
  avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const commentArray = Array.from({length: getRandomInteger(0, 30)}, createComment);

const createPhotoDescription = () => ({
  id: createPhotoId(),
  url: `photos/${ createUrlId() }.jpg`,
  description: 'Моё личное фото.',
  likes: getRandomInteger(15, 200),
  comments: commentArray
});

// eslint-disable-next-line no-unused-vars
const photoDescriptionArray = Array.from({length: 25}, createPhotoDescription);
