import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './GoumunityRanking.css'
import instance from '../../../utils/instance.js'
const RankingBar = () => {
    
//     const [DragStyleSheet, setDragStyleSheet] = useState({});
//     const [rankList, setRankList] = useState([]); 
//     const targetUrl = window.location.pathname;
//     if( targetUrl !=='/'){
//         return;
//     }


//     // useEffect(() => {
//     //     getRanks();
//     // },[])
    
//     const MoveToPersonalProfile= () => {
        
//     }


//     const getRanks = async () => {
//         const res = await instance.get('/api/users/ranking');
 
        
//         const newRankList = res.data.map( (el, index ) => 
                  
//                 <tr key={index} className="hover:bg-gray-100 h-10" onClick={MoveToPersonalProfile}>
//                     <td>{ index + 1 }</td>
//                     <td>{el.nickname}</td>
//                     <td>{el.likedSum}</td>
//                 </tr> )
      
        
//         setRankList( newRankList );
//     }


//     return(
//         <>  
//         { rankList.length ==0 ? 
//         (<>
        
//         </>)
//         : 
//         (<>
//             <div className="rank font-daeam flex flex-col mt-10 items-center" style={{ DragStyleSheet }}>
//                 <div className="text-2xl"> 거지 탈출 </div>
//                 <table className="m-20 table-fixed bg-bg w-72 h-10 text-center">
//                     <thead>
//                         <tr>
//                             <th>순위</th>
//                             <th>닉네임</th>
//                             <th>받은 좋아요 수</th>
//                         </tr>
//                     </thead>

//                     <tbody id="rankList">
//                         {/* <tr className="hover:bg-gray-100 h-10">
//                             <td>1</td>
//                             <td>hello</td>
//                             <td>12</td>
//                         </tr> */}

                        

//                         {rankList}

                        
//                     </tbody>


//                 </table>
//             </div>
//         </>)

//         }
            
            
//         </>
//     )

}


export default RankingBar;