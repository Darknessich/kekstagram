const ALERT_SHOW_TIME = 3000;

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(elements) {
  return elements[getRandomInteger(0, elements.length)];
}

function createIdGenerator(min = 0, max = Number.MAX_SAFE_INTEGER) {
  const previousValues = [];
  const maxSize = max - min + 1;

  return function () {
    if (previousValues.length >= maxSize) {
      return null;
    }

    let id = getRandomInteger(min, max);
    while (previousValues.includes(id)) {
      id = getRandomInteger(min, max);
    }

    previousValues.push(id);
    return id;
  };
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.margin = 'auto 0';
  alertContainer.style.left = '30%';
  alertContainer.style.right = '30%';
  alertContainer.style.top = '10px';
  alertContainer.style.padding = '5px 10px';
  alertContainer.style.fontSize = '16px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'rgba(255, 77, 77, 0.1)';
  alertContainer.style.borderRadius = '10px';
  alertContainer.style.textTransform = 'none';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {
  getRandomInteger,
  getRandomElement,
  createIdGenerator,
  isEscapeKey,
  showAlert
};
