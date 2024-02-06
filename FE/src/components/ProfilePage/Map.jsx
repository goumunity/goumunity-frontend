import React, { useEffect,useState } from 'react';

// import { KakaoMap, Marker } from 'react-kakao-maps';

function Map( { width, height, func }) {
  const { kakao } = window;
  const [ address, setAddress ] = useState('');
  let map;
    const onAddressChange = ( e ) => {
        
        setAddress( e.target.value );
        
    }

  const Search = () => {

    console.log( address );
    // 장소 검색 객체 생성
    const geocoder = new kakao.maps.services.Geocoder();

      // 서울시를 기준으로 검색하도록 설정 (충분히 큰 범위)
      const defaultBounds = new kakao.maps.LatLngBounds(
        new kakao.maps.LatLng(37.433469, 126.451792),  // 남서쪽 좌표
        new kakao.maps.LatLng(37.701367, 127.183742)   // 북동쪽 좌표
      );

      // 구 이름으로 주소 검색
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {

          if (result.length > 0) {
            const x = result[0].x;
            const y = result[0].y;
            const latlng = new kakao.maps.LatLng( x, y );
            
            console.log(`[${address}]의 중심 지점 좌표: ${latlng.getLat()}, ${latlng.getLng()}`);
          } else {
            console.error(`[${address}]에 대한 결과가 없습니다.`);
          }
        } else {
          console.error(`지오코딩 서비스 오류: ${status}`);
        }
      }, { bounds: defaultBounds });
}

 useEffect(() => {
    //지도를 담을 영역의 DOM 레퍼런스
    const container = document.getElementById("map");
    //지도를 생성할 때 필요한 기본 옵션
    const options = {
      center: new kakao.maps.LatLng(37.29432708770308, 126.99658273529194), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    //지도 생성 및 객체 리턴
    map = new kakao.maps.Map(container, options);

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
     <div className="w-full ms-4 flex flex-row mb-4" style={{alignItems:'stretch'}}>
            
            <input
        type="text"
        id="customInput"
        name="customInput"
        className="me-1 mt-1 p-2 block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring w-5/6 focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300"
        placeholder="지역을 입력해주세요." 
        onChange={ onAddressChange }
        // style="height: 2rem; box-sizing: border-box;" 
    />
    <button
        className="mt-1 border border-gray-300 rounded-md hover:bg-bg hover:text-white p-2" onClick={ Search }
          // style="height: 2rem; box-sizing: border-box;" 
    >
        <i class="fa-solid fa-magnifying-glass"></i>
    </button>
                </div>
        <div id ="map"className={`w-${width} h-${height}`}></div>
    </>
  )
}

export default Map;