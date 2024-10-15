import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import JSZip from 'jszip';
import saveAs from 'file-saver';
import Dropzone from './Dropzone';
import FormatSelector from './FormatSelector';
import SizeSelector from './SizeSelector';
import imageCompression from 'browser-image-compression';


const ImageConverter = () => {
  const {showLoading, openModal, closeModal} = useContext(ModalContext)
  const [uploadedImages, setUploadedImages] = useState([]);
  const [outputFormat, setOutputFormat] = useState('jpeg');
  const [selectedSize, setSelectedSize] = useState('1200x1200');
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');

  // 標準的なサイズを定義
  const standardSizes = [
    { label: '1920x1080 (Full HD)', width: 1920, height: 1080 },
    { label: '1200x1200', width: 1200, height: 1200 },
    { label: '1280x720 (HD)', width: 1280, height: 720 },
    { label: '1024x768 (XGA)', width: 1024, height: 768 },
  ];

  // ドロップされたファイルを処理する関数
  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    setUploadedImages(prevImages => [...prevImages, ...newImages]);
  };

  // 全ての画像を変換する関数
  const convertAllImages = async () => {
    let width, height;
    if (selectedSize === 'custom') {
      width = customWidth;
      height = customHeight;
    } else {
      const selectedOption = standardSizes.find((size) => size.label === selectedSize);
      width = selectedOption.width;
      height = selectedOption.height;
    }

    if (width && height && uploadedImages.length > 0) {
      try {
        showLoading(true);
        for (const image of uploadedImages) {
          const options = {
            maxWidthOrHeight: Math.max(width, height),
            useWebWorker: true,
          };
          const compressedImage = await imageCompression(image.file, options);
          const convertedBlob = await imageCompression(compressedImage, { fileType: `image/${outputFormat}` });
          const downloadUrl = URL.createObjectURL(convertedBlob);

          //ダウンロードリンクをDOM上に作成しクリックしユーザーから見たら自動ダウンロードしているような挙動になる↓
          // const link = document.createElement('a');
          // link.href = downloadUrl;
          // link.download = `converted-image.${outputFormat}`;
          // document.body.appendChild(link);
          // link.click();
          // document.body.removeChild(link);
        }
        showLoading(false); // 変換完了時にモーダルの内容を変える
        openModal(`${ uploadedImages.length }枚の画像を ${outputFormat} 形式に変換しました。`,
           'zipファイル or 個別でダウンロード');
      } catch (error) {
        showLoading(false); // 変換完了時にモーダルの内容を変える
        openModal('エラー', '画像の変換中にエラーが発生しました。');
        console.error(error);
      }
    } else {
      openModal('エラー', '有効な画像をアップロードし、サイズを指定してください。');
    }
  };

  return (
    <div>
      <FormatSelector outputFormat={outputFormat} setOutputFormat={setOutputFormat} />
      <SizeSelector
        standardSizes={standardSizes}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        customWidth={customWidth}
        setCustomWidth={setCustomWidth}
        customHeight={customHeight}
        setCustomHeight={setCustomHeight}
      />
      <Dropzone onDrop={onDrop} />
      <div className="container">
        {uploadedImages.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image.url} alt={`Uploaded ${index}`} />
          </div>
        ))}
      </div>
      <button className="convert-button" onClick={convertAllImages}>全ての画像を変換</button>
    </div>
  );
};

export default ImageConverter;