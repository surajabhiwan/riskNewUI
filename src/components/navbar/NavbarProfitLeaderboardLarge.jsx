import { Link } from "react-router-dom";

import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
const NavbarProfitLeaderboardLarge = (props) => {
  const { menu } = props;
  return (
    <>
      <div
        className={`h-9 px-2 rounded-xl  flex items-center mt-2 ${menu === "profit-Leaderboardhome"
          ? "bg-gradient-to-r from-yellow-200 to-yellow-400" : ""} `} >
        <Link to="/profit-Leaderboard" className="flex cursor-pointer items-center">
          <div className={`flex justify-center items-center ${menu === "profit-Leaderboardhome" ? "" : "text-white"} `}>
            <RoomPreferencesIcon fontSize="small" />
          </div>
          <div
            className={`transition-all duration-300
                 ${menu === "profit-Leaderboardhome" ? "text-black" : "text-white"}  `} >
            <span className={`font-normal ml-1 text-sm hover:opacity-80`} style={{ textWrap: 'nowrap' }}>Profit Leaderboard</span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavbarProfitLeaderboardLarge;