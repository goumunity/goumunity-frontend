import React from 'react';

function HashtagMore() {
  const [val, setVal] = useState('');
  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      changeArr(val);
      emptyInput();
    }
  };

  const [index, setIndex] = useState(0);

  const emptyInput = () => {
    setVal('');
  };

  const handleOnChange = (e) => {
    setVal(e.target.value);
  };
  const IncreaseIndex = () => {
    setIndex(index + 1);
  };

  //------------------------------------------------------------------

  const [arr, setArr] = useState([]);

  const changeArr = (nextTag) => {
    const nextValue = {
      idx: index,
      value: nextTag,
    };
    IncreaseIndex();
    const nextArr = arr.concat(nextValue);
    setArr(nextArr);
  };

  const onRemove = (target) => {
    const nextArr = arr.filter((elem) => elem.idx !== target.idx);
    setArr(nextArr);
  };

  const tagArr = arr.map((elem) => (
    <div
      key={elem.idx}
      className='p-1 border-2 m-1 text-2xl'
      onDoubleClick={() => onRemove(elem)}
    >
      {elem.value}
    </div>
  ));


  return (
    <>
      <div className='flex flex-row border-2'>
        {tagArr}
        <input
          onChange={handleOnChange}
          onKeyDown={handleOnKeyPress}
          placeholder='value 입력'
          value={val}
        />
      </div>{' '}
    </>
  );
}

export default HashtagMore;
