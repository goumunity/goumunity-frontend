function Button({ text, size, isActive=true, isNegative, ...props }) {
  // const className = isActive ? undefined : 'pointer-events-none opacity-75';
  const hoverBg = isNegative ? 'hover:bg-gray-400': 'hover:bg-orange-200'
  const className = 'hover:text-gray-500 ' + hoverBg;
  return (
    // <button onClick={onClick} type='button' className='min-w-4 max-h-8 font-daeam cursor-pointer text-white rounded-xl bg-button px-2 py-1'>{text}</button>
    <button
      {...props}
      className={`font-daeam cursor-pointer text-white rounded-xl ${isNegative ? 'bg-gray-600':'bg-button'} px-2 py-1 ${className}`
    }
    style={{ width: `${size}rem`, height: `${Number.parseFloat(size) / 2}rem` }}
    >
      {text}
    </button>
  );
}

export default Button;
