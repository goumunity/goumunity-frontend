<<<<<<< HEAD
import axios from 'axios';
import defaultMaleIcon from '../../assets/svgs/defaultMaleIcon.svg';
import { useEffect, useState } from 'react';
const ProfileImageSection = ( { size, src } ) => {
    const [ img,setImg ] = useState(null);
    const [ imgSrc, setImgSrc ] = useState('');

    useEffect( () => {

        setImgSrc( src );

    },[])

    useEffect( () => {
        if( img != null ){
            let formData = new FormData();
            formData.append( 'image', img );
            axios.post('/api/users/my/profile-images', formData ).then( res => {
                const url = res.data;
                let sendUrl = new Object();
                sendUrl.imgSrc = url;
                axios.patch( '/api/users/my/profile-images', JSON.stringify(sendUrl),{ headers: {
                    'Content-Type' : 'application/json',
                }}).then( res =>{
                    console.log( 'res:', res );
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
        if( confirm("프로필 이미지를 변경하시겠습니까?")){
            setImg( e.target.files[0] );
        }else{
            e.preventDefault();
        }
        
    }

    const customInputStyle = {
        display: 'none'
      };
    
      const customLabelStyle = {
        backgroundImage: `url("${ imgSrc }")`,
        backgroundSize: 'cover',
        width:'200px',
        height:'200px',
        display: 'inline-block',
        cursor: 'pointer'
      };

    return(
        <>
            <div className="rounded-full border-2 w-fit overflow-hidden cursor-pointer">
                <input type="file" id="fileInput" style={customInputStyle} onChange={onImgChange} />
                <label htmlFor="fileInput" style={customLabelStyle}></label>
            </div>
        </>
    )
=======
import { useEffect, useState } from 'react';
import defaultMaleIcon from '../../assets/svgs/defaultMaleIcon.svg';
import axios from 'axios';
const ProfileImageSection = ( { size, src } ) => {
    const [img, setImg ] = useState('');
    const customInputStyle = {
        display: 'none' // input[type="file"] 요소를 숨깁니다.
      };
    const onChange = (e) => {
        setImg( e.target.files[ 0 ] );
        
    }

    useEffect( () => {
        let sendData = new FormData();
        sendData['image'] = img;
        axios.post( 'https://ssafyhelper.shop/test/api/common/images', sendData )
        .then( res => {
            
        })
        .catch( error => {
            console.log( error );
        })
    }, [img])

    const customLabelStyle = {
        backgroundImage: `url("${ img ? URL.createObjectURL(img) : ( src ? src : defaultMaleIcon) }")`, // 커스텀 이미지 설정
        backgroundSize: 'cover', //이미지 크기에 맞게 조정
        width: '100px', // 이미지 너비 설정
        height: '100px', // 이미지 높이 설정
        display: 'inline-block',
        cursor: 'pointer' // 마우스 커서를 포인터로 변경하여 사용자에게 입력 가능한 요소임을 보여줍니다.
    };
      

    return (
        <div>
        <input type="file" id="fileInput" style={customInputStyle} onChange={onChange}/>
        <label htmlFor="fileInput" style={customLabelStyle} className={`rounded-full w-${size}`}></label>
        </div>
    );
      
>>>>>>> d0df833 (refactor:code)
}


export default ProfileImageSection;