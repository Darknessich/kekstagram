import { isEscapeKey } from './util.js';

const COMMENTS_PER_PORTION = 5;

const bigPicture = document.querySelector('.big-picture');
const BPImage = bigPicture.querySelector('.big-picture__img img');
const BPCaption = bigPicture.querySelector('.social__caption');
const BPLikes = bigPicture.querySelector('.likes-count');

const BPComments = bigPicture.querySelector('.social__comments');
const BPCommentsCount = bigPicture.querySelector('.comments-count');
const BPShowCommentsCount = bigPicture.querySelector('.comments-show-count');
const BPCommentTemplate =
  document.querySelector('#comment')
    .content.querySelector('.social__comment');

const BPLoader = bigPicture.querySelector('.comments-loader');
const BPCancel = bigPicture.querySelector('.big-picture__cancel');

let onBPLoaderClick = null;

function onDocumentKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onBPCancelClick() {
  closeBigPicture();
}

function closeBigPicture() {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeyDown);
  BPLoader.removeEventListener('click', onBPLoaderClick);
}

function createComment({ avatar, message, name }) {
  const element = BPCommentTemplate.cloneNode(true);
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
      commentsFragment.appendChild(
        createComment(comments[commentsCount + i])
      );
    }

    commentsCount += delta;
    BPComments.appendChild(commentsFragment);

    if (commentsCount === comments.length) {
      BPLoader.classList.add('hidden');
    }

    BPShowCommentsCount.textContent = commentsCount;
  };
}

function openBigPicture({ url, description, likes, comments }) {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  BPLoader.classList.remove('hidden');

  BPImage.src = url;
  BPImage.alt = description;
  BPCaption.textContent = description;
  BPCommentsCount.textContent = comments.length;
  BPLikes.textContent = likes;
  BPComments.innerHTML = '';

  onBPLoaderClick = createOnClickLoader(comments);
  onBPLoaderClick();

  document.addEventListener('keydown', onDocumentKeyDown);
  BPLoader.addEventListener('click', onBPLoaderClick);
}

BPCancel.addEventListener('click', onBPCancelClick);

export { openBigPicture };
