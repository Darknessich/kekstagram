import { setDefaultClick, setRandomClick, setDiscussedClick } from './gallery/filters.js';
import { renderDiscussed, renderGallery, renderRandom } from './gallery/gallery.js';
import { getData } from './api.js';
import { debounce, showAlert } from './util.js';

getData()
  .then((pictures) => {
    renderGallery(pictures);
    setDefaultClick(debounce(() => renderGallery(pictures)));
    setRandomClick(debounce(() => renderRandom(pictures)));
    setDiscussedClick(debounce(() => renderDiscussed(pictures)));
  })
  .catch((err) => showAlert(err.message));
