import { useEffect, useState} from "react";
import MinimumFeed from "./MinimumFeed";
import axios from "axios";
const ProfileBaseUnder = ({ info, written, saveChange }) => {
    const [ feeds, setFeeds ] = useState([]);
    const [ liList, setLiList ] = useState([]); 
    const [ isFeedsDone, setIsFeedDone ] = useState( false );

    const deletePost = ( feedId ) => {
      if( confirm("정말로 삭제하시겠습니까?")){
        axios.delete( `/api/feeds/${feedId}`).then( res => {
          // console.log( 'feeds: ' + feeds);

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

    const [ savingList, setSavingList ] = useState([]);
  const [ sum, setSum ] = useState(0);

    const initLi = () => {
      const lis = written['result'].map( el => <li key={el.feedId}><MinimumFeed size="full" feedId={el.feedId} nickname={info.nickname} createAt={ el.createdAt } content={ el.content} deletePost={deletePost} imgSrc={info.imgSrc}/></li> )
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
      const lis = feeds.map( el => <li key={el.feedId}><MinimumFeed size="full" feedId={el.feedId} nickname={info.nickname} createAt={ el.createdAt } content={ el.content} deletePost={deletePost} imgSrc={info.imgSrc}/></li> )
      setLiList( lis ); 
      // console.log( feeds );

      const saves = feeds.filter( el => el.price != null ).map( el => 
        <li key= {el.feedId} className="flex justify-between rounded-lg">
          <div className="ps-4 overflow-x-hidden">{ new Date(el.createdAt).toLocaleDateString() + " : " + el.content }</div>
          <div className="pe-4">${parseInt(el.price) - parseInt(el.afterPrice)}</div>
        </li>
      )  


      let newSum = 0;
        feeds.filter( el => el.price != null ).forEach( el => {
          let price = parseInt(el.price) - parseInt(el.afterPrice);
          newSum += price;
        } );
    
        setSum( newSum );

        setSavingList( saves );

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