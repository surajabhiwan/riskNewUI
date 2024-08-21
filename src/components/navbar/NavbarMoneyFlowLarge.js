import { Link } from "react-router-dom";

import MoneyIcon from '@mui/icons-material/Money';
const NavbarMoneyFlowLarge = (props) => {
  const { menu } = props;

  return (
    <>
      <div
        className={`h-9 px-2 rounded-xl flex items-center mt-2
            ${menu === "moneyflowhome"
            ? "bg-gradient-to-r from-yellow-200 to-yellow-400" : ""}    `}  >
        <Link to="/moneyflow" className="flex items-center cursor-pointer">
          <div className={`flex justify-center items-center ${menu === "moneyflowhome" ? "" : "text-white"} `}>
            <MoneyIcon fontSize="small" />
          </div>
          <div
            className={`transition-all duration-300  ${menu === "moneyflowhome" ? "text-black" : "text-white"}`} >
            <span className={`font-normal ml-2 text-sm hover:opacity-80`} style={{textWrap: 'nowrap'}}>Money Flow</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavbarMoneyFlowLarge;
