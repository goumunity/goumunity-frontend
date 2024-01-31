import { useEffect, useRef, useState } from 'react';
import Post from '../components/homePage/Post';
import axios from 'axios';
import DetailModal from '@/components/homePage/detailModal/DetailModal';
import CreatePostModal from '@/components/homePage/createPostModal/CreatePostModal';
import { useNavigate, useParams } from 'react-router-dom';

function HomePage() {
  const params = useParams();

  const navigate = useNavigate();

  const [postList, setPostList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  const [initialLoadTime, setInitialLoadTime] = useState(null);

  useEffect(() => {
    // 페이지에 처음 접속했을 때의 시간을 기록
    if (!initialLoadTime) {
      setInitialLoadTime(new Date().getTime());
    }

    // 여기서 추가적인 로직 또는 이펙트를 수행할 수 있습니다.

    // 리턴하는 함수는 컴포넌트가 언마운트될 때 실행됩니다.
    return () => {
      // 언마운트 시에 수행할 정리 작업이 있다면 여기서 처리
    };
  }, [initialLoadTime]);

  const observerRef = useRef();

  const observer = (node) => {
    if (isLoading || !node) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNext) {
        setPage((page) => page + 1);
      }
    });

    observerRef.current.observe(node);
  };


  // 피드리스트 불러오기
  useEffect(
   
    function requestPostList() {
      const fetchData = async () => {
        console.log(page)
        // setIsLoading(true);
        try {
          // const time = new Date().getTime();
          const res = await axios.get('/api/feeds', {
            params: { page: 0, size: 3, time: initialLoadTime },
          });
          console.log('피드리스트 결과 : ', res.data)
          setPostList(res.data.contents);
          // setHasNext(res.data.hasNext)
        } catch (error) {
          console.error('피드 받아오는 중 오류 발생 : ', error);
        }
        // setIsLoading(false);
      };

      // if (hasNext) 
      fetchData();
    },
    [page]
  );

  const handleClickOpenCreatePostModal = () => {
    setIsCreatePostModalOpen(true);
  };

  const handleClickOpenDetail = () => {
    navigate('/1');
  };

  return (
    <div className='flex flex-col items-center bg-bright'>
      {postList?.map((post, idx) => (
        <Post post={post} key={idx} />
      ))}
      {params.postId && <DetailModal  />}
      {isCreatePostModalOpen && (
        <CreatePostModal onClose={() => setIsCreatePostModalOpen(false)} />
      )}

      <button
        className='fixed bottom-5 right-5 cursor-pointer'
        onClick={handleClickOpenCreatePostModal}
      >
        애드
      </button>

      <button
        className='fixed bottom-10 right-5 cursor-pointer'
        onClick={handleClickOpenDetail}
      >
        조회
      </button>
      <div ref={observer} style={{ height: '10px' }}></div>

    </div>
  );
}

export default HomePage;
