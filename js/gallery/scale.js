const Settings = {
  DEFAULT: 100,
  STEP: 25,
  MAX: 100,
  MIN: 25
};

const uploadForm = document.querySelector('#upload-select-image');
const uploadPreview = uploadForm.querySelector('.img-upload__preview img');
const scaleValue = uploadForm.querySelector('.scale__control--value');
const smallerButton = uploadForm.querySelector('.scale__control--smaller');
const biggerButton = uploadForm.querySelector('.scale__control--bigger');

let pictureScale = Settings.DEFAULT;

function setScale(scale) {
  pictureScale = scale;
  scaleValue.value = `${pictureScale}%`;
  uploadPreview.style.transform = `scale(${pictureScale / 100.0})`;
}

function onSmallerButtonClick() {
  setScale(Math.max(Settings.MIN, pictureScale - Settings.STEP));
}

function onBiggerButtonClick() {
  setScale(Math.min(Settings.MAX, pictureScale + Settings.STEP));
}

function scaleReset() {
  setScale(Settings.DEFAULT);
}

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

export { scaleReset };
