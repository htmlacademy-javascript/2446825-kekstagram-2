import { createPhotoDescriptionArray } from './data.js';
import { renderPictures } from './render-pictures.js';
import { renderBigPicture } from './render-big-picture.js';
import './open-form.js';
import './slider.js';
import './resize-photo.js';

renderPictures(createPhotoDescriptionArray);
renderBigPicture(createPhotoDescriptionArray);
