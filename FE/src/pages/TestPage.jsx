import { useState,useEffect } from "react";
import Modal from "../components/common/Modal/Modal";
import { Map } from "react-kakao-maps-sdk";
const TestPage = () => {
    const { kakao } = window;

 useEffect(() => {
    //지도를 담을 영역의 DOM 레퍼런스
    const container = document.getElementById("map");
    //지도를 생성할 때 필요한 기본 옵션
    const options = {
      center: new kakao.maps.LatLng(37.29432708770308, 126.99658273529194), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    //지도 생성 및 객체 리턴
    const map = new kakao.maps.Map(container, options);

//    ---------------------------------------------------------- 하단은 마커
   
    // 마커가 표시될 위치입니다
    var markerPosition = new kakao.maps.LatLng(
      37.29432708770308,
      126.99658273529194
    );

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  }, []);

  return (
    <>
        <div id ="map" style={{width:'500px', height:'400px'}}></div>
    </>
  )
    // const [val, setVal] = useState('');
    // const handleOnKeyPress = (e) => {
        
    //     if( e.key === 'Enter'){
    //         console.log( val );
    //         changeArr(e.target.value);
    //     }
    // }   

    // const handleOnChange = (e) => {
    //     setVal( e.target.value );

    // }

    // //------------------------------------------------------------------

    // const [ arr, setArr ] = useState([]);
    // const changeArr = (nextTag) => {
    //     const nextArr = arr.concat(nextTag);
    //     setArr( nextArr );
    //     setVal('');
    // }
    // const onRemove = ( tag ) => {
    //     const nextArr = arr.filter( elem => elem !== tag );
    //     setArr( nextArr );
    // }
    // const tagArr = arr.map( elem => <div className="p-1 border-2 m-1 text-2xl" onDoubleClick={ () => onRemove(elem) }>{elem}</div>);

    

    // return (
    //     <>
    //     <div className="flex flex-row border-2">
    //         {tagArr}
    //         <input onChange={handleOnChange} onKeyDown={handleOnKeyPress} placeholder="value 입력"/>
    //     </div>
    //     </>
    // )
}

export default TestPage;