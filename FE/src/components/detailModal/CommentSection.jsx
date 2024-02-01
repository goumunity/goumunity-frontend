import CreateCommentBox from './CreateCommentBox.jsx';
import Option from '../common/Option.jsx';
import Comment from './Comment.jsx';
import { useEffect, useState } from 'react';
import useInput from '../../hooks/useInput.js';
import axios from 'axios';
import OptionBox from './OptionBox.jsx';

function CommentSection() {

  const [input, handleChangeInput] = useInput();

  const [comments, setComments] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(function requestComment() {
    const fetchData = async () => {
      //   setIsLoading(true);
      try {
        const res = await axios.get('fake/comment');

        if (res.statusText !== 'OK') {
          throw new Error('데이터 요청 실패');
        }
        setComments(res.data);
      } catch (error) {
        console.error('api 요청 중 오류 발생 : ', error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className='relative border-l border-gray w-1/3'>
      <div className='px-2'>
        {comments.map((comment, idx) => {
          return <Comment key={idx} comment={comment} />;
        })}
      </div>
      <div className='absolute bottom-0 w-full'>
        <OptionBox />
        <CreateCommentBox />
      </div>
    </div>
  );
}

export default CommentSection;
