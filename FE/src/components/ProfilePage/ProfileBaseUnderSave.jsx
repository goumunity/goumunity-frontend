import { useEffect, useState } from "react";

const ProfileBaseUnderSave = ( { savings }) => {
  
  const [ savingList, setSavingList ] = useState([]);
  const [ sum, setSum ] = useState(0);
  useEffect( () => {
    const liList = savings.map( el => {

      return <li key= {el.id} className="flex justify-between rounded-lg">
      <div className="ps-4">{new Date(el.createAt).toLocaleDateString()}</div>
      <div className="pe-4">${parseInt(el.price) - parseInt(el.afterPrice)}</div>
    </li>
    }
      
  
    
    )
      let newSum = 0;
    savings.forEach( el => {
      let price = parseInt(el.price) - parseInt(el.afterPrice);
      newSum += price;
    } );

    setSum( newSum );
    setSavingList( liList );

    
    
  }, [])
    return(
        <>
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
          
              {savingList}
            
          </ul>
          <div className=" p-5 border-2 mt-2 rounded-lg">
                
                <div className="flex flex-row justify-between text-2xl">
                  <div> 합계: </div>
                  <div> {sum}원 </div>
                </div>
              
            </div>
        </div>
        
      </div>
      </>
    )
    
}

export default ProfileBaseUnderSave;