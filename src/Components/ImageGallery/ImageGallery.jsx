import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Modal from '../Modal/Modal';
import Loader from '../Loader';
import PixabayFetchImages from '../../services/PixabayApi';
import { toast } from 'react-toastify';

class ImageGallery extends Component {
  state = {
    page: 1,
    per_page: 12,
    images: [],
    error: null,
    isLoading: null,
    openModal: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const { page, per_page } = this.state;
    const { searchQuery } = this.props;
    if (prevProps.searchQuery !== searchQuery) {
      this.setState({ page: 1, isLoading: true });
      PixabayFetchImages(searchQuery, page, per_page)
        .then(response => {
          if (response.hits.length > 0) {
            this.setState({ images: response.hits });
          } else toast.error('Enter another word for searching!');
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ isLoading: false }));
    }

    if (prevState.page !== page) {
      this.setState({ isLoading: true });
      PixabayFetchImages(searchQuery, page, per_page)
        .then(response => {
          if (response.hits.length > 0) {
            this.setState(prevState => {
              return { images: [...prevState.images, ...response.hits] };
            });
          } else toast.error('Enter another word for searching!');
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ isLoading: false }));
    }
    this.onScroll();
  }

  onClickHandler = e => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  onScroll() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }
  onGalleryItemClick = e => {
    this.setState({
      openModal: true,
      imageForModal: {
        src: e.target.dataset.modal,
        alt: e.target.alt,
      },
    });
  };
  toggleModal = () => {
    this.setState(({ openModal }) => ({
      openModal: !openModal,
    }));
  };
  render() {
    const { isLoading, images, imageForModal, openModal } = this.state;
    const { onGalleryItemClick, onClickHandler, toggleModal } = this;
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
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
export default ImageGallery;
