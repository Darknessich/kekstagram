const thumbnailTemplate =
  document.querySelector('#picture')
    .content.querySelector('.picture');

function createThumbnail({ id, url, description, likes, comments }) {
  const element = thumbnailTemplate.cloneNode(true);
  const image = element.querySelector('.picture__img');

  element.dataset.thumbnailId = id;
  element.href = url;
  image.src = url;
  image.alt = description;
  element.querySelector('.picture__likes').textContent = likes;
  element.querySelector('.picture__comments').textContent = comments.length;

  return element;
}

function renderThumbnails(pictures, container) {
  const fragment = document.createDocumentFragment();

  pictures.forEach((piture) => {
    fragment.appendChild(createThumbnail(piture));
  });

  container.appendChild(fragment);
}

export { renderThumbnails };
