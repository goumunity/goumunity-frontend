const FEED_CATEGORY_OPTIONS = [
  { id: 1, name: 'INFO' },
  { id: 2, name: 'FUN' },
];

function CategoryBox({ isInfo, setIsInfo, setFeedCategory }) {
  const activeClass = 'underline underline-offset-4 pointer-events-none';

  const handleClickToggleIsInfo = () => {
    setIsInfo(!isInfo);
    if (isInfo) {
      setFeedCategory(FEED_CATEGORY_OPTIONS[0].name);
    } else {
      setFeedCategory(FEED_CATEGORY_OPTIONS[1].name);
    }
  };

  return (
    <div className='flex items-center'>
      <button
        className={`text-center w-1/2 border border-gray font-dove ${
          isInfo ? activeClass : ''
        }`}
        onClick={handleClickToggleIsInfo}
      >
        정보글
      </button>
      <button
        className={`text-center w-1/2 border border-gray font-dove ${
          isInfo ? '' : activeClass
        }`}
        onClick={handleClickToggleIsInfo}
      >
        뻘글
      </button>
    </div>
  );
}

export default CategoryBox;
