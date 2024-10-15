import { createLoader } from './load.js';
import { renderPictures } from './render-pictures.js';
import { renderBigPicture } from './render-big-picture.js';
import { setFilterFormSubmit } from './open-form.js';
import './open-form.js';
import './slider.js';
import './resize-photo.js';

createLoader(renderPictures, renderBigPicture);
setFilterFormSubmit();
