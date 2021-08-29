const KEY = '22428506-9ce357bec79fea58fa453e43f';
const BASE_URL = 'https://pixabay.com/api/';

export default function PixabayFetchImages(value, page, per_page) {
  console.log(
    `${BASE_URL}/?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`,
  );
  return fetch(
    `${BASE_URL}/?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`,
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error('This request is not successful'));
    })
    .catch(Error.message);
}
