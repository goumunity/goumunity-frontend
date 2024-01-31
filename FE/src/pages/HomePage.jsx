import { useCallback, useEffect, useRef, useState } from 'react';
import Feed from '../components/homePage/Feed';
import axios from 'axios';
import DetailModal from '@/components/homePage/detailModal/DetailModal';
import CreateFeedModal from '@/components/homePage/createPostModal/CreateFeedModal';
import { useNavigate, useParams } from 'react-router-dom';

function HomePage() {
  
  const [initialTime] = useState(new Date().getTime());

  const params = useParams();

  const navigate = useNavigate();

  const [feedList, setFeedList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [page, setPage] = useState(0);
  const [isCreateFeedModalOpen, setIsCreateFeedModalOpen] = useState(false);

  const [initialLoadTime, setInitialLoadTime] = useState(null);

  const observerRef = useRef();

  const lastFeedRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        console.log('entries[0].isIntersecting : ', entries[0].isIntersecting);
        if (entries[0].isIntersecting && hasNext) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      
      if (node) observerRef.current.observe(node);
      // console.log(node);
    },
    [isLoading, hasNext]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/feeds', { params: {
          page, size: 5, time: initialTime
        }})
        console.log('feedList 요청 결과 : ', res)
        console.log('요청 시간 : ', initialTime)
        setFeedList(res.data.contents)
      } catch (error) {
        console.log('feedList 요청 중 에러 발생 : ', error)
      }
    }
    fetchData();
  }, [page])

  const handleClickOpenCreateFeedModal = () => {
    setIsCreateFeedModalOpen(true);
  };

  const handleClickOpenDetail = () => {
    navigate('/1');
  };

  return (
    <div className='flex flex-col items-center h-screen bg-bright'>
      {feedList.map((feed, idx) => (
        <Feed feed={feed} key={idx} setFeedList={setFeedList} feedList={feedList}/>
      ))}

      {params.feedId && <DetailModal  />}
      {isCreateFeedModalOpen && (
        <CreateFeedModal onClose={() => setIsCreateFeedModalOpen(false)} />
      )}

      <button
        className='fixed bottom-5 right-5 cursor-pointer'
        onClick={handleClickOpenCreateFeedModal}
      >
        애드
      </button>

      <button
        className='fixed bottom-10 right-5 cursor-pointer'
        onClick={handleClickOpenDetail}
      >
        조회
      </button>
      <div ref={lastFeedRef} style={{ height: '10px' }}></div>

    </div>
  );
}

export default HomePage;