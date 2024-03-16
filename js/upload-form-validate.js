import '../vendor/pristine/pristine.js';

const TAGS_LIMIT = 5;
const COMMENT_LENGTH_LIMIT = 140;

function validateCountTags(value) {
  return value.trim().split(/[ ]+/).length <= TAGS_LIMIT;
}

function validateUniqueTags(value) {
  const counter = {};
  return value.trim().split(/[ ]+/)
    .map((tag) => {
      tag = tag.toLowerCase();
      return counter[tag] ? ++counter[tag] : (counter[tag] = 1);
    })
    .every((cnt) => cnt === 1);
}

function validateTags(value) {
  const regexp = /^#[a-zа-яё0-9]{1,19}/i;
  const tags = value.trim().split(/[ ]+/);
  return !tags[0] || tags
    .map((tag) => regexp.test(tag))
    .every((isCorrect) => isCorrect);
}

function validateComment(value) {
  return value.length <= COMMENT_LENGTH_LIMIT;
}

function addFormValidator(form, tags, comment) {
  const pristine = new Pristine(form);

  pristine.addValidator(tags, validateCountTags, 'Не более 5-ти тегов');
  pristine.addValidator(tags, validateUniqueTags, 'Теги должны быть уникальны');
  pristine.addValidator(tags, validateTags, 'Некорректный тег');
  pristine.addValidator(comment, validateComment, 'Не более 140 символов');

  form.addEventListener('submit', (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  });
}

export { addFormValidator };
