import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import JSZip from 'jszip';
import saveAs from 'file-saver';
import Dropzone from './Dropzone';
import FormatSelector from './FormatSelector';
import SizeSelector from './SizeSelector';
import imageCompression from 'browser-image-compression';

const ImageConverter = () => {
  const {showProcessing, openModal, showConversionComplete, showDownloadComplete} = useContext(ModalContext)
  const [uploadedImages, setUploadedImages] = useState([]);
  const [convertedImages, setConvertedImages] = useState([]);
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

  // ドロップされたファイルを一覧表示
  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    setUploadedImages(prevImages => [...prevImages, ...newImages]);
  };
  // imageを圧縮した後、指定した拡張子に変換
  const convertImageToBlob = async (image, options) => {
    const compressedImage = await imageCompression(image.file, options);
    return await imageCompression(compressedImage, { fileType: `image/${outputFormat}` });
  };  

  // ドロップした画像を変換しダウンロード完了までの関数
  const convertAllImages = async () => {
    
    const selectedOption = standardSizes.find((size) => size.label === selectedSize);
    let width = selectedOption.width;
    let height = selectedOption.height;

    if (width && height && uploadedImages.length > 0) {
      try {
        showProcessing(true);
        for (const image of uploadedImages) {
          const options = {
            maxWidthOrHeight: Math.max(width, height),
            useWebWorker: true,
          };
          const convertedImage = await convertImageToBlob(image, options)
          setConvertedImages(convertedImage);
        }
        showConversionComplete(convertedImages);
      } catch (error) {
        showProcessing(false);
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
        selectedSize={selectedSize} setSelectedSize={setSelectedSize}
        customWidth={customWidth} setCustomWidth={setCustomWidth}
        customHeight={customHeight} setCustomHeight={setCustomHeight}
      />
      <Dropzone onDrop={onDrop} uploadedImages={uploadedImages}/>
      <button className="convert-button" onClick={convertAllImages}>アップロードした画像を変換</button>
    </div>
  );

};
// バイナリデータをBlob化
const convertToBlob = (image) => {
  return new Blob([image], { type: 'image/jpeg' });
};
// Zipファイルに変換しダウンロード
const downloadAsZip = async (images) => {
  console.log("Zipダウンロード")
  const zip = new JSZip();
  for (const image of images) {
    const blob = convertToBlob(image);
    zip.file(`${image.name}.jpg`, blob)
  }
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'converted_images.zip')
};

// 個別ファイルでダウンロード
// const downloadIndividualFiles = (images) => {
//   console.log("個別ダウンロード")
//   images.forEach(async (image) => {
//     const blob = convertToBlob(image);
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a')
//     link.href = url;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link)
//   })
// }


export default ImageConverter;
export { downloadAsZip };