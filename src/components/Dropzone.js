import React, { useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { ModalContext } from '../context/ModalContext';

const allowedExtensions = ['jpg', 'jpeg', 'png', 'heic'];
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/heic'];

const isFileAllowed = (file) => {
  const extension = file.name.split('.').pop().toLowerCase();
  return allowedExtensions.includes(extension) && allowedMimeTypes.includes(file.type);
};

const Dropzone = ({ onDrop }) => {
  const { openModal } = useContext(ModalContext)
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop : (acceptedFiles) => {
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
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <p>ここにファイルをドロップしてください</p>
    </div>
  );
};

export default Dropzone;