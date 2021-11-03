import './sass/main.scss';
import ImgApiService from './js/apiService.js';
import galleryList from './templates/gallery.hbs';

// const getImage = () => {
//   return fetch(
//     `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=24121989-9eb31354267b9bbbf5c8e125c`,
//   ).then(response => {
//     if (response.ok) {
//       return response.json();
//     }
//     console.log(response.text);
//   });
// };

const forms = document.querySelector('.search-form');
const imgList = document.querySelector('.gallery');
const loader = document.querySelector('#loader');
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
  // imgApiService.fetchArticles();
}

function onLoadMore() {
  imgApiService.fetchArticles().then(imgListMarkup);
  // imgApiService.fetchArticles();
}

function imgListMarkup(hits) {
  imgList.insertAdjacentHTML('beforeend', galleryList(hits));
}

function clearImgListMarkup() {
  imgList.innerHTML = '';
}
