function Option({text, src, ...props}) {
  return (
    <div className='flex justify-center items-center gap-2 cursor-pointer' {...props}>
      <img className='w-5 h-5' src={src} alt='' />
      <span className=''>{text}</span>
    </div>
  );
}

export default Option;
