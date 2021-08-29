import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import PixabayFetchImages from '../../services/PixabayApi';
import { toast } from 'react-toastify';

class ImageGallery extends Component {
  state = {
    page: 1,
    per_page: 12,
    images: [],
  };
  componentDidUpdate(prevState, prevProps) {
    const nextValue = this.props.value;
    const prevValue = prevProps.value;
    if (prevValue !== nextValue) {
      PixabayFetchImages(nextValue, this.state.page, this.state.per_page)
        .then(response => this.setState({ images: [...response.hits] }))
        .catch(error => toast.error('This request is not successful'));
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
