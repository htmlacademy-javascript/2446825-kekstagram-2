import { getData } from './api.js';
import { showLoadAlert } from './alerts.js';
import { renderPictures } from './render-pictures.js';
import { renderBigPicture } from './render-big-picture.js';
import { setFilterFormSubmit } from './open-form.js';
import { showFilterList, filterSwitch } from './filter.js';
import { debounce } from './util.js';

getData()
  .then((photos) => {
    renderPictures(photos);
    showFilterList();
    filterSwitch(debounce(renderPictures, 500), photos);
    renderBigPicture(photos);
  })
  .catch(() => {
    showLoadAlert();
  });

setFilterFormSubmit();
