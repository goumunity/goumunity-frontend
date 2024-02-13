import { validatePassword } from '../../utils/validation';
import { useEffect, useState } from "react";
import axios from "axios";
import Button2to1 from '../common/Button2to1';
import instance from "@/utils/instance.js";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom/dist';

const ProfileDetailUnder = ( {info} ) => {
    const regionMapper = [ '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중랑구',];
    const [ userInfo, setUserInfo ] = useState({});
    const [gunguList,setGunguList] = useState([]);
    const [filtered, setFiltered ] = useState([]);
    const [filterStatus, setFilterStatus ] = useState(false);
    const [searchText, setSearchText ] = useState('');
    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();
    useEffect( () => {
        setUserInfo( info );

        setOriginPassWord( info.password );
        
    }, [])
    const navigate = useNavigate();
    // const {kakao} = window;
    useEffect( () => {
        
        instance.get('/api/regions').then( (res) => {
            const val = res.data.map( el => {
                
                return <li key = {el.regionId} id={el.regionId} text={el.gungu}>
                <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <input id="checkbox-item-11" name='regionId' type="radio" value ={el.regionId} text={el.gungu} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 /dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={ onChecked }/>
                  <label for="checkbox-item-11" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{el.gungu}</label>
                </div>
              </li>
            })
        setGunguList( val );
        })
    },[])

    const onChecked = ( e ) => {
        if( e.target.checked ){
            const nextUserInfo = {
                ...currentUser,
                [e.target.name]: e.target.value,
                'gungu': regionMapper[e.target.value -52]
            }

            console.log( 'next : ' , nextUserInfo );
            setUserInfo( nextUserInfo );
        }
        
    }
    const [ originPassWord, setOriginPassWord ] = useState('');

    const changePassword = async () => {
        
        if(validatePassword( userInfo.password ) ){
            if( originPassWord === userInfo.password ){
                alert("기존 비밀번호와 동일합니다.");
                return;
            }
            if( confirm("비밀 번호를 변경하시겠습니까?")){
                const res = await instance.patch("/api/users/my/password", userInfo.password,{
                    headers: { "Content-Type":"application/json",},
                } );
                if( res.status == 200 ){
                    alert("비밀번호 변경에 성공하였습니다.");
                    setOriginPassWord( userInfo.password );
                }else{
                    alert("잠시 후 다시 시도해주세요.");
                }
            }

        }else{
            alert("비밀번호 8~20자, 소문자 1개, 대문자 1개, 숫자 1개, 특수문자 1개 이상 포함되어야 합니다.");
        }
    }


    const onChange = e => {
        const nextUserInfo = {
            ...userInfo,
            [e.target.name]: e.target.value
        }
        
        setUserInfo( nextUserInfo )
    }


    const putInfo = () => {
        Swal.fire({
            text: "세부 정보들을 변경하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#faedcd",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if( result.isConfirmed ){
                
                instance.patch('/api/users/my', userInfo ).then( res => {
                    console.log('result: ', userInfo )
                    dispatch( authActions.updateCurrentUser(userInfo))
                    Swal.fire({
                        icon: "success",
                        title: "성공적으로 변경되었습니다.",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    
                navigate('/myprofile')
                }).catch( err => {
                    Swal.fire({

                        icon: "error",
                        title: "변경에 실패하였습니다",
                        showConfirmButton: false,
                        timer: 1500
                      });
                })
            }
        })

        
    }

    const SearchRegion = () => {
        const nextFilter = gunguList.filter( el => { 

            return el.props.text.includes( searchText ) } );
        console.log('next', nextFilter );
        setFiltered( nextFilter );
    }


    const toggleFilterStatus = () => {
        setFiltered([]);
        setSearchText('');
    }

    const onSearchTextChange = ( e ) => {
        setSearchText( e.target.value );
    }



    return ( 
        <>
        <div className=" w-1/2 p-1 mb-3">
            <div className="w-full ms-4">
                <label for="customInput" className="block text-sm font-medium text-gray-600">비밀번호</label>
                    <div className="flex flex-row">
                        <input
                            type="password"
                            id="customInput"
                            name="password"
                            className="me-1 mt-1 p-2 block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring w-5/6 focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300"
                            placeholder="비밀번호를 입력해주세요."
                            value={ userInfo.password }
                            onChange={ onChange }
                        />
                        <button
                            className="border border-gray-300 rounded-md hover:bg-bg hover:text-white p-2 "
                            onClick={ changePassword }
                        >
                    변경
                    </button>
                </div>
            </div>

         
            <div className="w-full ms-4">

                <label for="customInput" className="block text-sm font-medium text-gray-600">닉네임</label>
                    <div className="flex flex-row w-full">
                        { info.isAuthenticated && <input
                            type="text"
                            id="customInput"
                            name="nickname"
                            className="w-5/6 me-3 mt-1 p-2 block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300"
                            placeholder="닉네임을 입력해주세요."
                            onChange={ onChange }
                            value={userInfo.nickname}
                        />}
                        {
                            !info.isAuthenticated && <input
                            type="text"
                            id="customInput"
                            name="nickname"
                            className="w-5/6 me-3 mt-1 p-2 block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300"
                            placeholder="닉네임을 입력해주세요."
                            onChange={ onChange }
                            value="인증 회원만 닉네임 변경이 가능합니다."
                            disabled
                        />
                        }
                </div>
            </div>
            <div className="w-full ms-4">

                <label for="customInput" className="block text-sm font-medium text-gray-600">나이</label>
                    <div className="flex flex-row w-full">
                        <input
                                    type="number"
                                    id="customInput"
                                    name="age"
                                    className="w-5/6 me-3 mt-1 p-2 block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300"
                                    placeholder="나이를 입력해주세요."
                                    value={userInfo.age}
                                    onChange={ onChange }
                                />
                </div>
                            

            </div>
            <div className="w-full ms-4">

                <label for="customInput" className="block text-sm font-medium text-gray-600">한달 예산</label>
                    <div className="flex flex-row w-full">
                        <input
                                    type="number"
                                    id="customInput"
                                    name="monthBudget"
                                    className="w-5/6 me-3 mt-1 p-2 block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300"
                                    placeholder="한달 예산를 입력해주세요."
                                    value={userInfo.monthBudget}
                                    onChange={ onChange }
                                />
                </div>
                            

            </div>
            <div className="w-full ms-4">

                <label for="customInput" className="block text-sm font-medium text-gray-600">관심 카테고리</label>
                    <div className="flex flex-row w-full">
                        <select
                                    id="customInput"
                                    name="userCategory"
                                    className="w-5/6 me-3 mt-1 p-2 block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300"
                                    placeholder="수정할 한 달 예산을 입력해주세요."
                                    value={userInfo.userCategory}
                                    onChange={ onChange }
                                >

                                    <option value="JOB_SEEKER">취업 준비생</option>
                                    <option value="COLLEGE_STUDENT">대학생</option>
                                    <option value="EMPLOYEE">회사원</option>
                                    <option value="NEWCOMER_TO_SOCIETY">사회 초년생</option>
                                </select>
                </div>
                            

            </div>

            
            <div className="w-full ms-4 mt-4">

                <button className="w-5/6 me-3 mt-1 p-2 bg-button block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300 hover:bg-orange-200 hover:text-gray-600 text-white" onClick={putInfo}> 수정 </button>
                            

            </div>
        
        </div>
        
        <div className="w-3/5 ms-2 roudned-md">
        <div id="dropdownSearch" className="z-10 bg-white rounded-lg shadow w-full h-96 dark:bg-gray-700">
    <div className="p-3">
      <label for="input-group-search" className="sr-only">Search</label>
      <div className="relative flex flex-row">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 cursor-pointer" onClick={ SearchRegion }>
          <svg className="w-4 h-4 text-gray-500 /dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        </div>
        <input type="text" id="input-group-search" className="me-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 /focus:border-blue-500 /block w-full ps-10 p-2.5  dark:bg-gray-600 dark:border-gray-500 /dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 /dark:focus:border-blue-500" placeholder="지역을 검색하세요."  value={searchText} onChange={onSearchTextChange}/>
        <Button2to1 text="취소" size="5" onClick={toggleFilterStatus}/>
      </div>
    </div>
    <ul className="scroll h-3/4 px-3 pb-3 overflow-y-scroll text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
      { filtered.length !== 0 ? <>{filtered}</> : <>{gunguList}</>}
      
 
    </ul>
    </div>
        
        </div>
        </>

    )
}

export default ProfileDetailUnder;
