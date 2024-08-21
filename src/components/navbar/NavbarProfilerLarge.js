import { Link } from "react-router-dom";

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
const NavbarProfilerLarge = (props) => {
  const { menu } = props;

  return (
    <>
      <div
        className={`h-9 px-2 rounded-xl  flex items-center mt-2 ${menu === "portfoliohome"
          ? "bg-gradient-to-r from-yellow-200 to-yellow-400" : ""} `} >
        <Link to="/portfolio" className="flex cursor-pointer items-center">
          <div className={`flex justify-center items-center ${menu === "portfoliohome" ? "" : "text-white"} `}>
            <AccountBalanceWalletIcon fontSize="small" />
          </div>
          <div
            className={`transition-all duration-300
                 ${menu === "portfoliohome" ? "text-black" : "text-white"}  `} >
            <span className={`font-normal ml-1 text-sm hover:opacity-80`}>Portfolio</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavbarProfilerLarge;
