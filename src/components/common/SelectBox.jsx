import { useEffect, useState } from 'react';
import instance from '@/utils/instance'
import Swal from 'sweetalert2';

function SelectBox({ widthSize, color, defaultValue, title='지역을 선택해주세요', ...props }) {
  const [regionList, setRegionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await instance.get('/api/regions');
        setRegionList(res.data)
      } catch (error) {
        Swal.fire("잠시 후 다시 시도해주세요.");
      }
      setIsLoading(false)
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <>Loading..</>
  }


  return (
    <select
      className={`px-2 py-1 bg-${color} rounded-md border-solid border-2 border-black font-daeam text-lg w-${widthSize}`}
      // defaultValue={defaultValue}
      {...props}
    >
      <option value='none'>{title}</option>
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
