import { Link } from "react-router-dom";
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
const NavbarBubblesLarge = (props) => {
  const { menu } = props;

  return (
    <>
      <div
        className={`h-9 px-2 rounded-xl  flex items-center mt-2
            ${menu === "bubbleshome"
            ? "bg-gradient-to-r from-yellow-200 to-yellow-400" : ""}`}  >
        <Link to="/bubbles" className="flex items-center cursor-pointer">
          <div className={`flex justify-center items-center ${menu === "bubbleshome" ? "" : "text-white"} `}>
            <SportsVolleyballIcon fontSize="small" />
          </div>
          <div
            className={`transition-all duration-300  ${menu === "bubbleshome" ? "text-black" : "text-white"}`} >
            <span className={`font-normal ml-2 text-sm hover:opacity-80`}>Bubbles</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavbarBubblesLarge;