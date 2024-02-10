
import React from 'react'
import './SlideShow.css'
export default function SlideShow() {
    const colors = ["#0088FE", "#00C49F", "#FFBB28"];
    return (
        <div className="slideshow">
          <div className="slideshowSlider">
            {colors.map((backgroundColor, index) => (
              <div
                className="slide"
                key={index}
                style={{ backgroundColor }}
              ></div>
            ))}
          </div>
    
          <div className="slideshowDots">
            {colors.map((_, idx) => (
              <div key={idx} className="slideshowDot"></div>
            ))}
          </div>
        </div>
      );
}

