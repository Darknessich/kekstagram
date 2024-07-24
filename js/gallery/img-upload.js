import { isEscapeKey } from '../util.js';
import { pristine } from './validate-form.js';
import { resetEffects } from './effects.js';
import { scaleReset } from './scale.js';
import { sendData } from '../api.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Загрузка...'
};

const FILE_TYPES = ['jpeg', 'jpg', 'png', 'gif'];

const uploadForm = document.querySelector('#upload-select-image');
const uploadPreview = uploadForm.querySelector('.img-upload__preview img');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadModal = uploadForm.querySelector('.img-upload__overlay');
const uploadClose = uploadForm.querySelector('.img-upload__cancel');
const uploadTags = uploadForm.querySelector('.text__hashtags');
const uploadComment = uploadForm.querySelector('.text__description');
const uploadButton = uploadForm.querySelector('#upload-submit');

const successModalTemplate =
  document.querySelector('#success')
    .content.querySelector('.success');
const errorModalTemplate =
  document.querySelector('#error')
    .content.querySelector('.error');

function openErrorModal() {
  closeUploadModal();
  const element = errorModalTemplate.cloneNode(true);
  const btn = element.querySelector('.error__button');

  document.body.classList.add('modal-open');
  document.body.appendChild(element);
  btn.addEventListener('click', () => {
    document.body.classList.remove('modal-open');
    element.remove();
  });
}

function openSuccessModal() {
  closeUploadModal();
  const element = successModalTemplate.cloneNode(true);
  const btn = element.querySelector('.success__button');

  document.body.classList.add('modal-open');
  document.body.appendChild(element);
  btn.addEventListener('click', () => {
    document.body.classList.remove('modal-open');
    element.remove();
  });
}

function isFormFocus() {
  return [uploadTags, uploadComment].includes(document.activeElement);
}

function openUploadModal() {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  if (FILE_TYPES.some((type) => fileName.endsWith(type))) {
    document.body.classList.add('modal-open');
    uploadModal.classList.remove('hidden');

    document.addEventListener('keydown', onDocumentKeyDown);
    uploadPreview.src = URL.createObjectURL(file);
  }
}

function closeUploadModal() {
  document.body.classList.remove('modal-open');
  uploadModal.classList.add('hidden');
  uploadForm.reset();
  pristine.reset();
  resetEffects();
  scaleReset();

  document.removeEventListener('keydown', onDocumentKeyDown);
}

function onDocumentKeyDown(evt) {
  if (isEscapeKey(evt) && !isFormFocus()) {
    evt.preventDefault();
    closeUploadModal();
  }
}

function blockSubmitButton() {
  uploadButton.disabled = true;
  uploadButton.textContent = SubmitButtonText.SENDING;
}

function unblockSubmitButton() {
  uploadButton.disabled = false;
  uploadButton.textContent = SubmitButtonText.IDLE;
}

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(openSuccessModal)
      .catch(openErrorModal)
      .finally(unblockSubmitButton);
  }
});

uploadFile.addEventListener('change', openUploadModal);
uploadClose.addEventListener('click', closeUploadModal);
