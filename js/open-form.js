import { isEscape } from './util.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_QUANTITY = 5;

const form = document.querySelector('.img-upload__form');
const openFormElement = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const closeButton = overlay.querySelector('.img-upload__cancel');
const hashtagInput = overlay.querySelector('.text__hashtags');
const commentInput = overlay.querySelector('.text__description');

const hashtagRule = /^#[а-яёa-z0-9]{1,19}$/i;

let hashtagValue;
let hashtagQuantity;
let hashtagRepeat;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

const validateComments = (value) => value.length <= MAX_COMMENT_LENGTH;

const validateHashtag = (value) => {
  const hashtagsArray = value.trim().split(' ').filter((element) => element !== '');
  const noRepeatArray = [];
  hashtagsArray.forEach((element) => {
    element = element.toLowerCase();
    if (!noRepeatArray.includes(element)) {
      noRepeatArray.push(element);
    }
  });

  hashtagValue = hashtagsArray.every((element) => hashtagRule.test(element));
  hashtagQuantity = hashtagsArray.length <= MAX_HASHTAG_QUANTITY;
  hashtagRepeat = noRepeatArray.length === hashtagsArray.length;

  return hashtagValue && hashtagQuantity && hashtagRepeat;
};

const hastagErrorText = () => {
  let errorText = '';
  if (!hashtagValue) {
    errorText += ' Неверный формат хэштега! ';
  }

  if (!hashtagQuantity) {
    errorText += ' Максимум 5 хэштегов! ';
  }

  if (!hashtagRepeat) {
    errorText += ' Хэштеги не должны повторяться! ';
  }

  return errorText;
};

pristine.addValidator(
  hashtagInput,
  validateHashtag,
  hastagErrorText,
);

pristine.addValidator(
  commentInput,
  validateComments,
  'Максимум 140 символов'
);

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

const onDocumentKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      closeForm();
    }
  }
};

function openForm() {
  document.body.classList.add('modal-open');
  overlay.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeForm () {
  document.body.classList.remove('modal-open');
  overlay.classList.add('hidden');
  openFormElement.value = '';

  document.removeEventListener('keydown', onDocumentKeydown);
}

openFormElement.addEventListener('change', () => {
  openForm();
});

closeButton.addEventListener('click', () => {
  closeForm();
});
