import { useCallback, useEffect, useRef, useState } from 'react';
import Feed from '../components/homePage/Feed';
import DetailModal from '@/components/homePage/detailModal/DetailModal';
import CreateFeedModal from '@/components/homePage/createPostModal/CreateFeedModal';
import { useParams } from 'react-router-dom';
import PatchFeedModal from '../components/homePage/createPostModal/PatchFeedModal';
import instance from "@/utils/instance.js";

function HomePage() {
  const params = useParams();
  const [feedList, setFeedList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [page, setPage] = useState(0);
  const observerRef = useRef();

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
        setFeedList((prev) => [...prev, ...res.data.feedRecommends]);
        console.log('response:', res)
        // setHasNext(res.data.hasNext);
        setHasNext(true);
      } catch (error) {
        console.log('feedList 요청 중 에러 발생 : ', error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [page]);

  return (
    <div className='flex flex-col items-center h-full bg-bright'>
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
  );
}

export default HomePage;
