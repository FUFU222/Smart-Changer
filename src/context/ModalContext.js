import React, { createContext, useState } from "react";
import { downloadAsZip } from "../utils/download";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsProcessing(false); // モーダルを閉じる際に処理中状態もリセット
  };

  const showModal = (type, images = []) => {
    switch (type) {
      case "processing":
        setIsProcessing(true);
        openModal("処理中", "少々お待ちください。");
        break;
      case "conversionComplete":
        setIsProcessing(false);
        openModal(
          "変換完了",
          <div>
            <button onClick={() => downloadAsZip(images)}>zipでダウンロード</button>
          </div>
        );
        break;
      case "downloadComplete":
        setIsProcessing(false);
        openModal("ダウンロード完了", "ダウンロードが完了しました。");
        break;
      default:
        setIsProcessing(false);
        openModal("エラー", "予期せぬエラーが発生しました。");
    }
  };

  return (
    <ModalContext.Provider
      value={{
        modalTitle,
        modalContent,
        isModalOpen,
        isProcessing,
        openModal,
        closeModal,
        showModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
