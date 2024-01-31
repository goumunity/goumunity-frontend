import CloseButton from '../../common/CloseButton';
import ProfileImage from '../../common/ProfileImage';
import CommentSection from './CommentSection';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { calculateDate } from '../../../utils/formatting';
import useAxiosGet from '../../../hooks/useAxiosGet';

function DetailModal() {
  // const post = useLoaderData();

  const params = useParams();
  console.log(params)

  // const [post, isLoading, errorMessage] = useAxiosGet(`/api/feeds/${params.postId}`);
  const [post, isLoading, errorMessage] = useAxiosGet(`/api/feeds/${params.postId}`);
  const navigate = useNavigate();

  // 모달 닫기(홈으로 가기)
  const handleClickGoHome = () => {
    navigate('/');
  };

  const {
    feedId,
    content,
    type,
    price,
    afterPrice,
    profit,
    regionId,
    userId,
    updatedAt,
  } = post;

  const daysAgo = calculateDate(updatedAt)

  return (
    <div className='fixed top-0 left-0 bg-back right-0 bottom-0'>
      <CloseButton
        className='absolute top-5 right-5'
        onClick={handleClickGoHome}
      />
      <div className='z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4/5 w-128 bg-bright border border-gray'>
        <div className='h-full flex'>
          <div className='flex flex-col w-2/3 px-10 py-8 scroll-auto'>
            <div className='flex items-center gap-5'>
              <ProfileImage size='8' />
              <div>
                {/* <span className='font-daeam'>CheongRyeong</span>{' '} */}
                <span className='font-daeam'>{userId}</span>
                {' * '}
                <span className='font-her'>{daysAgo}</span>
              </div>
            </div>
            <p className='my-4 px-3'>
              {content}
            </p>
            <img
              className='w-full h-50 rounded'
              src='https://plus.unsplash.com/premium_photo-1675237625862-d982e7f44696?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29mZmVlfGVufDB8fDB8fHww'
              alt=''
            />
          </div>
          <CommentSection />
        </div>
      </div>
    </div>
  );
}

export default DetailModal;

// export async function loader() {
//     console.log('gdg')
//     const res = await axios.get(`fake/post`);

//     if (res.statusText !== 'OK') {
//       throw json({ message: '에러 발생' }, { status: 500 });
//     } else {
//       return res.data;
//     }
//   }
