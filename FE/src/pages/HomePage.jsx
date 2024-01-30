import { useEffect, useRef, useState } from 'react';
import Post from '../components/homePage/Post';
import axios from 'axios';
import DetailModal from '@/components/homePage/detailModal/DetailModal';
import { useDispatch } from 'react-redux';
import { modalActions } from '../store/modal';
import CreatePostModal from '@/components/homePage/createPostModal/CreatePostModal';
import { useParams } from 'react-router-dom';

function HomePage() {
  const params = useParams();

  // const isCreatePostModalOpen = useSelector(
  //   (state) => state.modal.isCreatePostModalOpen
  // );

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

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
    function requestPostList() {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          // const res = await axios.get('fake/postList')
          const res = await axios.get('/api/feeds', {
            params: {page: 0, size: 1, time: 50}
          });
          console.log(res)
       
          setPosts(res.data.contents)
          // return res.data;
        } catch (error) {
          console.error('api 요청 중 오류 발생 : ', error);
        }
        // setIsLoading(false);
      };

      fetchData();
    },
    [page]
  );
  const dispatch = useDispatch();

  const handleClickOpenDetailModal = () => {
    console.log('gdgd');
    dispatch(modalActions.openDetailModal());
  };

  const handleClickOpenCreatePostModal = () => {
    setIsCreatePostModalOpen(true)
  };

  return (
    <div className='flex flex-col items-center bg-bright'>
      {posts?.map((post, idx) => {
        return (
          <Post post={post} key={idx} />
        );
      })}
      <div ref={observer} style={{ height: '10px' }}></div>
      {/* {isDetailModalOpen && <DetailModal />} */}
      {params.postId && <DetailModal id={params.postId} />}
      {isCreatePostModalOpen && <CreatePostModal onClose={() => setIsCreatePostModalOpen(false)}/>}
      
      <button
        className='fixed bottom-5 right-5 cursor-pointer'
        onClick={handleClickOpenCreatePostModal}
      >
        애드
      </button>
    </div>
  );
}

export default HomePage;
