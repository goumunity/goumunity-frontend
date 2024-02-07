import React from 'react'
import ItemsCarousel from 'react-items-carousel';
import { useState } from 'react';
import landingMain from '../../../assets/images/landingMain.png'
function LeftSide() {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 60;
    return (
        <>
        <div className='h-screen'>
            <div style={{ padding: `0 ${chevronWidth}px` }}>
                <ItemsCarousel
                    requestToChangeActive={setActiveItemIndex}
                    activeItemIndex={activeItemIndex}
                    numberOfCards={1}
                    leftChevron={<button><i class="fa-solid fa-arrow-left"></i></button>}
                    rightChevron={<button><i class="fa-solid fa-arrow-right"></i></button>}
                    outsideChevron
                    chevronWidth={chevronWidth}
                >
                    {/* <div className='h-screen' style={{ backgroundImage: landingMain }}>First card</div> */}
                    <div className="h-screen"><img src={landingMain} className='h-screen'></img></div>
                    <div className='h-screen' style={{ background: '#EEE' }}>Second card</div>

                </ItemsCarousel>
            </div>
        </div>
        
        </>
    )
}

export default LeftSide