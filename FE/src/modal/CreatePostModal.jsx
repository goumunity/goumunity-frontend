import CloseButton from '@/components/common/CloseButton';
import { useDispatch } from 'react-redux';
import { modalActions } from '../store/modal';
import { useState } from 'react';
import MapModal from '@/modal/MapModal'

function CreatePostModal() {
  const dispatch = useDispatch();

  const [isSlide, setIsSlide] = useState(false);

  const handleClickCreatePostModalClose = () => {
    dispatch(modalActions.closeCreatePostModal());
  };

  const className = isSlide ? '-translate-x-3/4' : '-translate-x-1/2' 
  
  const handleClickOpenSlide = () => {
    setIsSlide(!isSlide)
  }

  return (
    <div className=''>
      <div className={`absolute top-1/2 left-1/2 ${className} -translate-y-1/2 z-10 transition duration-300`}>
        <div className='bg-bg rounded-xl shadow-2xl w-96'>
          <div>
            <button onClick={handleClickOpenSlide}>슬라이드</button>
          </div>
        </div>
      </div>
      {isSlide && <MapModal isSlide={isSlide} />}
      <div className='fixed top-0 left-0 bg-back w-full h-full'>
        <CloseButton
          className='absolute top-5 right-5'
          onClick={handleClickCreatePostModalClose}
        />
      </div>
    </div>
  );
}

export default CreatePostModal;
