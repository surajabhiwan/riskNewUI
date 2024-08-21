import { Link } from "react-router-dom";

import CreditScoreIcon from '@mui/icons-material/CreditScore';

const NavbarLending = (props) => {
  const { menu } = props;
  const { isScale } = props;

  return (
    <>
      <div
        className={`h-9  transition-all duration-300  flex items-center mt-2  
            ${menu === "lendinghome"
            ? "bg-gradient-to-r from-yellow-200 to-yellow-400"
            : ""
          }
             ${isScale ? "w-[177px] justify-start pl-2 " : "w-24  pl-2 "
          }`}
      >
        <Link to="/lending" className="flex cursor-pointer items-center">
          <div className={`flex justify-center items-center ${menu === "lendinghome" ? "" : "text-white"} `}>
            <CreditScoreIcon fontSize="small" />
          </div>
          <div
            className={`transition-all duration-300
                 ${menu === "lendinghome" ? "text-black" : "text-white"}
                ${isScale ? "opacity-100" : ""}`}
          >
            <span className={`font-normal ml-5 truncate`}>Lending</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavbarLending;