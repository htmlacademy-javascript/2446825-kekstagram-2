import { isEscape, makeElement } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPicture.querySelector('.big-picture__cancel');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const bigPictureCommentList = bigPicture.querySelector('.social__comments');
const bigPictureCommentCounter = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentLoader = bigPicture.querySelector('.comments-loader');
const pictureContainer = document.querySelector('.pictures');

const onDocumentKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture () {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPictureCommentCounter.classList.add('hidden');
  bigPictureCommentLoader.classList.add('hidden');
  bigPictureCommentList.innerHTML = '';

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture () {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  bigPictureCommentList.innerHTML = '';

  document.removeEventListener('keydown', onDocumentKeydown);
}

const createCommentList = (array) => {
  array.forEach(({ avatar, message, name }) => {
    const newComment = makeElement('li', 'social__comment');
    const newCommentImage = makeElement('img', 'social__picture');
    newCommentImage.src = avatar;
    newCommentImage.alt = name;
    newComment.appendChild(newCommentImage);
    const newCommentText = makeElement('p', 'social__text', message);
    newComment.appendChild(newCommentText);
    bigPictureCommentList.appendChild(newComment);
  });
};

const createBigPictureInfo = (attr) => {
  bigPicture.querySelector('img').src = attr.querySelector('.picture__img').src;
  bigPicture.querySelector('.likes-count').textContent = attr.querySelector('.picture__likes').textContent;
  bigPicture.querySelector('.social__comment-total-count').textContent = attr.querySelector('.picture__comments').textContent;
  bigPicture.querySelector('.social__comment-shown-count').textContent = bigPictureCommentList.children.length;
  bigPictureCaption.textContent = attr.querySelector('.picture__img').alt;
};

const renderBigPicture = (array) => {

  pictureContainer.addEventListener('click', (evt) => {
    const targetElement = evt.target.closest('.picture');
    const pictures = document.querySelectorAll('.picture');

    if (!targetElement) {
      return;
    }

    openBigPicture();
    createBigPictureInfo(targetElement);
    for (let i = 0; i < pictures.length; i++) {
      const arrayElement = array[i];
      if (pictures[i] === targetElement) {
        createCommentList(arrayElement.comments);
      }
    }

  });
};

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture();
});

export { renderBigPicture };
