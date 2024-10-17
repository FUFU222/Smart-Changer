import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalTitle, setModalTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState('');

  const openModal = (title) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsProcessing(false);
  };

  const showModal = (type) => {
    switch (type) {
      case "processing":
        setIsProcessing(true);
        openModal("処理中");
        break;
      case "conversionComplete":
        setIsProcessing(false);
        openModal("変換完了");
        break;
      case "downloadComplete":
        setIsProcessing(false);
        openModal("ダウンロード完了");
        break;
      default:
        setIsProcessing(false);
        openModal("エラー");
    }
  };

  return (
    <ModalContext.Provider
      value={{
        modalTitle,
        isModalOpen,
        isProcessing,
        fileName,
        setFileName,
        openModal,
        closeModal,
        showModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
