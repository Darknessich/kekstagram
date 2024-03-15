import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const BPImg = bigPicture.querySelector('.big-picture__img > img');
const BPCaption = bigPicture.querySelector('.social__caption');
const BPLikes = bigPicture.querySelector('.likes-count');
const BPCommentsCount = bigPicture.querySelector('.comments-count');
const BPComments = bigPicture.querySelector('.social__comments');
const BPSocialCommentsCount = bigPicture.querySelector('.social__comment-count');
const BPLoader = bigPicture.querySelector('.comments-loader');
const BPCancel = bigPicture.querySelector('.big-picture__cancel');

BPSocialCommentsCount.classList.add('hidden');
BPLoader.classList.add('hidden');

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeyDown);
}

function createCommentElement({avatar, message, name}) {
  const element = document.createElement('li');
  const elementImg = document.createElement('img');
  const elementText = document.createElement('p');

  element.classList.add('social__comment');
  elementImg.classList.add('social__picture');
  elementText.classList.add('social__text');

  elementImg.src = avatar;
  elementImg.alt = name;
  elementImg.width = 35;
  elementImg.height = 35;

  elementText.textContent = message;

  element.append(elementImg);
  element.append(elementText);

  return element;
}

function openBigPicture({url, description, likes, comments}) {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  BPImg.src = url;
  BPImg.alt = description;
  BPCaption.textContent = description;
  BPLikes.textContent = likes;
  BPCommentsCount.textContent = comments.length;

  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    commentsFragment.appendChild(createCommentElement(comment));
  });

  BPComments.innerHTML = '';
  BPComments.appendChild(commentsFragment);

  document.addEventListener('keydown', onDocumentKeyDown);
}

BPCancel.addEventListener('click', closeBigPicture);

export {openBigPicture};
