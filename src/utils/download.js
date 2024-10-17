import JSZip from "jszip";
import { saveAs } from "file-saver";

// バイナリデータをBlob化
const convertToBlob = (image) => {
  return new Blob([image], { type: 'image/jpeg' });
};
// Zipファイルに変換しダウンロード
const downloadAsZip = async (images) => {
  try {
    console.log("Zipダウンロード");
    const zip = new JSZip();
    for (const image of images) {
      const blob = convertToBlob(image);
      zip.file(`${image.name}.jpg`, blob);
    }
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'converted_images.zip');
  } catch (error) {
    console.error("ダウンロードエラー:", error);
    throw new Error("Zipダウンロード中にエラーが発生しました");
  }
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

export { downloadAsZip }