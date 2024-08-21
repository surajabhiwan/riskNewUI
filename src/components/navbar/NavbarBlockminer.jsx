import { Link } from "react-router-dom";

import * as SVG from "../../common/Icons";
import BeachAccessIcon from '@mui/icons-material/BeachAccess';


const NavbarBlockminer = (props) => {
  const { menu } = props;
  const { isScale } = props;

  return (
    <>
      <div
        className={`h-9  transition-all duration-300  flex items-center mt-2
            ${menu === "mininghome"
            ? "bg-gradient-to-r from-yellow-200 to-yellow-400"
            : ""
          }
             ${isScale ? "w-[177px] justify-start pl-2" : "w-[135px]  pl-2"
          }`}
      >
        <Link to="/block-miners" className="flex cursor-pointer">
          <div className={`flex justify-center items-center ${menu === "moneyflowhome" ? "" : "text-white"} `}>
            <BeachAccessIcon fontSize="small" />
          </div>
          <div
            className={`transition-all duration-300
                 ${menu === "moneyflowhome" ? "text-black" : "text-white"}
                ${isScale ? "opacity-100" : ""}`}
          >
            <span className={`font-normal ml-3`} style={{ textWrap: 'nowrap' }}>&nbsp;&nbsp;Block Miners</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavbarBlockminer;
