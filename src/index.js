import './sass/main.scss';
import ImgApiService from './js/apiService.js';
import galleryList from './templates/gallery.hbs';
import LoadMoreBtn from './js/load-more-btn.js';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
import { defaults } from '@pnotify/core';
defaults.delay = 1000;

const forms = document.querySelector('.search-form');
const imgList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const input = document.querySelector('.input');
const btnSearch = document.querySelector('.search');
// const btnLoadMore = document.querySelector('.load-more');

const li = document.querySelector('.list-item');
const divCard = document.querySelector('.photo-card');
const img = document.querySelector('.little-image');
const stats = document.querySelector('.stats');
const icons = document.querySelector('.material-icons');

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

const imgApiService = new ImgApiService();

forms.addEventListener('submit', onSearch);
// btnLoadMore.addEventListener('click', onLoadMore);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

// !

// let observer = new IntersectionObserver(
//   (entries, observer) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         onLoadMore();
//       }
//     });
//   },
//   { threshold: 1 },
// );

// document.querySelectorAll('img:last-child').forEach(img => {
//   observer.observe(img);
// });

// !

function onSearch(e) {
  e.preventDefault();

  imgApiService.query = e.currentTarget.elements.query.value;

  if (imgApiService.query === '') {
    return alert('Request not enterd!');
  }

  loadMoreBtn.show();
  imgApiService.resetPage();
  clearImgListMarkup();

  loadMoreBtn.disable();
  imgApiService.fetchArticles().then(imgListMarkup);

  // btnLoadMore.classList.remove('is-hidden');
  // loader.classList.remove('is-hidden');
}

function onLoadMore() {
  defaultModules.set(PNotifyMobile, {});
  alert({
    text: 'Загрузил ещё картинок!',
  });

  loadMoreBtn.disable();
  imgApiService.fetchArticles().then(imgListMarkup);

  //^ imgList.lastElementChild.scrollIntoView({
  //^  behavior: 'smooth',
  //^   top: 'false',
  //^   block: 'center',
  //^ });
}

function imgListMarkup(hits) {
  loadMoreBtn.enable();
  imgList.insertAdjacentHTML('beforeend', galleryList(hits));
}

function clearImgListMarkup() {
  imgList.innerHTML = '';
}

//^ -------------------------------------------------

const modal = document.querySelector('.lightbox');
const image = document.querySelector('.lightbox__image');
const close = document.querySelector('.lightbox__button');

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
