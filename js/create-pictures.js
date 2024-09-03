import {createPhotoDescriptionArray} from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');

const similarPhotoDescription = createPhotoDescriptionArray();
const similarListFragment = document.createDocumentFragment();

similarPhotoDescription.forEach(({url, description, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  similarListFragment.appendChild(pictureElement);
});

picturesList.appendChild(similarListFragment);
