import { isEscape } from './util.js';

const form = document.querySelector('.img-upload__form');
const openFormElement = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const closeButton = overlay.querySelector('.img-upload__cancel');
const hashtagInput = overlay.querySelector('.text__hashtags');
const commentInput = overlay.querySelector('.text__description');

const hashtagRule = /^#[а-яёa-z0-9]{1,19}$/i;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

function validateHashtagValue (value) {
  const hashtagsArray = value.split(' ');

  return hashtagsArray.every((element) => hashtagRule.test(element)) || hashtagsArray[0] === '';
}

function validateHashtagQuantity (value) {
  const hashtagsArray = value.split(' ');

  return hashtagsArray.length <= 5;
}

function validateHashtagRepeat (value) {
  const noRepeatArray = [];
  const hashtagsArray = value.split(' ');

  hashtagsArray.forEach((element) => {
    element = element.toLowerCase();
    if (!noRepeatArray.includes(element)) {
      noRepeatArray.push(element);
    }
  });
  return noRepeatArray.length === hashtagsArray.length;
}

function validateComments (value) {
  return value.length <= 140;
}

pristine.addValidator(
  hashtagInput,
  validateHashtagRepeat,
  'Хэштеги не должны повторяться',
);

pristine.addValidator(
  hashtagInput,
  validateHashtagQuantity,
  'Максимум 5 хэштегов',
);

pristine.addValidator(
  hashtagInput,
  validateHashtagValue,
  'Неверный формат хэштега'
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

function openForm () {
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
});

closeButton.addEventListener('click', () => {
  closeForm();
});
