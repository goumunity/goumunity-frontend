import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './GoumunityRanking.css'
import instance from '../../../utils/instance.js'
<<<<<<< HEAD
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
=======
import rankBarBackGround from '../../../assets/svgs/rankBarBackGroundyellow.svg'
const RankingBar = ( ranks ) => {
    const[ rankList, setRankList ] = useState([]);
    const navigate = useNavigate();
    const Power3 = [<i className="fa-solid fa-crown"></i>, <i className="fa-solid fa-2"></i>,<i className="fa-solid fa-3"></i>];
    const GetRankValue = ( index ) => {
        if( index < 3 ){
            return Power3[ index ];
        }

        return index + 1;
    }

    

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const moveToProfile = ( email ) => {
        navigate(`/profile/${email}`);
    }
    useEffect(() => {
        function handleResize() {
        setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        
        const nextRankList = ranks.ranks.slice(0,5).map( (el, index ) =>       
            <tr key={index} className="hover:bg-gray-100 hover:text-gray-600 h-10 cursor-pointer" onClick={() => moveToProfile(el.email)}>
                <td className='w-12' style={dynamicFontSizeStyle}>{ GetRankValue( index ) }</td>
                <td className='w-48' style={dynamicFontSizeStyle}>
                    <div className='w-full overflow-hidden h-6'>
                    {el.nickname}
                    </div>
                    
                    </td>
                <td className='w-20' style={dynamicFontSizeStyle}>{el.likedSum}</td>
            </tr> )
        setRankList( nextRankList );
    },[windowWidth])


  function calculateFontSize() {

    const baseFontSize = 7; 
    const maxWidth = 768;
    // 폰트 크기를 계산
    const ratio = windowWidth / maxWidth; 
    const newSize = Math.max(baseFontSize * ratio, 1); 

    return newSize;
  }


  const dynamicFontSizeStyle = {
    fontSize: `${calculateFontSize()}px`,
  };

    return(
        <>
            <div className="font-daeam flex flex-col items-center rankbar ms-1 overflow-x-auto"> 

                <div className="m-5" style={dynamicFontSizeStyle}> <i className="fa-solid fa-ranking-star me-2"></i>거지 탈출 </div> 
                
                <table className="m-5 table-fixed w-80 h-10 text-center bg-yellow">
                    <thead className="w-80 h-10 font-dove flex border-2 rounded-lg flex justify-center items-center bg-bg ">
                        <th className='ps-3 w-12 text-gray-600' style={dynamicFontSizeStyle}>순위</th>
                        <th className='w-48 text-gray-600' style={dynamicFontSizeStyle}>닉네임</th>
                        <th className='w-20 pe-3 text-gray-600'>좋아요</th>
                    </thead>

                    <tbody id="rankList" className='rounded-lg p-6 ring-1 ring-slate-900/5 shadow-lg space-y-3'>

                        

                        {rankList}

                        
                    </tbody>


                </table>
            </div>


        </>
    )
>>>>>>> d18c277f

}


export default RankingBar;