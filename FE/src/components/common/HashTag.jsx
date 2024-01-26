function HashTag({ children }) {
  return (
    <svg
      width='152'
      height='72'
      viewBox='0 0 152 72'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M100.443 71H40.542C23.7188 71 6.5439 52.9504 1.68702 38.7685C-2.19847 27.423 10.9678 8.43368 26.7867 5.02511C37.7981 2.65243 85.8125 -2.70324 118.189 5.02521C132.324 8.3994 143.51 13.7619 147.393 22.0081C162.935 55.0132 124.686 71 100.443 71Z'
        fill='#B7B7A4'
        stroke='#171717'
        strokeOpacity='0.0901961'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <foreignObject className='flex w-full h-full items-center text-center content-center '>
        <div className='flex justify-center w-full h-full items-center'>
          {children}
        </div>
      </foreignObject>
    </svg>
  );
}

export default HashTag;
