import ProfileImage from "../components/common/ProfileImage";
import Button2to1 from "../components/common/Button2to1";
import MinimumFeed from "../components/ProfilePage/MinimumFeed";
import ProfileHeader from "../components/ProfilePage/ProfileHeader";
import ProfileBaseUnderFeeds from "../components/ProfilePage/ProfileBaseUnderFeeds";
import ProfileBaseUnderSave from "../components/ProfilePage/ProfileBaseUnderSave";
import './ProfileScroll.css'
import ProfileDetailUnderPrivate from "../components/ProfilePage/ProfileDetailUnderPrivate";
import ProfileDetailUnderArea from "../components/ProfilePage/ProfileDetailUnderArea";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
function ProfilePage() {
  const { detail } = useParams();
  const [info, setInfo]  = useState({}); 
  const h = detail !== 'detail' ? 'h-1/6' : 'h-3/4'
  /*
"email":"ssafy@ssafy.com",
   "password":"$2a$10$HqqrMtNGbzKvzs8bOV.xU.u8xlQH6JD6Uf.WZv1EmBO3iVYw0ubGG",
   "monthBudget":100000,
   "age":10,
   "userCategory":"JOB_SEEKER",
   "gender":1,
   "nickname":"김싸피",
   "imgSrc":"/images/user-profile/20240117/23758814530500.jpg",
   "registerDate":"2024-01-17T05:38:00Z",
   "userStatus":"ACTIVE",
   "lastPasswordModifiedDate":"2024-01-17T00:00:00Z",
   "regionId":1
  */

  const containerClasses = `border-2 border-bg-600 flex flex-row ${h}`;
  const onLoad = async () => { 
    const res = await axios.get("/api/users/my",
    {withCredentials:true});

    setInfo( res.data );

    
  }
  useEffect( () => {
    onLoad();
  },[])

  
  return (
    <div className="font-dove" id="body">
      
       <div className='grid flex flex-col p-10 h-3/4'>
       <ProfileHeader info={info}/>      
       <div id="ProfileBaseUnder" className={containerClasses}>
        { detail !== 'detail' ?(
          <>
          
            <ProfileBaseUnderFeeds info={info}/>
            <ProfileBaseUnderSave info={info}/>
            
          </> ) : (
          <>
            <ProfileDetailUnderPrivate info={info}/>
            <ProfileDetailUnderArea info={info}/>

          </>
          ) 
        }
        </div>
    </div>
  </div>
  )
}

export default ProfilePage