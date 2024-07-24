const Filters = {
  DEFAULT: 0,
  RANDOM: 1,
  DISCUSSED: 2
};

let currentFilter = Filters.DEFAULT;
const BUTTONS = [
  document.querySelector('#filter-default'),
  document.querySelector('#filter-random'),
  document.querySelector('#filter-discussed')
];
BUTTONS.forEach((btn) => btn.classList.remove('img-filters__button--active'));
BUTTONS[currentFilter].classList.add('img-filters__button--active');

const container = document.querySelector('.img-filters');
container.classList.remove('img-filters--inactive');

function setDefaultClick(cb) {
  BUTTONS[Filters.DEFAULT].addEventListener('click', () => {
    BUTTONS[currentFilter].classList.remove('img-filters__button--active');
    currentFilter = Filters.DEFAULT;
    BUTTONS[currentFilter].classList.add('img-filters__button--active');
    cb();
  });
}

function setRandomClick(cb) {
  BUTTONS[Filters.RANDOM].addEventListener('click', () => {
    BUTTONS[currentFilter].classList.remove('img-filters__button--active');
    currentFilter = Filters.RANDOM;
    BUTTONS[currentFilter].classList.add('img-filters__button--active');
    cb();
  });
}

function setDiscussedClick(cb) {
  BUTTONS[Filters.DISCUSSED].addEventListener('click', () => {
    BUTTONS[currentFilter].classList.remove('img-filters__button--active');
    currentFilter = Filters.DISCUSSED;
    BUTTONS[currentFilter].classList.add('img-filters__button--active');
    cb();
  });
}

export { setDefaultClick, setRandomClick, setDiscussedClick };
