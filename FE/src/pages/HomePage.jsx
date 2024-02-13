import { useCallback, useEffect, useRef, useState } from 'react';
import Feed from '../components/homePage/Feed';
import axios from 'axios';
import DetailModal from '@/components/homePage/detailModal/DetailModal';
import CreateFeedModal from '@/components/homePage/createPostModal/CreateFeedModal';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PatchFeedModal from '../components/homePage/createPostModal/PatchFeedModal';
import instance from "@/utils/instance.js";
import MemberRanking from '../components/homePage/Ranking/GoumunityRanking.jsx';
import { useSelector } from 'react-redux';
import FeedRanking from '../components/homePage/Ranking/FeedRanking';

function HomePage() {
  const [initialTime] = useState(new Date().getTime());
  const params = useParams();
  const [feedList, setFeedList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [page, setPage] = useState(0);
  const observerRef = useRef();
  const [rankList, setRankList] = useState([]); 
  const currentUser = useSelector((state) => state.auth.currentUser);

  const lastFeedRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        console.log('entries[0].isIntersecting : ', entries[0].isIntersecting);
        if (entries[0].isIntersecting && hasNext) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasNext]
  );

  useEffect(() => {

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await instance.get('/api/feeds')
        console.log( 'feeds:', res );
        setFeedList((prev) => [...prev, ...res.data.feedRecommends]);
        setHasNext(res.data.hasNext);
      } catch (error) {
        console.log('feedList 요청 중 에러 발생 : ', error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [page]);
  
  const getRanks = async () => {
    const res = await instance.get('/api/users/ranking');

    
    const newRankList = res.data;

    
    setRankList( newRankList );
}
  useEffect(() => {
    getRanks();
  },[])


  useEffect(() => {
    getRanks();
  },[])
  // if (params.id || params.feedId) {
  //   document.body.style.overflow = 'hidden';
  // } else {
  //   document.body.style.overflow = 'auto';
  // }

  return (
    <div className='flex flex-row justify-center bg-bright'>
      <div className='flex flex-col items-center h-full'>
      {feedList.map((feed, idx) => (
        <Feed
          feed={feed}
          key={idx}
          setFeedList={setFeedList}
          feedList={feedList}
        />
      ))}

      {params.feedId && <DetailModal setFeedList={setFeedList} feedList={feedList} feedId={params.feedId} />}
      {params.id && <CreateFeedModal setFeedList={setFeedList} />}
      {params.patchId && <PatchFeedModal feedList={feedList} setFeedList={setFeedList} />}

      <div ref={lastFeedRef} style={{ height: '10px' }}></div>
    </div>
    {rankList.length === 0 ?
    (<>
    {/* <div className='w-72 h-10'></div> */}
    </>)
    :
    (<>
    <div className='rank-row flex-col w-1/3'>
    <MemberRanking ranks ={rankList}/>
    <FeedRanking/>
    </div>
    
    </>)
    }
    {/* <Link to='/test'> <div>hi</div></Link> */}
    
    </div>
    
  );
}

export default HomePage;
