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

const shuffle = (thumbsArray) => {
  let shuffleItem, temp;
  for (let currentItem = thumbsArray.length - 1; currentItem > 0; currentItem--) {
    shuffleItem = Math.floor(Math.random() * (currentItem + 1));
    temp = thumbsArray[shuffleItem];
    thumbsArray[shuffleItem] = thumbsArray[currentItem];
    thumbsArray[currentItem] = temp;
  }
  return thumbsArray;
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscape, makeElement, getNumber, shuffle, debounce };
