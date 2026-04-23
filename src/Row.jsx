import React, { useEffect, useRef } from "react";

function Row({ handleChange, handleBackSpace, index, disabled, color, value }) {
  const ref = useRef();
 
   const tab = () =>{
    ref.current.focus()
   }
   useEffect(()=>{
    ref.current.focus()
   },[handleChange])
     


  return (
    <input
      ref={ref}
      value={value}
      disabled={disabled}
      onKeyDown={(e) => handleBackSpace(e, index)}
      onChange={(e) => handleChange(e, index)}
      type="text"
      maxLength={1}
      className={`uppercase w-14 h-14 border-2 text-2xl text-center text-white font-bold transition-all duration-700 ease-in-out transform 
        ${color} 
        ${disabled && !color.includes("bg-") ? "opacity-40" : "opacity-100"}
        ${color.includes("rotate-x-360") ? "[transform:rotateX(360deg)]" : ""}
        focus:border-blue-400 outline-none rounded-sm`}
    />
  );
}

export default Row;
