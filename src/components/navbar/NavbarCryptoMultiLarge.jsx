import { Link } from "react-router-dom";
import BarChartIcon from '@mui/icons-material/BarChart';
import * as SVG from "../../common/Icons";

const NavbarCryptoMultiLarge = (props) => {
  const { menu } = props;
//Multicharts large
  return (
    <>
      <div
        className={`h-9  px-2 rounded-xl flex items-center mt-2
            ${menu === "cryptoMultiChartshome"
            ? "bg-gradient-to-r from-yellow-200 to-yellow-400" : ""} `}  >
        <Link to="/cryptoMultiCharts" className="flex items-center cursor-pointer">
          {/* <SVG.multiChart menu={menu}/> */}
          <div className={`flex justify-center items-center ${menu === "cryptoMultiChartshome" ? "" : "text-white"} `}>
            <BarChartIcon fontSize="small" />
          </div>
          <div
            className={`transition-all duration-300 
                 ${menu === "cryptoMultiChartshome" ? "text-black" : "text-white"} `}>
            <span className={`font-normal ml-1 text-sm hover:opacity-80`} style={{ textWrap: 'nowrap' }}>Crypto Multichart</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavbarCryptoMultiLarge;