import { getData } from './api.js';
import { showLoadAlert } from './alerts.js';
import { renderPictures } from './render-pictures.js';
import { renderBigPicture } from './render-big-picture.js';
import { setFilterFormSubmit } from './open-form.js';
import { showFilterList, filterSwitch, setDefaultFilter, setRandomFilter, setCommentFilter } from './filter.js';
import { debounce } from './util.js';

getData()
  .then((photos) => {
    renderPictures(photos);
    showFilterList();
    filterSwitch();
    setDefaultFilter(debounce(() => renderPictures(photos), 500));
    setRandomFilter(debounce(renderPictures, 500), photos);
    setCommentFilter(debounce(renderPictures, 500), photos);
    renderBigPicture(photos);
  })
  .catch(() => {
    showLoadAlert();
  });

setFilterFormSubmit();
