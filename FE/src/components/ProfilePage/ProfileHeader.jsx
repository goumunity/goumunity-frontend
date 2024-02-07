import ProfileImage from "../common/ProfileImage";
import Button2to1 from "../../components/common/Button2to1";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileImageSection from "./ProfileImageSection";
const ProfileHeader = ( { info } ) => {

    const [ imgSrc, setImgSrc ] = useState('');
    const {detail} = useParams();
    const regionMapper = [ '동대문구','중구','성동구','성북구','강동구','노원구','도봉구','강서구','금천구','영등포구'];

    
    useEffect( () => {
      setImgSrc( info.imgSrc );
    },[])


    return (
        <>
        <div className="justify-self-start font-daeam">
          <div className="text-2xl">나의 정보</div>
        </div>
        <hr className="border-1 border-gray-200"></hr>
       <div className="justify-center w-full flex flex-row p-20">
            <div className="">
              <div className="ms-16 me-16 w-32">
              <ProfileImageSection size='36' src={info.imgSrc}/>
              </div>
              
            </div>
            { detail !== 'detail' ? ( 
              <>
            <div className="w-2/5 flex flex-col text-xl ms-16">
              <div className="text-3xl">{info.nickname}님 환영합니다!</div>
              <div>{regionMapper[ info.regionId ] }</div>
              <div>{info.age}살</div>
              
            </div>
            <div className="w-1/5">
              <Link to="/profile/detail"><Button2to1 text="수정" size="8"></Button2to1></Link>
            </div>
            </>)
            : ( <></>) }
            
       </div>
       </>
    )
    
}
export default ProfileHeader;