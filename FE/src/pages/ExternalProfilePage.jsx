import Swal from "sweetalert2";
import instance from "../utils/instance";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import Loading from "../components/common/Loading";
import ProfileHeader from "../components/ProfilePage/ProfileHeader";
import ProfileBaseUnder from "../components/ProfilePage/ProfileBaseUnder";
const ExternalProfilePage = () => {
    const { email,detail } = useParams();
    const [info, setInfo]  = useState({}); 
    const h = detail !== 'detail' ? '' : 'h-fit'
    const h2 = detail !== 'detail' ? 'h-3/4' : 'h-full'
    const [ written, setWritten ] = useState([]);
    const [ savings, setSavings ] = useState([]);
    const [ isInfoLoaded, setIsInfoLoaded ] = useState( false );
    const [ isWrittenLoaded, setIsWrittenLoaded ] = useState( false );
    const [ isSavingsLoaded, setIsSavingsLoaded ] = useState( false );
    const navigate = useNavigate();
    const containerClasses = `base border-2 border-bg-600 flex flex-row ${h}`;
    const isPrivate = false;
    const onLoad = () => {

        instance.get(`/api/users/${email}`)
        .then( res => {
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
        }).catch( (err) => {
          Swal.fire({
            position: "top-end",
            icon: "fail",
            title: "데이터 로딩 간 에러가 발생하였습니다.",
            showConfirmButton: false,
            timer: 1500
          });
          useNavigate('/');
        })
    }

    useEffect( () => {
        onLoad();
    },[])
    
    return(
        <div className="font-dove bg-bright" id="body">
      
       <div className={`grid flex flex-col p-10 ${h2}`}>
        {
          isInfoLoaded ? (
            <>
            <ProfileHeader info={info} isPrivate={isPrivate}/>      
       <div id="ProfileUnder" className={containerClasses}>

          <>
            {
              isWrittenLoaded ? (<><ProfileBaseUnder info={info} style={{height:'532px'}} written={written}  isPrivate={isPrivate}/></>) : (<><Loading></Loading></>)
            }
            
            {/* {
              isSavingsLoaded ? ( <><ProfileBaseUnderSave savings={savings}/></> ) : ( <><Loading></Loading></> )
            } */}
            
            </>
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

export default ExternalProfilePage;