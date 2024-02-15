import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import login, { loginActions } from '../../store/login';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onLoginButtonClicked = () => {
    axios
      .post(
        '/temp/api/users/login',
        // '/api/users/login',
        {
          id,
          password,
        },
        { withCredentials: true }
      )
      .then(() => {
        // isLoggedIn(true);
        dispatch(loginActions.isLoggedIn(true));
        // setUserId(id);
        dispatch(loginActions.setUserId(id));
        axios
          .get(
            `/temp/api/users/my/chat-rooms?page=0&size=12&time=${new Date().getTime()}`,
            { withCredentials: true }
          )
          .then((res) => {
            // setChatRooms(res.data);
            dispatch(loginActions.setChatRooms(res.data));
          });
      });
    alert(`아이디 : ${id} 비번 : ${password}`);
  };

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') onLoginButtonClicked();
  };

  return (
    <>
      <div className='p-4 max-w-sm mx-auto'>
        <h1 className='text-3xl font-bold mb-4'>마 로그인 해라!</h1>
        <input
          type='text'
          placeholder='Id'
          value={id}
          onChange={(ex) => setId(ex.target.value)}
          className='w-full p-2 mb-4 border border-gray-300 rounded'
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(ex) => setPassword(ex.target.value)}
          onKeyDown={handleOnKeyPress}
          className='w-full p-2 mb-4 border border-gray-300 rounded'
        />
        <br />
        <button
          onClick={onLoginButtonClicked}
          className='w-full bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600'
        >
          로그인
        </button>
      </div>
    </>
  );
}
