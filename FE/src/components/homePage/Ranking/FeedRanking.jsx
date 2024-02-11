import { useEffect, useRef, useState } from "react";
import instance from "../../../utils/instance";
import { useNavigate } from "react-router-dom";

const FeedRanking = ({ranks}) => {
    const [rankList, setRankList ] = useState([]);
    const [context, setContext ] = useState(0);
    const navigate = useNavigate();
    const Power3 = [<i className="fa-solid fa-crown"></i>, <i className="fa-solid fa-2"></i>,<i className="fa-solid fa-3"></i>];
    const [liList,setLilist] = useState([]);
    const GetRankValue = ( index ) => {
        if( index < 3 ){
            return Power3[ index ];
        }

        return index + 1;
    }

    

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    useEffect( () => {
        setContext(0);

    },[]);

    // useEffect(()=>{
    //     if( index === 3 ){
    //         setSelectedButton( context );
    //         return
    //     }
    //     getRanks( index );
    // },[index])
    
    useEffect( () => {
    
        const nextLiList = rankList.slice(0,3).map( el => <tr key={el.feedId}>
            <div className="group block font-dove max-w-xs mx-auto cursor-pointer rounded-lg p-6 bg-yellow ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-gray-300 hover:ring-gray-400">
                <div className="flex items-center space-x-3">
                    { el.category === 'INFO' && <i className="fa-solid fa-circle-info group-hover:text-white"></i> }
                    { el.category === 'FUN' && <i className="fa-solid fa-face-laugh-beam"></i>  }
                    <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold" style={dynamicFontSizeStyle}>스크랩 수: {el.scrapCount}</h3>
                </div>
                <div className="text-gray-600 group-hover:text-white overflow-hidden h-8 w-full" style={dynamicFontSizeStyle}>{el.content}</div>
            </div>
        </tr>)
        setLilist(nextLiList)
    },[windowWidth])
    const OptionBox = ['DAY','WEEK','MONTH'];

    const getRanks = async ( index ) => {
        const res = await instance.get(`/api/feeds/ranking/scrap?time-key=${OptionBox[index]}`);
        const nextRankList = [

            ...res.data

        ]
        // console.log('axios!!:', nextRankList );
        setRankList( res.data );
        
        const nextLiList = nextRankList.slice(0,3).map( el => <tr key={el.feedId}>
            <div className="group block font-dove max-w-xs mx-auto cursor-pointer rounded-lg p-6 bg-yellow ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-gray-300 hover:ring-gray-400">
                <div className="flex items-center space-x-3">
                    { el.category === 'INFO' && <i className="fa-solid fa-circle-info group-hover:text-white"></i> }
                    { el.category === 'FUN' && <i className="fa-solid fa-face-laugh-beam"></i>  }
                    <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold" style={dynamicFontSizeStyle}>스크랩 수: {el.scrapCount}</h3>
                </div>
                <div className="text-gray-600 group-hover:text-white overflow-hidden h-8 w-full" style={dynamicFontSizeStyle}>{el.content}</div>
            </div>
    
        </tr>)
        // setLilist([]);
        setLilist( nextLiList );
      
        // setIndex( index + 1 );
    }



  const calculateFontSize = () => {

    const baseFontSize = 7; 
    const maxWidth = 768;
    // 폰트 크기를 계산
    const ratio = windowWidth / maxWidth; 
    const newSize = Math.max(baseFontSize * ratio, 1); 

    return newSize;
  }
  
  
  const handleContext = ( num ) => {
    setContext( num );
  }

  useEffect( () => {
    getRanks( context );
  },[context])

  const dynamicFontSizeStyle = {
    fontSize: `${calculateFontSize()}px`,
  };
  const start = useRef( null );
  useEffect(()=>{
    start.current.focus();
  },[])

    return(
        <>
            <div className="rank font-daeam flex flex-col items-center h-fit rankbar ms-1 overflow-x-auto"> 

                <div className="mt-8" style={dynamicFontSizeStyle}> <i className="fa-solid fa-share-from-square"></i>인기 스크랩</div> 

                <table className="m-5 mb-28 table-fixed w-80 h-10 text-center bg-yellow">
                    <thead className="h-10 font-dove flex border-2 rounded-lg">
                        <th className="w-1/3">
                            <button ref={start} className="w-full h-full focus:outline-none focus:bg-bg focus:text-gray-600" onClick={() => handleContext(0)} >
                                일간
                            </button>
                        </th>
                        <th className="w-1/3">
                            <button className="w-full h-full focus:outline-none focus:bg-bg focus:text-gray-600" onClick={() => handleContext(1)}>
                                주간
                            </button>
                        </th>
                        <th className="w-1/3">
                        <button className="w-full h-full focus:outline-none focus:bg-bg focus:text-gray-600" onClick={() => handleContext(2)}>
                            월간
                        </button>
                        </th>
                        
                    </thead>
                    <tbody id="rankList">
                        
                        
                        {liList}

                        
                    </tbody>


                </table>
            </div>

        </>
    )

}

export default FeedRanking;