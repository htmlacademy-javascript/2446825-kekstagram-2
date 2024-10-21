const filterContainer = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

const toggleActiveButton = (evt) => {
  filterButtons.forEach((element) => {
    element.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  });
};


filterButtons.forEach((element) => {
  element.addEventListener('click', toggleActiveButton);
});

const showFilterList = () => {
  filterContainer.classList.remove('img-filters--inactive');
};

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


export { showFilterList, sortByComments };
