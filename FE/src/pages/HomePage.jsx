import { useEffect, useRef, useState } from 'react';
import Post from '../components/homePage/Post';
import axios from 'axios';
import DetailModal from '../modal/DetailModal';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '../store/modal';

const SERVER_URL = 'fake/post/';

function HomePage() {

  const isDetailModalOpen = useSelector(
    (state) => state.modal.isDetailModalOpen
  );
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);

  const observerRef = useRef();

  const observer = (node) => {
    if (isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPage((page) => page + 1);
      }
    });
    node && observerRef.current.observe(node);
  };

  useEffect(
    function requestPost() {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get(SERVER_URL);

          if (res.statusText !== 'OK') {
            throw new Error('데이터 요청 실패');
          }
          setPosts((prev) => [...prev, ...res.data]);
        } catch (error) {
          console.error('api 요청 중 오류 발생 : ', error);
        }
        setIsLoading(false);
      };

      fetchData();
    },
    [page]
  ); 
  
  const dispatch = useDispatch();

  const handleClickOpenDetailModal = () => {
    console.log('gdgd')
    dispatch(modalActions.openDetailModal());
  }

  return (
    <div className='px-8 flex flex-col items-center bg-bright'>
      {posts?.map((post, idx) => {
        return <Post post={post} key={idx} onClick={handleClickOpenDetailModal}/>;
      })}
      <div ref={observer} style={{ height: '10px' }}></div>
      {isDetailModalOpen && <DetailModal />}
    </div>
  );
}

export default HomePage;
