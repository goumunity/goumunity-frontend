
function NicknameBox({ nickname, daysAgo, fontSize }) {
  return (
    <div className={`flex flex-row items-center gap-1 text-${fontSize}`}>
          <span className='font-daeam'>{nickname}</span>
          <span className='font-her'>{daysAgo}</span>
        </div>
  )
}

export default NicknameBox