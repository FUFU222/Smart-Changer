import JSZip from "jszip";
import { saveAs } from "file-saver";

// バイナリデータをBlob化
const convertToBlob = (image) => {
  return new Blob([image], { type: 'image/jpeg' });
};

// Zipファイルに変換しダウンロード
const downloadAsZip = async (images, fileName) => {
  try {
    const sanitizedFileName = fileName.trim() ? fileName : 'converted_images';
    const zip = new JSZip();
    for (const image of images) {
      const blob = convertToBlob(image);
      zip.file(`${image.name}.jpg`, blob);
    }
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${sanitizedFileName}.zip`);
  } catch (error) {
    throw new Error("Zipダウンロード中にエラーが発生しました");
  }
};


export { downloadAsZip };
