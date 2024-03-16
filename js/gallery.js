import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';

const container = document.querySelector('.pictures');

function renderGallery(pictures) {
  const pictureById = {};
  pictures.forEach((picture) => {
    pictureById[picture.id] = picture;
  });

  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (thumbnail) {
      evt.preventDefault();
      openBigPicture(pictureById[thumbnail.dataset.thumbnailId]);
    }
  });

  renderThumbnails(pictures, container);
}

export { renderGallery };
