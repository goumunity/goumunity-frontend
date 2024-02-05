const OPTIONS = [
  { id: 1, name: '광진구' },
  { id: 2, name: '중랑구' },
  { id: 3, name: '동작구' },
];

function SelectBox({ widthSize, color, ...props }) {
  return (
    <select
      className={` px-2 py-1 bg-${color} rounded-md border-solid border-2 font-daeam text-lg w-${widthSize}`}
      name=''
      id=''
      {...props}
    >
      <option value='none'>지역</option>
      {OPTIONS.map((option) => {
        return (
          <option key={option.id} value={option.id} defaultValue='구'>
            {option.name}
          </option>
        );
      })}
    </select>
  );
}

export default SelectBox;
