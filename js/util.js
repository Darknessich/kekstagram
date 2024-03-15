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

export {
  getRandomInteger,
  getRandomElement,
  createIdGenerator,
  isEscapeKey
};
