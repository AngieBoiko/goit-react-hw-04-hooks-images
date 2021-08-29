const KEY = '22428506-9ce357bec79fea58fa453e43f';
const BASE_URL = 'https://pixabay.com/api/';
export default function pixabayApi({ value, page, per_page }) {
  fetch(
    `${BASE_URL}/?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`,
  )
    .then(response => {
      if (response.ok) {
        response.json();
      }
      return Promise.reject(new Error('This request is not successful'));
    })
    .catch(Error.message);
}
