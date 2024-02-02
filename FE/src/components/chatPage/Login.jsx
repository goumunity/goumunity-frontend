import { useState } from 'react';
import axios from 'axios';

export default function Login({ isLoggedIn, setUserId, setChatRooms }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onLoginButtonClicked = () => {
    axios
      .post(
        'http://localhost:8080/api/users/login',
        {
          id,
          password,
        },
        { withCredentials: true }
      )
      .then(() => {
        isLoggedIn(true);
        setUserId(id);
        axios
          .get(
            `http://localhost:8080/api/users/my/chat-rooms?page=0&size=12&time=${new Date().getTime()}`,
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res.data);
            setChatRooms(res.data);
          });
      });
    alert(`아이디 : ${id} 비번 : ${password}`);
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