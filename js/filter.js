import { shuffle } from './util';

const RANDOM_PHOTO_QUANTITY = 10;

const filterContainer = document.querySelector('.img-filters');
const filterButtons = filterContainer.querySelectorAll('.img-filters__button');

const randomSort = (photoArray) => shuffle(photoArray.slice()).slice(0, RANDOM_PHOTO_QUANTITY);

const getCommentsQuantity = (photo) => {
  const commentsQuantity = photo.comments.length;
  return commentsQuantity;
};

const comparePhotosByComments = (photoA, photoB) => {
  const commentsQuantityA = getCommentsQuantity(photoA);
  const commentsQuantityB = getCommentsQuantity(photoB);
  return commentsQuantityB - commentsQuantityA;
};

const sortByComments = (photoArray) => photoArray.slice().sort(comparePhotosByComments);

const showFilterList = () => {
  filterContainer.classList.remove('img-filters--inactive');
};

const filterSwitch = (def, random, discuss) => {
  filterContainer.addEventListener('click', (evt) => {
    const target = evt.target;
    if (target.classList.contains('img-filters__button')) {
      filterButtons.forEach((element) => {
        element.classList.remove('img-filters__button--active');
      });
      target.classList.add('img-filters__button--active');
    }

    if (target.id === 'filter-default') {
      def();
    }

    if (target.id === 'filter-random') {
      random();
    }

    if (target.id === 'filter-discussed') {
      discuss();
    }
  });
};

export { showFilterList, filterSwitch, randomSort, sortByComments };
