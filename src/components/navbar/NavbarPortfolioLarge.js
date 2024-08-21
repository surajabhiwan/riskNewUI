import { Link } from "react-router-dom";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
//chatpro
const NavbarPortfolioLarge = (props) => {
  const { menu } = props;

  return (
    <>
      <div className={`h-9  px-2 rounded-xl flex items-center mt-2 
            ${menu === "chatprohome"
          ? "bg-gradient-to-r from-yellow-200 to-yellow-400"
          : ""}`}  >
        <Link to="/chatpro" className="flex cursor-pointer">
          <div className={`flex justify-center items-center text-[18px] ${menu === "chatprohome" ? "" : "text-white"} `}>
            <span className="font-semibold"> <SendOutlinedIcon fontSize="small" /></span>
          </div>
          <div className={`flex items-center transition-all duration-300  ${menu === "chatprohome" ? "text-black" : "text-white"}`} >
            <span className="font-normal ml-1 text-sm hover:opacity-80">ChatPRO</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavbarPortfolioLarge;
