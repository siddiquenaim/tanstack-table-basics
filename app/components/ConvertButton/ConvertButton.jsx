// ConvertButton.js
import React from "react";

const ConvertButton = ({ getValue, onConvertClick }) => {
  const handleClick = () => {
    const moneyValue = getValue();
    const convertedValue = moneyValue;
    onConvertClick(convertedValue);
  };

  return (
    <button
      className="py-2 px-4 bg-black hover:bg-gray-700 text-white rounded-full disabled:bg-gray-700 ml-2"
      onClick={handleClick}
    >
      Convert
    </button>
  );
};

export default ConvertButton;
