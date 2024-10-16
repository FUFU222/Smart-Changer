import React,{ createContext, useState } from "react";

export const ModalContext = createContext()

export const ModalProvider = ({children}) => {
  const [modalTitle, setModalTitle] = useState('')
  const [modalContent, setModalContent] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const openModal = (title, content) => {
    setModalTitle(title)
    setModalContent(content)
    setIsModalOpen(true)
  }
  const closeModal = () => setIsModalOpen(false);

  const showLoading = (isLoading) => {
    setIsLoading(isLoading)
    if (isLoading) {
      openModal('変換中', '画像を変換しています。少々お待ちください。')
    }
  }

  const showConversionComplete = () => {
    setIsLoading(false);
    openModal('変換完了', 'ダウンロード方法を選択してください。');
  };
  
  return (
    <ModalContext.Provider value={{
      modalTitle, 
      modalContent, 
      isModalOpen, 
      isLoading,
      openModal, 
      closeModal,
      showLoading,
      showConversionComplete
      }}>
     {children}
    </ModalContext.Provider>
  )
}