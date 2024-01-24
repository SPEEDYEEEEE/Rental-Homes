import React, { useState, useEffect } from 'react';
import '../styles/slide.scss';

const Slide = () => {
  const initialText =
    "Indulge in the warmth of your sanctuary. Wander freely, embracing the present. Craft cherished memories that echo in eternity.";

  const [displayedText, setDisplayedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(initialText.substring(0, currentIndex));
      currentIndex++;

      if (currentIndex > initialText.length) {
        clearInterval(intervalId);
        setCursorVisible(false);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, []); // Run once on component mount

  return (
    <div className='slide'>
      <h1>
        {displayedText}
        {cursorVisible && <span className='cursor'>&nbsp;</span>}
      </h1>
    </div>
  );
};

export default Slide;



// import React from 'react';
// import '../styles/slide.scss'

// const Slide = () => {
//   return (
//     <div className='slide'>
//         <h1>Welcome Home! Anywhere you roam <br /> Stay in the moment. Make you memories</h1>
//     </div>
//   )
// }

// export default Slide