import useInput from '../../../hooks/useInput';
import Button from '../../common/Button';

function CreateCommentBox() {
  const [input, handleChangeInput] = useInput('');

  return (
    <form className='w-full flex justify-between items-center px-1'>
      <input
        onChange={handleChangeInput}
        value={input}
        className='p-2 bg-bright focus:outline-none text-lg placeholder:font-her'
        type='text'
        placeholder='댓글 좀 달아줘...'
      />
      <Button text='게시' />
    </form>
  );
}

export default CreateCommentBox;
