function createSliderSettings(min, max, step, format) {
  return {
    range: {
      min: min,
      max: max
    },
    step: step,
    start: max,
    format: format,
    connect: 'lower'
  };
}

function createFormat() {
  return {
    to: function (value) {
      return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    }
  };
}

const Settings = {
  DEFAULT: createSliderSettings(0, 1),
  GRAYSCALE: createSliderSettings(0, 1, 0.1, createFormat()),
  SEPIA: createSliderSettings(0, 1, 0.1, createFormat()),
  INVERT: createSliderSettings(0, 100, 1),
  BLUR: createSliderSettings(0, 3, 0.1, createFormat()),
  BRIGHTNESS: createSliderSettings(1, 3, 0.1, createFormat())
};

const uploadForm = document.querySelector('#upload-select-image');
const uploadPreview = uploadForm.querySelector('.img-upload__preview img');
const levelContainer = uploadForm.querySelector('.img-upload__effect-level');
const effectLevel = levelContainer.querySelector('.effect-level__value');
const effectLevelSlider = levelContainer.querySelector('.effect-level__slider');
const effectsContainer = uploadForm.querySelector('.img-upload__effects');

let takeFilter = () => 'none';

function originSetup() {
  takeFilter = () => 'none';
  levelContainer.classList.add('hidden');
  uploadPreview.style.filter = takeFilter();
}

function grayscaleSetup() {
  takeFilter = () => `grayscale(${effectLevel.value})`;
  levelContainer.classList.remove('hidden');
  effectLevelSlider.noUiSlider.updateOptions(Settings.GRAYSCALE);
  uploadPreview.style.filter = takeFilter();
}

function sepiaSetup() {
  takeFilter = () => `sepia(${effectLevel.value})`;
  levelContainer.classList.remove('hidden');
  effectLevelSlider.noUiSlider.updateOptions(Settings.SEPIA);
  uploadPreview.style.filter = takeFilter();
}

function invertSetup() {
  takeFilter = () => `invert(${effectLevel.value}%)`;
  levelContainer.classList.remove('hidden');
  effectLevelSlider.noUiSlider.updateOptions(Settings.INVERT);
  uploadPreview.style.filter = takeFilter();
}

function blurSetup() {
  takeFilter = () => `blur(${effectLevel.value}px)`;
  levelContainer.classList.remove('hidden');
  effectLevelSlider.noUiSlider.updateOptions(Settings.BLUR);
  uploadPreview.style.filter = takeFilter();
}

function brightnessSetup() {
  takeFilter = () => `brightness(${effectLevel.value})`;
  levelContainer.classList.remove('hidden');
  effectLevelSlider.noUiSlider.updateOptions(Settings.BRIGHTNESS);
  uploadPreview.style.filter = takeFilter();
}

const setupsTable = {
  'none': originSetup,
  'chrome': grayscaleSetup,
  'sepia': sepiaSetup,
  'marvin': invertSetup,
  'phobos': blurSetup,
  'heat': brightnessSetup
};

noUiSlider.create(effectLevelSlider, Settings.DEFAULT);
originSetup();

effectLevelSlider.noUiSlider.on('update', () => {
  effectLevel.value = effectLevelSlider.noUiSlider.get();
  uploadPreview.style.filter = takeFilter();
});

effectsContainer.addEventListener('change', (evt) => setupsTable[evt.target.value]());

function resetEffects() {
  originSetup();
}

export { resetEffects };
