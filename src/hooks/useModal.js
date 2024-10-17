import { useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

  // モーダルを開く関数
  const openModal = (title, content) => {
    setModalContent({ title, content });
    setIsOpen(true);
  };

  // モーダルを閉じる関数
  const closeModal = () => setIsOpen(false);

  return {
    isOpen,
    modalContent,
    openModal,
    closeModal,
  };
};

export default useModal;
