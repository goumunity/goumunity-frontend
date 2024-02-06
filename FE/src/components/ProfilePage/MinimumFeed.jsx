import ProfileImage from "../common/ProfileImage";
import Button2to1 from "../../components/common/Button2to1";
const MinimumFeed = ( {size} ) => {
    return(
        <div className="w-full">
<div className={`w-${size}  border border-gray`}>
        <div className='w-full flex flex-col px-4 py-2'>
      <div className='w-full flex justify-around gap-2'>
        <ProfileImage size='8'/>
        <div className='flex gap-2 w-4/5'>
          {/* <span className='font-daeam'>CheongRyeong</span>{' '} */}
          <span className='font-daeam'>닉네임</span>
          <span className='font-her'>10일 전</span>
        </div>

        <Button2to1 text="삭제" size="6"></Button2to1>
    </div>
        

      </div>
      <p className='my-4 px-3 truncate ...'>내용 blahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblahblah</p>

      
      {/* <span className='font-daeam'>거추 13.7만개</span> */}
    </div>
    </div>
    )
}

export default MinimumFeed;
