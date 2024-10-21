const filterContainer = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

const fun = (e) => {
  filterButtons.forEach((element) => {
    element.classList.remove('img-filters__button--active');
    e.target.classList.add('img-filters__button--active');
  });
};


filterButtons.forEach((element) => {
  element.addEventListener('click', fun);
});

const showFilter = () => {
  filterContainer.classList.remove('img-filters--inactive');
};

export { showFilter };
