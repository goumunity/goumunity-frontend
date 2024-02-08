const OPTIONS = [
  { id: 1, name: '광진구' },
  { id: 2, name: '중랑구' },
  { id: 3, name: '동작구' },
  { id: 4, name: '동대문구' },
];

function SelectBox({ widthSize, color, defaultValue, ...props }) {
  console.log('defaulValue의 값:',defaultValue)
  return (
    <select
      className={` px-2 py-1 bg-${color} rounded-md border-solid border-2 border-black font-daeam text-lg w-${widthSize}`}
      name=''
      id=''
      {...props}
    >
      <option value='none'>지역을 선택해주세요.</option>
      {OPTIONS.map((option) => {
        return (
          <option key={option.id} value={option.id} selected={defaultValue === option.name}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
}

export default SelectBox;
