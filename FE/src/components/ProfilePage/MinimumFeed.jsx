import ProfileImage from "../common/ProfileImage";
import Button2to1 from "../../components/common/Button2to1";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const MinimumFeed = ( {size, feedId, nickname,createAt, content, forceUpdate } ) => {
  // const navigate = useNavigate(); 안됨
  // 에러 catch 없애달라고 요청하기.

  
  const deletePost = () => {
    if( confirm("정말로 삭제하시겠습니까?")){
      axios.delete( `/api/feeds/${feedId}`).then( res => {
        if( res.status == 200 ){
          alert("삭제에 성공하였습니다.");
          forceUpdate();
        }else{
          alert("삭제에 실패하였습니다. 잠시후 다시 시도해주세요.");
        }
      })
    }
    
  }
    return(
        <div className="w-full">
<div className={`w-${size}  border border-gray`}>
        <div className='w-full flex flex-col px-4 py-2'>
      <div className='w-full flex justify-around gap-2'>
        <ProfileImage size='8'/>
        <div className='flex gap-2 w-4/5'>
          {/* <span className='font-daeam'>CheongRyeong</span>{' '} */}
          <span className='font-daeam'>{nickname}</span>
          <span className='font-her'>{new Date( createAt).toLocaleDateString()}</span>
        </div>

        <Button2to1 text="삭제" size="6" onClick={deletePost}></Button2to1>
    </div>
        

      </div>
      <p className='my-4 px-3 truncate ...'>{content}</p>

      
      {/* <span className='font-daeam'>거추 13.7만개</span> */}
    </div>
    </div>
    )
}

export default MinimumFeed;
