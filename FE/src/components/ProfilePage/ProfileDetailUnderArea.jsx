import { useEffect, useState } from "react";
import Map from "./Map";
import axios from "axios";

const ProfileDetailUnderArea = () => {
    const [gunguList,setGunguList] = useState([]);
    // const {kakao} = window;
    useEffect( () => {
        axios.get('/api/regions').then( (res) => {
            const val = res.data.map( el => <li id={el.regionId} className="flex justify-between items-center py-2 border-b border-gray-300">
            <span className="text-lg">{el.gungu}</span>
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500"/>
        </li>)
        setGunguList( val );
        
        })
    })


    return (
        <>
        <div className="w-3/5 ms-2 roudned-md">
           
            {/* <Map width="100" height="96"/> */}
            <ul className="scroll list-none w-full p-5 overflow-y-scroll h-full">
                {gunguList}



            </ul>
        
        </div>
        
        </>
    )
}


export default ProfileDetailUnderArea;
