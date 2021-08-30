import React, { Component } from 'react';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }
  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };
  handleOnClickBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleOnClickBackdrop}>
        <div className="Modal">
          <img
            src={this.props.forImageModal.src}
            alt={this.props.forImageModal.alt}
          />
        </div>
      </div>,
      modalRoot,
    );
  }
}
export default Modal;
