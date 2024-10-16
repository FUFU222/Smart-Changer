const ImagePreview = ({ uploadedImages }) => {
  return (
    <div className="container">
      {uploadedImages && uploadedImages.map((image, index) => (
        <div key={index} className="image-item">
          <img src={image.url} alt={`Uploaded ${index}`} />
        </div>
      ))}
    </div>
  )
}

export default ImagePreview;