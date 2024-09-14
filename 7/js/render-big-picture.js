import { isEscape, makeElement } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPicture.querySelector('.big-picture__cancel');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const bigPictureCommentList = bigPicture.querySelector('.social__comments');
const bigPictureCommentCounter = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentLoader = bigPicture.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture () {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureCommentCounter.classList.add('hidden');
  bigPictureCommentLoader.classList.add('hidden');
  bigPictureCommentList.innerHTML = '';

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  bigPictureCommentList.innerHTML = '';
  document.body.classList.remove('modal-open');

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

const renderBigPicture = (array) => {
  const pictureList = document.querySelectorAll('.picture');

  for (let i = 0; i < pictureList.length; i++) {
    const picture = pictureList[i];
    const arrayElement = array[i];

    picture.addEventListener('click', () => {
      openBigPicture();
      createCommentList(arrayElement.comments);

      bigPicture.querySelector('img').src = picture.querySelector('.picture__img').src;
      bigPicture.querySelector('.likes-count').textContent = picture.querySelector('.picture__likes').textContent;
      bigPictureCaption.textContent = arrayElement.description;
      bigPicture.querySelector('.social__comment-shown-count').textContent = bigPictureCommentList.children.length;
      bigPicture.querySelector('.social__comment-total-count').textContent = picture.querySelector('.picture__comments').textContent;
    });
  }
};

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicture();
});

export { renderBigPicture };
