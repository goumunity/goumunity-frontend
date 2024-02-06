import { useEffect, useState} from "react";
import MinimumFeed from "./MinimumFeed";
import axios from "axios";
const ProfileBaseUnderFeeds = ({ info, written, saveChange }) => {
    const [ feeds, setFeeds ] = useState([]);
    const [ liList, setLiList ] = useState([]); 
    const [ isFeedsDone, setIsFeedDone ] = useState( false );

    const deletePost = ( feedId ) => {
      if( confirm("정말로 삭제하시겠습니까?")){
        axios.delete( `/api/feeds/${feedId}`).then( res => {
          console.log( 'feeds: ' + feeds);

          alert("삭제에 성공하였습니다.");
          
          const deleteTarget = feeds.filter( el => el.feedId === feedId );
          if( deleteTarget[0].price == null ){
            saveChange( deleteTarget[0].price);
          }
          const nextArr = feeds.filter( el => el.feedId !== feedId );
          setFeeds( nextArr );

          
          
        }).catch( error => {
          console.log( error );
          alert("삭제에 실패하였습니다. 다시 시도해주세요.");
        })
      }
      
    }


    const initLi = () => {
      const lis = written['result'].map( el => <li key={el.feedId}><MinimumFeed size="full" feedId={el.feedId} nickname={info.nickname} createAt={ el.createdAt } content={ el.content} deletePost={deletePost}/></li> )
      setLiList( lis );

      ;
      
      
    }

    const initFe = () => {
      const val = written['result'].map( el => el );


      setFeeds( val );
      
    }

    useEffect( () => {
      const lis = feeds.map( el => <li key={el.feedId}><MinimumFeed size="full" feedId={el.feedId} nickname={info.nickname} createAt={ el.createdAt } content={ el.content} deletePost={deletePost}/></li> )
      setLiList( lis );
      console.log( feeds );
    },[feeds]);


  
    useEffect( () => {
     initLi();
     initFe();                                                                 
    },[])
    return (
        <>
        <div className=" w-1/2 p-1">
          <ul className="scroll border-2 border-bg-600 w-full flex flex-col p-3 overflow-x-hidden overflow-y-scroll h-full">
            {/* <li><MinimumFeed size="full"/></li> */}
            {liList}
          </ul>
        </div>
        </>
    )
    
}


export default ProfileBaseUnderFeeds; 