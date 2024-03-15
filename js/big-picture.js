import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const BPImg = bigPicture.querySelector('.big-picture__img > img');
const BPCaption = bigPicture.querySelector('.social__caption');
const BPLikes = bigPicture.querySelector('.likes-count');
const BPComments = bigPicture.querySelector('.social__comments');
const BPSocialCommentsCount = bigPicture.querySelector('.social__comment-count');
const BPLoader = bigPicture.querySelector('.comments-loader');
const BPCancel = bigPicture.querySelector('.big-picture__cancel');

let onLoad = null;

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
  BPLoader.removeEventListener('click', onLoad);
}

function createCommentElement({ avatar, message, name }) {
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

function createHandleLoad(comments) {
  let commentsCount = 0;
  return () => {
    const commentsFragment = document.createDocumentFragment();
    const delta = Math.min(comments.length - commentsCount, 5);

    for (let i = 0; i < delta; ++i) {
      commentsFragment.appendChild(
        createCommentElement(comments[commentsCount + i])
      );
    }

    commentsCount += delta;
    BPComments.appendChild(commentsFragment);

    if (commentsCount === comments.length) {
      BPLoader.classList.add('hidden');
    }

    BPSocialCommentsCount.innerHTML = `${commentsCount} из <span class="comments-count">${comments.length}</span> комментариев`;
  };
}

function openBigPicture({ url, description, likes, comments }) {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  BPLoader.classList.remove('hidden');

  BPImg.src = url;
  BPImg.alt = description;
  BPCaption.textContent = description;
  BPLikes.textContent = likes;
  BPComments.innerHTML = '';

  onLoad = createHandleLoad(comments);
  onLoad();

  document.addEventListener('keydown', onDocumentKeyDown);
  BPLoader.addEventListener('click', onLoad);
}

BPCancel.addEventListener('click', closeBigPicture);

export { openBigPicture };
