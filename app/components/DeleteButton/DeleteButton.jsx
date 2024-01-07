import React from "react";

const DeleteButton = () => {
  return (
    <button className="py-2 px-4 bg-red-600 hover:bg-red-100 text-white hover:text-black rounded-full disabled:bg-gray-700 ml-2">
      Delete
    </button>
  );
};

export default DeleteButton;
