import React from "react";

function UserInput({ label, id, error, ...props }) {
  return (
    <div className="flex flex-col mb-2">
      <label htmlFor={id} className="text-left text-2xl font-her">
        *{label}
      </label>
      <input
        className="border-b border-black-200 my-1 bg-yellow outline-none bb"
        {...props}
      />
      <div className='text-left font-dove text-red-600 text-xs h-2 mb-3'>{error}</div>
      {/* {isInvalid && <div>{invalidMessage}</div>} */}
    </div>
  );
}

export default UserInput;
