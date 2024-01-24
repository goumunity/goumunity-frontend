import React from 'react'

function MapModal({isSlide}) {

    const className = isSlide ? 'translate-x-1/2 opacity-100' : '-translate-x-1/2 opacity-0'
  return (
    <div className={`absolute top-1/2 left-1/2 ${className} -translate-y-1/2 z-10 transition duration-300`}>
        <div className='bg-bg rounded-xl shadow-2xl w-96'>
          <div>
            gdgd
          </div>
        </div>
      </div>
  )
}

export default MapModal