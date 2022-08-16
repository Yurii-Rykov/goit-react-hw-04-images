import {useEffect} from 'react';
import PropTypes from 'prop-types'
import s from './Modal.module.css';

const Modal = ({propClose, propModalUrl}) => {
 
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
      propClose();
      }
    };
      window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [propClose])
  
 

    return (
      <div onClick={() => propClose()} className={s.overlay}>
        <div className={s.modal}>
          <img src={propModalUrl} alt="images" />
        </div>
      </div>
    );
}
export default Modal;

Modal.propTypes = {
  propModalUrl: PropTypes.string.isRequired,
  propClose:  PropTypes.func.isRequired
}