import { isEscapeKey } from './util.js';
import { scaleReset } from './scale.js';
import { resetEffects } from './effects.js';

const ValidateSettings = {
  TAGS_COUNT_LIMIT: 5,
  TAGS_TEMPLATE: /^#[a-zа-яё0-9]{1,19}/i,
  TAGS_SEPARATOR: /[ ]+/,
  ERROR_MESSAGES: {
    INVALID_TAG: 'Введён невалидный хэш-тег',
    COUNT_TAG_EXPECTED: 'Превышено количество допустимых хэш-тегов',
    NOT_UNIQUE_TAGS: 'Хэш-теги не должны повторяться'
  }
};

const uploadForm = document.querySelector('#upload-select-image');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadModal = uploadForm.querySelector('.img-upload__overlay');
const uploadClose = uploadForm.querySelector('.img-upload__cancel');
const uploadTags = uploadForm.querySelector('.text__hashtags');
const uploadComment = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

function splitTags(value) {
  return value.trim().split(ValidateSettings.TAGS_SEPARATOR);
}

function hasValidCount(value) {
  return splitTags(value).length <= ValidateSettings.TAGS_COUNT_LIMIT;
}

function hasValidTags(value) {
  return splitTags(value).every((tag) => ValidateSettings.TAGS_TEMPLATE.test(tag));
}

function hasUniqueTags(value) {
  const tags = splitTags(value);
  return tags.length === new Set(tags).size;
}

function isFormFocus() {
  return [uploadTags, uploadComment].includes(document.activeElement);
}

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

function onUploadCloseClick() {
  closeUploadModal();
}

uploadFile.addEventListener('change', onUploadFileChange);
uploadClose.addEventListener('click', onUploadCloseClick);
pristine.addValidator(
  uploadTags,
  hasValidCount,
  ValidateSettings.ERROR_MESSAGES.COUNT_TAG_EXPECTED,
  3, true);
pristine.addValidator(
  uploadTags,
  hasValidTags,
  ValidateSettings.ERROR_MESSAGES.INVALID_TAG,
  2, true);
pristine.addValidator(
  uploadTags,
  hasUniqueTags,
  ValidateSettings.ERROR_MESSAGES.NOT_UNIQUE_TAGS,
  1, true);
