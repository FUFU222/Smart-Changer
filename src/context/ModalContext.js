import React,{ createContext, useState } from "react";
import { downloadAsZip } from "../components/ImageConverter";

export const ModalContext = createContext()

export const ModalProvider = ({children}) => {
  const [modalTitle, setModalTitle] = useState('')
  const [modalContent, setModalContent] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const openModal = (title, content) => {
    setModalTitle(title)
    setModalContent(content)
    setIsModalOpen(true)
  }
  const closeModal = () => setIsModalOpen(false);
  
  //　処理中画面
  const showProcessing = (isProcessing) => {
    setIsProcessing(isProcessing)
    if (isProcessing) {
      openModal('処理中', '少々お待ちください。')
    }
  }
  //　変換完了、ダウンロード催促画面
  const showConversionComplete = (images) => {
    setIsProcessing(false);
    console.log("変換完了")
    openModal('変換完了', 
      <div>
        <button onClick={() => downloadAsZip(images)}>zipでダウンロード</button>
        {/* <button onClick={() => downloadIndividualFiles(images)}>個別ファイル</button> */}
      </div>
    );
  };
  // ダウンロード完了画面
  const showDownloadComplete = () => {
    setIsProcessing(false);
    openModal('ダウンロード完了', '');
  };

  return (
    <ModalContext.Provider value={{
      modalTitle, 
      modalContent, 
      isModalOpen,
      isProcessing,
      openModal, 
      closeModal,
      showProcessing,
      showConversionComplete,
      showDownloadComplete
      }}>
     {children}
    </ModalContext.Provider>
  )
}