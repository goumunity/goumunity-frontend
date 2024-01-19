import React from 'react'

function Button({text, size, ...props}) {
    
  return (
    // <button onClick={onClick} type='button' className='min-w-4 max-h-8 font-daeam cursor-pointer text-white rounded-xl bg-button px-2 py-1'>{text}</button>
    <button {...props} className={`w-${size} h-${size}  font-daeam cursor-pointer text-white rounded-xl bg-button px-2 py-1 `}>{text}</button>
  )
}

export default Button