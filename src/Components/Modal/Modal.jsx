import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { forImageModal } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.handleOnClickBackdrop}>
        <div className="Modal">
          <img src={forImageModal.src} alt={forImageModal.alt} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  forImageModal: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
export default Modal;
