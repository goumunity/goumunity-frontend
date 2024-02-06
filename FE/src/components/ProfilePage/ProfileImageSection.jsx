import defaultMaleIcon from '../../assets/svgs/defaultMaleIcon.svg';
const ProfileImageSection = ( { size, src } ) => {
    
    return(
        <>
            <div className="rounded-full border-2 w-fit overflow-hidden cursor-pointer">
                
                <img src={src ? src : defaultMaleIcon} className={`w-${size}`}/>
            </div>
        </>
    )
}


export default ProfileImageSection;