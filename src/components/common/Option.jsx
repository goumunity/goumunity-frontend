function Option({text, src, size, ...props}) {
  return (
    <div className='flex justify-center items-center gap-1 cursor-pointer' {...props}>
      <img className={`w-${size} h-${size}`} src={src} alt='' />
      <span className='font-daeam'>{text}</span>
    </div>
  );
}

export default Option;
