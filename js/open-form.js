import { isEscape } from './util.js';

const open = document.querySelector('.img-upload__input');
const overlay = document.querySelector('.img-upload__overlay');
const closeButton = overlay.querySelector('.img-upload__cancel');

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
  open.value = '';

  document.removeEventListener('keydown', onDocumentKeydown);
}

open.addEventListener('change', () => {
  openForm();
});

closeButton.addEventListener('click', () => {
  closeForm();
});
