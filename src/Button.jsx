import React from "react";

function Button({compareWords}) {
  return (
    <div>
      <button
        className="mt-4 b-2 bg-green-500 w-16 aspect-video rounded-md"
        onClick={compareWords}
      >
        Onayla
      </button>
    </div>
  );
}

export default Button;
