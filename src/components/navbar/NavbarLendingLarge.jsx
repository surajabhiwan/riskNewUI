import { Link } from "react-router-dom";
import CreditScoreIcon from '@mui/icons-material/CreditScore';

const NavbarLendingLarge = (props) => {
  const { menu } = props;

  return (
    <>
      <div
        className={`h-9 px-2 rounded-xl  flex items-center mt-2
            ${menu === "lendinghome"
            ? "bg-gradient-to-r from-yellow-200 to-yellow-400" : ""}    `}  >
        <Link to="/lending" className="flex items-center cursor-pointer">
          <div className={`flex justify-center items-center ${menu === "lendinghome" ? "" : "text-white"} `}>
            <CreditScoreIcon fontSize="small" />
          </div>
          <div
            className={`transition-all duration-300  ${menu === "lendinghome" ? "text-black" : "text-white"}`} >
            <span className={`font-normal ml-2 text-sm hover:opacity-80`}>Lending</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavbarLendingLarge;