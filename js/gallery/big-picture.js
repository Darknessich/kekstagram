import { isEscapeKey } from '../util.js';

const COMMENTS_PER_PORTION = 5;

const bigPicture = {};
bigPicture.element = document.querySelector('.big-picture');
bigPicture.image = bigPicture.element.querySelector('.big-picture__img img');
bigPicture.caption = bigPicture.element.querySelector('.social__caption');
bigPicture.likes = bigPicture.element.querySelector('.likes-count');

bigPicture.comments = bigPicture.element.querySelector('.social__comments');
bigPicture.commentsCount = bigPicture.element.querySelector('.comments-count');
bigPicture.showCommentsCount = bigPicture.element.querySelector('.comments-show-count');
bigPicture.commentTemplate =
  document.querySelector('#comment')
    .content.querySelector('.social__comment');

bigPicture.loader = bigPicture.element.querySelector('.comments-loader');
bigPicture.cancel = bigPicture.element.querySelector('.big-picture__cancel');
bigPicture.cancel.addEventListener('click', closeBigPicture);
bigPicture.onLoaderClick = null;

function onDocumentKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function closeBigPicture() {
  document.body.classList.remove('modal-open');
  bigPicture.element.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeyDown);
  bigPicture.loader.removeEventListener('click', bigPicture.onLoaderClick);
}

function createComment({ avatar, message, name }) {
  const element = bigPicture.commentTemplate.cloneNode(true);
  const image = element.querySelector('.social__picture');

  image.alt = name;
  image.src = avatar;
  element.querySelector('.social__text').textContent = message;

  return element;
}

function createOnClickLoader(comments) {
  let commentsCount = 0;
  return () => {
    const commentsFragment = document.createDocumentFragment();
    const delta = Math.min(comments.length - commentsCount, COMMENTS_PER_PORTION);

    for (let i = 0; i < delta; ++i) {
      commentsFragment.appendChild(createComment(comments[commentsCount + i]));
    }

    commentsCount += delta;
    bigPicture.comments.appendChild(commentsFragment);

    if (commentsCount === comments.length) {
      bigPicture.loader.classList.add('hidden');
    }

    bigPicture.showCommentsCount.textContent = commentsCount;
  };
}

function openBigPicture({ url, description, likes, comments }) {
  document.body.classList.add('modal-open');
  bigPicture.element.classList.remove('hidden');
  bigPicture.loader.classList.remove('hidden');

  bigPicture.image.src = url;
  bigPicture.image.alt = description;
  bigPicture.caption.textContent = description;
  bigPicture.commentsCount.textContent = comments.length;
  bigPicture.likes.textContent = likes;
  bigPicture.comments.innerHTML = '';

  bigPicture.onLoaderClick = createOnClickLoader(comments);
  bigPicture.onLoaderClick();

  document.addEventListener('keydown', onDocumentKeyDown);
  bigPicture.loader.addEventListener('click', bigPicture.onLoaderClick);
}

export { openBigPicture };
