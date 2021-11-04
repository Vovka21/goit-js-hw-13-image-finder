const API_KEY = '24121989-9eb31354267b9bbbf5c8e125c';
const BASE_URL = 'https://pixabay.com/api';

export default class ImgApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    // const url = `${BASE_URL}/?q=${this.searchQuery}&image_type=photo&per_page=12&page=${this.page}&key=${API_KEY}`;
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.page += 1;

        return data.hits;
      })
      .catch(error => console.log(error.text));
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
