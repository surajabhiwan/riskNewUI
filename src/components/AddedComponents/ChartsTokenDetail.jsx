import React from "react";
import Ticker from "react-ticker";


function Chartslider() {
  return (
    
    <Ticker>
      {({ index }) => (
        <>
          <h1 style={{ paddingRight: "0.5em", color: 'white', background: 'red', width: '20rem'}}>
            This is the Headline of element #{index}!
          </h1>
        </>
      )}
    </Ticker>
  );
}

export default Chartslider;