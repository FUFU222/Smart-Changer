import React, { useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { ModalContext } from '../context/ModalContext';

const allowedExtensions = ['jpg', 'jpeg', 'png', 'heic'];
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/heic'];

const isFileAllowed = (file) => {
  const extension = file.name.split('.').pop().toLowerCase();
  return allowedExtensions.includes(extension) && allowedMimeTypes.includes(file.type);
};

const Dropzone = ({ onDrop, uploadedImages, clearImages }) => {
  const { openModal } = useContext(ModalContext);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const validFiles = acceptedFiles.filter(file => isFileAllowed(file));
      if (validFiles.length > 0) {
        onDrop(validFiles);
      } else {
        openModal('ファイルの形式がサポートされていません', 'JPEG、PNG、またはHEIC形式のファイルを選択してください。');
      }
    },
    maxFiles: 10,
  });

  return (
    <div className="dropzone-container">
      <div {...getRootProps()} className="dropzone-area">
        <input {...getInputProps()} autoComplete='off' />
        <p>③ここにファイルをドロップ</p>
      </div>

      <div className="uploaded-images-container">
        {uploadedImages.length > 0 ? (
          uploadedImages.map((image, index) => (
            <div key={index} className="image-card">
              <img src={image.url} alt={`Uploaded ${index}`} className="image" />
            </div>
          ))
        ) : (
          <p className="placeholder-text">アップロードファイル一覧</p>
        )}
      </div>

      <div className="button-container">
        <button
          onClick={(e) => {
            e.stopPropagation();
            clearImages();
          }}
          className="clear-button"
        >
          アップロードをクリア
        </button>
      </div>
    </div>
  );
};

export default Dropzone;
