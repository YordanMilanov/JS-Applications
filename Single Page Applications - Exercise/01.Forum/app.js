import {showHome, createPost, onClose} from './home.js';

const homeAnchorElement = document.querySelector('a');
homeAnchorElement.addEventListener('click', showHome);

const buttonsElements = document.querySelectorAll('button');
const cancelButtonElement = buttonsElements[0];
//todo create cancel functionality

cancelButtonElement.addEventListener('click', onClose);
const createPostButtonElement = buttonsElements[1];
createPostButtonElement.addEventListener('click', createPost);
