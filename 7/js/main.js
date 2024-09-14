import { createPhotoDescriptionArray } from './data.js';
import { createPictures } from './create-pictures.js';
import { renderBigPicture } from './render-big-picture.js';

createPictures(createPhotoDescriptionArray);
renderBigPicture(createPhotoDescriptionArray);
