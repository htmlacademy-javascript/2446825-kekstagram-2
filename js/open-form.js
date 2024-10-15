import { isEscape } from './util.js';
import { showUnloadAllert, showUnloadSucces } from './alerts.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_QUANTITY = 5;

const filterForm = document.querySelector('.img-upload__form');
const openFormElement = filterForm.querySelector('.img-upload__input');
const overlay = filterForm.querySelector('.img-upload__overlay');
const closeButton = overlay.querySelector('.img-upload__cancel');
const hashtagInput = overlay.querySelector('.text__hashtags');
const commentInput = overlay.querySelector('.text__description');

const hashtagRule = /^#[а-яёa-z0-9]{1,19}$/i;

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

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeFilterForm () {
  document.body.classList.remove('modal-open');
  overlay.classList.add('hidden');
  openFormElement.value = '';

  document.removeEventListener('keydown', onDocumentKeydown);
}

openFormElement.addEventListener('change', () => {
  openFilterForm();
});

closeButton.addEventListener('click', () => {
  closeFilterForm();
});

const setFilterFormSubmit = () => {
  filterForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      const formData = new FormData(evt.target);

      fetch('https://31.javascript.htmlacademy.pro/kekstagram',
        {
          method: 'POST',
          body: formData,
        },
      )
        .then((response) => {
          if(response.ok) {
            closeFilterForm();
          } else {
            showUnloadAllert();
          }
        })
        .then(() => {
          showUnloadSucces();
        })
        .catch(() => {
          showUnloadAllert();
        });
    }
  });
};

export { setFilterFormSubmit };
