import React, { useContext, useState, useRef } from 'react';
import { ModalContext } from '../context/ModalContext';
import Dropzone from './Dropzone';
import FormatSelector from './FormatSelector';
import SizeSelector from './SizeSelector';
import imageCompression from 'browser-image-compression';
import CustomModal from './CustomModal';

const ImageConverter = () => {
  const { showModal } = useContext(ModalContext);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [convertedImages, setConvertedImages] = useState([]);
  const [outputFormat, setOutputFormat] = useState('jpeg');
  const [selectedSize, setSelectedSize] = useState('1200x1200');
  const convertButtonRef = useRef(null); 

  const standardSizes = [
    { label: '1920x1080 (Full HD)', width: 1920, height: 1080 },
    { label: '1200x1200', width: 1200, height: 1200 },
    { label: '1280x720 (HD)', width: 1280, height: 720 },
    { label: '1024x768 (XGA)', width: 1024, height: 768 },
  ];

  // convertImageToBlob関数の定義 - 画像を圧縮してBlobに変換する
  const convertImageToBlob = async (image, options) => {
    try {
      const compressedImage = await imageCompression(image.file, options);
      const convertedBlob = await imageCompression(compressedImage, { fileType: `image/${outputFormat}` });
      return convertedBlob;
    } catch (error) {
      console.error("画像変換エラー:", error);
      throw new Error("画像変換に失敗しました");
    }
  };  

  // onDrop関数の再定義 - ファイルをアップロード時の処理
  const onDrop = (acceptedFiles) => {
    // 画像ファイルのみ受け付けるようフィルタリング
    const filteredFiles = acceptedFiles.filter(file => file.type.startsWith('image/'));

    // もし非画像ファイルが含まれていたらエラーメッセージを表示
    if (filteredFiles.length < acceptedFiles.length) {
      showModal("error", "画像ファイルのみをアップロードしてください。");
    }

    // 重複チェック - 既にアップロード済みの画像は追加しない
    const newImages = filteredFiles.filter(
      (file) => !uploadedImages.some(image => image.file.name === file.name)
    ).map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));

    // 新しい画像が存在する場合のみ状態を更新
    if (newImages.length > 0) {
      setUploadedImages(prevImages => [...prevImages, ...newImages]);
    }

    if(convertButtonRef.current) {
      convertButtonRef.current.focus()
    }
  };

  const convertAllImages = async () => {
    const selectedOption = standardSizes.find((size) => size.label === selectedSize);
    let width = selectedOption.width;
    let height = selectedOption.height;
  
    if (width && height && uploadedImages.length > 0) {
      try {
        showModal("processing");
        const converted = [];
        for (const image of uploadedImages) {
          const options = {
            maxWidthOrHeight: Math.max(width, height),
            useWebWorker: true,
          };
          const convertedImage = await convertImageToBlob(image, options);
          converted.push(convertedImage);
        }
        setConvertedImages(converted);
        showModal("conversionComplete", converted);
      } catch (error) {
        showModal("error", "画像変換中にエラーが発生しました。");
        console.error("変換エラー:", error);
      }
    } else {
      showModal("error", "変換する画像が存在しないか、サイズが正しく選択されていません。");
    }
  };
  // 画像配列がキャッシュされないよう削除する関数
  const clearImages = () => {
    uploadedImages.forEach((image) => {
      URL.revokeObjectURL(image.url);
    });
    setUploadedImages([]);
    setConvertedImages([]);
  };
  // useEffectを使用したstate更新に応じた画像配列削除処理を確認するテストコード
  // useEffect(() => {
  //   console.log('クリア後のuploadedImages:', uploadedImages);
  // }, [uploadedImages]);
  
  
  

  return (
    <div>
      <FormatSelector outputFormat={outputFormat} setOutputFormat={setOutputFormat} />
      <SizeSelector
        standardSizes={standardSizes}
        selectedSize={selectedSize} setSelectedSize={setSelectedSize}
      />
      <Dropzone onDrop={onDrop} uploadedImages={uploadedImages} clearImages={clearImages}/>
      <button ref={convertButtonRef} className="convert-button" 
      onClick={convertAllImages}>④アップロードした画像を変換</button>
      <CustomModal images={convertedImages} clearImages={clearImages}/>
    </div>
  );
};


export default ImageConverter;