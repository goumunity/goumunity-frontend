import { useEffect, useState, useCallback } from "react";
import MinimumFeed from "./MinimumFeed";
import axios from "axios";
const ProfileBaseUnderFeeds = ({ info, written}) => {
  const [writtenFeeds,setWrittenFeeds] = useState([]);
  const [, updateState ] = useState();
  const forceUpdate = useCallback( () => updateState({}), []);
    useEffect( () => {
      console.log( 'remounted! ');
      const liList = written['result'].map( el => <li><MinimumFeed key={el.feedId} size="full" feedId={el.feedId} nickname={info.nickname} createAt={ el.createdAt } content={ el.content} forceUpdate={forceUpdate}/></li> )
      console.log( liList );

      setWrittenFeeds( liList );
    },[])
    return (
        <>
        <div className=" w-1/2 p-1">
          <ul className="scroll border-2 border-bg-600 w-full flex flex-col p-3 overflow-x-hidden overflow-y-scroll h-full">
            {/* <li><MinimumFeed size="full"/></li> */}
            {writtenFeeds}
          </ul>
        </div>
        </>
    )
    
}


export default ProfileBaseUnderFeeds;