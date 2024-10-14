import React,{ createContext, useState } from "react";

export const ModalContext = createContext()

export const ModalProvider = ({children}) => {
  const [modalTitle, setModalTitle] = useState('')
  const [modalContent, setModalContent] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (title, content) => {
    setModalTitle(title)
    setModalContent(content)
    setIsModalOpen(true)
  }
  const closeModal = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider value={{
      modalTitle, modalContent, isModalOpen, openModal, closeModal}}>
     {children}
    </ModalContext.Provider>
  )
}