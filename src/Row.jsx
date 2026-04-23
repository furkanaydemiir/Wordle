import React, { useEffect } from "react";

function Row({
  handleChange,
  handleBackSpace,
  index,
  onFocus,
  disabled,
  color,
  value,
}) {
  return (
    <>
     <input
      value={value}
      disabled={disabled}
      onKeyDown={handleBackSpace}
      onChange={handleChange}
      type="text"
      maxLength={1}
      className={`uppercase w-14 h-14 border-2 text-2xl text-center text-white font-bold transition-all duration-700 ease-in-out transform 
        ${color} 
        ${disabled && !color.includes('bg-') ? "opacity-40" : "opacity-100"}
        ${color.includes('rotate-x-360') ? "[transform:rotateX(360deg)]" : ""}
        focus:border-blue-400 outline-none rounded-sm`}/>
    </>
  );
}

export default Row;
