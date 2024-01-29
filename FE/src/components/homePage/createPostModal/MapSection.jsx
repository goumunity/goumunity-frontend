function MapSection({ isSlide }) {
  const categorySectionClassName = isSlide
    ? 'opacity-100 w-96'
    : 'opacity-0 w-0';

  return (
    <div
      className={`bg-bg transition-width delay-700 duration-300  ${categorySectionClassName} `}
    >
      gdgd
    </div>
  );
}

export default MapSection;
