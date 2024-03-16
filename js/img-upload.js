import { isEscapeKey } from './util.js';
import { addFormValidator } from './upload-form-validate.js';

const uploadForm = document.querySelector('#upload-select-image');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadModal = uploadForm.querySelector('.img-upload__overlay');
const uploadClose = uploadForm.querySelector('.img-upload__cancel');
const uploadTags = uploadForm.querySelector('.text__hashtags');
const uploadComment = uploadForm.querySelector('.text__description');

function openUploadModal() {
  document.body.classList.add('modal-open');
  uploadModal.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeyDown);
}

function onUploadFileChange() {
  openUploadModal();
}

function closeUploadModal() {
  document.body.classList.remove('modal-open');
  uploadModal.classList.add('hidden');
  uploadForm.reset();

  document.removeEventListener('keydown', onDocumentKeyDown);
}

function onDocumentKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
}

function onUploadCloseClick() {
  closeUploadModal();
}

function onInputKeyDown(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

addFormValidator(uploadForm, uploadTags, uploadComment);
uploadFile.addEventListener('change', onUploadFileChange);
uploadClose.addEventListener('click', onUploadCloseClick);
uploadTags.addEventListener('keydown', onInputKeyDown);
uploadComment.addEventListener('keydown', onInputKeyDown);
