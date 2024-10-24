const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');

const similarListFragment = document.createDocumentFragment();

const clearPictureList = () => {
  const pic = document.querySelectorAll('.picture');
  pic.forEach((element) => {
    element.remove();
  });
};

const renderPictures = (thumbsArray) => {
  thumbsArray.forEach(({id, url, description, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.dataset.id = id;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    similarListFragment.appendChild(pictureElement);
  });
  clearPictureList();
  picturesList.appendChild(similarListFragment);
};

export { renderPictures };
