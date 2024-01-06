"use client";

import React, { useState } from "react";

const ItemsQty = ({ row }) => {
  const maxItemQty = row.renderValue("money");
  const user = row.original.first_name;

  const handleSelectQty = (event) => {
    event.preventDefault();

    const selectedQty = parseInt(event.target.totalItems.value);

    {
      selectedQty >= 0 &&
        console.log(`Items Selected by ${user}: ${selectedQty}`);
    }
    {
      selectedQty >= 0 && alert(`Items Selected by ${user}: ${selectedQty}`);
    }
  };
  return (
    <div>
      <form onSubmit={handleSelectQty} action="" className="space-y-1">
        <div className="text-center">
          <input
            name="totalItems"
            type="number"
            max={parseInt(maxItemQty * 109.3)}
            min={0}
            className="text-center border border-gray-600 rounded-lg w-[100px] py-1 px-1.5"
            placeholder="Qty"
            required
          />
        </div>
        <div className="text-center">
          <input
            type="submit"
            className="text-center cursor-pointer py-1 px-2 rounded-sm bg-white border border-gray-600"
            value="Select"
          />
        </div>
      </form>
    </div>
  );
};

export default ItemsQty;
