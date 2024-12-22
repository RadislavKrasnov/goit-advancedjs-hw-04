import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { searchPixabayImages } from './js/pixabay-api.js';
import { createGallery, renderMoreImages } from './js/render-functions.js';

const searchBarForm = document.querySelector('#search-bar-form');
const loader = document.querySelector('body > .loader');
const loadMoreImagesBtn = document.querySelector('#btn-load-more');
const loadMoreLoader = document.querySelector('.load-more-block .loader');
let page = 1;
let perPage = 15;
let lightbox;
let seachValue;

const searchBarFormSubmitHandler = async (event) => {
    event.preventDefault();

    try {
        const form = event.target;
        seachValue = form.elements.search.value;
      
        if (seachValue.trim().length === 0) {
          return;
        }
      
        loadMoreImagesBtn.classList.remove('show');
        loader.classList.add('is-active');
        page = 1;
        const data = await searchPixabayImages(seachValue, page, perPage);
        
        if (!data.hits || !data.hits.length) {
            iziToast.error({
              message:
                'Sorry, there are no images matching your search query. Please try again!',
              position: 'topRight',
            });
        }
    
        createGallery(data.hits);

        if (page * perPage < data.totalHits) {
            loadMoreImagesBtn.classList.add('show');
        } else {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            });            
        }

        lightbox = new SimpleLightbox('.gallery a', {
            captionsData: 'alt',
            captionDelay: 250,
        });
        lightbox.refresh();
        loader.classList.remove('is-active');
    } catch(error) {
        console.error(error);
        iziToast.error({
            message: error.message,
            position: 'topRight',
        });
        loader.classList.remove('is-active');
    }
};

const loadMoreImages = async (event) => {
    try {

        if (!seachValue || seachValue.trim().length === 0) {
            return;
        }

        page += 1;
        loadMoreImagesBtn.classList.remove('show');
        loadMoreLoader.classList.add('is-active');
        const data = await searchPixabayImages(seachValue, page, perPage);

        if (!data.hits || !data.hits.length) {
            iziToast.error({
              message:
                'Sorry, there are no images matching your search query. Please try again!',
              position: 'topRight',
            });
        }
        
        renderMoreImages(data.hits);

        const imageCard = document.querySelector('.image-card');
        const { height } = imageCard.getBoundingClientRect();
        window.scrollBy({
            top: height * 2,
            behavior: 'smooth'
        });
        
        loadMoreLoader.classList.remove('is-active');

        if (page * perPage < data.totalHits) {
            loadMoreImagesBtn.classList.add('show');
        } else {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            });         
        }
        
        lightbox.refresh();
    } catch(error) {
        console.error(error);
        iziToast.error({
            message: error.message,
            position: 'topRight',
        });
        loader.classList.remove('is-active');
    }
};

searchBarForm.addEventListener('submit', searchBarFormSubmitHandler);
loadMoreImagesBtn.addEventListener('click', loadMoreImages);
