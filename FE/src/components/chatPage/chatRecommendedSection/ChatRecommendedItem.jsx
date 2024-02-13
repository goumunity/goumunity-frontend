import instance from "@/utils/instance.js";
import logo from '@/assets/images/logo.png'
import Swal from "sweetalert2";
import {useEffect} from "react";
import handleError from "@/utils/error.js";


function ChatRecommendedItem(props) {

    const {item, setMyChatRooms, myChatRooms} = props;

    const onEnterButtonClicked = () => {
        Swal.fire(
            {
                title : `${item.title}에 입장 하시겠습니까?`,
                confirmButtonText: "네",
                showCancelButton: true,
                cancelButtonText: "아니요"
            }
        ).then(result => {
            console.log(result)
            if (result.isConfirmed) {
                instance.post(`/api/chat-rooms/${item.chatRoomId}`)
                    .then(() => {

                        instance.get(`/api/chat-rooms/${item.chatRoomId}`)
                            .then(res => {
                                setMyChatRooms([res.data, ...myChatRooms]);
                            })
                    })
                    .catch(error => {
                        handleError(error)
                    })
            }
        })
    }

    return (
        <>
            <div className='cards__item__link'>
                <figure className='cards__item__pic-wrap'>
                    <img
                        className='cards__item__img'
                        alt='Travel Image'
                        src={item.imgSrc ? item.imgSrc : logo}
                    />
                </figure>
                <div className='cards__item__info border-t-black '>
                    <h5 className='font-daeam cards__item__text'>
                        {item.title}
                    </h5>
                    {item.hashtags?.map((hashtag, hashIndex) => {
                        return (
                            <span
                                key={hashIndex}
                                className='font-her text-1xl pr-2'
                            >{`#${hashtag.name}`}</span>
                        );
                    })}
                    <div className='mt-3 text-gray-800 font-paci text-center rounded-md border-2 hover:border-solid
                    p-2
                    text-2xl
                    hover:bg-bg
                    hover:cursor-pointer'
                         onClick={onEnterButtonClicked}
                    >
                        입장하기
                    </div>
                </div>
            </div>


        </>
    );
}

export default ChatRecommendedItem;
