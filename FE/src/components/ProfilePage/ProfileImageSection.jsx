
import axios from 'axios';
import defaultMaleIcon from '../../assets/svgs/defaultMaleIcon.svg';
import { useEffect, useState } from 'react';
import instance from "@/utils/instance.js";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { authActions } from '../../store/auth';
const ProfileImageSection = ( { size, src } ) => {
    const [ img,setImg ] = useState(null);
    const [ imgSrc, setImgSrc ] = useState('');
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);

    useEffect( () => {

        setImgSrc( src );

    },[])

    useEffect( () => {
        if( img != null ){
            let formData = new FormData();
            formData.append( 'image', img );
            instance.post('/api/users/my/profile-images', formData ).then( res => {
                const url = res.data;
                let sendUrl = new Object();
                sendUrl.imgSrc = url;
                // console.log( 'now user : ', currentUser );
                const nextUser = { ...currentUser,
                    imgSrc: url,
                };
                // console.log( 'next user: ', nextUser );
                
                instance.patch( '/api/users/my/profile-images', JSON.stringify(sendUrl),{ headers: {
                    'Content-Type' : 'application/json',
                }}).then( res =>{
                    Swal.fire({
                        icon: "info",
                        text: '프로필 변경에 성공하였습니다.',

                    })
                    dispatch(authActions.updateCurrentUser(nextUser));
                }).catch( err => {
                    console.log( err );
                })
            }).catch( err => {
                console.log( err );
            })

            setImgSrc( URL.createObjectURL(img) );
            
        }
        
    }, [img])

    const onImgChange = (e) => {
        Swal.fire({
            text: "프로필 이미지를 변경하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#faedcd",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if( result.isConfirmed ){
                setImg( e.target.files[0] );
            }
        })
 
        
    }

    const customInputStyle = {
        display: 'none'
      };
    
      const customLabelStyle = {
        backgroundImage: `url("${imgSrc }")`,
        backgroundSize: 'cover',
        width:'12rem',
        height:'12rem',
        display: 'inline-block',
        cursor: 'pointer',
        border: '3px solid'
      };

    return(
        <>
            <div className="w-fit cursor-pointer">
                <input type="file" id="fileInput" style={customInputStyle} onChange={onImgChange} />
                <label htmlFor="fileInput" style={customLabelStyle} className='rounded-full'></label>
            </div>
        </>
    )

}


export default ProfileImageSection;