// eslint-disable-next-line no-unused-vars
import { createPhotoDescriptionArray } from './data.js';
import { createPictures } from './create-pictures.js';
import { isEscape } from './util.js';
import { renderBigPicture } from './render-big-picture.js';

renderBigPicture();

// createPictures(createPhotoDescriptionArray);

// const body = document.querySelector('body');
// const picturesList = document.querySelector('.pictures');
// const bigPicture = document.querySelector('.big-picture');
// const socComCo = bigPicture.querySelector('.social__comment-count');
// const pictures = picturesList.querySelectorAll('.picture');
// const closeButton = bigPicture.querySelector('.big-picture__cancel');
// const capt = bigPicture.querySelector('.social__caption');
// const socList = bigPicture.querySelector('.social__comments');
// const comLoad = bigPicture.querySelector('.comments-loader');
// const comen = socList.querySelector('.social__comment');
// const commentsList = socList.children;
// console.log(comen);
// console.log(commentsList);


// for (let i = 0; i < pictures.length; i++) {
//   const picture = pictures[i];
//   const pictureUrl = picture.querySelector('.picture__img').src;
//   const pictureLikes = picture.querySelector('.picture__likes').textContent;
//   const pictureCom = picture.querySelector('.picture__comments').textContent;
//   const comList = createPhotoDescriptionArray[i];

//   picture.addEventListener('click', () => {
//     bigPicture.classList.remove('hidden');
//     body.classList.add('modal-open');
//     //socComCo.classList.add('hidden');
//     //comLoad.classList.add('hidden');
//     console.log(comList);

//     socList.innerHTML = '';
//     bigPicture.querySelector('img').src = pictureUrl;
//     bigPicture.querySelector('.likes-count').textContent = pictureLikes;

//     capt.textContent = comList.description;

//     comList.comments.forEach(({ avatar, message, name }) => {
//       const clo = comen.cloneNode(true);
//       clo.querySelector('.social__picture').src = avatar;
//       clo.querySelector('.social__picture').alt = name;
//       clo.querySelector('.social__text').textContent = message;
//       socList.appendChild(clo);
//     });

//     bigPicture.querySelector('.social__comment-shown-count').textContent = commentsList.length;
//     bigPicture.querySelector('.social__comment-total-count').textContent = pictureCom;

//     closeButton.addEventListener('click', () => {
//       bigPicture.classList.add('hidden');
//       socList.innerHTML = '';
//       body.classList.remove('modal-open');
//     });

//     document.addEventListener('keydown', (evt) => {
//       if (isEscape(evt)) {
//         bigPicture.classList.add('hidden');
//         socList.innerHTML = '';
//         body.classList.remove('modal-open');
//       }
//     });
//   });

// }
