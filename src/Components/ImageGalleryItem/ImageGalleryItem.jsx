import { Component } from 'react';

class ImageGalleryItem extends Component {
  state = {};
  render() {
    return (
      <li className="ImageGalleryItem">
        <img
          src={this.props.src}
          alt={this.props.alt}
          className="ImageGalleryItem-image"
        />
      </li>
    );
  }
}
export default ImageGalleryItem;
