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

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const COMMENT_QUANTITY = 30;
const DESCRIPTION_QUANTITY = 25;
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createRandomMessage = (element) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomArrayElement(element);
    if (previousValues.length >= element.length) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomArrayElement(element);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const createComment = (commentElement, commentIndex) => ({
  id: commentIndex + 1,
  avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: Array.from({length: getRandomInteger(1, 2)}, createRandomMessage(MESSAGES)).join(' '),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = (photoElement, photoIndex) => ({
  id: photoIndex + 1,
  url: `photos/${ photoIndex + 1 }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, COMMENT_QUANTITY)}, (_,index) => createComment(_, index))
});

// eslint-disable-next-line no-unused-vars
const photoDescriptionArray = Array.from({length: DESCRIPTION_QUANTITY}, (_, index) => createPhotoDescription(_, index));
