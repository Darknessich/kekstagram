import './img-upload.js';
import { openBigPicture } from './big-picture.js';
import { renderThumbnails } from './thumbnails.js';

const container = document.querySelector('.pictures');
const NUMBER_RANDOM_PICTURES = 10;

function renderGallery(pictures) {
  Array.from(container.children).forEach((child) => {
    if (child.classList.contains('picture')) {
      child.remove();
    }
  });

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

function renderRandom(pictures) {
  renderGallery(
    pictures.slice()
      .sort(() => (Math.random() - 0.5))
      .slice(0, NUMBER_RANDOM_PICTURES)
  );
}

function renderDiscussed(pictures) {
  renderGallery(
    pictures.slice()
      .sort((a, b) => (b.comments.length - a.comments.length))
  );
}

export { renderGallery, renderRandom, renderDiscussed };
