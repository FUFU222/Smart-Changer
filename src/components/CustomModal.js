import React, { useContext } from 'react';
import Modal from 'react-modal';
import { ModalContext } from '../context/ModalContext';
import { downloadAsZip } from '../utils/download';
import { BounceLoader } from 'react-spinners';
import '../style/modal.css';

const CustomModal = ({ images }) => {
  const {
    isModalOpen,
    modalTitle,
    closeModal,
    isProcessing,
    fileName,
    setFileName,
    showModal,  // showModal関数を追加
  } = useContext(ModalContext);

  const handleDownload = async () => {
    try {
      await downloadAsZip(images, fileName);
      showModal("downloadComplete");  // ダウンロード完了後にモーダルを更新
    } catch (error) {
      console.error("ダウンロードエラー:", error);
      showModal("error", "ダウンロード中にエラーが発生しました。");
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      className="custom-modal"
      overlayClassName="custom-modal-overlay"
    >
      <h2>{modalTitle}</h2>
      <div className="modal-body">
        {isProcessing ? (
          <BounceLoader
            className="loader"
            loading={isProcessing}
            size={60}
            speedMultiplier={0.8}
          />
        ) : (
          <>
            {modalTitle === "変換完了" && images && images.length > 0 && (
              <div>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="ファイル名を入力"
                  className="file-name-input"
                />.zip
                <button onClick={handleDownload}>
                  zipでダウンロード
                </button>
              </div>
            )}
            {modalTitle === "ダウンロード完了" && (
              <p>ダウンロードが完了しました。</p>
            )}
            {modalTitle === "エラー" && (
              <p>予期せぬエラーが発生しました。</p>
            )}
          </>
        )}
      </div>
      {!isProcessing && (
        <div className="modal-footer">
          <button className="close-button" onClick={closeModal}>
            閉じる
          </button>
        </div>
      )}
    </Modal>
  );
};

export default CustomModal;
