import { useEffect, useState } from "react";
import * as IMG from "../../../common/IMG/Images";
import { useLocation } from "react-router-dom";
import './CommingSoon.css';
const CommingSoon = () => {
  const [srcData, setSrcData] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/market-overview") {
      setSrcData(IMG.comingMarketData);
    } else if (location.pathname === "/chatpro") {
      setSrcData(IMG.comingChatPro);
    } else if (location.pathname === "/partner") {
      setSrcData(IMG.comingEducationPro);
    }
  }, [location]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full pt-10 p-12">
      <div className="grid">
      <img
  src={srcData}
  alt="coming soon"
  className="coming-soon-image"
/>

      </div>
    </div>
  );
};

export default CommingSoon;
