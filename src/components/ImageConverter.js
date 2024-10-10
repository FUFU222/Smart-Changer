import React, { useState } from 'react';
import Dropzone from './Dropzone';
import FormatSelector from './FormatSelector';
import SizeSelector from './SizeSelector';
import imageCompression from 'browser-image-compression';

const ImageConverter = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [outputFormat, setOutputFormat] = useState('jpeg');
  const [selectedSize, setSelectedSize] = useState('1200x1200');
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');

  const standardSizes = [
    { label: '1920x1080 (Full HD)', width: 1920, height: 1080 },
    { label: '1200x1200', width: 1200, height: 1200 },
    { label: '1280x720 (HD)', width: 1280, height: 720 },
    { label: '1024x768 (XGA)', width: 1024, height: 768 },
  ];

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    setUploadedImages(prevImages => [...prevImages, ...newImages]);
  };

  const convertImage = async (image) => {
    let width, height;
    if (selectedSize === 'custom') {
      width = customWidth;
      height = customHeight;
    } else {
      const selectedOption = standardSizes.find((size) => size.label === selectedSize);
      width = selectedOption.width;
      height = selectedOption.height;
    }

    if (width && height && image.file) {
      const options = {
        maxWidthOrHeight: Math.max(width, height),
        useWebWorker: true,
      };

      try {
        const compressedImage = await imageCompression(image.file, options);
        const convertedBlob = await imageCompression(compressedImage, { fileType: `image/${outputFormat}` });
        const downloadUrl = URL.createObjectURL(convertedBlob);
        
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `converted-image.${outputFormat}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        alert(`Image converted to ${outputFormat} with size ${width}x${height} and compressed.`);
      } catch (error) {
        alert('An error occurred while converting the image.');
        console.error(error);
      }
    } else {
      alert('Please upload a valid image and specify the size.');
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
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
        {uploadedImages.map((image, index) => (
          <div key={index} style={{ width: '150px', height: '150px', overflow: 'hidden', border: '1px solid #ddd' }}>
            <img
              src={image.url}
              alt={`Uploaded ${index}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <button onClick={() => convertImage(image)} style={{ marginTop: '10px', width: '100%' }}>Convert</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageConverter;