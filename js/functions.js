// Функция для проверки длины строки

const CHECK_STRING = 'Hello my friend';
const CHECK_LENGTH = 20;

const getStringLength = function (string, length) {
  const checkResult = string.length <= length;
  return checkResult;
};

getStringLength(CHECK_STRING, CHECK_LENGTH);


// Функция для проверки на палиндромом

const PALYNDROM_CHECK = 'Лёша на полке клопа нашёл';

const getPalyndrom = function (string) {
  const normaliseString = string.replaceAll(' ', '').toLowerCase();
  let newString = '';

  for (let i = normaliseString.length - 1; i >= 0; i--) {
    newString += normaliseString[i];
  }

  const palyndromCheck = normaliseString === newString;

  return palyndromCheck;
};

getPalyndrom(PALYNDROM_CHECK);


// Функция для извлечения цифр

const NUMBER_EXTRACT = '1 кефир, 0.5 батона';

const getNumber = function (string) {
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

getNumber(NUMBER_EXTRACT);
