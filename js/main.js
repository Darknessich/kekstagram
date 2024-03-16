import { createPicturesData } from './data.js';
import { renderGallery } from './gallery.js';
import './img-upload.js';
import './upload-form-validate.js';

const pictures = createPicturesData();
renderGallery(pictures);
