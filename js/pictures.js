import { createPhotosData } from './data.js';

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
  photoImg.src = url;
  photoImg.alt = description;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photosFragment.appendChild(photoElement);
});

photosContainer.appendChild(photosFragment);
