
/*


비밀번호

닉네임

한달 예산

나이

유저 카테고리( 관심 )



--

지역



*/
import Input from "../common/Input";
import Button2to1 from "../../components/common/Button2to1";
const ProfileDetailUnderPrivate = () => {
    return (
        <>
        <div className=" w-1/2 p-1 mb-3 h-2/3">
            <div className="w-full ms-4">
                <label for="customInput" className="block text-sm font-medium text-gray-600">비밀번호</label>
                    <div className="flex flex-row">
                        <input
                            type="text"
                            id="customInput"
                            name="customInput"
                            className="me-1 mt-1 p-2 block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring w-5/6 focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300"
                            placeholder="비밀번호를 입력해주세요."
                        />
                        <button
                    className="border border-gray-300 rounded-md hover:bg-bg hover:text-white p-2 "
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
                            name="customInput"
                            className="w-5/6 me-3 mt-1 p-2 block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300"
                            placeholder="닉네임을 입력해주세요."
                        />
                </div>
            </div>
            <div className="w-full ms-4">

                <label for="customInput" className="block text-sm font-medium text-gray-600">나이</label>
                    <div className="flex flex-row w-full">
                        <input
                                    type="text"
                                    id="customInput"
                                    name="customInput"
                                    className="w-5/6 me-3 mt-1 p-2 block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300"
                                    placeholder="나이를 입력해주세요."
                                />
                </div>
                            

            </div>
            <div className="w-full ms-4">

                <label for="customInput" className="block text-sm font-medium text-gray-600">한달 예산</label>
                    <div className="flex flex-row w-full">
                        <input
                                    type="text"
                                    id="customInput"
                                    name="customInput"
                                    className="w-5/6 me-3 mt-1 p-2 block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300"
                                    placeholder="한달 예산를 입력해주세요."
                                />
                </div>
                            

            </div>
            <div className="w-full ms-4">

                <label for="customInput" className="block text-sm font-medium text-gray-600">관심 카테고리</label>
                    <div className="flex flex-row w-full">
                        <select
                                    id="customInput"
                                    name="customInput"
                                    className="w-5/6 me-3 mt-1 p-2 block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300"
                                    placeholder="수정할 한 달 예산을 입력해주세요."
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
        </>
    )
}


export default ProfileDetailUnderPrivate;