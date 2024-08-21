import { Link } from "react-router-dom";
// import * as SVG from "../../common/Icons";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
// import CurrencyBitcoinOutlinedIcon from '@mui/icons-material/CurrencyBitcoinOutlined';

//chatpro
const NavbarPortfolio = (props) => {
  const { menu } = props;
  const { isScale } = props;

  return (
    <>
      <div
        className={`h-9  transition-all duration-300  flex items-center mt-2 
            ${menu === "chatprohome"
            ? "bg-gradient-to-r from-yellow-200 to-yellow-400"
            : ""
          }
             ${isScale ? "w-[177px] justify-start px-2 " : "w-24  pl-2 "
          }`}
      >
        <Link to="/chatpro" className="flex cursor-pointer">
          <div className={`flex justify-center items-center ${menu === "chatprohome" ? "" : "text-white"} `}>
            {/* <CurrencyBitcoinOutlinedIcon fontSize="small" /> */}
            <span className="font-semibold"> <SendOutlinedIcon fontSize="small" /></span>
          </div>          <div
            className={`transition-all duration-300
                 ${menu === "chatprohome" ? "text-black" : "text-white"}
                ${isScale ? "opacity-100" : ""}`}
          >
            <span className={`font-normal ml-5`}>Chat<sup className="text-yellow-400 text-[10px]">pro</sup></span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavbarPortfolio;
