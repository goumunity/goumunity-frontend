import ProfileImage from "../components/common/ProfileImage";
import Button2to1 from "../components/common/Button2to1";
import MinimumFeed from "../components/ProfilePage/MinimumFeed";
import ProfileHeader from "../components/ProfilePage/ProfileHeader";

import './ProfileScroll.css'

import { useParams } from "react-router-dom";
import { useState,useCallback } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loading from "../components/common/Loading";
import ProfileBaseUnder from "../components/ProfilePage/ProfileBaseUnder";
import ProfileDetailUnder from "../components/ProfilePage/ProfileDetailUnder";
import instance from "@/utils/instance.js";
const ProfilePage = () => {
  

  const { detail } = useParams();
  const [info, setInfo]  = useState({}); 
  const h = detail !== 'detail' ? '' : 'h-fit'
  const h2 = detail !== 'detail' ? 'h-3/4' : 'h-full'
  const [ written, setWritten ] = useState([]);
  const [ savings, setSavings ] = useState([]);
  const [ isInfoLoaded, setIsInfoLoaded ] = useState( false );
  const [ isWrittenLoaded, setIsWrittenLoaded ] = useState( false );
  const [ isSavingsLoaded, setIsSavingsLoaded ] = useState( false );

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
   
   const [writtenFeeds,setWrittenFeeds] = useState([]);
   const [, updateState ] = useState();
   const saveChange = ( price ) => {
    // const nextArr = savings.filter( el => el.id !== id );
    // setSavings( nextArr );

  }
   useEffect( () => {
    console.log( savings );
   },[savings])
  const containerClasses = `base border-2 border-bg-600 flex flex-row ${h}`;
  const onLoad = () => { 

    instance.get("/api/users/my",
    {withCredentials:true})
    .then( res => {
      console.log( 'res : ', res.data );
      setInfo( res.data );
      setIsInfoLoaded( true );
      return res.data;  
    }).then( info => {

      instance.get(`/api/users/${info.id}/feeds`, {withCredentials:true}).then( res => {
        setWritten( res.data );
        setIsWrittenLoaded( true );

        return info;
      }).then( info => {
        instance.get(`/api/users/${info.id}/savings`, {withCredentials:true}).then( res => { 
        

        const saves = res.data['result'].filter( el => el.price != null );
        setSavings( saves );
        setIsSavingsLoaded( true );
        // console.log( isSavingsLoaded );
      });
      
    })
      

    })
    
    

  }

  useEffect( () => {
    onLoad();
    

  },[])

  
  return (
    <div className="font-dove" id="body">
      
       <div className={`grid flex flex-col p-10 ${h2}`}>
        {
          isInfoLoaded ? (
            <>
            <ProfileHeader info={info}/>      
       <div id="ProfileUnder" className={containerClasses}>
        { detail !== 'detail' ?(
          <>
            {
              isWrittenLoaded ? (<><ProfileBaseUnder info={info} style={{height:'532px'}} written={written} saveChange={saveChange}/></>) : (<><Loading></Loading></>)
            }
            
            {/* {
              isSavingsLoaded ? ( <><ProfileBaseUnderSave savings={savings}/></> ) : ( <><Loading></Loading></> )
            } */}
            
            
          </> ) : (
          <>
            <ProfileDetailUnder info={info} className='h-fit'/>
            {/* <ProfileDetailUnderPrivate info={info}/>
            <ProfileDetailUnderArea info={info}/> */}

          </>
          ) 
        }

        </div>
        </>
          ) :
          (
            <Loading></Loading>
          )
        }
       
    </div>
  </div>
  )
}

export default ProfilePage