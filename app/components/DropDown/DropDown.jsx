import { useState, useRef, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";

const DropDown = ({ row }) => {
  const dropdownRef = useRef(null);
  const [showDropDown, setShowDropDown] = useState(false);

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

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropDown(false);
    }
  };

  useEffect(() => {
    const handleClick = (event) => {
      handleClickOutside(event);
    };

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          setShowDropDown(!showDropDown);
        }}
      >
        <BsThreeDots className="text-2xl" />
      </button>
      {showDropDown && (
        <div className="absolute right-3 bg-black rounded-md text-white p-4 z-10 space-y-2">
          <button
            className="block mx-auto hover:bg-gray-700 py-1 px-1.5 rounded-lg"
            onClick={() => {
              handleCopyText(row.original.money);
            }}
          >
            Copy Money
          </button>
          <hr />
          <button
            className="block mx-auto hover:bg-gray-700 py-1 px-1.5 rounded-lg"
            onClick={() => {
              handleCopyText(row.original.first_name);
            }}
          >
            Copy Name
          </button>
          <hr />
          <button
            className="block mx-auto hover:bg-gray-700 py-1 px-1.5 rounded-lg"
            onClick={() => {
              handleCopyText(row.original.date);
            }}
          >
            Copy Date
          </button>
        </div>
      )}
    </div>
  );
};

export default DropDown;
