import { isEscape } from './util.js';
import { showUnloadAllertMessage, showUnloadSuccesMessage } from './alerts.js';
import { sizeReset } from './resize-photo.js';
import { createSlider, updateSlider, filterReset } from './slider.js';
import { sendData } from './api.js';
import { setUserPhoto } from './user-pfoto-load.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_QUANTITY = 5;
const HASHTAG_RULE = /^#[а-яёa-z0-9]{1,19}$/i;

const AlertMessages = {
  VALUE : ' Неверный формат хэштега! ',
  QUANTITY: ' Максимум 5 хэштегов! ',
  REPEAT: ' Хэштеги не должны повторяться! ',
  COMMENT_LENGTH: 'Максимум 140 символов',
};

const SubmitButtonText = {
  BLOCK: 'отправляю...',
  UNBLOCK: 'опубликовать',
};

const filterForm = document.querySelector('.img-upload__form');
const openFormElement = filterForm.querySelector('.img-upload__input');
const overlay = filterForm.querySelector('.img-upload__overlay');
const closeButton = overlay.querySelector('.img-upload__cancel');
const hashtagInput = overlay.querySelector('.text__hashtags');
const commentInput = overlay.querySelector('.text__description');
const submitButton = overlay.querySelector('.img-upload__submit');


let hashtagValue;
let hashtagQuantity;
let hashtagRepeat;

const pristine = new Pristine(filterForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

const validateComments = (value) => value.length <= MAX_COMMENT_LENGTH;

const validateHashtag = (value) => {
  const hashtagsArray = value.trim().split(' ').filter((element) => element !== '');
  const noRepeatHashtagsArray = [];
  hashtagsArray.forEach((element) => {
    element = element.toLowerCase();
    if (!noRepeatHashtagsArray.includes(element)) {
      noRepeatHashtagsArray.push(element);
    }
  });

  hashtagValue = hashtagsArray.every((element) => HASHTAG_RULE.test(element));
  hashtagQuantity = hashtagsArray.length <= MAX_HASHTAG_QUANTITY;
  hashtagRepeat = noRepeatHashtagsArray.length === hashtagsArray.length;

  return hashtagValue && hashtagQuantity && hashtagRepeat;
};

const getHastagErrorText = () => {
  let errorText = '';
  if (!hashtagValue) {
    errorText += AlertMessages.VALUE;
  }

  if (!hashtagQuantity) {
    errorText += AlertMessages.QUANTITY;
  }

  if (!hashtagRepeat) {
    errorText += AlertMessages.REPEAT;
  }

  return errorText;
};

pristine.addValidator(
  hashtagInput,
  validateHashtag,
  getHastagErrorText,
);

pristine.addValidator(
  commentInput,
  validateComments,
  AlertMessages.COMMENT_LENGTH
);

const onDocumentKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === commentInput || document.body.lastChild.tagName === 'SECTION') {
      evt.stopPropagation();
    } else {
      closeFilterForm();
    }
  }
};

function openFilterForm() {
  document.body.classList.add('modal-open');
  overlay.classList.remove('hidden');
  setUserPhoto();
  createSlider();
  updateSlider();

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeFilterForm () {
  document.body.classList.remove('modal-open');
  overlay.classList.add('hidden');
  openFormElement.value = '';
  pristine.reset();
  sizeReset();
  filterReset();
  filterForm.reset();

  document.removeEventListener('keydown', onDocumentKeydown);
}

openFormElement.addEventListener('change', openFilterForm);

closeButton.addEventListener('click', closeFilterForm);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.BLOCK;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.UNBLOCK;
};

const setFilterFormSubmit = () => {
  filterForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      const formData = new FormData(evt.target);

      sendData(formData)
        .then(() => {
          showUnloadSuccesMessage();
          closeFilterForm();
        })
        .catch(() => {
          showUnloadAllertMessage();
        })
        .finally(() => {
          unblockSubmitButton();
        });
    }
  });
};

export { setFilterFormSubmit };
