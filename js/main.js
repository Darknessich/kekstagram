import { renderGallery } from './gallery/gallery.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

getData()
  .then((pictures) => renderGallery(pictures))
  .catch((err) => showAlert(err.message));
