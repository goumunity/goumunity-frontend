import { useEffect, useState} from "react";
import MinimumFeed from "./MinimumFeed";
import axios from "axios";
import instance from "@/utils/instance.js";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
const ProfileBaseUnder = ({ info, written, saveChange, isPrivate }) => {
    const [ feeds, setFeeds ] = useState([]);
    const [ liList, setLiList ] = useState([]); 
    const [ isFeedsDone, setIsFeedDone ] = useState( false );
    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();
    const deletePost = ( feedId ) => {
      Swal.fire({
        title: "정말 삭제하시나요?",
        text: "게시글을 삭제하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#faedcd",
        cancelButtonColor: "#d33",
        confirmButtonText: "네 삭제하겠습니다"
      }).then((result) => {
        if (result.isConfirmed) {
          instance.delete( `/api/feeds/${feedId}`).then( res => {

            Swal.fire({
              title: "삭제되었습니다!",
              text: "요청하신 게시글이 삭제되었습니다.",
              icon: "success"
            })
            
            const deleteTarget = feeds.filter( el => el.feedId === feedId );
            if( deleteTarget[0].price == null ){
              saveChange( deleteTarget[0].price);
            }
            const nextArr = feeds.filter( el => el.feedId !== feedId );
            setFeeds( nextArr );
  
            
            
          }).catch( error => {
            console.log( error );
            Swal.fire({
              title: "삭제에 실패하였습니다!",
              text: "잠시후 다시 시도해주세요",
              icon: "error"
            })
          })
        }
      });

      
    }

    const [ savingList, setSavingList ] = useState([]);
  const [ sum, setSum ] = useState(0);

    const initLi = () => {
      const lis = written['result'].map( el => <li key={el.feedId}><MinimumFeed size="full" feedId={el.feedId} nickname={ isPrivate ? currentUser.nickname : info.nickname } createAt={ el.createdAt } content={ el.content} deletePost={deletePost} imgSrc={ isPrivate ? currentUser.imgSrc:info.imgSrc} isPrivate={isPrivate}/></li> )
      setLiList( lis ); 
      const saves = written['result'].filter( el => el.price != null ).map( el => 
        <li key= {el.feedId} className="flex justify-between rounded-lg">
          <div className="ps-4 overflow-x-hidden">{ new Date(el.createdAt).toLocaleDateString() + " : " + el.content }</div>
          <div className="pe-4">${parseInt(el.price) - parseInt(el.afterPrice)}</div>
        </li>
      )
      let newSum = 0;
        written['result'].filter( el => el.price != null ).forEach( el => {
          let price = parseInt(el.price) - parseInt(el.afterPrice);
          newSum += price;
        } );
    
        setSum( newSum );

        setSavingList( saves );
      
      
    }

    const initFe = () => {
      const val = written['result'].map( el => el );
      setFeeds( val );
      
    }

    useEffect( () => {
      // console.log( info );
      console.log( 'info:>',info );
      const lis = feeds.map( el => <li key={el.feedId}><MinimumFeed size="full" feedId={el.feedId} nickname={isPrivate ? currentUser.nickname : info.nickname} createAt={ el.createdAt } content={ el.content} deletePost={deletePost} imgSrc={ isPrivate ? currentUser.imgSrc : info.imgSrc} isPrivate={isPrivate}/></li> )
      setLiList( lis ); 
      // console.log( feeds );

      const saves = feeds.filter( el => el.price != null ).map( el => 
        <li key= {el.feedId} className="flex justify-between rounded-lg">
          <div className="ps-4 overflow-x-hidden">{ new Date(el.createdAt).toLocaleDateString() + " : " + el.content }</div>
          <div className="pe-4">${parseInt(el.price) - parseInt(el.afterPrice)}</div>
        </li>
      
      ,[])  


      let newSum = 0;
        feeds.filter( el => el.price != null ).forEach( el => {
          let price = parseInt(el.price) - parseInt(el.afterPrice);
          newSum += price;
        } );
    
        setSum( newSum );

        setSavingList( saves );

    },[feeds]);


  
    useEffect( () => {
      // console.log('baseunder info, ', info )
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



        <div className=" w-1/2 p-1">
          <div id="savebody" className="w-full" style={{ height: '532px'}} >
            <div className="overflow-x-hidden overflow-y-hidden">
            <div className=" p-5 bg-bg border-2 border-indigo-100 rounded-lg">
                
                <div className="text-2xl">
                절약 내역
                </div>
              
            </div>
          </div>
          <ul className="scroll border-2 rounded-lg mt-2 text-right border-bg-600 w-full flex flex-col p-3 overflow-y-scroll h-2/3">
          
              {savingList}
            
          </ul>
          <div className=" p-5 border-2 mt-2 rounded-lg">
                
                <div className="flex flex-row justify-between text-2xl">
                  <div> 합계: </div>
                  <div> {sum}원 </div>
                </div>
              
            </div>
        </div>
        
      </div>



        </>
    )
}


export default ProfileBaseUnder;