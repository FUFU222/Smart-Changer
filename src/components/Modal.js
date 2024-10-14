import React, { useContext } from 'react';
import Modal from 'react-modal';
import { ModalContext } from '../context/ModalContext';
import '../style/modal.css'

const CustomModal = () => {
  const { isModalOpen, modalTitle, modalContent, closeModal } = useContext(ModalContext);

  return (
    <Modal 
    isOpen={isModalOpen} 
    className="custom-modal"
    overlayClassName="custom-modal-overlay"
  >
      <h2>{modalTitle}</h2>
      <p>{modalContent}</p>
      <button onClick={closeModal}>閉じる</button>
    </Modal>
  );
};

export default CustomModal;