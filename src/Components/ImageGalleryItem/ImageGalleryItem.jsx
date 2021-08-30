import { Component } from 'react';

class ImageGalleryItem extends Component {
  render() {
    return (
      <li className="ImageGalleryItem">
        <img
          src={this.props.src}
          alt={this.props.alt}
          data-modal={this.props.modalSrc}
          className="ImageGalleryItem-image"
        />
      </li>
    );
  }
}
export default ImageGalleryItem;
