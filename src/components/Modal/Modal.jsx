import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';

export const Modal = (img, onClose)=> {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]); 


  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

return (
      <Overlay onClick={handleBackdropClick}>
        <ModalWindow>
          <img src={img} alt="img" />
        </ModalWindow>
      </Overlay>
    );
}


  Modal.propTypes = {
    img: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

