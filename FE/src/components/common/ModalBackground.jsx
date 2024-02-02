import { Link } from 'react-router-dom'
import CloseButton from './CloseButton'

function ModalBackground() {
  return (
    <div className='fixed top-0 left-0 bg-back w-full h-full'>
        <Link to='/'>
          <CloseButton className='absolute top-5 right-5' />
        </Link>
      </div>
  )
}

export default ModalBackground