import React from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,  // 複数の画像を選択できるようにする
  });

  return (
    <div {...getRootProps()} className='dropzone'>
      <input {...getInputProps()} />
      <p>③ここをクリックしてファイル選択
        <br/>またはドラッグ&ドロップ</p>
    </div>
  );
};

export default Dropzone;