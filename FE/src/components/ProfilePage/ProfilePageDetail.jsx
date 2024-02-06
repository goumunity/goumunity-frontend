import '../../pages/ProfileScroll.css'
import ProfileImage from "../common/ProfileImage";
import Button2to1 from "../../components/common/Button2to1";
import MinimumFeed from "./MinimumFeed";

function ProfilePageDetail() {
  return (
    <div className="font-dove" id="body">
      
       <div className='grid flex flex-col h-full p-10'>
       <div className="justify-self-start font-daeam">
          <div className="text-2xl">나의 정보</div>
        </div>
        <hr className="border-1 border-gray-200"></hr>
       <div className="justify-self-center w-full flex flex-row ms-20 p-20">
            <div className="w-1/5">
              <div className="ms-16 me-16 w-32">
              <ProfileImage size="32"></ProfileImage>
              </div>
              
            </div>
            <div className="w-2/5 flex flex-col text-xl ms-16">
              <div className="text-3xl">이름</div>
              <div>지역</div>
              <div>닉네임</div>
            </div>

            <div className="w-1/5">
              <Button2to1 text="수정" size="8"></Button2to1>
            </div>
       </div>
      
      <div id="ProfileBaseUnder" className="border-2 border-bg-600 flex flex-row h-1/6">
        <div className=" w-1/2 p-1">
          <ul className="scroll border-2 border-bg-600 w-full flex flex-col p-3 overflow-x-hidden overflow-y-scroll h-full">
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>
            <li><MinimumFeed size="full"/></li>


          </ul>
        </div>
        <div className=" w-1/2 p-1">
          <div id="savebody" className="w-full h-full">
            <div className="overflow-x-hidden overflow-y-hidden">
            <div className=" p-5 bg-bg border-2 border-indigo-100 rounded-lg">
                
                <div className="text-2xl">
                절약 내역
                </div>
              
            </div>
          </div>
          <ul className="scroll border-2 rounded-lg mt-2 text-right border-bg-600 w-full flex flex-col p-3 overflow-y-scroll h-2/3">
            
            <li className="flex justify-between rounded-lg">
              <div className="ps-4">팥빙수</div>
              <div className="pe-4">11000원</div>
            </li>
            <hr/>
            <li className="flex justify-between rounded-lg">
              <div className="ps-4">팥빙수</div>
              <div className="pe-4">11000원</div>
            </li>
            <hr/>
            <li className="flex justify-between rounded-lg">
              <div className="ps-4">팥빙수</div>
              <div className="pe-4">11000원</div>
            </li>
            <hr/>
            <li className="flex justify-between rounded-lg">
              <div className="ps-4">팥빙수</div>
              <div className="pe-4">11000원</div>
            </li>
            <hr/>
            <li className="flex justify-between rounded-lg">
              <div className="ps-4">팥빙수</div>
              <div className="pe-4">11000원</div>
            </li>
            <hr/>
            <li className="flex justify-between rounded-lg">
              <div className="ps-4">팥빙수</div>
              <div className="pe-4">11000원</div>
            </li>
            <hr/>
            <li className="flex justify-between rounded-lg">
              <div className="ps-4">팥빙수</div>
              <div className="pe-4">11000원</div>
            </li>
            <hr/>
            <li className="flex justify-between rounded-lg">
              <div className="ps-4">팥빙수</div>
              <div className="pe-4">11000원</div>
            </li>
            <hr/>
            <li className="flex justify-between rounded-lg">
              <div className="ps-4">팥빙수</div>
              <div className="pe-4">11000원</div>
            </li>
            <hr/>
            <li className="flex justify-between rounded-lg">
              <div className="ps-4">팥빙수</div>
              <div className="pe-4">11000원</div>
            </li>
            <hr/>
            <li className="flex justify-between rounded-lg">
              <div className="ps-4">팥빙수</div>
              <div className="pe-4">11000원</div>
            </li>
            <hr/>
            <li className="flex justify-between rounded-lg">
              <div className="ps-4">팥빙수</div>
              <div className="pe-4">11000원</div>
            </li>
            <hr/>
            <li className="flex justify-between rounded-lg">
              <div className="ps-4">팥빙수</div>
              <div className="pe-4">11000원</div>
            </li>
            <hr/>
            <li className="flex justify-between rounded-lg">
              <div className="ps-4">팥빙수</div>
              <div className="pe-4">11000원</div>
            </li>
            <hr/>
            <li className="flex justify-between rounded-lg">
              <div className="ps-4">팥빙수</div>
              <div className="pe-4">11000원</div>
            </li>
            <hr/>
            <li className="flex justify-between rounded-lg">
              <div className="ps-4">팥빙수</div>
              <div className="pe-4">11000원</div>
            </li>
            <hr/>
            <li className="flex justify-between rounded-lg">
              <div className="ps-4">팥빙수</div>
              <div className="pe-4">11000원</div>
            </li>
            <hr/>
            <li className="flex justify-between rounded-lg">
              <div className="ps-4">팥빙수</div>
              <div className="pe-4">11000원</div>
            </li>
            <hr/>
            <li className="flex justify-between rounded-lg">
              <div className="ps-4">팥빙수</div>
              <div className="pe-4">11000원</div>
            </li>
            <hr/>
            <li className="flex justify-between rounded-lg">
              <div className="ps-4">팥빙수</div>
              <div className="pe-4">11000원</div>
            </li>
            <hr/>
          </ul>
          <div className=" p-5 border-2 mt-2 rounded-lg">
                
                <div className="flex flex-row justify-between text-2xl">
                  <div> 합계: </div>
                  <div> A원 </div>
                </div>
              
            </div>
        </div>
        
      </div>
        

      </div>
    </div>
  </div>
  )
}

export default ProfilePageDetail