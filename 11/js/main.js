import { getData } from './api.js';
import { showLoadAlert } from './alerts.js';
import { renderPictures } from './render-pictures.js';
import { renderBigPicture } from './render-big-picture.js';
import { setFilterFormSubmit } from './open-form.js';

getData()
  .then((photos) => {
    renderPictures(photos);
    renderBigPicture(photos);
  })
  .catch(() => {
    showLoadAlert();
  });

setFilterFormSubmit();
