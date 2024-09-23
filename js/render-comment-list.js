import { makeElement } from './util.js';

const STEP = 5;
let currentCount = 0;
let commentList = [];

const bigPicture = document.querySelector('.big-picture');
const bigPictureCommentList = bigPicture.querySelector('.social__comments');
const bigPictureCommentLoader = bigPicture.querySelector('.comments-loader');

const renderComments = () => {
  const commentFragment = document.createDocumentFragment();
  const renderedComments = commentList.slice(currentCount, currentCount + STEP);
  const renderedCommentsLength = renderedComments.length + currentCount;

  renderedComments.forEach((element) => {
    const newComment = makeElement('li', 'social__comment');
    const newCommentImage = makeElement('img', 'social__picture');
    newCommentImage.src = element.avatar;
    newCommentImage.alt = element.name;
    newComment.appendChild(newCommentImage);
    const newCommentText = makeElement('p', 'social__text', element.message);
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

  bigPictureCommentLoader.removeEventListener('click', renderComments);
};

const renderCommentList = (commentsArray) => {
  commentList = commentsArray;
  renderComments();

  bigPictureCommentLoader.addEventListener('click', renderComments);
};

export { renderCommentList, clearCommentList };
