import './sass/main.scss';

const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const $ = require('jquery')(window);

import ImgApiService from './js/apiService.js';
import galleryList from './templates/gallery.hbs';

const forms = document.querySelector('.search-form');
const imgList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const input = document.querySelector('.input');
const btnSearch = document.querySelector('.search');
const btnLoadMore = document.querySelector('.load-more');

const imgApiService = new ImgApiService();

forms.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  imgApiService.query = e.currentTarget.elements.query.value;
  if (imgApiService.query === '') {
    return alert('Request not enterd!');
  }
  clearImgListMarkup();

  imgApiService.resetPage();
  imgApiService.fetchArticles().then(imgListMarkup);

  // loader.classList.remove('is-hiden');

  btnLoadMore.classList.remove('is-hiden');
}

function onLoadMore() {
  imgApiService.fetchArticles().then(imgListMarkup);
  // const element = document.querySelector('.photo-card');
  // element.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function imgListMarkup(hits) {
  imgList.insertAdjacentHTML('beforeend', galleryList(hits));
}

function clearImgListMarkup() {
  imgList.innerHTML = '';
}

//^ -------------------------------------------------

const modal = document.querySelector('.lightbox');
const image = document.querySelector('.lightbox__image');
const close = document.querySelector('.lightbox__button');
const bigImage = document.querySelector('.big-image');
const overlay = document.querySelector('.lightbox__overlay');

imgList.addEventListener('click', modalOpen);

function modalOpen(event) {
  event.preventDefault();
  addImageModal(event);

  window.addEventListener('keydown', onEscKeyPress);
  modal.classList.add('is-open');
}

function addImageModal(event) {
  const bigImgRef = event.target.getAttribute('data-source');
  const alt = event.target.getAttribute('alt');
  image.setAttribute('src', bigImgRef);
  image.setAttribute('alt', alt);
}

close.addEventListener('click', modalClose);

function modalClose() {
  window.removeEventListener('keydown', onEscKeyPress);
  modal.classList.remove('is-open');
  image.src = '';
  image.alt = '';
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    modalClose();
  }
}

overlay.addEventListener('click', clickOverlay);

function clickOverlay(event) {
  if (event.currentTarget === event.target) {
    modalClose();
  }
}

// ^---------------------------
