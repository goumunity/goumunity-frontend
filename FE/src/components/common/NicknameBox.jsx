function NicknameBox({ nickname, daysAgo, fontSize, gungu }) {
  return (
    <div className={`flex flex-row items-center gap-2 text-${fontSize}`}>
      <span className='font-daeam'>{nickname}</span>
      <span className='font-her'>{daysAgo}</span>
      <span className='font-her'>{gungu}</span>
    </div>
  );
}

export default NicknameBox;
