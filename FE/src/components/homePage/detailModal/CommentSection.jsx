import CreateCommentBox from './CreateCommentBox';
import Comment from './Comment';
import { useEffect, useRef, useState } from 'react';
import useInput from '../../../hooks/useInput';
import axios from 'axios';
import OptionBox from './OptionBox';

function CommentSection() {

  const [commentList, setCommentList] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef();

  // 게시글에 속한 댓글들 불러오기
  useEffect(function requestCommentList() {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // const res = await axios.get(`/api/feeds/${params.postId}`)
        const res = await axios.get('/fake/commentList');
        console.log('response : ', res);
        setCommentList(res.data.content);

      } catch (error) {
        console.log('에러 발생 : ', error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // useEffect(function requestComment() {
  //   const fetchData = async () => {
  //     //   setIsLoading(true);
  //     try {
  //       const res = await axios.get('fake/comment');

  //       if (res.statusText !== 'OK') {
  //         throw new Error('데이터 요청 실패');
  //       }
  //       setComments(res.data);
  //     } catch (error) {
  //       console.error('api 요청 중 오류 발생 : ', error);
  //     }
  //     setIsLoading(false);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className='relative border-l border-gray w-1/3'>
      <div className='px-2 w-ful'>
        {commentList?.map((comment, idx) => {
          return <Comment key={idx} comment={comment} inputRef={inputRef} />;
        })}
      </div>
      <div className='absolute bottom-0 w-full'>
        <OptionBox />
        <CreateCommentBox setCommentList={setCommentList} inputRef={inputRef} />
      </div>
    </div>
  );
}

export default CommentSection;
