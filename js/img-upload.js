import { isEscapeKey } from './util.js';

const uploadForm = document.querySelector('#upload-select-image');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadModal = uploadForm.querySelector('.img-upload__overlay');
const uploadClose = uploadForm.querySelector('.img-upload__cancel');

let isFocus = false;

function onUploadFormFocus(evt) {
  isFocus = ![uploadForm, uploadClose, uploadFile].includes(evt.target);
}

function onUploadFormBlur() {
  isFocus = false;
}

function openUploadModal() {
  document.body.classList.add('modal-open');
  uploadModal.classList.remove('hidden');

  isFocus = false;
  uploadForm.addEventListener('focus', onUploadFormFocus, true);
  uploadForm.addEventListener('blur', onUploadFormBlur, true);
  document.addEventListener('keydown', onDocumentKeyDown);
}

function onUploadFileChange() {
  openUploadModal();
}

function closeUploadModal() {
  document.body.classList.remove('modal-open');
  uploadModal.classList.add('hidden');
  uploadForm.reset();

  uploadForm.removeEventListener('focus', onUploadFormFocus, true);
  uploadForm.removeEventListener('blur', onUploadFormBlur, true);
  document.removeEventListener('keydown', onDocumentKeyDown);
}

function onDocumentKeyDown(evt) {
  if (isEscapeKey(evt) && !isFocus) {
    evt.preventDefault();
    closeUploadModal();
  }
}

function onUploadCloseClick() {
  closeUploadModal();
}

uploadFile.addEventListener('change', onUploadFileChange);
uploadClose.addEventListener('click', onUploadCloseClick);
