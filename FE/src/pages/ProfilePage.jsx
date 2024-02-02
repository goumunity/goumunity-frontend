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
function ProfilePage() {
  const { detail } = useParams();
  return (
    <div className="font-dove" id="body">
      
       <div className='grid flex flex-col h-full p-10'>
       <ProfileHeader/>      
      <div id="ProfileBaseUnder" className="border-2 border-bg-600 flex flex-row h-1/6">
        { detail !== 'detail' ?(
          <>
            <ProfileBaseUnderFeeds/>
            <ProfileBaseUnderSave/>
          </> ) : (
          <>
            <ProfileDetailUnderPrivate/>
            <ProfileDetailUnderArea/>

          </>
          ) 
        }
      </div>
    </div>
  </div>
  )
}

export default ProfilePage