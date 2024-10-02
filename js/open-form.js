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
  const hashtagsArray = value.split(' ');
  const noRepeatArray = [];
  hashtagsArray.forEach((element) => {
    element = element.toLowerCase();
    if (!noRepeatArray.includes(element)) {
      noRepeatArray.push(element);
    }
  });
  hashtagValue = hashtagsArray.every((element) => hashtagRule.test(element)) || hashtagsArray[0] === '';
  hashtagQuantity = hashtagsArray.length <= MAX_HASHTAG_QUANTITY;
  hashtagRepeat = noRepeatArray.length === hashtagsArray.length;

  return hashtagValue && hashtagQuantity && hashtagRepeat;
};

const hastagErrorText = () => {
  const validateHashtagResult = [hashtagValue, hashtagQuantity, hashtagRepeat];
  const errorMessages = ['Неверный формат хэштега.', 'Максимум 5 хэштегов.', 'Хэштеги не должны повторяться.'];
  const errorText = [];
  for (let i = 0; i < validateHashtagResult.length; i++) {
    if (!validateHashtagResult[i]) {
      errorText.push(errorMessages[i]);
    }
  }

  return errorText.join(' | ');
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
    closeForm();
  }
};

function openForm() {
  document.body.classList.add('modal-open');
  overlay.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);

  hashtagInput.addEventListener('focus', () => {
    document.removeEventListener('keydown', onDocumentKeydown);
  });

  hashtagInput.addEventListener('blur', () => {
    document.addEventListener('keydown', onDocumentKeydown);
  });

  commentInput.addEventListener('focus', () => {
    document.removeEventListener('keydown', onDocumentKeydown);
  });

  commentInput.addEventListener('blur', () => {
    document.addEventListener('keydown', onDocumentKeydown);
  });
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
