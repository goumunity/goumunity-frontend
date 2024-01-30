function Button({ text, size, isActive=true, ...props }) {
  const className = isActive ? undefined : 'pointer-events-none opacity-75';
  return (
    // <button onClick={onClick} type='button' className='min-w-4 max-h-8 font-daeam cursor-pointer text-white rounded-xl bg-button px-2 py-1'>{text}</button>
    <button
      {...props}
      className={`w-${size} h-${size} font-daeam cursor-pointer text-white rounded-xl bg-button px-2 py-1 ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
