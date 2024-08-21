import { Link } from "react-router-dom";
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';
const NavbarChartsLarge = (props) => {
  const { menu } = props;

  return (
    <>
      <div
        className={`h-9  px-2 rounded-xl flex items-center mt-2
            ${menu === "chartshome"
            ? "bg-gradient-to-r from-yellow-200 to-yellow-400"
            : ""
          }
             `}
      >
        <Link to="/charts" className="flex cursor-pointer">
          <div className={`flex justify-center items-center ${menu === "chartshome" ? "" : "text-white"} `}>
            <TroubleshootOutlinedIcon fontSize="small" />
          </div>
          <div
            className={`transition-all duration-300
                 ${menu === "chartshome" ? "text-black" : "text-white"}
              `}
          >
            <span className={`font-normal ml-1 text-sm hover:opacity-80`}>Charts</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavbarChartsLarge;
