const FILE_TYPES = ['jpg', 'jpeg,', 'png'];

const openFormElement = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const setUserPhoto = () => {
  const file = openFormElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      preview.src = reader.result;
      effectsPreview.forEach((element) => {
        element.style.backgroundImage = `url(${reader.result})`;
      });
    });
    reader.readAsDataURL(file);
  }
};

export { setUserPhoto };
