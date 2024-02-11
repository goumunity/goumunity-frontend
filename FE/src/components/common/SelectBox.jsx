import { useEffect, useState } from 'react';
import instance from '@/utils/instance'

function SelectBox({ widthSize, color, defaultValue, ...props }) {
  const [regionList, setRegionList] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get('/api/regions');
        setRegionList(res.data)
      } catch (error) {
        console.log('지역 받는 중 에러 발생:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <select
      className={`px-2 py-1 bg-${color} rounded-md border-solid border-2 border-black font-daeam text-lg w-${widthSize}`}
      // defaultValue={defaultValue}
      {...props}
    >
      <option value='none'>지역을 선택해주세요.</option>
      {regionList.map((region) => {
        return (
          <option key={region.regionId} value={region.regionId} selected={defaultValue === region.gungu}>
          {/* <option key={option.id} value={option.id}> */}
            {region.gungu}
          </option>
        );
      })}
    </select>
  );
}

export default SelectBox;
