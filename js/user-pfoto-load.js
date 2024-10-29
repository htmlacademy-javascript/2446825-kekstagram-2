const openFormElement = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const setUserPhoto = () => {
  const file = openFormElement.files[0];
  const imageUrl = window.URL.createObjectURL(file);

  const onLoad = () => {
    window.URL.revokeObjectURL(file);
    preview.removeEventListener('load', onLoad);
  };

  preview.addEventListener('load', onLoad);
  preview.src = imageUrl;
  effectsPreview.forEach((element) => {
    element.style.backgroundImage = `url(${imageUrl})`;
  });
};

export { setUserPhoto };
