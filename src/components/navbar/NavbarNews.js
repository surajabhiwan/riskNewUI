import { Link } from "react-router-dom";

// import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import * as SVG from "../../common/Icons"

const NavbarNews = (props) => {
  const { menu } = props;
  const { isScale } = props;

  return (
    <>
      <div
        className={`h-9  transition-all duration-300  flex items-center mt-2
            ${menu === "cryptocurrencieshome"
            ? "bg-gradient-to-r from-yellow-200 to-yellow-400"
            : ""
          }
             ${isScale ? "w-[177px] justify-start px-2 " : "w-24  pl-2 "}`}
      >
        <Link to="/cryptocurrencies" className="flex cursor-pointer">
          <div className={`flex justify-center items-center ${menu === "cryptocurrencieshome" ? "" : "text-white"} `}>
          <SVG.NewsIcon menu={menu}/>
          </div>     
               <div
            className={`transition-all duration-300
                 ${menu === "newshome" ? "text-black" : "text-white"}
                ${isScale ? "opacity-100" : ""}`}
          >
            <span className={`font-normal ml-5`}>&nbsp;Cryptocurrencies</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavbarNews;
