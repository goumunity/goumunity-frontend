const MAX_CONTENT_LENGTH = 500;

function ContentBox({ content, handleChangeContent }) {
  return (
    <div className='flex flex-col p-2'>
      <textarea
        className='px-2 h-44 bg-bright placeholder:font-her outline-none'
        type='text'
        placeholder='문구를 입력하세요...'
        onChange={handleChangeContent}
        value={content}
        maxLength={MAX_CONTENT_LENGTH}
      />
      <span className='text-right font-her'>
        {/* {content.length}/{MAX_CONTENT_LENGTH} */}
      </span>
    </div>
  );
}

export default ContentBox;
