import { isEscape } from './util.js';
import { renderComments, clearCommentList } from './render-comment-list.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPicture.querySelector('.big-picture__cancel');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const bigPictureCommentList = bigPicture.querySelector('.social__comments');

const onDocumentKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture (evt) {
  evt.preventDefault();
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPictureCommentList.innerHTML = '';

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture () {
  clearCommentList();

  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  bigPictureCommentList.innerHTML = '';

  document.removeEventListener('keydown', onDocumentKeydown);
}

const createBigPictureInfo = (element) => {
  bigPicture.querySelector('img').src = element.querySelector('.picture__img').src;
  bigPicture.querySelector('.likes-count').textContent = element.querySelector('.picture__likes').textContent;
  bigPicture.querySelector('.social__comment-total-count').textContent = element.querySelector('.picture__comments').textContent;
  bigPictureCaption.textContent = element.querySelector('.picture__img').alt;
};

const renderBigPicture = (thumbsArray) => {
  const pictureContainer = document.querySelector('.pictures');

  pictureContainer.addEventListener('click', (evt) => {
    const targetElement = evt.target.closest('.picture');
    const pictures = document.querySelectorAll('.picture');

    if (!targetElement) {
      return;
    }

    openBigPicture(evt);

    for (let i = 0; i < pictures.length; i++) {
      const thumbsArrayElement = thumbsArray[i];
      if (pictures[i] === targetElement) {
        renderComments(thumbsArrayElement.comments);
        createBigPictureInfo(targetElement);
      }
    }
  });
};

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture();
});

export { renderBigPicture };
