import { getData } from './api.js';
import { showLoadAlert } from './alerts.js';
import { renderPictures } from './render-pictures.js';
import { renderBigPicture } from './render-big-picture.js';
import { setFilterFormSubmit } from './open-form.js';
import { showFilterList, filterSwitch, sortByComments, randomSort } from './filter.js';
import { debounce } from './util.js';

getData()
  .then((photos) => {
    renderPictures(photos);
    showFilterList();
    filterSwitch(debounce(() => renderPictures(photos), 500), debounce(() => renderPictures(randomSort(photos)), 500), debounce(() => renderPictures(sortByComments(photos)), 500));
    renderBigPicture(photos);
  })
  .catch(() => {
    showLoadAlert();
  });

setFilterFormSubmit();
