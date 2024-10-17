import { isEscape } from './util.js';

const ALERT_SHOW_TIME = 5000;

const alertTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const unloadAllert = document.querySelector('#error').content.querySelector('.error');
const unloadSucces = document.querySelector('#success').content.querySelector('.success');


//* сообщение с ошибкой загрузки изображений от других пользователей
const showLoadAlert = () => {
  const alertContainer = alertTemplate.cloneNode(true);

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

//* сообщение с ошибкой загрузки изображения
const showUnloadAllertMessage = () => {
  const alertContainer = unloadAllert.cloneNode(true);
  const errorButton = alertContainer.querySelector('.error__button');
  const innerContainer = alertContainer.querySelector('.error__inner');
  document.body.append(alertContainer);

  errorButton.addEventListener('click', () => {
    alertContainer.remove();
  });

  document.addEventListener('click', (evt) => {
    const innerContainerBoundaries = evt.composedPath().includes(innerContainer);
    if (!innerContainerBoundaries) {
      alertContainer.remove();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscape) {
      evt.stopPropagation();
      alertContainer.remove();
    }
  });
};

//* сообщение об успешной загрузке изображения
const showUnloadSuccesMessage = () => {
  const successContainer = unloadSucces.cloneNode(true);
  const successButton = successContainer.querySelector('.success__button');
  const innerContainer = successContainer.querySelector('.success__inner');
  document.body.append(successContainer);

  successButton.addEventListener('click', () => {
    successContainer.remove();
  });

  document.addEventListener('click', (evt) => {
    const innerContainerBoundaries = evt.composedPath().includes(innerContainer);
    if (!innerContainerBoundaries) {
      successContainer.remove();
    }
  });

  document.addEventListener('keydown', () => {
    if (isEscape) {
      successContainer.remove();
    }
  });
};

export { showLoadAlert, showUnloadAllertMessage, showUnloadSuccesMessage };
