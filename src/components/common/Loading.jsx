import loading from '@/assets/gifs/loading.gif'

function Loading() {
  return (
    <div className='flex flex-col gap-5 justify-center items-center h-full'>
      <h3 className='font-daeam text-xl'>잠시만 기다려주세요...</h3>
      <img src={loading} alt="" />
    </div>
  )
}

export default Loading