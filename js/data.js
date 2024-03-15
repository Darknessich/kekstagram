import {
  getRandomInteger,
  getRandomElement,
  createIdGenerator
} from './util.js';

const PUBLISHED_PICTURES_COUNT = 25;

const PictureSettings = {
  ID_RANGE: {
    MIN: 1,
    MAX: 25
  },
  URL_ID_RANGE: {
    MIN: 1,
    MAX: 25
  },
  LIKES_COUNT_RANGE: {
    MIN: 15,
    MAX: 200
  },
  COMMENTS_COUNT_RANGE: {
    MIN: 0,
    MAX: 30
  },
  DESCRIPTIONS_DATA: [
    'Всё было не зря',
    'Дом Перцовой. Москва',
    'Раньше так и общались',
    'Занятное наблюдение',
    'Георгий и хлебная фабрика',
    'Факт о крикете',
    'Дачные замки под Петербургом',
    'Нет человека — нет проблемы',
    'Лица иностранцев представили'
  ]
};

const CommentSettings = {
  AVATAR_ID_RANGE: {
    MIN: 1,
    MAX: 6
  },
  MESSAGE_DATA: [
    'Всё отлично!',
    'В целом всё неплохо.Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент?!'
  ],
  NAMES_DATA: [
    'Артём',
    'Евфросиния',
    'Роман',
    'Аглая',
    'Павел',
    'Игнат',
    'Осип',
    'Яна',
    'Олимпия',
    'Катарина',
    'Якун',
    'Сильвестр',
  ]
};

const commentIdGenerator = createIdGenerator(0);

const pictureUrlIdGenerator = createIdGenerator(
  PictureSettings.URL_ID_RANGE.MIN,
  PictureSettings.URL_ID_RANGE.MAX
);

const pictureIdGenerator = createIdGenerator(
  PictureSettings.ID_RANGE.MIN,
  PictureSettings.ID_RANGE.MAX
);

function Comment(id, avatar, message, name) {
  this.id = id;
  this.avatar = avatar;
  this.message = message;
  this.name = name;
}

function generateRandomComment() {
  return new Comment(
    commentIdGenerator(),
    `img/avatar-${getRandomInteger(
      CommentSettings.AVATAR_ID_RANGE.MIN,
      CommentSettings.AVATAR_ID_RANGE.MAX
    )}.svg`,
    getRandomElement(CommentSettings.MESSAGE_DATA),
    getRandomElement(CommentSettings.NAMES_DATA)
  );
}

function Picture(id, url, description, likesCount, comments) {
  this.id = id;
  this.url = url;
  this.description = description;
  this.likes = likesCount;
  this.comments = comments;
}

function generateRandomPicture() {
  return new Picture(
    pictureIdGenerator(),
    `photos/${pictureUrlIdGenerator()}.jpg`,
    getRandomElement(PictureSettings.DESCRIPTIONS_DATA),
    getRandomInteger(
      PictureSettings.LIKES_COUNT_RANGE.MIN,
      PictureSettings.LIKES_COUNT_RANGE.MAX
    ),
    Array.from(
      {
        length: getRandomInteger(
          PictureSettings.COMMENTS_COUNT_RANGE.MIN,
          PictureSettings.COMMENTS_COUNT_RANGE.MAX,
        )
      },
      generateRandomComment
    )
  );
}

function createPicturesData() {
  return Array.from({ length: PUBLISHED_PICTURES_COUNT }, generateRandomPicture);
}

export { createPicturesData };
