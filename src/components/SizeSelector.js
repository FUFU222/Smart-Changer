import React from 'react';

const SizeSelector = ({ standardSizes, selectedSize, setSelectedSize, customWidth, setCustomWidth, customHeight, setCustomHeight }) => {
  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  return (
    <div>
      <label>②変換後のサイズを選択:</label>
      <select value={selectedSize} onChange={handleSizeChange}>
        {standardSizes.map((size) => (
          <option key={size.label} value={size.label}>
            {size.label}
          </option>
        ))}
        <option value="custom">Custom Size</option>
      </select>

      {selectedSize === 'custom' && (
        <div>
          <label>
            Width:
            <input type="number" value={customWidth} onChange={(e) => setCustomWidth(e.target.value)} />
          </label>
          <label>
            Height:
            <input type="number" value={customHeight} onChange={(e) => setCustomHeight(e.target.value)} />
          </label>
        </div>
      )}
    </div>
  );
};


export default SizeSelector;