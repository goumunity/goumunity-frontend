import { useState, useEffect } from 'react';
const TestPage = () => {
  const [val, setVal] = useState('');
  const handleOnKeyPress = (e) => {
    console.log(e);
    if (e.key === 'Enter') {
      console.log(val);
      changeArr(val);
      emptyInput();
      console.log(val);
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
    console.log('nextTag: ' + nextTag);
    const nextValue = {
      idx: index,
      value: nextTag,
    };
    IncreaseIndex();
    const nextArr = arr.concat(nextValue);
    console.log(nextArr);
    setArr(nextArr);
    console.log('now: ' + arr);
  };

  const onRemove = (target) => {
    console.log(target);
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
  // --------------------------------------------------------------------

  // const [count, setCount] = useState(1);
  // const [name, setName] = useState('');

  // const handlerCountUpdate = () => {
  //   setCount(count + 1);
  // };

  // useEffect(() => {
  //   console.log('렌더링 완료');
  // });

  // const handleInputChange = (e) => {
  //   setName(e.target.value);
  //   console.log(e);
  //   console.log(e.target);
  //   console.log(e.target.value);
  //   console.log(e._reactName);
  // };

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
      {/* <>
        <div>
          <button onClick={handlerCountUpdate}>Update</button>
          <span> count: {count} </span>
        </div>

        <div>
          <input
            type='text'
            value={`초깃값 설정 ${name}`}
            onChange={handleInputChange}
          />
          <span>name: {name}</span>
        </div>
      </> */}
    </>
  );
};

export default TestPage;
