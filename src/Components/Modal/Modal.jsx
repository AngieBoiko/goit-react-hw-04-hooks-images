import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

export default function Modal({ forImageModal, onCloseModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  const handleKeydown = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };
  const handleOnClickBackdrop = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleOnClickBackdrop}>
      <div className="Modal">
        <img src={forImageModal.src} alt={forImageModal.alt} />
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  forImageModal: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
