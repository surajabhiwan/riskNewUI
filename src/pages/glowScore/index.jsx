import React, { useEffect } from "react";
import { showToast } from "../../functions/showToast";

const CrowScore = () => {
  useEffect(() => {
    showToast();
  }, []);

  return (
    <div className="w-full">
        <div className="flex justify-center items-center h-[30vh]">
            <img src="/static/images/crowScore/crowscore.png" alt="" />
        </div>
      <iframe
        src="https://cryptocrow.io/pricing/"
        height="900rem"
        width="100%"
        allow="geolocation"
        title="jpg store"
      ></iframe>
    </div>
  );
};

export default CrowScore;
