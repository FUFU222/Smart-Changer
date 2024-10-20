import React from 'react';

const SizeSelector = ({ standardSizes, selectedSize, setSelectedSize}) => {
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
      </select>
    </div>
  );
};


export default SizeSelector;