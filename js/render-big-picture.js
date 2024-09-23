import { isEscape } from './util.js';
import { renderCommentList, clearCommentList } from './render-comment-list.js';
import { createPhotoDescriptionArray } from './data.js';
console.log(createPhotoDescriptionArray);

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

  document.removeEventListener('keydown', onDocumentKeydown);
}

const createBigPictureInfo = (element) => {
  bigPicture.querySelector('img').src = element.url;
  bigPicture.querySelector('.likes-count').textContent = element.likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = element.comments.length;
  bigPictureCaption.textContent = element.description;
};

const renderBigPicture = (thumbsArray) => {
  const pictureContainer = document.querySelector('.pictures');

  pictureContainer.addEventListener('click', (evt) => {
    const targetElement = evt.target.closest('.picture');
    const id = targetElement.dataset.id;

    if (!targetElement) {
      return;
    }

    openBigPicture(evt);
    renderCommentList(thumbsArray[id].comments);
    createBigPictureInfo(thumbsArray[id]);
  });
};

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture();
});

export { renderBigPicture };
