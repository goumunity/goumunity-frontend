import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import SelectBox from '../../common/SelectBox';
import HashTag from '../../common/HashTag';
import ProfileImage from '../../common/ProfileImage';
import CloseButton from '../../common/CloseButton';
import {imageUpload} from '../../../utils/upload';
import Button from '../../common/Button';
import instance from "@/utils/instance.js";
import {modalActions} from "@/store/modal.js";
import MembersList from "@/components/chatPage/chatRoomModal/MembersList.jsx";
import Swal from "sweetalert2";
import handleError from "@/utils/error.js";
import {showErrorToast} from "@/utils/toast.js";

function ChatRoomDetailModal({myChatRooms,selectedChatRoom,setMyChatRooms, setSelectedChatRoom, setIsSearchMode}) {
    const [profileImage, setProfileImage] = useState('');
    const [resultImage, setResultImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);

    const [currentChatRoom, setCurrentChatRoom] = useState();


    const dispatch = useDispatch();

    useEffect(() => {
        setCurrentChatRoom(selectedChatRoom)
        setProfileImage(selectedChatRoom?.imgSrc);
    }, [selectedChatRoom]);

    const navigate = useNavigate();
    const [userInputs, setUesrInputs] = useState({
        title: '',
        hashtags: [],
        capability: null,
        regionId: null,
    });

    // const [isEdited, setIsEdited] = useState({
    //     title: false,
    //     hashtags: false,
    //     capability: false,
    //     regionId: false,
    // });

    // 이미지 업로드
    const handleChangeUploadProfileImg = (e) => {
        const uploadFile = imageUpload(e.target, setProfileImage);
        setResultImage(uploadFile);
        setCurrentChatRoom(prev => ({
            ...prev, imgSrc: null
        }))
    };
    const file = useSelector((state) => state.auth.file);
    //--------------------------------------------------------------

    const updatedData = {
        title: userInputs.title,
        hashtags: [],
        capability: Number(userInputs.capability),
        regionId: Number(userInputs.regionId),
    };

    //채팅룸 추가하기
    const onEditApplyButtonClicked = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (currentChatRoom?.title === '') {
            showErrorToast('방 제목을 입력해주세요');
            return;
        }
        if (currentChatRoom?.capability === '') {
            showErrorToast('방 최대 인원 수를 입력해주세요');
            return;
        }

        if (currentChatRoom?.capability <= 0) {
            showErrorToast('방 최대 인원 수를 자연수로 입력해주세요');
            return;
        }

        if (currentChatRoom?.regionId === '') {
            showErrorToast('방 지역을 선택해주세요');
            return;
        }


        //image 업로드
        const formData = new FormData();

        for (const image of resultImage || []) {
            formData.append('image', image);
        }

        const data = {
            title: currentChatRoom?.title,
            capability: currentChatRoom?.capability,
            hashtagRequests: currentChatRoom?.hashtags?.map(tag => tag.name),
            image: currentChatRoom?.imgSrc,
            leaderId: currentChatRoom?.host?.userId,
            regionId: currentChatRoom?.region?.regionId
        }

        const blob = new Blob([JSON.stringify(data)], {
            type: 'application/json',
        });

        formData.append('data', blob);
        //-------axios 연결-------
        const fetchData = async () => {
            try {
                const res = await instance.patch(`/api/chat-rooms/${selectedChatRoom?.chatRoomId}`, formData);
                // 이미지가 바뀔 수 있어서
            } catch (error) {
                if (error.response.status === 409) {
                    setErrorMessage('이미 존재하는 채팅방입니다.');
                }
                return;
            }
        };

        await fetchData();
        // 원래 값을 바꿔줘야 해

        try {
            const result = await instance.get(`/api/chat-rooms/${currentChatRoom?.chatRoomId}`);
            let index = myChatRooms.findIndex(c => c.chatRoomId === currentChatRoom?.chatRoomId);
            const newChatRooms = [...myChatRooms];
            newChatRooms[index] = result.data;
            setMyChatRooms(newChatRooms);
        } catch (e){
            handleError(e);
        }
        dispatch(modalActions.closeModal());
    };

    // 유저 입력 감지
    const handleChangeInputs = (id, value) => {
        if (id === 'capability' && isNaN(value)) {
            return;
        }
        setUesrInputs((prev) => ({
            ...prev,
            [id]: value,
        }));

        // setIsEdited((prev) => ({
        //     ...prev,
        //     [id]: false,
        // }));
    };
    // --------------------------------------------
    const [val, setVal] = useState('');
    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (val.length > 10) {
                showErrorToast('해시태그는 10글자 이하로 입력해주세요.');
                return;
            }
            if (currentChatRoom?.hashtags?.length >= 5) {
                showErrorToast('해시태그는 5개까지만 입력 가능합니다.')
                emptyInput();
                return;
            }
            changeArr(val);
            emptyInput();
        }
    };

    const [index, setIndex] = useState(0);

    const emptyInput = () => {
        setVal('');
    };

    const handleOnChange = (e) => {
        setVal(e.target.value);
    };
    const IncreaseIndex = () => {
        setIndex(index + 1);
    };

    //------------------------------------------------------------------

    // const [arr, setArr] = useState([]);

    const changeArr = (nextTag) => {
        const nextValue = {
            sequence: index,
            name: nextTag,
        };
        IncreaseIndex();
        setCurrentChatRoom(prev => ({
            ...prev,
            hashtags: [...prev?.hashtags, nextValue]
        }))
    };

    const onRemove = (target) => {
        if(!isEditMode) return;
        const nextArr = currentChatRoom?.hashtags.filter((elem) => elem.sequence !== target.sequence);
        setCurrentChatRoom(prev => ({
            ...prev,
            hashtags: nextArr
        }))
    };
    const tagArr = currentChatRoom?.hashtags.map((elem) => (
         <div
         key={elem.idx}
         className={`flex text-sm justify-center items-center w-fit bg-bg`}
         onDoubleClick={() => onRemove(elem)}
         onChange={(e) => handleChangeInputs('hashtag', e.target.value)}
       >
         <div className='h-5 overflow-hidden flex justify-center'>{`#${elem.name}`}</div>

             {isEditMode ? <CloseButton
                 // className='absolute top-5 right-5'
                 onClick={() => onRemove(elem)}
             /> : ''}

       </div>
    ));

    const onEditModeButtonClicked = () => {
        setIsEditMode(true);
    }
    const onDetailModeButtonClicked = () => {
        setIsEditMode(false)
    }

    const onExitButtonClicked = () => {
        Swal.fire({
            title: "정말 나가시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "네"
        }).then((result) => {
            if (result.isConfirmed) {
                instance.delete(`/api/chat-rooms/${currentChatRoom?.chatRoomId}`)
                    .then(() => {
                        setIsSearchMode(true);
                        setMyChatRooms(
                            myChatRooms?.filter(chatRoom =>
                                chatRoom.chatRoomId !== currentChatRoom?.chatRoomId))
                        dispatch(modalActions.closeModal());
                    }).catch(err => handleError(err));
            }
        });
    }



    //tagArr의 길이가 5 초과하는 경우, 5번째 인덱스 이후의 요소들을 제거

    if (tagArr?.length > 5) {
        tagArr.splice(5);

    }

    return (
        <>
           <div className='flex flex-col font-daeam text-xl'>
            <h1 className='text-xl'>채팅방 수정하기</h1>
            <form className='w-full h-full'>
            <div className='flex justify-start text-start'>
                <div className="w-full">
                    <label for="customInput" className="block text-sm text-gray-600 ps-1">방 제목</label>
                    <div className={`flex justify-center text-lg`}>
                        <input
                            disabled={!isEditMode}
                                    type="text"
                                    id="customInput"
                                    // name="title"
                                    className="mt-1 p-2 block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring w-full focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300"
                                    placeholder='방 제목 입력하기'
                        value={currentChatRoom?.title}

                        onChange={(e) => setCurrentChatRoom(prev => ({
                            ...prev, title: e.target.value
                        }))}
                        />



                    </div>
                </div>
            </div>
            <div className='flex justify-start text-start mt-2'>
          <div className="w-full flex-col">
            <label for="customInput" className="block text-sm font-medium text-gray-600 ps-1">해시 태그</label>
              <div className={`flex justify-center text-lg`}>
                <input

                    disabled={!isEditMode}
                            id="customInput"
                            className="mt-1 p-2 block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring w-full focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300"
                            onChange={handleOnChange}
                            onKeyDown={handleOnKeyPress}
                            placeholder='#키워드'
                            value={val}


                />



              </div>
            </div>
        </div>
        <div className='w-full flex gap-1 mt-2 text-sm'>
            {tagArr}
        </div>
        <div className='flex flex-col justify-start text-start'>
        <label for="regionSelection" className="block text-sm font-medium text-gray-600 ps-1">지역 및 제한 인원</label>
          <div className='flex flex-row gap-2 text-lg'>
          <SelectBox
            id='regionSelection'
            className='w-2/5 me-1 mt-1 p-2 text-gray-400 block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring w-full focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300'
            defaultValue={currentChatRoom?.region?.gungu}
            disabled={true}
          />

          <input

            id="customInput"
            className="w-2/5 mt-1 p-2 text-end block border border-gray-300 rounded-md bg-faedcd focus:outline-none focus:ring focus:border-blue-300 transition-colors duration-300 ease-in-out focus:bg-yellow-300"
            type='number'
            min='1'
            placeholder='제한 인원'
            disabled={!isEditMode}
            value={currentChatRoom?.capability}
                            onChange={(e) => setCurrentChatRoom(prev => ({
                                ...prev, capability: e.target.value
                            }))}
          />
          <input type='text' disabled={true} value={'명'} className='w-1/5 mt-1 border-bg rounded-lg'/>
          </div>

        </div>

        <MembersList setCurrentChatRoom={setCurrentChatRoom} members={currentChatRoom?.members}
                             host={currentChatRoom?.host} isEditMode={isEditMode}/>
        <div className='flex justify-center text-start'>
            <div className="w-full flex-col">
                <label for="customInput" className="block text-sm font-medium text-gray-600 ps-1">배경 이미지</label>
                <div className={`w-full h-32 flex flex-col items-center justify-center gap-1`}>

                    <ProfileImage
                        size='32'
                        profileImage={profileImage}
                        onChange={handleChangeUploadProfileImg}
                        disabled={!isEditMode}
                    />
                </div>
                <div className='flex justify-center gap-5 '>

                    {currentChatRoom?.isHost ? isEditMode ? <>
                        <Button text='적용하기' type='button' onClick={onEditApplyButtonClicked}/>
                        <Button text='취소하기' type='button' onClick={onDetailModeButtonClicked}/>
                    </> : <>
                        <Button text='수정하기' type='button' onClick={onEditModeButtonClicked}/>
                    </> : ''}

                    <Button text='탈퇴하기' type='button' onClick={onExitButtonClicked}/>
                </div>
            </div>

        </div>


            </form>
           </div>
        </>
    );
}

export default ChatRoomDetailModal;
