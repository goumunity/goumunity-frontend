const FEED_CATEGORY_OPTIONS = [
  { id: 1, name: 'INFO' },
  { id: 2, name: 'FUN' },
];

function CategoryBox({ feedCategory, setFeedCategory }) {
  const activeClass = 'underline underline-offset-4 pointer-events-none';

  const handleClickToggleCategory = () => {
    if (feedCategory === FEED_CATEGORY_OPTIONS[0].name) {
      setFeedCategory(FEED_CATEGORY_OPTIONS[1].name);
    } else {
      setFeedCategory(FEED_CATEGORY_OPTIONS[0].name);
    }
  };
  console.log('gdgdgd', feedCategory)
  return (
    <div className='flex items-center'>
      <button
        className={`text-center w-1/2 border border-gray font-dove ${
          feedCategory === FEED_CATEGORY_OPTIONS[0].name ? activeClass : ''
        }`}
        onClick={handleClickToggleCategory}
      >
        정보글
      </button>
      <button
        className={`text-center w-1/2 border border-gray font-dove ${
          feedCategory === FEED_CATEGORY_OPTIONS[1].name ? activeClass : '' 
        }`}
        onClick={handleClickToggleCategory}
      >
        뻘글
      </button>
    </div>
  );
}

export default CategoryBox;