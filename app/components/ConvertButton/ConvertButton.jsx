// ConvertButton.js
import React, { useState } from "react";

const ConvertButton = ({ row }) => {
  const [money, setMoney] = useState(row.renderValue("money"));
  const [currency, setCurrency] = useState("USD");

  const handleClick = () => {
    // console.log("render console:", row.renderValue("money"));

    if (currency === "USD") {
      setMoney(parseFloat(money * 109.3).toFixed(2));
      setCurrency("BDT");
    }
    if (currency === "BDT") {
      setMoney(parseFloat(money / 109.3).toFixed(2));
      setCurrency("USD");
    }
  };

  return (
    <>
      <p>
        {currency} {money}
      </p>
      <button
        className="py-2 px-4 bg-black hover:bg-gray-700 text-white rounded-full disabled:bg-gray-700 ml-2"
        onClick={handleClick}
      >
        Convert
      </button>
    </>
  );
};

export default ConvertButton;
