import React from 'react';

function SelectBox({ ...props }) {
  const OPTIONS = [{ name: '광진구' }, { name: '중랑구' }, { name: '동작구' }];

  return (
    <select className=' px-2 py-1 bg-yellow rounded-md border-solid border-2 font-daeam text-lg' name='' id='' {...props}>
      {OPTIONS.map((option) => {
        return (
          <option key={option.name} value={option.name} defaultValue={OPTIONS[0].name}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
}

export default SelectBox;
