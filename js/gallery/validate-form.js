
const ValidateSettings = {
  TAGS_COUNT_LIMIT: 5,
  TAGS_TEMPLATE: /^#[a-zа-яё0-9]{1,19}/i,
  TAGS_SEPARATOR: ' ',
  ERROR_MESSAGES: {
    INVALID_TAG: 'Введён невалидный хэш-тег',
    COUNT_TAG_EXPECTED: 'Превышено количество допустимых хэш-тегов',
    NOT_UNIQUE_TAGS: 'Хэш-теги не должны повторяться'
  }
};

const uploadForm = document.querySelector('#upload-select-image');
const uploadTags = uploadForm.querySelector('.text__hashtags');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

function splitTags(value) {
  return value
    .trim()
    .split(ValidateSettings.TAGS_SEPARATOR)
    .filter((tag) => !!tag.length);
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

export { pristine };
