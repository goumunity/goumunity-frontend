import { useEffect, useRef } from 'react';

function UserInput({ label, isFirst, id, error, ...props }) {
  const firstRef = useRef();

  // 렌더링 시 첫번째 입력에 포커스
  useEffect(function focusFirstInput() {
    if (isFirst === true) {
      firstRef.current.focus();
    }
  }, []);

  return (
    <div className='flex flex-col mb-3'>
      <label htmlFor={id} className='text-left text-2xl font-her'>
        *{label}
      </label>
      <input
        className='border-b border-black-200 my-1 bg-transparent outline-none'
        ref={firstRef}
        {...props}
      />
      <div className='text-left font-dove text-red-600 text-xs h-2'>
        {error}
      </div>
      {/* {isInvalid && <div>{invalidMessage}</div>} */}
    </div>
  );
}

export default UserInput;
