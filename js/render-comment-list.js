import { makeElement } from './util';

const STEP = 5;
let currentCount = 0;
let commentList = [];

const bigPicture = document.querySelector('.big-picture');
const bigPictureCommentList = bigPicture.querySelector('.social__comments');
const bigPictureCommentLoader = bigPicture.querySelector('.comments-loader');

const renderComents = () => {
  const commentFragment = document.createDocumentFragment();
  const renderedComments = commentList.slice(currentCount, currentCount + STEP);
  const renderedCommentsLength = renderedComments.length + currentCount;

  renderedComments.forEach((elem) => {
    const newComment = makeElement('li', 'social__comment');
    const newCommentImage = makeElement('img', 'social__picture');
    newCommentImage.src = elem.avatar;
    newCommentImage.alt = elem.name;
    newComment.appendChild(newCommentImage);
    const newCommentText = makeElement('p', 'social__text', elem.message);
    newComment.appendChild(newCommentText);
    commentFragment.appendChild(newComment);
  });
  bigPictureCommentList.appendChild(commentFragment);
  bigPicture.querySelector('.social__comment-shown-count').textContent = bigPictureCommentList.children.length;

  if (renderedCommentsLength >= commentList.length) {
    bigPictureCommentLoader.classList.add('hidden');
  }

  currentCount += STEP;
};

const clearCommentList = () => {
  currentCount = 0;
  bigPictureCommentList.innerHTML = '';
  bigPictureCommentLoader.classList.remove('hidden');

  bigPictureCommentLoader.removeEventListener('click', renderComents);
};

const renderComments = (arraylist) => {
  commentList = arraylist;
  renderComents();

  bigPictureCommentLoader.addEventListener('click', renderComents);
};

export { renderComments, clearCommentList };
