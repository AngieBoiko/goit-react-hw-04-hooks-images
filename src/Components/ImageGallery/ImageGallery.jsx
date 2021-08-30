import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import PixabayFetchImages from '../../services/PixabayApi';
import { toast } from 'react-toastify';

class ImageGallery extends Component {
  state = {
    page: 1,
    per_page: 12,
    images: [],
    error: null,
  };
  componentDidUpdate(prevState, prevProps) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      PixabayFetchImages(
        this.props.searchQuery,
        this.state.page,
        this.state.per_page,
      )
        .then(response => this.setState({ images: response.hits }))
        .catch(error => this.setState({ error }));
    }
  }
  render() {
    return (
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
    );
  }
}

export default ImageGallery;
