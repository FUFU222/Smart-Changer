import React, { useContext } from 'react';
import Modal from 'react-modal';
import { ModalContext } from '../context/ModalContext';
import { BounceLoader } from 'react-spinners';
import '../style/modal.css'

const CustomModal = () => {
  const { isModalOpen, modalTitle, modalContent, closeModal, isProcessing } = useContext(ModalContext);

  return (
    <Modal 
    isOpen={isModalOpen} 
    className="custom-modal"
    overlayClassName="custom-modal-overlay"
    >
      <h2>{modalTitle}</h2>
      <p>{modalContent}</p>
      {isProcessing && <BounceLoader className='loader' loading={isProcessing} size={60} speedMultiplier={0.8}/>}
      {!isProcessing && <button onClick={closeModal}>閉じる</button>}
    </Modal>
  );
};

export default CustomModal;