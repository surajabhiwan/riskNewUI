// import HeaderCurrency from "./HeaderCurrency";
import MobileHeaderWallet from "./MobileHeaderWallet";
import MobileHeaderSearch from "./MobileHeaderSearch";
import MobileHeaderDropdownMenu from "./MobileHeaderDropdownMenu";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const MobileHeader = () => {

  return (
    <div className="xl:hidden flex justify-between items-center p-2">
      <Link to={'/'}>
      <div className="flex items-center gap-1 ">
        <img
          src="/static/images/icons/Icon.png"
          className="w-[50px] h-[50px]"
          alt="riskwise"
        />
        <div className="sm:flex sm:flex-col hidden w-full font-semibold">
          <div className="w-full text-white">Risk Wise Pro</div>
          <div className="w-full h-[3px] bg-gradient-to-r from-yellow-500 to-yellow-200"></div>
        </div>
      </div>
      </Link>
      <div className="flex sm:gap-1 gap-[2px]">
        {/* <HeaderCurrency /> */}
<MobileHeaderSearch />
<MobileHeaderWallet />
<MobileHeaderDropdownMenu />

      </div>
    </div>
  );
};

export default MobileHeader;
