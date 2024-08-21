// Функция для проверки длины строки

const CHECK_STRING = 'Hello my friend';
const CHECK_LENGTH = 20;

const checkStringLength = (string, length) => string.length <= length;

checkStringLength(CHECK_STRING, CHECK_LENGTH);


// Функция для проверки на палиндромом

const PALYNDROM_CHECK = 'Лёша на полке клопа нашёл';

const checkPalyndrom = (string) => {
  const normaliseString = string.replaceAll(' ', '').toLowerCase();
  let newString = '';

  for (let i = normaliseString.length - 1; i >= 0; i--) {
    newString += normaliseString[i];
  }

  const palyndromCheck = normaliseString === newString;

  return palyndromCheck;
};

checkPalyndrom(PALYNDROM_CHECK);


// Функция для извлечения цифр

const NUMBER_EXTRACT = 'Hello 020.65 and 98';

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

getNumber(NUMBER_EXTRACT);


// Функция проверки времени

const START_DAY_TIME = '8:30';
const END_DAY_TIME = '17:00';
const START_CONFERENCE_TIME = '14:30';
const CONFERENCE_DURATION = 90;

const getMinuteSum = (string) => {
  const time = string.split(':');
  const minuteSum = +time[0] * 60 + +time[1];
  return minuteSum;
};

const checkTime = (startDay, endDay, startСonference, duration) => {
  if (getMinuteSum(startСonference) < getMinuteSum(startDay) || getMinuteSum(startСonference) + duration > getMinuteSum(endDay)) {
    return false;
  } return true;
};

checkTime(START_DAY_TIME, END_DAY_TIME, START_CONFERENCE_TIME, CONFERENCE_DURATION);
