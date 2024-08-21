import { Link } from "react-router-dom";

import * as SVG from "../../common/Icons";

const NavbarCryptoMulti = (props) => {
  const { menu } = props;

  return (
    <>
      <div
        className={`h-9  px-2 rounded-xl flex items-center mt-2
            ${menu === "cryptoMultiChartshome"
            ? "bg-gradient-to-r from-yellow-200 to-yellow-400" : ""} `}  >
        <Link to="/cryptoMultiCharts" className="flex items-center cursor-pointer gap-4">
          <SVG.multiChart menu={menu} />
          <div
            className={`transition-all duration-300
                 ${menu === "cryptoMultiChartshome" ? "text-black" : "text-white"} `} >
            <span className={`font-normal ml-1 text-sm hover:opacity-80`}>&nbsp;&nbsp;Crypto Multichart</span>
          </div>
        </Link>   
      </div>
    </>
  );
};

export default NavbarCryptoMulti;
