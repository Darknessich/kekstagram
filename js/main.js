import { createPicturesData } from './data.js';
import { renderGallery } from './gallery.js';
import './img-upload.js';

const pictures = createPicturesData();
renderGallery(pictures);
