import { createPhotosData } from './data.js';
import { openBigPicture } from './big-picture.js';

const photosContainer = document.querySelector('.pictures');
const photoTemplate =
  document.querySelector('#picture')
    .content
    .querySelector('.picture');

const photosData = createPhotosData();

const photosFragment = document.createDocumentFragment();

photosData.forEach(({url, description, likes, comments}) => {
  const photoElement = photoTemplate.cloneNode(true);
  const photoImg = photoElement.querySelector('.picture__img');
  photoElement.href = url;
  photoImg.src = url;
  photoImg.alt = description;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photosFragment.appendChild(photoElement);

  photoElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture({url, description, likes, comments});
  });
});

photosContainer.appendChild(photosFragment);
