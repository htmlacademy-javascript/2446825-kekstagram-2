import { showLoadAlert } from './alerts.js';

const createLoader = (pictures, bigPicture) => {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((photos) => {
      pictures(photos);
      bigPicture(photos);
    })
    .catch(() => {
      showLoadAlert();
    });
};

export { createLoader };
