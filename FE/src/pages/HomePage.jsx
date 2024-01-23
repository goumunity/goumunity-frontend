import React, { useEffect, useState } from 'react';
import Post from '../components/homePage/Post';
import axios from 'axios';

const SERVER_URL = 'fake/post/';

function HomePage() {

  const [posts, setPosts] = useState([]);

  useEffect(function requestPost() {
    const fetchData = async () => {
      try {
        const res = await axios.get(SERVER_URL);
        console.log('api 요청 결과 : ', res.data);
        setPosts(res.data);
      } catch (error) {
        console.error('api 요청 중 오류 발생 : ', error);
      }
    };
  
    fetchData();
  }, []); // 빈 배열을 의존성 배열로 추가
  
  useEffect(() => {
    console.log('posts 세팅 결과 : ', posts);
  }, [posts]); //


  return (
    <div className='px-8 flex flex-col items-center'>
      <Post posts={posts} />
      <Post posts={posts} />
    </div>
  );
}

export default HomePage;
