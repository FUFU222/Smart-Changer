import React from 'react';

const FormatSelector = ({ outputFormat, setOutputFormat }) => {
  return (
    <div>
      <label>拡張子を選択してください:</label>
      <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)}>
        <option value="jpeg">JPEG</option>
        <option value="png">PNG</option>
        <option value="webp">WEBP</option>
      </select>
    </div>
  );
};

export default FormatSelector;