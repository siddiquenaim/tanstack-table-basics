import React, { useState } from "react";

const DropDown = ({ row }) => {
  const handleCopyText = (column) => {
    if (column !== "") {
      navigator.clipboard
        .writeText(column)
        .then(() => {
          alert(`Text copied to clipboard: ${column}`);
        })
        .catch((err) => {
          alert("Failed to copy text:", err);
        });
    }
  };

  return (
    <div>
      <button>. . .</button>
      <div className="text-center">
        <button
          className="block mx-auto"
          onClick={() => {
            return handleCopyText(row.original.money);
          }}
        >
          copy money
        </button>
        <button
          className="block mx-auto"
          onClick={() => {
            return handleCopyText(row.original.first_name);
          }}
        >
          copy name
        </button>
      </div>
    </div>
  );
};

export default DropDown;
