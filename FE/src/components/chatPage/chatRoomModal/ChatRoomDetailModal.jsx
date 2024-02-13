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
        console.log(uploadFile);
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
            setErrorMessage('방 제목을 입력해줏세요');
            return;
        }
        if (currentChatRoom?.capability === '') {
            setErrorMessage('방 최대 인원 수를 입력해주세요');
            return;
        }
        if (currentChatRoom?.regionId === '') {
            setErrorMessage('방 지역을 선택해주세요');
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
        console.log(data)

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
                console.error('api 요청 중 오류 발생 : ', error);
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
            console.error(e)
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
        console.log(e);
        if (e.key === 'Enter') {
            console.log(val);
            changeArr(val);
            emptyInput();
            console.log(val);
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
        const nextArr = currentChatRoom?.hashtags.filter((elem) => elem.sequence !== target.sequence);
        setCurrentChatRoom(prev => ({
            ...prev,
            hashtags: nextArr
        }))
    };
    const tagArr = currentChatRoom?.hashtags.map((elem) => (
        <HashTag>
            {isEditMode ? <CloseButton
                className='absolute top-5 right-5'
                onClick={() => onRemove(elem)}
            /> : ''}

            <div
                key={elem.idx}
                className='p-1 m-1 text-2xl'
                onDoubleClick={() => onRemove(elem)}
                onChange={(e) => handleChangeInputs('hashtag', e.target.value)}
            >
                {`#${elem.name}`}
            </div>
        </HashTag>
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
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        setIsSearchMode(true);
                        dispatch(modalActions.closeModal());
                    }).catch(err => handleError(err));
            }
        });
    }


    //tagArr의 길이가 5 초과하는 경우, 5번째 인덱스 이후의 요소들을 제거

    if (tagArr?.length > 5) {
        tagArr.splice(5);
        alert('해시태그는 5개까지만 입력 가능합니다.');
    }

    return (
        <>
            <div className='scroll overflow-y-scroll  max-h-full '>
            <h1 className='font-daeam text-2xl'>채팅방 정보</h1>
            <form>
                <div className='text-start font-her text-2xl'>*채팅방 제목</div>
                <div className='content-start pb-3'>
                    <input
                        className='bg-transparent w-full border-b font-her'
                        placeholder='방제 입력하기'
                        value={currentChatRoom?.title}
                        readOnly={!isEditMode}
                        onChange={(e) => setCurrentChatRoom(prev => ({
                            ...prev, title: e.target.value
                        }))}
                    />
                </div>
                <div className='font-her text-left text-2xl'>*해시태그</div>
                <div className='flex'>
                    {tagArr}
                    {isEditMode ? <HashTag>
                        <div className='flex flex-row'>
                            <div>
                                <input
                                    className='bg-transparent w-20 border-2 text-center'
                                    onChange={handleOnChange}
                                    onKeyDown={handleOnKeyPress}
                                    placeholder='#키워드'
                                    value={val}
                                    readOnly={!isEditMode}
                                />
                            </div>
                        </div>
                        {' '}
                    </HashTag> : ''}
                </div>
                <div className='flex font-her justify-center bg-gray-100 p-2 '>
                    <div
                        className='p-2 border border-t border-b border-l -mr-px border-gray-300 rounded-md focus:outline-none focus:border-gray-500 bg-transparent text-gray-100 text-3xl'
                        style={{
                            borderRadius: '1.3rem 0 0 1.3rem',
                            backgroundColor: 'rgba(0,0,0,0)',
                        }}
                    >
                        지역
                    </div>
                    <SelectBox
                        className='px-2 py-1 bg-yellow rounded-md border-solid border-2 font-daeam text-lg text-center flex-grow'
                        widthSize={96}
                        disabled={true}
                        defaultValue={currentChatRoom?.region?.gungu}
                    />
                </div>

                <MembersList setCurrentChatRoom={setCurrentChatRoom} members={currentChatRoom?.members}
                             host={currentChatRoom?.host} isEditMode={isEditMode}/>
                <div className='flex font-her justify-center bg-gray-100 p-2'>
                    <div
                        type='text'
                        className='p-2 border border-t border-b border-l -mr-px border-gray-300 rounded-md focus:outline-none focus:border-gray-500 bg-transparent text-gray-100 text-2xl w-1/3'
                        style={{
                            borderRadius: '1.3rem 0 0 1.3rem',
                            backgroundColor: 'rgba(0,0,0,0)',
                        }}
                    >
                        인원수
                    </div>

                    <div
                        className=' px-2 py-1 bg-yellow rounded-md border-solid border-2 font-daeam text-lg text-center'>
                        <input
                            className='bg-transparent h-full text-center'
                            type='number'
                            min='1'
                            value={currentChatRoom?.capability}
                            readOnly={!isEditMode}
                            onChange={(e) => setCurrentChatRoom(prev => ({
                                ...prev, capability: e.target.value
                            }))}
                        />
                        <span>명</span>
                    </div>
                </div>

                <div className='border rounded-xl font-her pt-2 pb-2'>
                    대표 이미지
                    <div className='flex justify-center relative text-center '>
                        <ProfileImage
                            disabled={!isEditMode}
                            size='20'
                            profileImage={profileImage}
                            onChange={handleChangeUploadProfileImg}
                        />
                    </div>
                </div>
                <div className='flex justify-center gap-5 '>
                    {isEditMode ? <>
                        <Button text='적용하기' type='button' onClick={onEditApplyButtonClicked}/>
                        <Button text='취소하기' type='button' onClick={onDetailModeButtonClicked}/>
                    </> : <>
                        <Button text='수정하기' type='button' onClick={onEditModeButtonClicked}/>
                    </>}

                    <Button text='탈퇴하기' type='button' onClick={onExitButtonClicked}/>
                </div>
            </form>
            </div>
        </>
    );
}

export default ChatRoomDetailModal;
