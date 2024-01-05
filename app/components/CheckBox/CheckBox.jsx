import React from "react";

const CheckBox = ({ checked, onCheckedChange, ariaLabel }) => {
  return (
    <div className="text-center">
      <input
        type="checkbox"
        id="select"
        name="select"
        value=""
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        aria-label={ariaLabel}
      />
    </div>
  );
};

export default CheckBox;
