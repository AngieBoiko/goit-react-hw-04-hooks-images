import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Modal from '../Modal/Modal';
import Loader from '../Loader';
import usePrevious from '../../Hooks/usePrevious';
import PixabayFetchImages from '../../services/PixabayApi';
import { toast } from 'react-toastify';

export default function ImageGallery(searchQuery) {
  const [page, setPage] = useState(1);
  const [per_page, setPer_page] = useState(12);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [imageForModal, setImageForModal] = useState({});

  const prevPropsSearchQuery = usePrevious(searchQuery);
  const prevPage = usePrevious(page);

  useEffect(() => {
    if (prevPropsSearchQuery !== searchQuery) {
      setPage(1);
      setIsLoading(true);
      PixabayFetchImages(searchQuery, page, per_page)
        .then(response => {
          if (response.hits.length > 0) {
            setImages([...response.hits]);
          } else toast.error('Enter another word for searching!');
        })
        .catch(error => setError({ error }))
        .finally(() => setIsLoading(false));
    }

    // if (prevPage !== page) {
    //   setIsLoading(true);
    //   PixabayFetchImages(searchQuery, page, per_page)
    //     .then(response => {
    //       if (response.hits.length > 0) {
    //         setImages(state => {
    //           state.push(response.hits);
    //         });
    //       } else toast.error('Enter another word for searching!');
    //     })
    //     .catch(error => setError({ error }))
    //     .finally(() => setIsLoading(false));
    // }
    onScroll();
  }, [page, per_page, prevPage, prevPropsSearchQuery, searchQuery]);

  const onClickHandler = e => {
    setPage(state => state + 1);
  };

  const onScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };
  const onGalleryItemClick = e => {
    setOpenModal(true);
    setImageForModal({
      src: e.target.dataset.modal,
      alt: e.target.alt,
    });
  };
  const toggleModal = () => {
    setOpenModal(state => !state);
  };

  return (
    <div className="gallery-container">
      {isLoading && <Loader />}
      <ul className="ImageGallery" onClick={onGalleryItemClick}>
        {images.map(item => {
          return (
            <ImageGalleryItem
              key={item.id}
              src={item.webformatURL}
              alt={item.tags}
              modalSrc={item.largeImageURL}
            />
          );
        })}
      </ul>
      {images.length > 0 && <Button onClick={onClickHandler} />}
      {openModal && (
        <Modal forImageModal={imageForModal} onCloseModal={toggleModal} />
      )}
    </div>
  );
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
