import React from 'react'
import ItemsCarousel from 'react-items-carousel';
import { useState } from 'react';
import landingMain from '../../assets/svgs/landMainFinal.svg'
import landing2 from '../../assets/svgs/landMain2.svg'
import landing2Second from '../../assets/svgs/landSecond.svg'
import './NewLandingFirst.css'
function LeftSide() {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 20;
    const imageCss = {
        // width : '100%',
        // height: '100%'
        objectFit: 'cover',
        position:'absolute',
        bottom: '0',
        height: '100%',
        width: '100%'
    }
    return (
        <>
        <div className='w-3/5 bg-bg h-full parent-container' >
          <div className='child-container h-screen'>
            <div style={{ padding: `0 ${chevronWidth}px` }}>
                <ItemsCarousel
                    requestToChangeActive={setActiveItemIndex}
                    activeItemIndex={activeItemIndex}
                    numberOfCards={1}
                    leftChevron={<button className='side' ><i className="fa-solid fa-arrow-left"></i></button>}
                    rightChevron={<button className='side'><i className="fa-solid fa-arrow-right"></i></button>}
                    outsideChevron
                    chevronWidth={chevronWidth}
                >
                    {/* <div className='' style={{ backgroundImage: landingMain }}>First card</div> */}
                    <div className='h-screen' style={{ position: 'relative' }}>
                        <img src={landing2} style={imageCss}></img>
                        <div className='mb-11 font-daeam lg:text-2xl md:text-lg sm:text-sm' style={{ position: 'absolute', bottom: '0', left: '0', right: '0', textAlign: 'center', padding: '20px', color: '#0E6CA5'}}>
                            적은 소비로 더 큰 행복을 함께 모을, 프로절약러를 모집합니다!
                        </div>
                    </div>
                    <div className='h-screen'>
                    <img src={landing2Second} style={imageCss}></img>
                    </div>

                </ItemsCarousel>
            </div>  
          </div>
            
            
        </div>
        
        </>
    )
}

export default LeftSide