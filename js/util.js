//* генератор рандомных чисел
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//* генератор рандомных эдементов массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//* проверка на escape
const isEscape = (evt) => evt.key === 'Escape';

//* создаёт элемент
const makeElement = (tagName, className, text) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

//* функция для извлечения цифр
const getNumber = (string) => {
  string = string.toString();
  let newString = '';
  let resultString = '';
  for (let i = 0; i < string.length; i++) {
    if (isNaN(parseInt(string[i], 10)) === false) {
      newString += string[i];
    }
    resultString = parseInt(newString, 10);
  }
  return resultString;
};

const shuffle = (array) => {
  let j, temp;
  for (let i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};

export { getRandomInteger, getRandomArrayElement, isEscape, makeElement, getNumber, shuffle };
