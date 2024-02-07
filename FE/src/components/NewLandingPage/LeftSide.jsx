import React from 'react'
import ItemsCarousel from 'react-items-carousel';
import { useState } from 'react';
import landingMain from '../../assets/svgs/landMainFinal.svg'
import './NewLandingFirst.css'
function LeftSide() {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 60;
    return (
        <>
        <div className='w-3/5 bg-bg h-full parent-container' >
          <div className='child-container'>
            <div style={{ padding: `0 ${chevronWidth}px` }}>
                <ItemsCarousel
                    requestToChangeActive={setActiveItemIndex}
                    activeItemIndex={activeItemIndex}
                    numberOfCards={1}
                    leftChevron={<button><i className="fa-solid fa-arrow-left"></i></button>}
                    rightChevron={<button><i className="fa-solid fa-arrow-right"></i></button>}
                    outsideChevron
                    chevronWidth={chevronWidth}
                >
                    {/* <div className='' style={{ backgroundImage: landingMain }}>First card</div> */}
                    <div className=''><img src={landingMain} className='h-screen'></img></div>
                    <div className='' style={{ background: '#EEE' }}>Second card</div>

                </ItemsCarousel>
            </div>  
          </div>
            
            
        </div>
        
        </>
    )
}

export default LeftSide