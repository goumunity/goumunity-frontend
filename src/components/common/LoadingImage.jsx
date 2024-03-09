import loading from '@/assets/gifs/loading.gif'

function LoadingImage() {
  return (
    <div className='flex flex-col gap-5 justify-center items-center w-3 h-3'>
      <img className='w-full h-full' src={loading} alt="" />
    </div>
  )
}

export default LoadingImage