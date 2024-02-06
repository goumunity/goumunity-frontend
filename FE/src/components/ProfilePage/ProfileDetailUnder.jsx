import { validatePassword } from '../../utils/validation';
import { useEffect, useState } from "react";
import axios from "axios";
const ProfileDetailUnder = ( {info} ) => {
    const [gunguList,setGunguList] = useState([]);
    // const {kakao} = window;
    useEffect( () => {
        axios.get('/api/regions').then( (res) => {
            const val = res.data.map( el => <li key = {el.regionId} id={el.regionId} className="flex justify-between items-center py-2 border-b border-gray-300">
            <span className="text-lg">{el.gungu}</span>
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500"/>
        </li>)
        setGunguList( val );
        console.log( gunguList)
        })
    },[])


    const [ originPassWord, setOriginPassWord ] = useState('');

    const changePassword = async () => {
        
        if(validatePassword( userInfo.password ) ){
            if( originPassWord === userInfo.password ){
                alert("기존 비밀번호와 동일합니다.");
                return;
            }
            if( confirm("비밀 번호를 변경하시겠습니까?")){
                const res = await axios.patch("/api/users/my/password", userInfo.password,{
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
    const [ userInfo, setUserInfo ] = useState({});

    useEffect( () => {
        setUserInfo( info );
        setOriginPassWord( info.password );
    }, [])

    const onChange = e => {
        const nextUserInfo = {
            ...userInfo,
            [e.target.name]: e.target.value
        }
        setUserInfo( nextUserInfo )
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
                        <input
                            type="text"
                            id="customInput"
                            name="nickname"
                            className="w-5/6 me-3 mt-1 p-2 block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300"
                            placeholder="닉네임을 입력해주세요."
                            onChange={ onChange }
                            value={userInfo.nickname}
                        />
                </div>
            </div>
            <div className="w-full ms-4">

                <label for="customInput" className="block text-sm font-medium text-gray-600">나이</label>
                    <div className="flex flex-row w-full">
                        <input
                                    type="text"
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
                                    type="text"
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

                <button className="w-5/6 me-3 mt-1 p-2 bg-bg block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300"> 수정 </button>
                            

            </div>
        
        </div>
        <div className="w-3/5 ms-2 roudned-md">
           
            {/* <Map width="100" height="96"/> */}
            <ul className="scroll list-none w-full p-5 overflow-y-scroll h-full">
                {gunguList}



            </ul>
        
        </div>
        </>

    )
}

export default ProfileDetailUnder;