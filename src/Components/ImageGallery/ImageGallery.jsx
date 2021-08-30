import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import PixabayFetchImages from '../../services/PixabayApi';
import { toast } from 'react-toastify';

class ImageGallery extends Component {
  state = {
    page: 1,
    per_page: 12,
    images: [],
    error: null,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ page: 1 });
      PixabayFetchImages(
        this.props.searchQuery,
        this.state.page,
        this.state.per_page,
      )
        .then(response => {
          if (response.hits.length > 0) {
            this.setState({ images: response.hits });
          } else toast.error('Enter another word for searching!');
        })
        .catch(error => this.setState({ error }));
    }

    if (prevState.page !== this.state.page) {
      PixabayFetchImages(
        this.props.searchQuery,
        this.state.page,
        this.state.per_page,
      )
        .then(response => {
          if (response.hits.length > 0) {
            this.setState(prevState => {
              return { images: [...prevState.images, ...response.hits] };
            });
          } else toast.error('Enter another word for searching!');
        })
        .catch(error => this.setState({ error }));
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

  render() {
    return (
      <>
        <ul className="ImageGallery">
          {this.state.images.map(item => {
            return (
              <ImageGalleryItem
                key={item.id}
                src={item.webformatURL}
                alt={item.tags}
              />
            );
          })}
        </ul>
        {this.state.images.length > 0 && (
          <Button onClick={this.onClickHandler} />
        )}
      </>
    );
  }
}

export default ImageGallery;
