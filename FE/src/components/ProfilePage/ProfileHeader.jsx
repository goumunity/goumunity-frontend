import ProfileImage from "../common/ProfileImage";
import Button2to1 from "../../components/common/Button2to1";
import { useParams } from "react-router-dom";
const ProfileHeader = () => {
    const {detail} = useParams();
    return (
        <>
        <div className="justify-self-start font-daeam">
          <div className="text-2xl">나의 정보</div>
        </div>
        <hr className="border-1 border-gray-200"></hr>
       <div className="justify-self-center w-full flex flex-row ms-20 p-20">
            <div className="w-1/5">
              <div className="ms-16 me-16 w-32">
              <ProfileImage size="32"></ProfileImage>
              </div>
              
            </div>
            <div className="w-2/5 flex flex-col text-xl ms-16">
              <div className="text-3xl">이름</div>
              { detail !== 'detail' ? ( 
                <>
              <div>지역</div>
              </>
              ): (
                <>
                </>
              ) }
              <div>닉네임</div>
              
            </div>

            <div className="w-1/5">
              <Button2to1 text="수정" size="8"></Button2to1>
            </div>
       </div>
       </>
    )
    
}
export default ProfileHeader;