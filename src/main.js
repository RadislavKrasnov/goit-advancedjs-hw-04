import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { searchPixabayImages } from './js/pixabay-api.js';
import { createGallery } from './js/render-functions.js';

const searchBarForm = document.querySelector('#search-bar-form');
const loader = document.querySelector('.loader');

const searchBarFormSubmitHandler = async (event) => {
    event.preventDefault();

    try {
        const form = event.target;
        const seachValue = form.elements.search.value;
      
        if (seachValue.trim().length === 0) {
          return;
        }
      
        loader.classList.add('is-active');
        const data = await searchPixabayImages(seachValue);
        
        if (!data.hits || !data.hits.length) {
            iziToast.error({
              message:
                'Sorry, there are no images matching your search query. Please try again!',
              position: 'topRight',
            });
        }
    
        createGallery(data.hits);
        var lightbox = new SimpleLightbox('.gallery a', {
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
}

searchBarForm.addEventListener('submit', searchBarFormSubmitHandler);
