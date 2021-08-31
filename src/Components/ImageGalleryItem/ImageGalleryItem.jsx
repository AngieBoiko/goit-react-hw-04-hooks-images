import React from 'react';
import PropTypes from 'prop-types';

function ImageGalleryItem({ src, alt, modalSrc }) {
  return (
    <li className="ImageGalleryItem">
      <img
        src={src}
        alt={alt}
        data-modal={modalSrc}
        className="ImageGalleryItem-image"
      />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  modalSrc: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
