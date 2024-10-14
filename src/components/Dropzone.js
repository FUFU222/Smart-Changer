import React from 'react';
import { useDropzone } from 'react-dropzone';

const allowedExtensions = ['jpg', 'jpeg', 'png', 'heic']

const isFileAllowed = (fillName) => {
  const extension = fillName.split('.').pop().toLowerCase();
  return allowedExtensions.includes(extension)
}

const Dropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop : (acceptedFiles) => {
      const file = acceptedFiles[0];
      if(isFileAllowed(file.name)) {
        onDrop(acceptedFiles)
      } else{
        alert('jpg,png,heicの形式でアップロードしてください')
      }
    },
    maxFiles : 10,
  });

  return (
    <div {...getRootProps()} className='dropzone'>
      <input {...getInputProps()} />
      <p>ここにファイルをドロップ</p>
    </div>
  );
};

export default Dropzone;